import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2, Eye } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useSearchParams } from 'react-router-dom';

export default function Subjects() {
  const [searchParams] = useSearchParams();
  const initialProgram = searchParams.get('program') || '';
  const initialSemester = searchParams.get('semester') || '';
  
  const [subjects, setSubjects] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [formData, setFormData] = useState({ semester: '', code: '', title: '', credits: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const { user, token } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const fetchData = async () => {
    try {
      const [subRes, semRes] = await Promise.all([
        axios.get('http://localhost:5000/api/subjects', config),
        axios.get('http://localhost:5000/api/semesters', config)
      ]);
      setSubjects(subRes.data);
      setSemesters(semRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/subjects/${editId}`, formData, config);
      } else {
        await axios.post('http://localhost:5000/api/subjects', formData, config);
      }
      setFormData({ semester: '', code: '', title: '', credits: '' });
      setIsEditing(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (subject) => {
    if (!isAdmin) return;
    setFormData({ semester: subject.semester._id, code: subject.code, title: subject.title, credits: subject.credits });
    setIsEditing(true);
    setEditId(subject._id);
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    if (window.confirm('Are you sure you want to delete this?')) {
      try {
        await axios.delete(`http://localhost:5000/api/subjects/${id}`, config);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const [filterProgram, setFilterProgram] = useState(initialProgram);
  const [filterSemester, setFilterSemester] = useState(initialSemester);

  // Extract unique programs from semesters list for the filter dropdown
  const uniquePrograms = Array.from(new Map(semesters.filter(s => s.program).map(s => [s.program._id, s.program])).values());

  const availableSemesters = filterProgram 
    ? semesters.filter(s => s.program?._id === filterProgram)
    : semesters;

  const filteredSubjects = subjects.filter(sub => {
    let matchesProgram = true;
    let matchesSemester = true;
    if (filterProgram) {
      matchesProgram = sub.semester?.program?._id === filterProgram;
    }
    if (filterSemester) {
      matchesSemester = sub.semester?._id === filterSemester;
    }
    return matchesProgram && matchesSemester;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Subjects</h1>
        <p className="text-gray-500 mt-2 text-lg">View subjects in semesters.</p>
      </div>

      {isAdmin && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Semester</label>
            <select required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={formData.semester} onChange={e => setFormData({...formData, semester: e.target.value})}>
              <option value="">Select a Semester</option>
              {semesters.map(s => <option key={s._id} value={s._id}>{s.program?.name} - Sem {s.number}</option>)}
            </select>
          </div>
          <div className="w-full md:w-32">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Code</label>
            <input required type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} placeholder="CS101" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
            <input required type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="Data Structures" />
          </div>
          <div className="w-full md:w-24">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Credits</label>
            <input required type="number" min="1" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={formData.credits} onChange={e => setFormData({...formData, credits: e.target.value})} placeholder="3" />
          </div>
          <button type="submit" className="w-full md:w-auto px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
            {isEditing ? 'Update' : <><Plus size={20} /> Add</>}
          </button>
        </form>
      )}

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <label className="text-sm font-bold text-gray-700 whitespace-nowrap">Filter by:</label>
        <select 
          className="w-full md:w-64 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          value={filterProgram} 
          onChange={e => {
            setFilterProgram(e.target.value);
            setFilterSemester(''); // Reset semester filter when program changes
          }}
        >
          <option value="">All Programs</option>
          {uniquePrograms.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
        
        <select 
          className="w-full md:w-64 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          value={filterSemester} 
          onChange={e => setFilterSemester(e.target.value)}
        >
          <option value="">All Semesters</option>
          {availableSemesters.map(s => <option key={s._id} value={s._id}>{s.program?.name} - Sem {s.number}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm tracking-wider uppercase border-b border-gray-100">
              <th className="p-4 font-semibold">Semester</th>
              <th className="p-4 font-semibold">Code</th>
              <th className="p-4 font-semibold">Title</th>
              <th className="p-4 font-semibold">Credits</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredSubjects.map(subject => (
              <tr key={subject._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-gray-600 text-sm">
                  <div className="font-bold text-gray-900">{subject.semester?.program?.name}</div>
                  <div>Sem {subject.semester?.number}</div>
                </td>
                <td className="p-4 font-bold text-brand-600">{subject.code}</td>
                <td className="p-4 text-gray-900 font-medium">{subject.title}</td>
                <td className="p-4 text-gray-600">{subject.credits}</td>
                <td className="p-4 flex justify-end gap-3 h-full items-center mt-2">
                  <button onClick={() => alert(`Details for ${subject.title} coming soon!`)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Subject Details">
                    <Eye size={18} />
                  </button>
                  {isAdmin && (
                    <>
                      <button onClick={() => handleEdit(subject)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={18} /></button>
                      <button onClick={() => handleDelete(subject._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {subjects.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">No subjects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
