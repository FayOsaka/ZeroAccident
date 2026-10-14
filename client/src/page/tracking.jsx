import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const TrackingPage = () => {
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  // เพิ่ม State สำหรับจัดการหน้าต่างดูรูป (Modal)
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/nearmiss");
        if (response.ok) {
          const data = await response.json();
          setRecords(data);
        }
      } catch (error) {
        console.error("Error fetching records:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecords();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "เสร็จสิ้น":
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>เสร็จสิ้น</span>;
      case "ดำเนินการไม่สำเร็จ":
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>เลยกำหนดการ</span>;
      default:
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold flex items-center"><span className="w-2 h-2 rounded-full bg-yellow-500 mr-2 animate-pulse"></span>รอดำเนินการ</span>;
    }
  };

  const filteredRecords = records.filter((record) =>
    record.fullname?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">ติดตามสถานะการรายงาน</h2>
              <p className="text-slate-500 text-sm mt-1">ค้นหาจากชื่อ-นามสกุล เพื่อดูสถานะการรายงาน Near Miss ของคุณ</p>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-slate-500">กำลังโหลดข้อมูล...</p>
            </div>
          ) : filteredRecords.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRecords.map((record, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${record.status === 'เสร็จสิ้น' ? 'bg-emerald-500' : record.status === 'ดำเนินการไม่สำเร็จ' ? 'bg-red-500' : 'bg-yellow-400'}`}></div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-sm text-gray-500 font-medium">
                      📅 {new Date(record.incident_date).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    {getStatusBadge(record.status)}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
                    📍 สถานที่: {record.location} ({record.incident_scene})
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                    <span className="font-semibold text-gray-700">เหตุการณ์:</span> {record.incident_nature}
                  </p>
                  
                  {/* ปุ่มดูรูปภาพ (แสดงเฉพาะเมื่อมีไฟล์รูปภาพ) */}
                  {record.image && (
                    <button
                      onClick={() => setSelectedImage(`http://localhost:5000/uploads/${record.image}`)}
                      className="mb-4 flex items-center w-fit text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      ดูรูปภาพประกอบ
                    </button>
                  )}
                  
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      ผู้แจ้ง: <span className="font-semibold">{record.fullname}</span>
                    </span>
                    <span className="text-xs text-gray-500">
                      เวลา: {record.incident_time} น.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-900">ไม่พบข้อมูลการรายงาน</h3>
              <p className="text-gray-500 mt-1">ลองตรวจสอบการสะกดชื่อใหม่อีกครั้ง</p>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* 🌟 Modal สำหรับแสดงรูปภาพขนาดใหญ่ */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)} // กดพื้นหลังเพื่อปิด
        >
          <div 
            className="relative max-w-4xl w-full flex justify-center" 
            onClick={(e) => e.stopPropagation()} // ป้องกันการกดที่รูปแล้วปิด
          >
            {/* ปุ่มกากบาทปิด */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 md:-right-8 text-white hover:text-gray-300 focus:outline-none transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            {/* รูปภาพ */}
            <img 
              src={selectedImage} 
              alt="ภาพประกอบเหตุการณ์" 
              className="max-h-[85vh] w-auto object-contain rounded-xl shadow-2xl bg-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingPage;