import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    gmail: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // ลบข้อความแจ้งเตือนเมื่อผู้ใช้เริ่มพิมพ์ใหม่
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบข้อมูลเบื้องต้น
    if (!formData.gmail || !formData.password) {
      setError("กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน");
      return;
    }

    setIsLoading(true);

    try {
      // ส่งข้อมูลไปตรวจสอบที่ API ฝั่ง Backend
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // ล็อกอินสำเร็จ เก็บข้อมูลผู้ใช้ (รวมถึง role) ไว้ใน localStorage เพื่อใช้งานต่อ
        localStorage.setItem("user", JSON.stringify(data.user));

        // ตรวจสอบ Role เพื่อแยกหน้าการทำงาน
        if (data.user.role === "admin") {
          window.location.href = "/dashboard"; // ถ้าเป็นแอดมินไปหน้า Dashboard
        } else {
          window.location.href = "/home"; // ถ้าเป็นพนักงานทั่วไปไปหน้า Home
        }
      } else {
        // แสดงข้อความ Error จากฝั่ง Backend กรณีรหัสผ่านหรือชื่อผู้ใช้ผิด
        setError(data.error || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      }
    } catch (err) {
      setError("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
      console.error("Login request failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
        {/* Left Side - Image & Branding */}
        <div className="w-full md:w-1/2 bg-blue-700 relative flex flex-col justify-center items-center p-12 text-white overflow-hidden hidden md:flex">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="pattern-grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M0 40V0H40V40z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pattern-grid)" />
            </svg>
          </div>

          <div className="relative z-10 text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm mb-4">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h2 className="text-4xl font-bold tracking-tight">ZeroAccident</h2>
            <p className="text-blue-100 text-lg max-w-sm mx-auto font-medium">
              ระบบจัดการความปลอดภัย อาชีวอนามัย และสภาพแวดล้อมในการทำงาน
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <div className="max-w-md mx-auto">
            {/* โลโก้สำหรับแสดงบนมือถือ (จะซ่อนบนจอใหญ่) */}
            <div className="md:hidden flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">
              ยินดีต้อนรับกลับมา
            </h2>
            <p className="text-slate-500 mb-8">
              เข้าสู่ระบบเพื่อจัดการข้อมูลความปลอดภัย
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  รหัสพนักงาน / ชื่อผู้ใช้งาน
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="gmail"
                    value={formData.gmail}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="ระบุอีเมลของคุณ"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    รหัสผ่าน
                  </label>
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    ลืมรหัสผ่าน?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    กำลังเข้าสู่ระบบ...
                  </span>
                ) : (
                  "เข้าสู่ระบบ"
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-500">
              <p>
                ยังไม่มีบัญชีผู้ใช้งาน?{" "}
                <Link
                  to="/"
                  className="font-semibold text-blue-600 hover:text-blue-500"
                >
                  ติดต่อผู้ดูแลระบบ (Admin)
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
