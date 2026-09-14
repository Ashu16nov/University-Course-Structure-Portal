import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Compass, GraduationCap, ArrowRight, BookOpen, Clock, Sparkles, LayoutGrid, Calendar, ChevronRight } from 'lucide-react';

export default function UserDashboard() {
  const { user, token } = useContext(AuthContext);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/programs', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPrograms(res.data.slice(0, 4)); // Show only top 4 as featured
      } catch (err) {
        console.error("Failed to fetch programs", err);
      }
    };
    if (token) fetchPrograms();
  }, [token]);

  return (
    <div className="space-y-16 pb-12">
      {/* Enhanced Hero Section with Glassmorphism and Glow */}
      <div className="relative bg-slate-900 rounded-[2.5rem] p-10 md:p-20 text-white shadow-2xl overflow-hidden mt-4">
        {/* Animated Background Glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-500/30 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-indigo-500/20 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-fuchsia-500/20 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjwvc3ZnPg==')] opacity-50 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold tracking-widest uppercase mb-8 shadow-xl">
            <Sparkles size={16} className="text-amber-300" /> Discover Your Path
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.1] mb-6">
            Design Your Future <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-indigo-300 to-fuchsia-300">
              at UniApp.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
            Welcome back, {user?.name.split(' ')[0]}. Explore our comprehensive catalog of programs, track your semester progression, and master your core subjects.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/programs" className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              Browse Programs <ArrowRight size={20} />
            </Link>
            <Link to="/semesters" className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2">
              View Semesters
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Quick Action Stats */}
      <div className="max-w-5xl mx-auto -mt-24 relative z-20 px-4">
        <div className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-4 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/programs" className="bg-slate-50 rounded-2xl p-6 flex items-center gap-4 group cursor-pointer hover:bg-brand-50 transition-colors">
            <div className="p-4 bg-white rounded-xl shadow-sm text-brand-600 group-hover:scale-110 transition-transform">
              <GraduationCap size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Top Programs</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Explore degrees</p>
            </div>
          </Link>
          <Link to="/semesters" className="bg-slate-50 rounded-2xl p-6 flex items-center gap-4 group cursor-pointer hover:bg-indigo-50 transition-colors">
            <div className="p-4 bg-white rounded-xl shadow-sm text-indigo-600 group-hover:scale-110 transition-transform">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Semesters</p>
              <p className="text-xs text-slate-500 font-medium mt-1">Track timelines</p>
            </div>
          </Link>
          <Link to="/subjects" className="bg-slate-50 rounded-2xl p-6 flex items-center gap-4 group cursor-pointer hover:bg-fuchsia-50 transition-colors">
            <div className="p-4 bg-white rounded-xl shadow-sm text-fuchsia-600 group-hover:scale-110 transition-transform">
              <LayoutGrid size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Core Subjects</p>
              <p className="text-xs text-slate-500 font-medium mt-1">View curriculum</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Premium Featured Programs Section */}
      <div className="pt-8">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-end mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-brand-600 font-bold uppercase tracking-widest text-xs mb-2">
              <Compass size={14} /> Top Choices
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Featured Programs</h2>
          </div>
          <Link to="/programs" className="mt-4 md:mt-0 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all hover:shadow-lg flex items-center gap-2">
            View All Catalog <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => (
            <Link to={`/subjects?program=${program._id}`} key={program._id} className="group relative bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-2 flex flex-col h-full cursor-pointer">
              
              {/* Decorative top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-400 to-indigo-400 rounded-t-[2rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                index % 4 === 0 ? 'bg-blue-50 text-blue-600' :
                index % 4 === 1 ? 'bg-emerald-50 text-emerald-600' :
                index % 4 === 2 ? 'bg-amber-50 text-amber-600' :
                'bg-fuchsia-50 text-fuchsia-600'
              }`}>
                <GraduationCap size={32} />
              </div>
              
              <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">{program.name}</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8 flex-1">{program.description}</p>
              
              <div className="flex items-center justify-between pt-5 border-t border-gray-50 mt-auto">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                  <Clock size={14} /> {program.durationYears} Years
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
