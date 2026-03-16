"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, UploadCloud, Users, BookOpen, ChevronRight, ShieldCheck, KeyRound } from 'lucide-react';
import { supabase } from '@/src/lib/supabaseClient';

export default function Page() {
  const [activeTab, setActiveTab] = useState('home');

  // สีกรมท่า (Navy) และ สีทอง (Gold) สำหรับความสง่างาม
  const theme = {
    primary: 'bg-slate-900',
    secondary: 'bg-amber-500',
    textGold: 'text-amber-400',
    borderGold: 'border-amber-400',
  };

  return (
    <div className={`min-h-screen ${theme.primary} text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-900`}>
      {/* Navigation Bar */}
      <nav className="border-b border-amber-500/30 bg-slate-900/90 backdrop-blur-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-12 h-12 rounded-full border-2 border-amber-400 flex items-center justify-center bg-slate-800 overflow-hidden shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <Image
                  src="/my-logo-minimal.png"
                  alt="Cadet Foundation Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-wider text-amber-400">มูลนิธิศิษย์นายร้อย</h1>
                <p className="text-xs text-slate-300 tracking-widest">ตามรอยพระบาท</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => setActiveTab('home')} className={`hover:text-amber-400 transition-colors ${activeTab === 'home' ? 'text-amber-400 border-b-2 border-amber-400 pb-1' : ''}`}>หน้าแรก</button>
              <button className="hover:text-amber-400 transition-colors">ข่าวประชาสัมพันธ์</button>
              <button className="hover:text-amber-400 transition-colors">ทำเนียบสมาชิก</button>
              <button onClick={() => setActiveTab('register')} className={`px-6 py-2 rounded-md bg-gradient-to-r from-amber-600 to-amber-400 text-slate-900 font-bold hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] transition-all ${activeTab === 'register' ? 'ring-2 ring-white' : ''}`}>
                ลงทะเบียนสมาชิก
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="pt-20">
        {activeTab === 'home' ? <HomeView theme={theme} setActiveTab={setActiveTab} /> : <RegisterView theme={theme} />}
      </div>

      {/* Footer */}
      <footer className="border-t border-amber-500/20 bg-slate-950 py-12 text-center mt-20">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full border-2 border-amber-400 flex items-center justify-center bg-slate-900 overflow-hidden shadow-[0_0_20px_rgba(251,191,36,0.4)]">
          <Image
            src="/my-logo-minimal.png"
            alt="Cadet Foundation Logo"
            width={44}
            height={44}
            className="object-contain"
          />
        </div>
        <h2 className="text-lg font-semibold text-amber-400 mb-2">มูลนิธิศิษย์นายร้อย ตามรอยพระบาท</h2>
        <p className="text-sm text-slate-500">เกียรติยศ วินัย กล้าหาญ</p>
        <p className="text-xs text-slate-600 mt-8">© 2026 Foundation System. All rights reserved.</p>

        {/* Admin hint link */}
        <button
          type="button"
          onClick={() => { window.location.href = "/admin"; }}
          className="mt-4 mx-auto flex items-center justify-center gap-2 text-[11px] text-slate-500/70 hover:text-slate-300 transition-colors"
        >
          <KeyRound className="w-3 h-3" />
          <span>สำหรับเจ้าหน้าที่ (Admin)</span>
        </button>
      </footer>
    </div>
  );
}

// Component: หน้าแรก (ใช้รูปแบคกราวด์จริง)
function HomeView({ theme, setActiveTab }: any) {
  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* รูปแบคกราวด์ที่กัปตันอัปโหลด (ชื่อไฟล์ต้องตรงกับในโฟลเดอร์ public) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ 
            backgroundImage: "url('/bg-cadet.jpg')",
          }}
        >
          {/* แผ่นฟิล์มสีกรมท่าจางๆ ทับรูปเพื่อให้ตัวหนังสืออ่านง่าย */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full border-4 border-amber-400 bg-slate-900/70 flex items-center justify-center shadow-[0_0_40px_rgba(251,191,36,0.9)] overflow-hidden">
            <Image
              src="/my-logo-minimal.png"
              alt="Cadet Foundation Logo"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
            สืบสานปณิธาน <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
              ตามรอยพระบาท
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-100 mb-10 max-w-2xl mx-auto leading-relaxed font-light drop-shadow">
            ศูนย์รวมความศรัทธาและพลังแห่งศิษย์นายร้อย เพื่อสร้างสรรค์สังคมและสืบทอดเจตนารมณ์อันสูงส่ง ด้วยความจงรักภักดี
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setActiveTab('register')}
              className="px-10 py-4 bg-amber-500 text-slate-900 font-black rounded-sm text-lg hover:bg-amber-400 hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
            >
              ร่วมเป็นส่วนหนึ่งของเรา <ChevronRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-4 border-2 border-amber-500 text-amber-400 font-bold rounded-sm text-lg hover:bg-amber-500 hover:text-slate-900 transition-all backdrop-blur-sm">
              อ่านประวัติมูลนิธิ
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-y border-amber-500/20 bg-slate-900/80 backdrop-blur-lg py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="group p-6 hover:bg-amber-500/5 rounded-xl transition-colors">
            <Users className="w-12 h-12 text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <div className="text-4xl font-bold text-white mb-2">30,000+</div>
            <div className="text-amber-500/80 tracking-wider font-medium">สมาชิกเครือข่าย</div>
          </div>
          <div className="group p-6 hover:bg-amber-500/5 rounded-xl transition-colors">
            <BookOpen className="w-12 h-12 text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <div className="text-4xl font-bold text-white mb-2">150+</div>
            <div className="text-amber-500/80 tracking-wider font-medium">โครงการเพื่อสังคม</div>
          </div>
          <div className="group p-6 hover:bg-amber-500/5 rounded-xl transition-colors">
            <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <div className="text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-amber-500/80 tracking-wider font-medium">ความทุ่มเทเพื่อชาติ</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component: หน้าลงทะเบียน
function RegisterView({ theme }: any) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-amber-400 mb-4">ระบบขึ้นทะเบียนสมาชิก</h2>
        <p className="text-slate-400">กรอกข้อมูลส่วนตัว ถ่ายรูป และแนบไฟล์ประวัติเพื่อบันทึกเข้าสู่ฐานข้อมูลมูลนิธิ</p>
      </div>

      <div className="bg-slate-800/50 border border-amber-500/30 rounded-xl p-8 shadow-2xl backdrop-blur-sm">
        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          
          <div className="flex flex-col items-center justify-center pb-6 border-b border-slate-700">
            <div className="w-32 h-32 rounded-full border-2 border-dashed border-amber-500/50 flex flex-col items-center justify-center bg-slate-900 text-slate-400 hover:text-amber-400 hover:border-amber-400 transition-colors cursor-pointer relative overflow-hidden group">
               <Camera className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
               <span className="text-xs">ถ่ายรูป / อัปโหลด</span>
               <input type="file" accept="image/*" capture="user" className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
            <p className="text-xs text-slate-500 mt-4">รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-amber-500/80">ยศ / คำนำหน้า</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" placeholder="เช่น พล.ต., ร.อ., นาย" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-amber-500/80">ชื่อ - นามสกุล</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-amber-500/80">รุ่น (ถ้ามี)</label>
              <input type="text" className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" placeholder="เช่น รุ่นที่ 10" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-amber-500/80">เบอร์โทรศัพท์</label>
              <input type="tel" className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" />
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-700">
            <label className="text-sm font-medium text-amber-500/80">อัปโหลดไฟล์ประวัติ (PDF, DOCX)</label>
            <div className="w-full border-2 border-dashed border-slate-600 rounded-md p-8 flex flex-col items-center justify-center bg-slate-900/50 hover:bg-slate-900 transition-colors cursor-pointer relative">
              <UploadCloud className="w-10 h-10 text-slate-400 mb-3" />
              <p className="text-sm text-slate-300">คลิก หรือ ลากไฟล์ประวัติมาวางที่นี่</p>
              <input type="file" accept=".pdf,.doc,.docx" className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-400 text-slate-900 font-bold rounded-md text-lg hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all">
            บันทึกข้อมูลเข้าสู่ระบบ
          </button>

        </form>
      </div>
    </div>
  );
}