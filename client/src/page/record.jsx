import React from 'react';
import { Link } from 'react-router-dom';

const RecordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-2xl w-full border border-gray-100">
        
        {/* ส่วนที่ 1: หัวข้อการส่งฟอร์มสำเร็จ */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">ส่งรายงานสำเร็จ!</h2>
          <p className="text-gray-500">ระบบได้รับรายงาน Near Miss ของคุณเรียบร้อยแล้ว</p>
        </div>

        {/* ส่วนที่ 2: Timeline แสดงสถานะการดำเนินการ (Stepper) */}
        <div className="relative mb-12 px-2 sm:px-8">
          <div className="flex items-center justify-between">
            
            {/* Step 1: กรอกฟอร์ม (เสร็จแล้ว) */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-md border-4 border-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <span className="text-sm font-semibold text-emerald-600 mt-3">กรอกฟอร์ม</span>
            </div>

            {/* เส้นเชื่อม 1 (สีเขียว) */}
            <div className="flex-1 h-1.5 bg-emerald-500 -mt-8 mx-[-10px] sm:mx-[-15px] z-0 rounded-full"></div>

            {/* Step 2: รอดำเนินการ (กำลังดำเนินการ) */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-blue-50 ring-4 ring-white -mt-1">
                <svg className="w-7 h-7 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span className="text-sm font-bold text-blue-700 mt-2">รอดำเนินการ</span>
            </div>

            {/* เส้นเชื่อม 2 (สีเทา) */}
            <div className="flex-1 h-1.5 bg-gray-200 -mt-8 mx-[-10px] sm:mx-[-15px] z-0 rounded-full"></div>

            {/* Step 3: เสร็จสิ้น (ยังไม่ถึง) */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border-4 border-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-400 mt-3">เสร็จสิ้น</span>
            </div>
          </div>
        </div>

        {/* ส่วนที่ 3: กล่องรายละเอียดขั้นตอนต่อไป */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left mb-8 shadow-inner">
          <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            สิ่งที่จะเกิดขึ้นต่อไป
          </h3>
          <ul className="space-y-3 text-slate-600 text-sm md:text-base">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
              <span>เจ้าหน้าที่ จป. จะได้รับแจ้งเตือนและเข้ามาตรวจสอบรายละเอียดที่คุณรายงาน</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
              <span>เจ้าหน้าที่จะลงพื้นที่ตรวจสอบจุดเกิดเหตุ (Near Miss) และประเมินความเสี่ยง</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
              <span>ดำเนินการแก้ไขและปรับปรุงเพื่อป้องกันไม่ให้เกิดอุบัติเหตุซ้ำ</span>
            </li>
          </ul>
        </div>

        {/* ส่วนที่ 4: ปุ่มกด */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/home" className="w-full sm:w-auto px-8 py-3 bg-white border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-semibold transition-all text-center">
            กลับสู่หน้าหลัก
          </Link>
          {/* สามารถเปลี่ยน path เป็น URL หน้าฟอร์มของคุณได้ เช่น "/" หรือ "/form" */}
          <Link to="/nearmissform" className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-md shadow-blue-200 transition-all text-center">
            รายงานเหตุการณ์ใหม่
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default RecordPage;