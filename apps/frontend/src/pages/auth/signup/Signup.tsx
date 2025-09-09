import React from 'react'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Label } from '../../../components/ui/label'
import { Input } from '../../../components/ui/input'
import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/button'


const Signup = () => {

  const registrationSchema = z.object({
    name: z.string({error: "Please enter your name"}),
    company: z.string({error:"Please enter company name"}),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
    email: z.email({ message: "Please enter your email address" }),
    role:z.string(),
    website: z.string(),
    status: z.string()
  })

  type registerForType = z.infer<typeof registrationSchema>

  const {register, handleSubmit, formState:{errors}} = useForm<registerForType>({resolver: zodResolver(registrationSchema)})

  const handleRegistrationSubmit =() => {}

  return (
    <div className='flex items-center h-[100vh]'>
      <form 
      onSubmit={handleSubmit(handleRegistrationSubmit)}
      className="bg-[var(--card)] w-[90%] sm:w-[400px] md:w-[450px] mx-auto flex flex-col items-center
      pb-[64px] px-none rounded-[8px] shadow-[0_0_15px_0px_var(--shadow)]"
      >
              <h1 className="text-3xl font-bold mt-10 mb-4">Register your company</h1>
        <div className="mb-[8px]">
          <Label className="text-[16px]" htmlFor="name">Name</Label>
          <Input
          className={`rounded-[4px] h-[32px] w-[350px] mx-auto mt-[4px] ${errors.name && 'border border-red-500 focus:!ring-red-300'}`}
            id="name"
            type="name"
            placeholder="abc"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-[8px]">
          <Label className="text-[16px]" htmlFor="email">Email</Label>
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
        <div className="mb-[8px]">
          <Label className="text-[16px]" htmlFor="phone">Phone</Label>
          <Input
          className={`rounded-[4px] h-[32px] w-[350px] mx-auto mt-[4px] ${errors.phone && 'border border-red-500 focus:!ring-red-300'}`}
            id="phone"
            type="tel"
            placeholder="+91 98765...."
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
          )}
        </div>
        <div className="mb-[8px]">
          <Label className="text-[16px]" htmlFor="role">Designation</Label>
          <Input
          className={`rounded-[4px] h-[32px] w-[350px] mx-auto mt-[4px] ${errors.role && 'border border-red-500 focus:!ring-red-300'}`}
            id="role"
            type="text"
            placeholder="Software engineer"
            {...register("role")}
          />
          {errors.role && (
            <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
          )}
        </div>
        <div className="mb-[8px]">
          <Label className="text-[16px]" htmlFor="company">Company name</Label>
          <Input
          className={`rounded-[4px] h-[32px] w-[350px] mx-auto mt-[4px] ${errors.company && 'border border-red-500 focus:!ring-red-300'}`}
            id="company"
            type="company"
            placeholder="Google"
            {...register("company")}
          />
          {errors.company && (
            <p className="text-sm text-red-500 mt-1">{errors.company.message}</p>
          )}
        </div>
        <div className="mb-[12px]">
          <Label className="text-[16px]" htmlFor="website">Company website URL</Label>
          <Input
          className={`rounded-[4px] h-[32px] w-[350px] mx-auto mt-[4px] ${errors.website && 'border border-red-500 focus:!ring-red-300'}`}
            id="website"
            type="website"
            placeholder="www.company.com"
            {...register("website")}
          />
          {errors.website && (
            <p className="text-sm text-red-500 mt-1">{errors.website.message}</p>
          )}
        </div>
        <Button type="submit"
          className="rounded-[4px] h-[32px] w-[350px] mt-[8px] hover:cursor-pointer border-none"
        >
          Register
        </Button>
        

        <Link to="/login">
          <p className="text-sm mt-8 text-[var(--primary)] hover:underline">Login page</p>
        </Link>
      </form>
    </div>
  )
}

export default Signup
