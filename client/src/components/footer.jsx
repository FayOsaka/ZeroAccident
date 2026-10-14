import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 mt-auto border-t-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* ข้อมูลโปรเจกต์ */}
          <div>
            <h3 className="text-2xl font-bold mb-4 tracking-wide text-blue-400">Zero<span className="text-white">Accident</span></h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              ระบบวิเคราะห์ จัดการความปลอดภัย และลดความเสี่ยงในสถานที่ทำงาน เพื่อสนับสนุนเป้าหมายอุบัติเหตุให้เป็นศูนย์อย่างยั่งยืน
            </p>
          </div>
          
          {/* ลิงก์ที่เกี่ยวข้อง */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">ลิงก์ที่เกี่ยวข้อง</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-blue-400 transition duration-300">ประเมินความเสี่ยง (Risk Assessment)</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">รายงานการสอบสวนอุบัติเหตุ</a></li>
              <li><a href="#" className="hover:text-blue-400 transition duration-300">คู่มือการใช้งานระบบ</a></li>
            </ul>
          </div>
          
          {/* ติดต่อเรา */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">ติดต่อ</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-2">
              ฝ่ายความปลอดภัย อาชีวอนามัย และสภาพแวดล้อมในการทำงาน
            </p>
            <p className="text-gray-400 text-sm">
              อีเมล: safety@organization.com
            </p>
          </div>
        </div>
        
        {/* ลิขสิทธิ์ */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} ZeroAccident System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;