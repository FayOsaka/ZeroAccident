import React from "react";
import { Link } from "react-router-dom";

// components
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Home = () => {
  // จำลองข้อมูลข่าวสารด้านความปลอดภัย
  const newsList = [
    {
      id: 1,
      title: "ประกาศนโยบายความปลอดภัยและอาชีวอนามัย ประจำปี",
      date: "1 ตุลาคม 2569",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1HkYt2BXkY6F9UcrOfqo1ajlusCCTBLkNOp63Uqa6jAA-dXQDyabOP2E&s=10",
      description:
        "ผู้บริหารประกาศนโยบาย Zero Accident อย่างเป็นทางการ มุ่งเน้นการลดความเสี่ยงในทุกพื้นที่ปฏิบัติงาน พร้อมสนับสนุนการทำงานของ จป.วิชาชีพ ในการตรวจสอบและประเมินความเสี่ยงเชิงรุก",
      category: "นโยบาย",
    },
    {
      id: 2,
      title: "สรุปผลการประเมินความเสี่ยงพื้นที่เสี่ยงสูง (High-Risk Areas)",
      date: "28 กันยายน 2569",
      image:
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600&auto=format&fit=crop",
      description:
        "รายงานผลการเดินตรวจพื้นที่ปฏิบัติงานจริง พบว่ามีการปรับปรุงพื้นที่จุดบอดและเพิ่มป้ายเตือนอันตรายครบถ้วนตามมาตรฐานที่กฎหมายกำหนดเรียบร้อยแล้ว",
      category: "รายงาน",
    },
    {
      id: 3,
      title: "กำหนดการอบรมทบทวนความรู้ การระงับเหตุฉุกเฉินเบื้องต้น",
      date: "20 กันยายน 2569",
      image:
        "https://www.jorporonline.com/wp-content/uploads/2021/05/%E0%B8%88%E0%B8%9B-%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B9%83%E0%B8%84%E0%B8%A3.jpg",
      description:
        "ขอเชิญพนักงานทุกคนเข้าร่วมการอบรมเชิงปฏิบัติการ การใช้ถังดับเพลิงและการปฐมพยาบาลเบื้องต้น เพื่อเตรียมความพร้อมรับมือเหตุการณ์ไม่คาดฝัน",
      category: "อบรม",
    },
  ];

  const getCategoryBadgeStyle = (category) => {
    switch (category) {
      case "นโยบาย":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "รายงาน":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "อบรม":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 mb-12">
        {/* Hero Section */}
        <section className="relative bg-white rounded-3xl p-8 md:p-14 shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden mt-6">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>

          <div className="flex-1 space-y-6 z-10">
            <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 font-semibold text-sm rounded-full mb-2">
              Safety First 🛡️
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight">
              ระบบจัดการความปลอดภัย <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-cyan-500">
                ZeroAccident
              </span>
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl font-medium">
              แพลตฟอร์มศูนย์กลางสำหรับติดตาม รายงาน และจัดการด้านความปลอดภัย
              อาชีวอนามัย และสภาพแวดล้อมในการทำงาน
              เพื่อเป้าหมายอุบัติเหตุเป็นศูนย์
            </p>
            <div className="pt-4">
              <Link
                to="/nearmissform"
                className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                แจ้งอุบัติการณ์ใหม่
              </Link>
            </div>
          </div>

          <div className="flex-1 hidden md:flex justify-end z-10 w-full">
            <div className="relative w-full max-w-lg aspect-video rounded-2xl shadow-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
                alt="Safety at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="py-8">
          {/* ส่วนหัว Section */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 border-b border-slate-200 pb-5 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
                <span className="w-2 h-8 bg-blue-600 rounded-full inline-block"></span>
                ข่าวสารและประกาศ
              </h2>
              <p className="text-slate-500 mt-2 ml-5 text-sm sm:text-base">
                อัปเดตข้อมูลด้านความปลอดภัย อาชีวอนามัย
                และกิจกรรมล่าสุดจากองค์กร
              </p>
            </div>
            <a
              href="#"
              className="group text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center transition-colors mb-1 ml-5 sm:ml-0"
            >
              ดูข่าวสารทั้งหมด
              <svg
                className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          {/* Grid ของข่าวสาร */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsList.map((news) => (
              <article
                key={news.id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  {/* Overlay Gradient เล็กน้อยเพื่อให้ดูมีมิติ */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>

                  {/* Category Pill */}
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold shadow-sm border ${getCategoryBadgeStyle(news.category)}`}
                  >
                    {news.category}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-xs text-slate-500 mb-3 font-medium bg-slate-50 self-start px-2.5 py-1 rounded-md">
                    <svg
                      className="w-3.5 h-3.5 mr-1.5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {news.date}
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                    <a href="#" className="focus:outline-none">
                      {/* เพิ่ม inset-0 เพื่อให้คลิกได้ทั้งการ์ด (ทางเลือก) */}
                      <span
                        className="absolute inset-0"
                        aria-hidden="true"
                      ></span>
                      {news.title}
                    </a>
                  </h3>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {news.description}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 relative z-10">
                    <span className="inline-flex items-center text-blue-600 font-bold text-sm transition-colors group-hover:text-blue-800">
                      อ่านเพิ่มเติม
                      <svg
                        className="w-4 h-4 ml-1 transform group-hover:translate-x-2 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
