"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const loginSchema = zod_1.z.object({
    email: zod_1.z.email({ error: "Invalid email address" }),
    password: zod_1.z.string().min(6, { error: "Password must be at least 6 characters" }),
});
