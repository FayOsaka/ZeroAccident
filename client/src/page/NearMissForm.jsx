import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import ไว้ถูกต้องแล้ว

// components
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const NearMissForm = () => {
  // 1. เพิ่มบรรทัดนี้เพื่อเปิดใช้งานฟังก์ชันเปลี่ยนหน้า
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // ส่วนที่ 1: ข้อมูลส่วนตัว
    fullname: "",
    age: "",
    gender: "",
    division: "",
    position: "",
    work_time: "",

    // ส่วนที่ 2: ข้อมูลเหตุการณ์ Near Miss
    incident_date: "",
    incident_time: "",
    location: "",
    incident_scene: "",
    incident_nature: "",
    cause_type: "",
    cause_detail: "",

    // ส่วนที่ 3: การแก้ไขและข้อเสนอแนะ
    immediate_action: "",
    preventive_measures: "",
  });

  // แยก State สำหรับเก็บไฟล์รูปภาพ และชื่อไฟล์
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      if (files && files[0]) {
        setImageFile(files[0]);
        setFileName(files[0].name);
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const dataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        dataToSend.append(key, formData[key]);
      });

      if (imageFile) {
        dataToSend.append("image", imageFile);
      }

      const response = await fetch("http://localhost:5000/api/nearmiss", {
        method: "POST",
        body: dataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        alert("บันทึกข้อมูลการสอบสวน Near Miss เรียบร้อยแล้ว!");
        handleReset();
        // 2. เพิ่มคำสั่งเปลี่ยนหน้าไปที่ route /record ตรงนี้
        navigate("/record");
      } else {
        alert(result.error || "เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    } catch (err) {
      console.error("Submit Near Miss Error:", err);
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullname: "",
      age: "",
      gender: "",
      division: "",
      rank: "",
      work_time: "",
      incident_date: "",
      incident_time: "",
      location: "",
      incident_scene: "",
      incident_nature: "",
      cause_type: "",
      cause_detail: "",
      immediate_action: "",
      preventive_measures: "",
    });
    setImageFile(null);
    setFileName("");
  };

  const inputClass =
    "w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-8 md:px-10 text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold flex items-center">
                <svg
                  className="w-8 h-8 mr-3 text-blue-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                แบบฟอร์มรายงานและสอบสวน Near Miss
              </h2>
              <p className="text-blue-100 mt-2 ml-11 text-sm md:text-base">
                กรุณากรอกข้อมูลให้ครบถ้วนเพื่อนำไปวิเคราะห์และป้องกันการเกิดอุบัติเหตุซ้ำ
              </p>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* ================= ส่วนที่ 1: ประวัติส่วนตัว ================= */}
              <div className="bg-slate-50 p-6 md:p-8 rounded-xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center border-l-4 border-blue-600 pl-4">
                  ส่วนที่ 1: ข้อมูลผู้ประสบเหตุ / ผู้รายงาน
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ชื่อ-นามสกุล <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="ระบุชื่อและนามสกุล"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      อายุ (ปี) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min="18"
                      max="100"
                      className={inputClass}
                      placeholder="เช่น 25"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      เพศ <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">-- เลือกเพศ --</option>
                      <option value="ชาย">ชาย</option>
                      <option value="หญิง">หญิง</option>
                    </select>
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      แผนก / คณะ <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="division"
                      value={formData.division}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">-- เลือกแผนก --</option>
                      <option value="ภาควิชาการศึกษาทั่วไป">
                        ภาควิชาการศึกษาทั่วไป
                      </option>
                      <option value="ภาควิชาปฏิบัติการฉุกเฉินการแพทย์ (VIP)">
                        ภาควิชาปฏิบัติการฉุกเฉินการแพทย์ (VIP)
                      </option>
                      <option value="ภาควิชาสาธารณภัย (DNT)">
                        ภาควิชาสาธารณภัย (DNT)
                      </option>
                      <option value="ภาควิชาเทคโนโลยีและเครื่องมือแพทย์ (MIORT)">
                        ภาควิชาเทคโนโลยีและเครื่องมือแพทย์ (MIORT)
                      </option>
                      <option value="ภาควิชาอาชีวอนามัยและความปลอดภัยในสถานพยาบาล (OHHS)">
                        ภาควิชาอาชีวอนามัยและความปลอดภัยในสถานพยาบาล (OHHS)
                      </option>
                      <option value="ฝ่ายบริหารทั่วไป">ฝ่ายบริหารทั่วไป</option>
                      <option value="ฝ่ายกิจการนักศึกษา">
                        ฝ่ายกิจการนักศึกษา
                      </option>
                      <option value="ฝ่ายเทคโนโลยีสารสนเทศ">
                        ฝ่ายเทคโนโลยีสารสนเทศ
                      </option>
                      <option value="ฝ่ายทรัพยากรมนุษย์">
                        ฝ่ายทรัพยากรมนุษย์
                      </option>
                      <option value="ฝ่ายทะเบียนและประมวลผล">
                        ฝ่ายทะเบียนและประมวลผล
                      </option>
                      <option value="ฝ่ายวิชาการ">ฝ่ายวิชาการ</option>
                      <option value="ฝ่ายหอสมุดกลาง">ฝ่ายหอสมุดกลาง</option>
                      <option value="ฝ่ายบริหารงานก่อสร้างบำรุงรักษาอาคารและพัสดุกลาง">
                        ฝ่ายบริหารงานก่อสร้างบำรุงรักษาอาคารและพัสดุกลาง
                      </option>
                    </select>
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ตำแหน่ง <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">-- เลือกตำแหน่ง --</option>
                      <option value="หัวหน้าแผนก">หัวหน้าแผนก</option>
                      <option value="รองหัวหน้าแผนก">รองหัวหน้าแผนก</option>
                      <option value="ช่าง">ช่าง</option>
                      <option value="พนักงานทำความสะอาด">
                        พนักงานทำความสะอาด
                      </option>
                      <option value="พนักงานทั่วไป">พนักงานทั่วไป</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ช่วงเวลาการทำงาน <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="work_time"
                      value={formData.work_time}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">-- เลือกช่วงเวลา --</option>
                      <option value="06.00 - 16.00">06.00 - 16.00</option>
                      <option value="07.00 - 17.00">07.00 - 17.00</option>
                      <option value="07.00 - 19.00">07.00 - 19.00</option>
                      <option value="08.00 - 16.00">08.00 - 16.00</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ================= ส่วนที่ 2: ข้อมูลเหตุการณ์ Near Miss ================= */}
              <div className="bg-slate-50 p-6 md:p-8 rounded-xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center border-l-4 border-blue-600 pl-4">
                  ส่วนที่ 2: ข้อมูลการสอบสวนเหตุการณ์ (Near Miss)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="block cursor-pointer">
                    <span className="block text-sm font-semibold text-gray-700 mb-2">
                      วันที่เกิดเหตุ <span className="text-red-500">*</span>
                    </span>

                    <input
                      type="date"
                      name="incident_date"
                      value={formData.incident_date}
                      onChange={handleChange}
                      required
                      onClick={(e) =>
                        e.target.showPicker && e.target.showPicker()
                      }
                      className={`${inputClass} cursor-pointer`}
                    />
                  </label>

                  <label className="block cursor-pointer">
                    <span className="block text-sm font-semibold text-gray-700 mb-2">
                      เวลาที่เกิดเหตุ <span className="text-red-500">*</span>
                    </span>

                    <input
                      type="time"
                      name="incident_time"
                      value={formData.incident_time}
                      onChange={handleChange}
                      required
                      onClick={(e) =>
                        e.target.showPicker && e.target.showPicker()
                      }
                      className={`${inputClass} cursor-pointer`}
                    />
                  </label>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      สถานที่ (อาคาร) <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">-- เลือกอาคาร --</option>
                      <option value="ตึก TWP">ตึก TWP</option>
                      <option value="ตึก KSS">ตึก KSS</option>
                      <option value="พระตำหนักกรมหมื่นทิวากรวงศ์ประวัติ">
                        พระตำหนักกรมหมื่นทิวากรวงศ์ประวัติ
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      บริเวณที่เกิดเหตุ (ระบุให้ชัดเจน){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="incident_scene"
                      value={formData.incident_scene}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="เช่น บันไดชั้น 2, หน้าห้องน้ำชาย"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      เกิด Near Miss อะไรขึ้น? (ลักษณะเหตุการณ์){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="incident_nature"
                      value={formData.incident_nature}
                      onChange={handleChange}
                      rows="3"
                      required
                      className={`${inputClass} resize-none`}
                      placeholder="อธิบายลำดับเหตุการณ์ที่เกือบทำให้เกิดอุบัติเหตุ..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ประเภทของปัจจัยเหตุ (Root Cause){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="cause_type"
                      value={formData.cause_type}
                      onChange={handleChange}
                      required
                      className={inputClass}
                    >
                      <option value="">-- เลือกประเภทปัจจัยเหตุ --</option>
                      <option value="การกระทำไม่ปลอดภัย">
                        การกระทำไม่ปลอดภัย
                      </option>
                      <option value="สภาพแวดล้อมไม่ปลอดภัย">
                        สภาพแวดล้อมไม่ปลอดภัย
                      </option>
                      <option value="เหตุสุดวิสัย / ภัยธรรมชาติ">
                        เหตุสุดวิสัย / ภัยธรรมชาติ
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      รายละเอียดปัจจัยเหตุ{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="cause_detail"
                      value={formData.cause_detail}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="เช่น น้ำหกบนพื้นไม่มีป้ายเตือน, ไม่สวมอุปกรณ์ป้องกัน"
                    />
                  </div>
                </div>
              </div>

              {/* ================= ส่วนที่ 3: การแก้ไขและข้อเสนอแนะ ================= */}
              <div className="bg-slate-50 p-6 md:p-8 rounded-xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center border-l-4 border-blue-600 pl-4">
                  ส่วนที่ 3: การแก้ไขเบื้องต้นและข้อเสนอแนะ
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      การดำเนินการแก้ไขเบื้องต้นทันที (Immediate Action){" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="immediate_action"
                      value={formData.immediate_action}
                      onChange={handleChange}
                      rows="2"
                      required
                      className={`${inputClass} resize-none`}
                      placeholder="เช่น ทำความสะอาดพื้นทันที, นำกรวยมาตั้งเตือน"
                    ></textarea>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ข้อเสนอแนะเพื่อป้องกันการเกิดซ้ำ (Preventive Measures)
                    </label>
                    <textarea
                      name="preventive_measures"
                      value={formData.preventive_measures}
                      onChange={handleChange}
                      rows="2"
                      className={`${inputClass} resize-none`}
                      placeholder="เช่น ควรมีแม่บ้านตรวจเช็คทุก 1 ชั่วโมง, เพิ่มแสงสว่างในจุดดังกล่าว"
                    ></textarea>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      แนบรูปภาพสถานที่เกิดเหตุ (ถ้ามี)
                    </label>
                    <label className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl bg-white hover:bg-slate-50 transition-colors cursor-pointer w-full">
                      <div className="space-y-1 text-center w-full">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>

                        <div className="flex flex-col items-center text-sm text-gray-600 justify-center mt-2">
                          {/* เปลี่ยนจาก label เป็น span ธรรมดา เพราะกรอบนอกสุดเป็น label แล้ว */}
                          <span className="font-medium text-blue-600 hover:text-blue-500">
                            คลิกเพื่ออัปโหลดไฟล์รูปภาพ
                          </span>

                          {/* Input ไฟล์ยังคงซ่อนไว้เหมือนเดิม (sr-only) */}
                          <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="sr-only"
                          />

                          {/* แสดงชื่อไฟล์เมื่อเลือกรูปแล้ว */}
                          {fileName && (
                            <p className="mt-3 text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full">
                              📁 {fileName}
                            </p>
                          )}
                        </div>

                        <p className="text-xs text-gray-500 mt-2">
                          PNG, JPG, GIF ขนาดไม่เกิน 10MB
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* ปุ่ม Submit */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 border-2 border-slate-200 text-slate-600 rounded-xl hover:bg-slate-100 font-semibold transition duration-200 text-center"
                  disabled={isLoading}
                >
                  ล้างข้อมูล
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-8 py-3 rounded-xl font-bold shadow-lg transition duration-200 flex items-center justify-center ${
                    isLoading
                      ? "bg-gray-400 text-gray-100 cursor-not-allowed shadow-none"
                      : "bg-blue-700 text-white hover:bg-blue-800 shadow-blue-200"
                  }`}
                >
                  {isLoading ? (
                    <>
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
                      กำลังบันทึก...
                    </>
                  ) : (
                    "บันทึกรายงาน Near Miss"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NearMissForm;
