import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/"); 
  };

  return (
    <nav className="bg-slate-900 text-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/home" className="text-2xl font-extrabold tracking-wide text-emerald-400 hover:opacity-80 transition-opacity">
              Zero<span className="text-white">Accident</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <div className="relative">
                {/* 🌟 ปรับปรุงปุ่มชื่อผู้ใช้งานให้มีพื้นหลังและ Avatar */}
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-1.5 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 shadow-sm"
                >
                  {/* Avatar วงกลม ดึงตัวอักษรแรกของชื่อมาแสดง */}
                  <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-inner">
                    {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  
                  <span className="font-medium text-sm">
                    {user.firstName} {user.lastName}
                  </span>
                  
                  <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl py-2 border border-gray-100 overflow-hidden transform origin-top-right transition-all">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-xs text-gray-500">เข้าสู่ระบบในชื่อ</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">{user.firstName} {user.lastName}</p>
                    </div>
                    <Link 
                      to="/tracking" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      ติดตามสถานะฟอร์ม
                    </Link>
                    <div className="h-px bg-gray-100 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      ออกจากระบบ
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm">
                เข้าสู่ระบบ
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none bg-slate-800 p-2 rounded-lg"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/home" className="text-gray-300 hover:bg-slate-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors">หน้าแรก</Link>
              <a href="#" className="text-gray-300 hover:bg-slate-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors">รายงานอุบัติเหตุ</a>
              <a href="#" className="text-gray-300 hover:bg-slate-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors">นโยบายความปลอดภัย</a>
              
              {/* ข้อมูลผู้ใช้สำหรับหน้าจอมือถือ */}
              <div className="border-t border-slate-700 mt-4 pt-4">
                {user ? (
                  <div className="bg-slate-800 rounded-xl p-4 mt-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-inner">
                        {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">ผู้ใช้งาน</p>
                        <p className="text-emerald-400 font-medium">{user.firstName} {user.lastName}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link 
                        to="/tracking" 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center text-gray-300 hover:text-white bg-slate-700/50 hover:bg-slate-700 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ติดตามสถานะฟอร์ม
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center text-red-400 hover:text-white hover:bg-red-600 bg-red-500/10 block px-3 py-2.5 rounded-lg text-sm font-medium w-full text-left transition-colors"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        ออกจากระบบ
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link to="/" className="bg-emerald-600 hover:bg-emerald-500 text-white block px-3 py-3 rounded-lg text-base font-medium mt-4 text-center transition-colors shadow-sm">
                    เข้าสู่ระบบ
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;