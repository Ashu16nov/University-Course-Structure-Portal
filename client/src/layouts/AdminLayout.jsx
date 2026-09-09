import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Book, Layers, FileText, LogOut, GraduationCap } from 'lucide-react';
import { useEffect } from 'react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const admin = localStorage.getItem('admin');
    if (!admin) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/admin');
  };

  const NavLink = ({ to, icon: Icon, children }) => {
    const isActive = location.pathname.startsWith(to);
    return (
      <Link 
        to={to} 
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
            isActive 
            ? 'bg-white/10 text-white shadow-inner border border-white/5' 
            : 'text-gray-300 hover:bg-white/5 hover:text-white'
        }`}
      >
        <Icon size={20} className={isActive ? 'text-blue-400' : 'text-gray-400'} /> {children}
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800 font-inter">
      <aside className="w-72 bg-gray-900 text-white flex flex-col shadow-2xl relative z-10">
        {/* Background decorative gradient */}
        <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-blue-900/40 to-transparent pointer-events-none"></div>
        
        <div className="h-20 flex items-center px-8 border-b border-gray-800 relative z-10">
          <GraduationCap size={28} className="text-blue-400 mr-3" />
          <span className="font-bold text-xl tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">ADMIN PORTAL</span>
        </div>
        
        <nav className="flex-1 py-8 flex flex-col gap-2 px-4 relative z-10">
          <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Management</p>
          <NavLink to="/admin/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
          <NavLink to="/admin/programs" icon={Book}>Programs</NavLink>
          <NavLink to="/admin/semesters" icon={Layers}>Semesters</NavLink>
          <NavLink to="/admin/subjects" icon={FileText}>Subjects</NavLink>
        </nav>
        
        <div className="p-4 border-t border-gray-800 relative z-10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors text-left text-gray-400 font-medium">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 md:p-12 overflow-y-auto h-screen bg-gray-50/50">
        <Outlet />
      </main>
    </div>
  );
}