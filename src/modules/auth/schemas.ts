import z from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const registerSchema =
    z.object({
        email: z.string().email(),
        password: z.string().min(3),
        username: z.string()
            .min(3, "Username must be at least 2 characters")
            .max(63, "User must be less tham 63 characters")
            .regex(
                /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
                "Username can only contain lowercase letters, numbers and hyphens. IT must start and end with a letter or number"
            )
            .refine(
                (val) => !val.includes("--"),
                "Username cannot contain consecutive hyphens"
            )
            .transform(
                (val) => val.toLowerCase()
            ),
    })
