import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LogOut, GraduationCap, LayoutDashboard, MonitorPlay, Layers, FileText } from 'lucide-react';

export default function AdminLayout({ children }) {
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-[#f4f7f6] text-slate-900 font-sans">
      <aside className="w-64 bg-slate-900 shadow-xl flex flex-col fixed h-full z-10 text-slate-300">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <GraduationCap size={28} className="text-blue-400" />
          <h1 className="text-xl font-bold text-white tracking-wide">ADMIN PORTAL</h1>
        </div>
        
        <div className="px-6 pt-6 pb-2">
          <p className="text-[11px] font-bold text-slate-500 tracking-widest uppercase">Management</p>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          <Link to="/" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${location.pathname === '/' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
            <LayoutDashboard size={20} className={location.pathname === '/' ? 'text-blue-400' : 'text-slate-400'} /> Dashboard
          </Link>
          <Link to="/programs" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${location.pathname === '/programs' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
            <MonitorPlay size={20} className={location.pathname === '/programs' ? 'text-blue-400' : 'text-slate-400'} /> Programs
          </Link>
          <Link to="/semesters" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${location.pathname === '/semesters' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Layers size={20} className={location.pathname === '/semesters' ? 'text-blue-400' : 'text-slate-400'} /> Semesters
          </Link>
          <Link to="/subjects" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${location.pathname === '/subjects' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
            <FileText size={20} className={location.pathname === '/subjects' ? 'text-blue-400' : 'text-slate-400'} /> Subjects
          </Link>
        </nav>

        <div className="p-4 mt-auto">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 font-medium rounded-lg transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 ml-64 p-10">
        {children}
      </main>
    </div>
  );
}
