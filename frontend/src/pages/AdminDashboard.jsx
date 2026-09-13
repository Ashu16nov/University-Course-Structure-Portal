import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BookOpen, Layers, FileText, Award, ShieldCheck, Database } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {
  const { user, token } = useContext(AuthContext);
  const [stats, setStats] = useState({ programs: 0, semesters: 0, subjects: 0, credits: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const [progRes, semRes, subRes] = await Promise.all([
          axios.get('http://localhost:5000/api/programs', config),
          axios.get('http://localhost:5000/api/semesters', config),
          axios.get('http://localhost:5000/api/subjects', config)
        ]);

        const totalCredits = subRes.data.reduce((sum, subject) => sum + subject.credits, 0);

        setStats({
          programs: progRes.data.length,
          semesters: semRes.data.length,
          subjects: subRes.data.length,
          credits: totalCredits
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };
    if (token) fetchStats();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-2 font-medium">Welcome back, {user?.name || 'Admin'}! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
          <div className="p-4 bg-blue-500 text-white rounded-2xl shadow-lg shadow-blue-200">
            <BookOpen size={28} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Programs</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stats.programs}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
          <div className="p-4 bg-emerald-500 text-white rounded-2xl shadow-lg shadow-emerald-200">
            <Layers size={28} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Semesters</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stats.semesters}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
          <div className="p-4 bg-orange-500 text-white rounded-2xl shadow-lg shadow-orange-200">
            <FileText size={28} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Subjects</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stats.subjects}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5">
          <div className="p-4 bg-fuchsia-500 text-white rounded-2xl shadow-lg shadow-fuchsia-200">
            <Award size={28} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Credits</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stats.credits}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Activity Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2 relative overflow-hidden">
          <div className="absolute right-0 top-0 text-slate-50 opacity-50 transform translate-x-4 -translate-y-4">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
          </div>
          
          <h2 className="text-xl font-bold text-slate-900 mb-4 relative z-10">System Activity</h2>
          <p className="text-slate-500 font-medium leading-relaxed max-w-xl relative z-10">
            The University Course Structure Management System is fully operational.
            Use the sidebar navigation to securely manage programs, semesters, and subjects. 
            All changes made here are instantly reflected in the student portal in real-time.
          </p>
          
          <div className="flex gap-4 mt-8 relative z-10">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Database Active
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold">
              <ShieldCheck size={16} />
              Admin Session Secured
            </div>
          </div>
        </div>

        {/* Quick Tips Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-xl text-white">
          <h2 className="text-xl font-bold mb-6">Quick Tips</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-blue-400">1</div>
              <p className="text-sm text-slate-300 font-medium">Always create a <strong className="text-white">Program</strong> before attempting to create its Semesters.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-blue-400">2</div>
              <p className="text-sm text-slate-300 font-medium">Deleting a Program will <strong className="text-white">cascade delete</strong> all of its associated semesters and subjects.</p>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-blue-400">3</div>
              <p className="text-sm text-slate-300 font-medium">Use the filtering dropdowns on the Subject page for easier management.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
