import React, { useState, useEffect } from "react";
import NavbarAdmin from "../components/navbaradmin";
import Footer from "../components/footer";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const DashboardPage = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  // สีสำหรับกราฟวงกลมสถานะ (เปลี่ยนคีย์เป็น เลยกำหนดการ)
  const COLORS = {
    "เสร็จสิ้น": "#10b981", // emerald-500
    "รอดำเนินการ": "#eab308", // yellow-500
    "เลยกำหนดการ": "#ef4444" // red-500
  };

  const fetchRecords = async () => {
    try {
      // const response = await fetch("http://localhost:5000/api/nearmiss");
      const response = await fetch(`${API_URL}/api/nearmiss`);
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

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    if (!window.confirm(`ยืนยันการเปลี่ยนสถานะเป็น "${newStatus}" ใช่หรือไม่?`)) return;

    try {
      // const response = await fetch(`http://localhost:5000/api/nearmiss/${id}/status`
      const response = await fetch(`${API_URL}/api/nearmiss/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        alert("อัปเดตสถานะเรียบร้อยแล้ว");
        fetchRecords(); 
      } else {
        alert("เกิดข้อผิดพลาดในการอัปเดต");
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  // --- ฟังก์ชันคำนวณวันเกินกำหนด (เกิน 7 วัน) ---
  const checkIsOverdue = (dateString) => {
    if (!dateString) return false;
    const today = new Date();
    // หมายเหตุ: ใช้ incident_date ในการคำนวณ หากในฐานข้อมูลมีฟิลด์วันที่ส่ง (เช่น created_at) แนะนำให้เปลี่ยนมาใช้ created_at แทน
    const targetDate = new Date(dateString); 
    const diffTime = today - targetDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 7;
  };

  // --- สร้างชุดข้อมูลใหม่ที่คำนวณ "เลยกำหนดการ" แล้ว สำหรับนำไปวาดกราฟและตาราง ---
  const processedRecords = records.map(record => {
    const isOverdue = checkIsOverdue(record.incident_date);
    // ถ้าสถานะไม่ใช่เสร็จสิ้น และเลยกำหนด 7 วัน ให้โชว์ว่า 'เลยกำหนดการ'
    const displayStatus = (record.status !== 'เสร็จสิ้น' && isOverdue) 
      ? 'เลยกำหนดการ' 
      : record.status;
    
    return { ...record, displayStatus };
  });

  // --- การคำนวณข้อมูลสถิติ (ใช้ processedRecords) ---
  const locationData = Object.values(processedRecords.reduce((acc, curr) => {
    acc[curr.location] = acc[curr.location] || { name: curr.location, count: 0 };
    acc[curr.location].count += 1;
    return acc;
  }, {}));

  const statusData = Object.values(processedRecords.reduce((acc, curr) => {
    acc[curr.displayStatus] = acc[curr.displayStatus] || { name: curr.displayStatus, value: 0 };
    acc[curr.displayStatus].value += 1;
    return acc;
  }, {}));

  const totalRecords = processedRecords.length;
  const pendingCount = processedRecords.filter(r => r.displayStatus === "รอดำเนินการ").length;
  const completedCount = processedRecords.filter(r => r.displayStatus === "เสร็จสิ้น").length;
  const overdueCount = processedRecords.filter(r => r.displayStatus === "เลยกำหนดการ").length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavbarAdmin />

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* ส่วนหัวเรื่อง */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-slate-800">Dashboard</h1>
                <p className="text-slate-500 mt-1 text-sm">ระบบจัดการและติดตามการรายงาน Near Miss</p>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-slate-500 font-medium">กำลังดึงข้อมูล...</p>
            </div>
          ) : (
            <>
              {/* โซน Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">รายงานทั้งหมด</p>
                    <p className="text-3xl font-bold text-slate-800 mt-1">{totalRecords}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">รอดำเนินการ</p>
                    <p className="text-3xl font-bold text-yellow-600 mt-1">{pendingCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">เสร็จสิ้นแล้ว</p>
                    <p className="text-3xl font-bold text-emerald-600 mt-1">{completedCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-sm font-semibold text-gray-500">เลยกำหนดการ</p>
                    <p className="text-3xl font-bold text-red-600 mt-1">{overdueCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </div>
                </div>
              </div>

              {/* โซนกราฟสถิติ */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* กราฟสถานที่เกิดเหตุ */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                    สถิติการเกิดเหตุแยกตามอาคาร
                  </h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={locationData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                        <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                        <ChartTooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} name="จำนวนเหตุการณ์" barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* กราฟภาพรวมสถานะ */}
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                    <span className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></span>
                    ภาพรวมสถานะการดำเนินการ
                  </h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {statusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#94a3b8'} stroke="none" />
                          ))}
                        </Pie>
                        <ChartTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Legend verticalAlign="bottom" height={36} iconType="circle" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* โซนตารางข้อมูลรายการ */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-slate-800 to-slate-900 text-white flex justify-between items-center">
                  <h3 className="text-lg font-bold flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
                    รายการแจ้งเหตุทั้งหมด
                  </h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">วันที่ / เวลา</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">ผู้แจ้ง / แผนก</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">สถานที่เกิดเหตุ</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">เหตุการณ์ / สาเหตุ</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">หลักฐาน</th>
                        <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">จัดการสถานะ</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {processedRecords.map((record) => (
                        <tr key={record.id} className="hover:bg-blue-50/50 transition-colors group">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                            <div className="font-semibold text-slate-800">{new Date(record.incident_date).toLocaleDateString('th-TH')}</div>
                            <div className="text-slate-500 text-xs flex items-center mt-1">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                              {record.incident_time} น.
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="font-bold text-slate-800 whitespace-nowrap">{record.fullname}</div>
                            <div className="text-xs text-slate-500 whitespace-nowrap">{record.division}</div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-1 whitespace-nowrap">
                              {record.location}
                            </span>
                            <div className="text-xs text-slate-600 line-clamp-2 min-w-[150px]">{record.incident_scene}</div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="font-medium text-slate-800 line-clamp-1 min-w-[150px]" title={record.incident_nature}>{record.incident_nature}</div>
                            <div className="text-xs text-red-500 mt-1 flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                              {record.cause_type}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                            {record.image ? (
                              <button 
                                // onClick={() => setSelectedImage(`http://localhost:5000/uploads/${record.image}`)}
                                onClick={() => setSelectedImage(`${API_URL}/uploads/${record.image}`)}
                                className="inline-flex items-center justify-center px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold transition-colors border border-blue-200"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                ดูรูปภาพ
                              </button>
                            ) : (
                              <span className="inline-flex items-center justify-center px-3 py-1.5 bg-slate-50 text-slate-400 rounded-lg text-xs font-medium border border-slate-200">
                                ไม่มีรูป
                              </span>
                            )}
                          </td>
                          
                          {/* จัดการสถานะตามเงื่อนไขที่กำหนด */}
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {(() => {
                              // 1. ถ้าเป็น "เสร็จสิ้น" ให้ล็อก Dropdown ไปเลย
                              if (record.displayStatus === 'เสร็จสิ้น') {
                                return (
                                  <select
                                    value="เสร็จสิ้น"
                                    disabled
                                    className="text-sm rounded-xl px-4 py-2 font-bold border outline-none cursor-not-allowed bg-emerald-50 text-emerald-700 border-emerald-300 opacity-80"
                                  >
                                    <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                                  </select>
                                );
                              }

                              // 2. ถ้าเป็น "เลยกำหนดการ" บังคับเปลี่ยนได้แค่ "เสร็จสิ้น"
                              if (record.displayStatus === 'เลยกำหนดการ') {
                                return (
                                  <select
                                    value="เลยกำหนดการ"
                                    onChange={(e) => {
                                      if (e.target.value === 'เสร็จสิ้น') {
                                        handleUpdateStatus(record.id, 'เสร็จสิ้น');
                                      }
                                    }}
                                    className="text-sm rounded-xl px-4 py-2 font-bold border outline-none cursor-pointer shadow-sm transition-colors bg-red-50 text-red-700 border-red-300 hover:bg-red-100"
                                  >
                                    <option value="เลยกำหนดการ" disabled>เลยกำหนดการ</option>
                                    <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                                  </select>
                                );
                              }

                              // 3. ถ้ารอดำเนินการปกติ ไม่เกิน 7 วัน
                              return (
                                <select
                                  value={record.status}
                                  onChange={(e) => handleUpdateStatus(record.id, e.target.value)}
                                  className="text-sm rounded-xl px-4 py-2 font-bold border outline-none cursor-pointer shadow-sm transition-colors bg-yellow-50 text-yellow-700 border-yellow-300 hover:bg-yellow-100"
                                >
                                  <option value="รอดำเนินการ">รอดำเนินการ</option>
                                  <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                                </select>
                              );
                            })()}
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />

      {/* Modal ดูรูป */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-4xl flex justify-center" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <img src={selectedImage} alt="หลักฐาน" className="max-h-[85vh] rounded-xl shadow-2xl bg-white object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;