import {z} from 'zod'

let companySchema = z.object({
    comapnyName: z.string()
})

export type companyType = z.infer<typeof companySchema>