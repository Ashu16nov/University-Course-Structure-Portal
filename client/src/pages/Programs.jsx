import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPrograms } from '../services/api';

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getPrograms().then(res => setPrograms(res.data.data)).catch(console.error);
  }, []);

  // Custom sort order based on user request
  const order = ['BCA', 'BBA', 'B.Tech', 'MCA', 'MBA', 'M.Tech'];

  const filtered = programs
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
        const indexA = order.indexOf(a.code);
        const indexB = order.indexOf(b.code);
        
        // If both are in the order array, sort by their position
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        // If only A is in the order array, it comes first
        if (indexA !== -1) return -1;
        // If only B is in the order array, it comes first
        if (indexB !== -1) return 1;
        
        // If neither is in the order array, sort alphabetically by code
        return a.code.localeCompare(b.code);
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Academic Programs</h1>
          <p className="text-gray-600">Browse our comprehensive list of academic programs.</p>
        </div>
        <input 
          type="text" 
          placeholder="Search programs..." 
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-university-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(prog => (
          <div key={prog._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all flex flex-col">
            <div className="h-2 bg-university-600"></div>
            <div className="p-6 flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{prog.code}</h3>
              <h4 className="text-lg text-gray-600 mb-4">{prog.name}</h4>
              <p className="text-gray-600 mb-6 text-sm">{prog.description}</p>
              
              <div className="flex items-center gap-4 text-sm font-medium text-gray-700 bg-gray-50 p-3 rounded-lg mb-6">
                <div>Duration: <span className="text-university-600">{prog.duration}</span></div>
                <div className="w-px h-4 bg-gray-300"></div>
                <div>Semesters: <span className="text-university-600">{prog.totalSemesters}</span></div>
              </div>
            </div>
            <div className="p-6 pt-0">
              <Link to={`/programs/${prog._id}`} className="block w-full text-center bg-white border-2 border-university-600 text-university-600 font-bold py-2 rounded-lg hover:bg-university-600 hover:text-white transition-colors">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}