// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/app/lib/supabase";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "OTP Login",
      credentials: {
        email: { label: "Email", type: "text" },
        code: { label: "Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, code } = credentials;

        // اعتبارسنجی OTP از جدول Supabase
        const { data: otpData, error } = await supabase
          .from("otps")
          .select("*")
          .eq("email", email)
          .eq("code", code)
          .gt("expires_at", new Date().toISOString())
          .maybeSingle();

        if (error || !otpData) {
          console.error("کد اشتباه یا منقضی شده", error);
          return null;
        }

        // بررسی یا ساخت کاربر در جدول users
        const { data: user, error: userError } = await supabase
          .from("users")
          .upsert(
            {
              email,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "email" } // ایمیل unique باشه
          )
          .select("*")
          .maybeSingle();

        if (userError || !user) {
          console.error("خطا در ایجاد یا یافتن کاربر", userError);
          return null;
        }

        // کاربر معتبر است
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? "",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // مسیر لاگین اختصاصی خودت
  },
  callbacks: {
    // توکن JWT شامل user info
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    // session سمت کلاینت شامل user info
    async session({ session, token }: { session: any; token: JWT }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // مطمئن شو ست شده
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
