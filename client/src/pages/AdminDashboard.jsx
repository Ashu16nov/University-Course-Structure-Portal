import { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/api';
import { BookOpen, Layers, FileText, Award, TrendingUp, Users } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ programs: 0, semesters: 0, subjects: 0, credits: 0 });

  useEffect(() => {
    getDashboardStats().then(res => setStats(res.data.data)).catch(console.error);
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-2 mb-2">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
            Dashboard Overview
        </h1>
        <p className="text-gray-500 font-medium">Welcome back, Admin! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            icon={<BookOpen size={28} className="text-white" />} 
            title="Total Programs" 
            value={stats.programs} 
            gradient="from-blue-600 to-indigo-500" 
            shadow="shadow-blue-500/30"
        />
        <StatCard 
            icon={<Layers size={28} className="text-white" />} 
            title="Total Semesters" 
            value={stats.semesters} 
            gradient="from-emerald-500 to-teal-400" 
            shadow="shadow-emerald-500/30"
        />
        <StatCard 
            icon={<FileText size={28} className="text-white" />} 
            title="Total Subjects" 
            value={stats.subjects} 
            gradient="from-orange-500 to-amber-400" 
            shadow="shadow-orange-500/30"
        />
        <StatCard 
            icon={<Award size={28} className="text-white" />} 
            title="Total Credits" 
            value={stats.credits} 
            gradient="from-fuchsia-600 to-pink-500" 
            shadow="shadow-pink-500/30"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100/60 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                <TrendingUp size={160} />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">System Activity</h2>
            <p className="text-gray-600 leading-relaxed max-w-xl">
                The University Course Structure Management System is fully operational. 
                Use the sidebar navigation to securely manage programs, semesters, and subjects. 
                All changes made here are instantly reflected in the student portal in real-time.
            </p>
            <div className="mt-8 flex gap-4">
                <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-100 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-700">Database Active</span>
                </div>
                <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-100 flex items-center gap-3">
                    <Users size={16} className="text-university-600" />
                    <span className="text-sm font-semibold text-gray-700">Admin Session Secured</span>
                </div>
            </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-xl shadow-gray-900/20 text-white relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-university-500/30 rounded-full blur-2xl"></div>
            
            <h3 className="text-xl font-bold mb-2 relative z-10">Quick Tips</h3>
            <ul className="space-y-4 mt-6 relative z-10 text-gray-300 text-sm">
                <li className="flex gap-3">
                    <div className="min-w-6 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">1</div>
                    <p>Always create a <strong className="text-white">Program</strong> before attempting to create its Semesters.</p>
                </li>
                <li className="flex gap-3">
                    <div className="min-w-6 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">2</div>
                    <p>Deleting a Program will <strong className="text-white">cascade delete</strong> all of its associated semesters and subjects.</p>
                </li>
                <li className="flex gap-3">
                    <div className="min-w-6 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">3</div>
                    <p>Use the filtering dropdowns on the Subject page for easier management.</p>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, gradient, shadow }) {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100/50 flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 group`}>
      <div className={`bg-gradient-to-br ${gradient} p-4 rounded-xl shadow-lg ${shadow} transform group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <div>
        <h3 className="text-gray-500 font-semibold text-sm mb-1 uppercase tracking-wider text-xs">{title}</h3>
        <p className="text-4xl font-black text-gray-800 tracking-tight">{value}</p>
      </div>
    </div>
  );
}