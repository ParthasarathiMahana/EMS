import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../../components/ui/input";
import { Link } from "react-router-dom";
// import { ModeToggle } from "../../../components/mode-toggle";
import { useState } from "react";
import {Eye, EyeOff} from "lucide-react"
// import Password from "../../../components/ui/password-input";
import { useTheme } from "../../../components/theme-provider";

const loginSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z.string().min(6, { error: "Password must be at least 6 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false)
  const {theme} = useTheme()

  console.log(theme)

  const onSubmit = (data: LoginFormData) => {
    console.log("Login Data:", data);
    // Add your login API call here
  };

  return (
    <div className="flex h-[95vh] items-center">
    {/* <ModeToggle classNames="flex px-2 mt-1 flex-row-reverse"/> */}
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[var(--card)] w-[90%] sm:w-[400px] md:w-[450px] mx-auto flex flex-col 
      items-center pb-[64px] px-none rounded-[8px] shadow-[0_0_15px_0px_var(--shadow)]"
    >
            <h1 className="text-3xl font-bold mt-10 mb-2">Login</h1>
      <div className="mb-[8px]">
        <Label htmlFor="email">Email</Label>
        <Input
        className={`rounded-[4px] h-[32px] w-[350px] mx-auto mt-[4px] ${errors.email && 'border border-red-500 focus:!ring-red-300'}`}
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

        {/* password section with show/hide password */}
      <div className="mb-[12px]">
        <Label htmlFor="password">Password</Label>
        <div className={`shadow-[0_1px_2px_0_rgb(0,0,0,0.05)] mt-[4px] w-[350px] h-[32px] flex items-center border  rounded-[4px] ${errors.password && 'border border-red-500 focus:!ring-red-300'}`}>
        <Input
        className={`border-0 shadow-none rounded-[4px] pr-[40px] h-[32px] w-[300px] ${errors.password && 'focus:!ring-red-300'}`}

          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          {...register("password")}
        />
          <Button 
          className="h-[30px] w-[50px] hover:cursor-pointer rounded-[4px]"
          type="button" 
          variant="ghost"
          onClick={()=>setShowPassword(pre=>!pre)}>
            {showPassword?<Eye height={5} width={5}/> : <EyeOff height={5} width={5}/>}
          </Button>
        </div>

          {/* <Password {...register("password")} className={`${errors.password && 'border border-red-500 focus:!ring-red-300'}`} /> */}

        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit"
        className="rounded-[4px] h-[32px] w-[350px] mt-[8px] hover:cursor-pointer border-none"
      >
        Login
      </Button>

      <Link to="/signup">
        <p className="text-sm mt-8 text-[var(--primary)] hover:underline">Don't have an account? Register your company</p>
      </Link>
    </form>
    </div>
  );
}
