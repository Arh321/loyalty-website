import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { success: false, message: "ایمیل یا کد ارسال نشده" },
        { status: 400 }
      );
    }

    // چک کردن اعتبار کد
    const { data: validOtp, error: otpError } = await supabase
      .from("otps")
      .select("*")
      .eq("email", email)
      .eq("code", code)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();

    if (otpError) {
      console.error("خطا در بررسی کد:", otpError);
      return NextResponse.json(
        { success: false, message: "خطا در بررسی کد" },
        { status: 500 }
      );
    }

    if (!validOtp) {
      return NextResponse.json(
        { success: false, message: "کد اشتباه یا منقضی شده" },
        { status: 401 }
      );
    }

    // چک کردن وجود کاربر
    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (userError) {
      console.error("خطا در بررسی کاربر:", userError);
      return NextResponse.json(
        { success: false, message: "خطا در بررسی کاربر" },
        { status: 500 }
      );
    }

    // اگه کاربر وجود نداشت، ایجادش کن
    if (!existingUser) {
      const { error: insertError } = await supabase.from("users").insert([
        {
          email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      if (insertError) {
        console.error("خطا در ایجاد کاربر:", insertError);
        return NextResponse.json(
          { success: false, message: "خطا در ایجاد کاربر" },
          { status: 500 }
        );
      }
    }

    // ساخت JWT توکن
    const token = jwt.sign(
      {
        email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // اعتبار 24 ساعته
      },
      JWT_SECRET
    );

    return NextResponse.json({
      success: true,
      message: "ورود موفق",
      token,
    });
  } catch (err) {
    console.error("خطای داخلی سرور:", err);
    return NextResponse.json(
      { success: false, message: "خطای داخلی سرور" },
      { status: 500 }
    );
  }
}
