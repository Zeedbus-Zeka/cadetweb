"use client";

import React, { useEffect, useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { supabase } from '@/src/lib/supabaseClient';
import { ShieldCheck, FileText, Image as ImageIcon, Loader2, Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';

// Theme colors
const theme = {
  primary: 'bg-slate-900',
  secondary: 'bg-amber-500',
  textGold: 'text-amber-400',
  borderGold: 'border-amber-400',
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 20;

  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return members;
    const q = searchQuery.toLowerCase().trim();
    return members.filter(
      (m) =>
        (m.full_name?.toLowerCase().includes(q)) ||
        (m.phone?.includes(q) || m.phone?.replace(/\s/g, '').includes(q))
    );
  }, [members, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / ITEMS_PER_PAGE));
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMembers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMembers, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchMembers();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin1234') {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('รหัสผ่านไม่ถูกต้อง');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setMembers([]); // Clear data on logout for security
  };

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setMembers(data || []);
    } catch (err: any) {
      console.error('Error fetching members:', err);
      setError(err.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleExportExcel = () => {
    const exportData = filteredMembers.map((m) => ({
      'วันที่สมัคร': formatDate(m.created_at),
      'ยศ/คำนำหน้า': m.rank || '-',
      'ชื่อ-นามสกุล': m.full_name || '-',
      'รุ่น': m.generation || '-',
      'เบอร์โทรศัพท์': m.phone || '-',
      'ลิงก์รูปภาพ': m.photo_url || '-',
      'ลิงก์เอกสาร': m.document_url || '-'
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'สมาชิก');
    XLSX.writeFile(wb, `members_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  return (
    <div className={`min-h-screen ${theme.primary} text-slate-100 font-sans p-6 selection:bg-amber-500 selection:text-slate-900`}>
      <div className="max-w-7xl mx-auto animate-in fade-in duration-700">
        
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="flex items-center justify-center min-h-[80vh]">
            <div className="bg-slate-800/50 border border-amber-500/30 rounded-xl p-8 shadow-2xl backdrop-blur-sm max-w-md w-full text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-amber-400 flex items-center justify-center bg-slate-900 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                <ShieldCheck className="text-amber-400 w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-amber-400 mb-2">ระบบจัดการหลังบ้าน</h2>
              <p className="text-slate-400 mb-8 text-sm">กรุณาใส่รหัสผ่านเพื่อเข้าสู่ระบบ</p>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="รหัสผ่าน"
                    className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-center text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-400 text-slate-900 font-bold rounded-md hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all"
                >
                  เข้าสู่ระบบ
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Dashboard Content */
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-amber-500/30">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-amber-400 flex items-center justify-center bg-slate-800 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                  <ShieldCheck className="text-amber-400 w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold tracking-wider text-amber-400">ระบบจัดการหลังบ้าน</h1>
                  <p className="text-sm text-slate-300 tracking-widest mt-1">มูลนิธิศิษย์นายร้อย ตามรอยพระบาท</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleExportExcel}
                  disabled={filteredMembers.length === 0}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Download className="w-4 h-4" /> ดาวน์โหลด Excel
                </button>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm border border-slate-600 text-slate-300 rounded-md hover:bg-slate-800 hover:text-amber-400 hover:border-amber-500/50 transition-all"
                >
                  ออกจากระบบ
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="mb-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ค้นหาตามชื่อ นามสกุล หรือเบอร์โทร..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                />
              </div>
            </div>

            {/* Content Table */}
            <div className="bg-slate-800/50 border border-amber-500/30 rounded-xl p-6 shadow-2xl backdrop-blur-sm overflow-x-auto">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32">
                  <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
                  <p className="text-amber-400 text-lg">กำลังโหลดข้อมูล...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-32 text-red-400">
                  <p className="text-lg mb-4">เกิดข้อผิดพลาดในการโหลดข้อมูล: {error}</p>
                  <button 
                    onClick={fetchMembers}
                    className="px-6 py-2 border border-red-400 rounded-md hover:bg-red-400/10 transition-colors"
                  >
                    ลองใหม่อีกครั้ง
                  </button>
                </div>
              ) : members.length === 0 ? (
                <div className="text-center py-32 text-slate-400">
                  <UsersIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">ยังไม่มีข้อมูลสมาชิกในระบบ</p>
                </div>
              ) : filteredMembers.length === 0 ? (
                <div className="text-center py-32 text-slate-400">
                  <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">ไม่พบผลลัพธ์จากการค้นหา</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-4 text-amber-400 hover:text-amber-300 text-sm underline"
                  >
                    ล้างการค้นหา
                  </button>
                </div>
              ) : (
                <>
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="border-b-2 border-amber-500/50 text-amber-500/80 text-sm tracking-wide">
                      <th className="py-4 px-4 font-medium whitespace-nowrap">วันที่สมัคร</th>
                      <th className="py-4 px-4 font-medium whitespace-nowrap">ยศ / คำนำหน้า</th>
                      <th className="py-4 px-4 font-medium whitespace-nowrap">ชื่อ - สกุล</th>
                      <th className="py-4 px-4 font-medium whitespace-nowrap">รุ่น</th>
                      <th className="py-4 px-4 font-medium whitespace-nowrap">เบอร์โทรศัพท์</th>
                      <th className="py-4 px-4 font-medium whitespace-nowrap">เอกสารแนบ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {paginatedMembers.map((member, index) => (
                      <tr key={member.id || index} className="hover:bg-slate-700/30 transition-colors">
                        <td className="py-4 px-4 text-slate-300 text-sm whitespace-nowrap">{formatDate(member.created_at)}</td>
                        <td className="py-4 px-4 whitespace-nowrap">{member.rank || '-'}</td>
                        <td className="py-4 px-4 whitespace-nowrap font-medium">{member.full_name || '-'}</td>
                        <td className="py-4 px-4 whitespace-nowrap">{member.generation || '-'}</td>
                        <td className="py-4 px-4 whitespace-nowrap">{member.phone || '-'}</td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            {member.photo_url ? (
                              <a 
                                href={member.photo_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-slate-900 border border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-slate-900 transition-all"
                                title="ดูรูปภาพ"
                              >
                                <ImageIcon className="w-3.5 h-3.5" /> รูปภาพ
                              </a>
                            ) : (
                              <span className="text-slate-600 text-xs px-3 py-1.5">ไม่มีรูป</span>
                            )}
                            
                            {member.document_url ? (
                              <a 
                                href={member.document_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-slate-900 border border-blue-500/50 text-blue-400 hover:bg-blue-500 hover:text-slate-900 transition-all"
                                title="ดูเอกสารประวัติ"
                              >
                                <FileText className="w-3.5 h-3.5" /> ประวัติ
                              </a>
                            ) : (
                              <span className="text-slate-600 text-xs px-3 py-1.5">ไม่มีประวัติ</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-700/50">
                  <p className="text-sm text-slate-400">
                    แสดง {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredMembers.length)} จากทั้งหมด {filteredMembers.length} คน
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 px-3 py-2 text-sm rounded-md border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-amber-400 hover:border-amber-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" /> หน้าก่อนหน้า
                    </button>
                    <span className="px-4 py-2 text-sm text-amber-400 font-medium bg-slate-800 rounded-md border border-amber-500/30">
                      หน้า {currentPage} / {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 px-3 py-2 text-sm rounded-md border border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-amber-400 hover:border-amber-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      หน้าถัดไป <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Helper icon component for empty state
function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
