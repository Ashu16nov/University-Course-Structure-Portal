import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { LogOut, BookOpen, GraduationCap, Compass, Book, UserCircle } from 'lucide-react';

export default function UserLayout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="bg-brand-600 p-2 rounded-lg text-white">
                <BookOpen size={24} />
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tight">AcademicCatalog</span>
            </div>

            {/* Main Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors ${location.pathname === '/' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-gray-500 hover:text-gray-900'}`}>
                <Compass size={18} /> Discover
              </Link>
              <Link to="/programs" className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors ${location.pathname === '/programs' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-gray-500 hover:text-gray-900'}`}>
                <GraduationCap size={18} /> Programs
              </Link>
              <Link to="/semesters" className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors ${location.pathname === '/semesters' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-gray-500 hover:text-gray-900'}`}>
                <Book size={18} /> Semesters
              </Link>
              <Link to="/subjects" className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold transition-colors ${location.pathname === '/subjects' ? 'text-brand-600 border-b-2 border-brand-600' : 'text-gray-500 hover:text-gray-900'}`}>
                <BookOpen size={18} /> Subjects
              </Link>
            </nav>

            {/* User Profile / Logout */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-600">
                <UserCircle size={20} className="text-gray-400" />
                {user?.name}
              </div>
              <button onClick={logout} className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 text-sm font-bold rounded-lg transition-colors">
                <LogOut size={16} /> <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
            
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-400 font-medium mt-auto">
        &copy; {new Date().getFullYear()} University Academic Catalog. All rights reserved.
      </footer>
    </div>
  );
}
