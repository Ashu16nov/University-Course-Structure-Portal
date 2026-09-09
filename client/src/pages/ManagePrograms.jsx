import { useEffect, useState } from 'react';
import { getPrograms, createProgram, updateProgram, deleteProgram } from '../services/api';
import toast from 'react-hot-toast';
import { Trash2, Plus, Pencil } from 'lucide-react';

export default function ManagePrograms() {
  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: '', code: '', duration: '', totalSemesters: '' });

  const fetchPrograms = () => getPrograms().then(res => setPrograms(res.data.data)).catch(console.error);
  
  useEffect(() => { fetchPrograms(); }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ name: '', code: '', duration: '', totalSemesters: '' });
    setShowModal(true);
  };

  const openEditModal = (program) => {
    setIsEditing(true);
    setEditId(program._id);
    setFormData({ 
      name: program.name, 
      code: program.code, 
      duration: program.duration, 
      totalSemesters: program.totalSemesters 
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateProgram(editId, formData);
        toast.success('Program updated');
      } else {
        await createProgram(formData);
        toast.success('Program created');
      }
      setShowModal(false);
      setFormData({ name: '', code: '', duration: '', totalSemesters: '' });
      fetchPrograms();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving program');
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete this program? This will also delete all associated semesters and subjects.')) {
      try {
        await deleteProgram(id);
        toast.success('Program deleted');
        fetchPrograms();
      } catch (err) {
        toast.error('Error deleting program');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Programs</h1>
        <button onClick={openAddModal} className="bg-university-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-university-900 transition-colors shadow-sm">
          <Plus size={18}/> Add Program
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4 border-b">Code</th>
              <th className="p-4 border-b">Name</th>
              <th className="p-4 border-b">Duration</th>
              <th className="p-4 border-b text-center">Semesters</th>
              <th className="p-4 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.map(p => (
              <tr key={p._id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold">{p.code}</td>
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-sm text-gray-600">{p.duration}</td>
                <td className="p-4 text-center">{p.totalSemesters}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEditModal(p)} className="text-university-500 hover:bg-university-50 p-2 rounded transition-colors"><Pencil size={18}/></button>
                    <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"><Trash2 size={18}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Program' : 'Add Program'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder="Program Code (e.g. BCA)" className="w-full border p-2 rounded focus:ring-2 focus:ring-university-500 outline-none" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} />
              <input required placeholder="Program Name" className="w-full border p-2 rounded focus:ring-2 focus:ring-university-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input required placeholder="Duration (e.g. 3 Years)" className="w-full border p-2 rounded focus:ring-2 focus:ring-university-500 outline-none" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
              <input required type="number" placeholder="Total Semesters" className="w-full border p-2 rounded focus:ring-2 focus:ring-university-500 outline-none" value={formData.totalSemesters} onChange={e => setFormData({...formData, totalSemesters: e.target.value})} />
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-university-600 hover:bg-university-700 text-white rounded transition-colors">{isEditing ? 'Update' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}