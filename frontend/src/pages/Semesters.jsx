import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Semesters() {
  const [semesters, setSemesters] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({ program: '', number: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const { user, token } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const fetchData = async () => {
    try {
      const [semRes, progRes] = await Promise.all([
        axios.get('http://localhost:5000/api/semesters', config),
        axios.get('http://localhost:5000/api/programs', config)
      ]);
      setSemesters(semRes.data);
      setPrograms(progRes.data);
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
        await axios.put(`http://localhost:5000/api/semesters/${editId}`, formData, config);
      } else {
        await axios.post('http://localhost:5000/api/semesters', formData, config);
      }
      setFormData({ program: '', number: '', description: '' });
      setIsEditing(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (semester) => {
    if (!isAdmin) return;
    setFormData({ program: semester.program._id, number: semester.number, description: semester.description });
    setIsEditing(true);
    setEditId(semester._id);
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    if (window.confirm('Are you sure you want to delete this?')) {
      try {
        await axios.delete(`http://localhost:5000/api/semesters/${id}`, config);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const [filterProgram, setFilterProgram] = useState('');

  const filteredSemesters = filterProgram 
    ? semesters.filter(s => s.program?._id === filterProgram)
    : semesters;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Semesters</h1>
        <p className="text-gray-500 mt-2 text-lg">View semesters within programs.</p>
      </div>

      {isAdmin && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Program</label>
            <select required className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={formData.program} onChange={e => setFormData({...formData, program: e.target.value})}>
              <option value="">Select a Program</option>
              {programs.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
            </select>
          </div>
          <div className="w-full md:w-32">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Semester No.</label>
            <input required type="number" min="1" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={formData.number} onChange={e => setFormData({...formData, number: e.target.value})} placeholder="1" />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description (Optional)</label>
            <input type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Autumn 2026" />
          </div>
          <button type="submit" className="w-full md:w-auto px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
            {isEditing ? 'Update' : <><Plus size={20} /> Add</>}
          </button>
        </form>
      )}

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <label className="text-sm font-bold text-gray-700 whitespace-nowrap">Filter by Program:</label>
        <select 
          className="w-full md:w-64 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          value={filterProgram} 
          onChange={e => setFilterProgram(e.target.value)}
        >
          <option value="">All Programs</option>
          {programs.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm tracking-wider uppercase border-b border-gray-100">
              <th className="p-4 font-semibold">Program</th>
              <th className="p-4 font-semibold">Semester No.</th>
              <th className="p-4 font-semibold">Description</th>
              {isAdmin && <th className="p-4 font-semibold text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredSemesters.map(semester => (
              <tr key={semester._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-gray-900">{semester.program?.name}</td>
                <td className="p-4 font-semibold text-brand-600">Semester {semester.number}</td>
                <td className="p-4 text-gray-600">{semester.description || '-'}</td>
                {isAdmin && (
                  <td className="p-4 flex justify-end gap-3">
                    <button onClick={() => handleEdit(semester)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(semester._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                  </td>
                )}
              </tr>
            ))}
            {semesters.length === 0 && (
              <tr>
                <td colSpan={isAdmin ? "4" : "3"} className="p-8 text-center text-gray-500">No semesters found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
