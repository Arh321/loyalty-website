import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabase } from "@/app/lib/supabase";
import type { HttpResult } from "@/app/types/httpResult";
import { createResponse } from "@/app/lib/response";

const otpStore = new Map<string, string>();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      const res: HttpResult = { success: false, message: "ایمیل وارد نشده" };
      return NextResponse.json(res, { status: 400 });
    }

    // 1. بررسی وجود OTP معتبر قبلی
    const { data: existingOtps, error: existingError } = await supabase
      .from("otps")
      .select("id, expires_at")
      .eq("email", email)
      .order("expires_at", { ascending: false })
      .limit(1);

    const now = new Date();

    if (existingOtps && existingOtps.length > 0) {
      const lastOtp = existingOtps[0];
      const expiresAt = new Date(lastOtp.expires_at);

      if (expiresAt > now) {
        const remainingSeconds = Math.floor(
          (expiresAt.getTime() - now.getTime()) / 1000
        );

        return createResponse(
          {
            success: false,
            message: `کد قبلی هنوز معتبر است. لطفاً ${remainingSeconds} ثانیه صبر کنید.`,
            data: { remainingSeconds },
          },
          429
        );
      }
    }

    // 2. ساخت کد OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // کد ۶ رقمی

    const { data, error } = await supabase.from("otps").insert([
      {
        email,
        code,
        expires_at: new Date(Date.now() + 3 * 60 * 1000), // 3 دقیقه
      },
    ]);

    if (error) {
      const res: HttpResult = { success: false, message: "خطا در ذخیره کد" };
      console.error("Supabase insert error:", error);
      return NextResponse.json(res, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"TineHouse" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "کد ورود شما",
      text: `کد ورود: ${code}`,
    });

    const res: HttpResult<typeof data> = { success: true, data };
    return NextResponse.json(res);
  } catch (error) {
    const res: HttpResult = { success: false, message: "خطای داخلی سرور" };
    console.error("Error in /api/send-otp:", error);
    return NextResponse.json(res, { status: 500 });
  }
}

export { otpStore };
