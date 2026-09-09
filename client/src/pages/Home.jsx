import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats, getPrograms } from '../services/api';
import { Book, Layers, FileText, Award } from 'lucide-react';

export default function Home() {
  const [stats, setStats] = useState({ programs: 0, semesters: 0, subjects: 0, credits: 0 });
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    getDashboardStats().then(res => setStats(res.data.data)).catch(console.error);
    getPrograms().then(res => setPrograms(res.data.data.slice(0, 4))).catch(console.error);
  }, []);

  return (
    <div>
      <section className="bg-university-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Explore Your Academic Journey</h1>
        <p className="text-xl md:text-2xl text-university-100 max-w-3xl mx-auto mb-10">Discover programs, semesters, subjects and credit structures offered by our university.</p>
        <div className="flex justify-center gap-4">
          <Link to="/programs" className="bg-white text-university-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">Explore Programs</Link>
          <Link to="/admin" className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-university-900 transition-colors">Admin Dashboard</Link>
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <div className="bg-blue-100 p-3 rounded-full mb-4"><Book className="text-blue-600" size={32} /></div>
            <h3 className="text-4xl font-black text-gray-800">{stats.programs}</h3>
            <p className="text-gray-500 font-medium">Total Programs</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <div className="bg-green-100 p-3 rounded-full mb-4"><Layers className="text-green-600" size={32} /></div>
            <h3 className="text-4xl font-black text-gray-800">{stats.semesters}</h3>
            <p className="text-gray-500 font-medium">Total Semesters</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <div className="bg-purple-100 p-3 rounded-full mb-4"><FileText className="text-purple-600" size={32} /></div>
            <h3 className="text-4xl font-black text-gray-800">{stats.subjects}</h3>
            <p className="text-gray-500 font-medium">Total Subjects</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center flex flex-col items-center">
            <div className="bg-yellow-100 p-3 rounded-full mb-4"><Award className="text-yellow-600" size={32} /></div>
            <h3 className="text-4xl font-black text-gray-800">{stats.credits}</h3>
            <p className="text-gray-500 font-medium">Total Credits</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.map(prog => (
              <div key={prog._id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold text-university-900 mb-2">{prog.name}</h3>
                  <div className="inline-block bg-university-100 text-university-600 text-xs font-bold px-2 py-1 rounded mb-4">{prog.code}</div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{prog.description}</p>
                  <div className="text-sm text-gray-500 flex justify-between">
                    <span>{prog.duration}</span>
                    <span>{prog.totalSemesters} Semesters</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 border-t border-gray-100">
                  <Link to={`/programs/${prog._id}`} className="text-university-600 font-semibold hover:text-university-900 w-full text-center block">View Course Structure &rarr;</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}