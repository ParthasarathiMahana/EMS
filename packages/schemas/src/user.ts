import { z } from 'zod'
export const loginSchema = z.object(
    {   
        email: z.email({ error: "Invalid email address" }),     
        password: z.string().min(6, { error: "Password must be at least 6 characters" }),  
    }
)

export const userSchema = z.object(
    {
        firstName: z.string(),
        lastName: z.string(),
        empID: z.string(),
        phone: z.string(),
        email: z.email(),
        password: z.string().min(6, { error: "Password must be at least 6 characters" }),
        designation: z.string(),
        company: z.string(),
        reportingManager: z.array(z.string()),
        reportee: z.array(z.string()),
        team: z.string(),
        leaves: z.object({
            totalLeaves: z.record(z.string(), z.number()),
            leavesTaken: z.record(z.string(), z.number()),
            leavesRemaining: z.record(z.string(), z.number()),
        }),
        profilePicture: z.string(),
        role: z.string(),
        location: z.string().optional(),
        teamsize: z.number().optional(),
        projectsCount: z.number().optional(),
        performanceScore: z.number().optional(),
        bio: z.string().optional(),
        skills: z.array(z.string()).optional(),
        department: z.string(),
        joiningDate: z.string(),
        employmentType: z.string(),
        status: z.string(),
    }
)

export type LoginInput = z.infer<typeof loginSchema>
export type UserDataType = z.infer<typeof userSchema>