import React, { useState } from 'react'
import { cn } from '../../lib/utils'
import { Input } from './input'
import { Button } from './button'
import { Eye, EyeOff } from 'lucide-react'


// yet to implement
const Password = ({ className, ...props }: React.ComponentProps<"input">) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "w-[350px] h-[32px] flex items-center justify-between rounded-[4px] shadow-[0_1px_2px_0_rgb(0,0,0,0.05)]",
        className
      )}
      {...props}
      >
        <Input
        className={`!border-0 shadow-none rounded-[4px] pr-[40px] h-[32px] w-[300px] ${className}`}
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
        />
          <Button 
          className="h-[30px] w-[45px] hover:cursor-pointer rounded-[4px]"
          type="button" 
          variant="ghost"
          onClick={()=>setShowPassword(pre=>!pre)}>
            {showPassword?<Eye height={5} width={5}/> : <EyeOff height={5} width={5}/>}
          </Button>
        </div>
  )
}

export default Password
