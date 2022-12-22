// import { z } from 'zod';

// const loginSchema = z
//   .object(
//     { email: z.string().email(), password: z.string().min(7) },
//   )
//   .strict();

//   type body = z.infer<typeof loginSchema>;

// function zodTest(body: body) {
//   const loginValidation = loginSchema.safeParse(body);
//   if (!loginValidation.success) {
//     return loginValidation.error.message;
//   }
// }

// export = {
//   zodTest,
// };
