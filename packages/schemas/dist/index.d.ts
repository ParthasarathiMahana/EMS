import { z } from 'zod';
declare const loginSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginFormData = z.infer<typeof loginSchema>;
export {};
