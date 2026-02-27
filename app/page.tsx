"use client";

import React, { useState } from 'react';
import { Camera, UploadCloud, Users, BookOpen, ChevronRight, ShieldCheck } from 'lucide-react';
import { supabase } from '@/src/lib/supabaseClient';

export default function Home() {
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
              <div className="w-12 h-12 rounded-full border-2 border-amber-400 flex items-center justify-center bg-slate-800 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <ShieldCheck className="text-amber-400 w-7 h-7" />
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
        <ShieldCheck className="text-amber-500/50 w-12 h-12 mx-auto mb-4" />
        <h2 className="text-lg font-semibold text-amber-400 mb-2">มูลนิธิศิษย์นายร้อย ตามรอยพระบาท</h2>
        <p className="text-sm text-slate-500">เกียรติยศ วินัย กล้าหาญ</p>
        <p className="text-xs text-slate-600 mt-8">© 2026 Foundation System. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Component: หน้าแรก (เน้นความยิ่งใหญ่)
function HomeView({ theme, setActiveTab }: any) {
  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 opacity-90 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <ShieldCheck className="w-24 h-24 text-amber-400 mx-auto mb-8 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            สืบสานปณิธาน <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300">
              ตามรอยพระบาท
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            ศูนย์รวมความศรัทธาและพลังแห่งศิษย์นายร้อย เพื่อสร้างสรรค์สังคมและสืบทอดเจตนารมณ์อันสูงส่ง ด้วยความจงรักภักดี
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setActiveTab('register')}
              className="px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded-sm text-lg hover:bg-amber-400 hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] transition-all flex items-center justify-center gap-2"
            >
              ร่วมเป็นส่วนหนึ่งของเรา <ChevronRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 border border-amber-500/50 text-amber-400 font-bold rounded-sm text-lg hover:bg-amber-500/10 transition-all">
              อ่านประวัติมูลนิธิ
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-y border-amber-500/20 bg-slate-900/50 py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <Users className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-white mb-2">30,000+</div>
            <div className="text-amber-500/80 tracking-wider">สมาชิกเครือข่าย</div>
          </div>
          <div className="p-6">
            <BookOpen className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-white mb-2">150+</div>
            <div className="text-amber-500/80 tracking-wider">โครงการเพื่อสังคม</div>
          </div>
          <div className="p-6">
            <ShieldCheck className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <div className="text-4xl font-bold text-white mb-2">100%</div>
            <div className="text-amber-500/80 tracking-wider">ความทุ่มเทเพื่อชาติ</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component: หน้าลงทะเบียน
function RegisterView({ theme }: any) {
  const [rank, setRank] = useState('');
  const [fullName, setFullName] = useState('');
  const [classNum, setClassNum] = useState('');
  const [phone, setPhone] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let photoUrl = '';
      let documentUrl = '';

      // อัปโหลดรูปภาพ (ถ้ามี)
      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `photo_${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('member-files')
          .upload(fileName, photoFile, { contentType: photoFile.type || 'image/jpeg', cacheControl: '3600', upsert: false });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('member-files')
          .getPublicUrl(fileName);
          
        photoUrl = publicUrlData.publicUrl;
      }

      // อัปโหลดไฟล์ประวัติ (ถ้ามี)
      if (documentFile) {
        const fileExt = documentFile.name.split('.').pop();
        const fileName = `doc_${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('member-files')
          .upload(fileName, documentFile, { contentType: 'application/pdf', cacheControl: '3600', upsert: false });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('member-files')
          .getPublicUrl(fileName);
          
        documentUrl = publicUrlData.publicUrl;
      }

      // บันทึกข้อมูลข้อความและ URL ลงในตาราง members
      const { error } = await supabase
        .from('members')
        .insert([
          {
            rank: rank,
            full_name: fullName,
            generation: classNum,
            phone: phone,
            ...(photoUrl && { photo_url: photoUrl }),
            ...(documentUrl && { document_url: documentUrl })
          }
        ]);

      if (error) throw error;

      alert('บันทึกข้อมูลและอัปโหลดไฟล์สำเร็จ!');
      
      // เคลียร์ฟอร์ม
      setRank('');
      setFullName('');
      setClassNum('');
      setPhone('');
      setPhotoFile(null);
      setDocumentFile(null);
    } catch (error: any) {
      console.error('Error inserting data:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-amber-400 mb-4">ระบบขึ้นทะเบียนสมาชิก</h2>
        <p className="text-slate-400">กรอกข้อมูลส่วนตัว ถ่ายรูป และแนบไฟล์ประวัติเพื่อบันทึกเข้าสู่ฐานข้อมูลมูลนิธิ</p>
      </div>

      <div className="bg-slate-800/50 border border-amber-500/30 rounded-xl p-8 shadow-2xl backdrop-blur-sm">
        <form className="space-y-8" onSubmit={handleSubmit}>
          
          <div className="flex flex-col items-center justify-center pb-6 border-b border-slate-700">
            <div className="w-32 h-32 rounded-full border-2 border-dashed border-amber-500/50 flex flex-col items-center justify-center bg-slate-900 text-slate-400 hover:text-amber-400 hover:border-amber-400 transition-colors cursor-pointer relative overflow-hidden group">
               {photoFile ? (
                 <img src={URL.createObjectURL(photoFile)} alt="Preview" className="w-full h-full object-cover" />
               ) : (
                 <>
                   <Camera className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                   <span className="text-xs text-center px-2">ถ่ายรูป / อัปโหลด</span>
                 </>
               )}
               <input 
                 type="file" 
                 accept="image/*" 
                 onChange={(e) => {
                   if (e.target.files && e.target.files[0]) {
                     setPhotoFile(e.target.files[0]);
                   }
                 }}
                 className="absolute inset-0 opacity-0 cursor-pointer" 
               />
            </div>
            <p className="text-xs text-slate-500 mt-4">รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-amber-500/80">ยศ / คำนำหน้า</label>
              <input 
                type="text" 
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" 
                placeholder="เช่น พล.ต., ร.อ., นาย" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-amber-500/80">ชื่อ - นามสกุล</label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-amber-500/80">รุ่น (ถ้ามี)</label>
              <input 
                type="text" 
                value={classNum}
                onChange={(e) => setClassNum(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" 
                placeholder="เช่น รุ่นที่ 10" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-amber-500/80">เบอร์โทรศัพท์</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all" 
              />
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-700">
            <label className="text-sm font-medium text-amber-500/80">อัปโหลดไฟล์ประวัติ (PDF, DOCX)</label>
            <div className={`w-full border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center transition-colors cursor-pointer relative ${documentFile ? 'border-amber-500/50 bg-slate-900' : 'border-slate-600 bg-slate-900/50 hover:bg-slate-900'}`}>
              <UploadCloud className={`w-10 h-10 mb-3 ${documentFile ? 'text-amber-400' : 'text-slate-400'}`} />
              <p className={`text-sm text-center ${documentFile ? 'text-amber-400 font-medium' : 'text-slate-300'}`}>
                {documentFile ? `ไฟล์ที่เลือก: ${documentFile.name}` : 'คลิก หรือ ลากไฟล์ประวัติมาวางที่นี่'}
              </p>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setDocumentFile(e.target.files[0]);
                  }
                }}
                className="absolute inset-0 opacity-0 cursor-pointer" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-4 bg-gradient-to-r from-amber-600 to-amber-400 text-slate-900 font-bold rounded-md text-lg hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'กำลังอัปโหลดข้อมูล...' : 'บันทึกข้อมูลเข้าสู่ระบบ'}
          </button>

        </form>
      </div>
    </div>
  );
}