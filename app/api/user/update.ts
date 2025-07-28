import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function PATCH(req: NextRequest) {
  try {
    // 1. خواندن توکن از هدر Authorization
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "توکن ارسال نشده" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    if (!token) {
      return NextResponse.json(
        { success: false, message: "توکن نامعتبر است" },
        { status: 401 }
      );
    }

    // 2. استخراج اطلاعات کاربر از توکن (مثلا ایمیل یا user_id)
    // این بخش بسته به نوع توکن و ساختار JWT شما فرق میکنه
    // فرض میکنیم یه فانکشن verifyToken داری که اطلاعات رو decode میکنه
    const userData = await verifyToken(token);
    if (!userData?.email) {
      return NextResponse.json(
        { success: false, message: "توکن معتبر نیست" },
        { status: 401 }
      );
    }

    // 3. گرفتن اطلاعات جدید برای بروزرسانی از body
    const body = await req.json();
    // مثلا فقط اجازه بد name و phone رو آپدیت کنه
    const { name, phone } = body;

    if (!name && !phone) {
      return NextResponse.json(
        { success: false, message: "هیچ داده‌ای برای آپدیت ارسال نشده" },
        { status: 400 }
      );
    }

    // 4. آپدیت در جدول users
    const { error } = await supabase
      .from("users")
      .update({ name, phone, updated_at: new Date().toISOString() })
      .eq("email", userData.email);

    if (error) {
      console.error("Supabase update user error:", error);
      return NextResponse.json(
        { success: false, message: "خطا در بروزرسانی اطلاعات کاربر" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "اطلاعات کاربر با موفقیت بروزرسانی شد",
    });
  } catch (err) {
    console.error("Internal server error in update user API:", err);
    return NextResponse.json(
      { success: false, message: "خطای داخلی سرور" },
      { status: 500 }
    );
  }
}

// مثال ساده فانکشن verifyToken (باید JWT توکن رو decode و اعتبارسنجی کنه)
async function verifyToken(token: string): Promise<{ email?: string } | null> {
  // پیاده‌سازی واقعی رو با jwt یا supabase auth انجام بده
  // مثلا با jwt:
  // import jwt from "jsonwebtoken";
  // try { return jwt.verify(token, process.env.JWT_SECRET) } catch { return null }

  // این فقط یه نمونه ساده ست:
  return { email: "user@example.com" };
}
