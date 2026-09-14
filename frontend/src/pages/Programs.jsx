import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2, Eye } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Programs() {
  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', durationYears: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const { user, token } = useContext(AuthContext);
  const isAdmin = user?.role === 'admin';

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const fetchPrograms = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/programs', config);
      setPrograms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchPrograms();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/programs/${editId}`, formData, config);
      } else {
        await axios.post('http://localhost:5000/api/programs', formData, config);
      }
      setFormData({ name: '', description: '', durationYears: '' });
      setIsEditing(false);
      fetchPrograms();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (program) => {
    if (!isAdmin) return;
    setFormData({ name: program.name, description: program.description, durationYears: program.durationYears });
    setIsEditing(true);
    setEditId(program._id);
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    if (window.confirm('Are you sure you want to delete this?')) {
      try {
        await axios.delete(`http://localhost:5000/api/programs/${id}`, config);
        fetchPrograms();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrograms = programs.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Programs</h1>
        <p className="text-gray-500 mt-2 text-lg">View university programs (e.g. B.Tech, M.Tech).</p>
      </div>

      {isAdmin && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
            <input required type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. B.Tech CSE" />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
            <input required type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Computer Science Engineering" />
          </div>
          <div className="w-full md:w-32">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Duration (Yrs)</label>
            <input required type="number" min="1" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" value={formData.durationYears} onChange={e => setFormData({...formData, durationYears: e.target.value})} />
          </div>
          <button type="submit" className="w-full md:w-auto px-6 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
            {isEditing ? 'Update' : <><Plus size={20} /> Add</>}
          </button>
        </form>
      )}

      {/* Filter Section */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <input 
          type="text" 
          placeholder="Search programs by name or description..." 
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm tracking-wider uppercase border-b border-gray-100">
              <th className="p-4 font-semibold">Program Name</th>
              <th className="p-4 font-semibold">Description</th>
              <th className="p-4 font-semibold">Duration</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredPrograms.map(program => (
              <tr key={program._id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-gray-900">{program.name}</td>
                <td className="p-4 text-gray-600">{program.description}</td>
                <td className="p-4 text-gray-600">{program.durationYears} Years</td>
                <td className="p-4 flex justify-end gap-3">
                  <Link to={`/subjects?program=${program._id}`} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="View Program Details">
                    <Eye size={18} />
                  </Link>
                  {isAdmin && (
                    <>
                      <button onClick={() => handleEdit(program)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={18} /></button>
                      <button onClick={() => handleDelete(program._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {programs.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">No programs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
