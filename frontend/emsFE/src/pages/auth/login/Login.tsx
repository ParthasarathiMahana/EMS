import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../../components/ui/input";
import { Link } from "react-router-dom";
import { ModeToggle } from "../../../components/mode-toggle";
import { useState } from "react";
import {Eye, EyeOff} from "lucide-react"
// import Password from "../../../components/ui/password-input";

const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
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

  const onSubmit = (data: LoginFormData) => {
    console.log("Login Data:", data);
    // Add your login API call here
  };

  return (
    <>
    <ModeToggle classNames="flex px-2 mt-1 flex-row-reverse"/>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-[450px] ml-[calc((100%-450px)/2)] flex flex-col items-center mt-[150px] pb-[64px] px-none rounded-[8px] shadow-[0_0_15px_0px_rgba(0,0,0,0.3)]"
    >
            <h1 className="text-3xl font-bold mt-10 mb-2">Login</h1>
      <div className="mb-[8px]">
        <Label htmlFor="email">Email</Label>
        <Input
        className={`rounded-[4px] h-[32px] w-[350px] mt-[4px] ${errors.email && 'border border-red-500 focus:!ring-red-300'}`}
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
        <div className={`shadow-[0_1px_2px_0_rgb(0,0,0,0.05)] w-[350px] h-[32px] flex items-center border  rounded-[4px] ${errors.password && 'border border-red-500 focus:!ring-red-300'}`}>
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
        className="rounded-[4px] h-[32px] w-[350px] mt-[4px] hover:cursor-pointer border-none"
      >
        Login
      </Button>

      <Link to="/signup">
        <p className="text-sm mt-8 text-gray-500 hover:text-gray-950 hover:underline">Don't have an account? Sign up</p>
      </Link>
    </form>
    </>
  );
}
