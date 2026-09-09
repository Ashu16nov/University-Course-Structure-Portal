import { Outlet, Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-university-600 hover:text-university-900 transition-colors">
            <BookOpen className="w-8 h-8 text-university-600" />
            <span className="font-bold text-xl tracking-tight">University Portal</span>
          </Link>
          <nav className="flex gap-6">
            <Link to="/" className="text-gray-600 hover:text-university-600 font-medium transition-colors">Home</Link>
            <Link to="/programs" className="text-gray-600 hover:text-university-600 font-medium transition-colors">Programs</Link>
            <Link to="/admin" className="text-gray-600 hover:text-university-600 font-medium transition-colors border px-4 py-1 rounded-md border-gray-300 hover:border-university-600">Admin Login</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-university-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-university-100">
          <p>&copy; {new Date().getFullYear()} University Academic Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}