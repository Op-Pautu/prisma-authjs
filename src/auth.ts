import { ZodError } from "zod";
import { signInSchema } from "./lib/zod"; // Your validation schema
import { getUserFromDb } from "@/utils/db"; // Your database query function
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required.");
          }

          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // Retrieve the user from the database
          const user = await getUserFromDb(email);

          if (!user) {
            return null; // User does not exist
          }

          // If the user does not have a password or password is not a string
          if (!user.password || typeof user.password !== "string") {
            return null; // Invalid user data
          }

          // Check if the passwords match (without hashing)
          if (password !== user.password) {
            return null; // Passwords do not match
          }

          // Return user data
          return {
            id: String(user.id), // NextAuth expects id as a string
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            return null; // Invalid credentials format
          }
          console.error("Login Error:", error);
          return null; // General error
        }
      },
    }),
  ],
});
