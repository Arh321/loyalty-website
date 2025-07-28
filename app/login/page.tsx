"use client";

import { useState } from "react";
import axios from "axios";
import { useNotificationContext } from "../components/shared/notify/notify-context";
import { Input } from "antd";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [code, setCode] = useState("");
  const { showNotification } = useNotificationContext();
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/send-otp", { email });
      if (response.data.success) {
        showNotification({
          description: "کد با موفقیت ارسال شد",
          message: "کد ارسال شد",
          type: "success",
        });
        setStep("code");
      } else {
        showNotification({
          description: response.data.message ?? "ارسال کد با خطا مواجه شد",
          message: "ناموفق",
          type: "error",
        });
      }
    } catch (error: any) {
      showNotification({
        description: error.response?.data?.message || "خطای ناشناخته",
        message: "خطا",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/verify-otp", { email, code });

      if (response.data.success && response.data.token) {
        // ذخیره توکن در کوکی
        Cookies.set("access_token", response.data.token, {
          expires: 7, // 7 روز
          secure: true,
          sameSite: "Strict",
        });

        showNotification({
          description: "ورود موفقیت‌آمیز بود",
          message: "خوش اومدی!",
          type: "success",
        });

        window.location.href = "/";
      } else {
        showNotification({
          description: response.data.message ?? "کد اشتباه یا منقضی‌شده",
          message: "ورود ناموفق",
          type: "error",
        });
      }
    } catch (error: any) {
      showNotification({
        description: error.response?.data?.message || "خطا در ورود",
        message: "خطا",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 w-full h-dvh flex justify-center items-center">
      <div dir="rtl" className="w-[400px] rounded bg-gray-800 p-4 text-white">
        {step === "email" && (
          <div className="w-full flex flex-col gap-2">
            <h1 className="text-lg font-bold mb-2">ورود با ایمیل</h1>
            <Input
              type="email"
              placeholder="ایمیل را وارد کنید"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <button
              onClick={handleSendCode}
              className="btn btn-primary w-full mt-3"
              disabled={loading || !email}
            >
              {loading ? "در حال ارسال..." : "ارسال کد"}
            </button>
          </div>
        )}

        {step === "code" && (
          <div className="w-full flex flex-col gap-2">
            <h1 className="text-lg font-bold mb-2">
              کد ارسال‌شده را وارد کنید
            </h1>
            <Input
              type="text"
              placeholder="کد را وارد کنید"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={loading}
            />
            <button
              onClick={handleVerify}
              className="btn btn-success w-full mt-3"
              disabled={loading || !code}
            >
              {loading ? "در حال بررسی..." : "ورود"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
