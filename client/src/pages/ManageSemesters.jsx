import { useEffect, useState, useMemo } from 'react';
import { getSemesters, getPrograms, createSemester, updateSemester, deleteSemester } from '../services/api';
import toast from 'react-hot-toast';
import { Trash2, Plus, Filter, Pencil } from 'lucide-react';

export default function ManageSemesters() {
  const [semesters, setSemesters] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ program: '', semesterNumber: '', name: '', description: '' });
  
  // Filter
  const [filterProgram, setFilterProgram] = useState('');

  const fetchData = () => {
    getSemesters().then(res => setSemesters(res.data.data)).catch(console.error);
    getPrograms().then(res => setPrograms(res.data.data)).catch(console.error);
  };
  
  useEffect(() => { fetchData(); }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ program: '', semesterNumber: '', name: '', description: '' });
    setShowModal(true);
  };

  const openEditModal = (semester) => {
    setIsEditing(true);
    setEditId(semester._id);
    setFormData({ 
      program: semester.program?._id || semester.program, 
      semesterNumber: semester.semesterNumber, 
      name: semester.name, 
      description: semester.description || '' 
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateSemester(editId, formData);
        toast.success('Semester updated');
      } else {
        await createSemester(formData);
        toast.success('Semester created');
      }
      setShowModal(false);
      setFormData({ program: '', semesterNumber: '', name: '', description: '' });
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving semester');
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete this semester? Subjects will also be deleted.')) {
      try {
        await deleteSemester(id);
        toast.success('Semester deleted');
        fetchData();
      } catch (err) {
        toast.error('Error deleting semester');
      }
    }
  };

  const filteredSemesters = useMemo(() => {
    return semesters.filter(s => {
      if (filterProgram && s.program?._id !== filterProgram) return false;
      return true;
    });
  }, [semesters, filterProgram]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Semesters</h1>
        <button onClick={openAddModal} className="bg-university-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-university-900 transition-colors shadow-sm">
          <Plus size={18}/> Add Semester
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex items-center gap-2 text-gray-600 font-medium">
            <Filter size={18} /> Filters:
        </div>
        <select 
            className="border p-2 rounded w-full md:w-64 focus:ring-2 focus:ring-university-500 outline-none" 
            value={filterProgram} 
            onChange={e => setFilterProgram(e.target.value)}
        >
            <option value="">All Programs</option>
            {programs.map(p => <option key={p._id} value={p._id}>{p.code}</option>)}
        </select>
        
        <div className="ml-auto text-sm text-gray-500">
            Showing {filteredSemesters.length} semesters
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-4 border-b">Program</th>
              <th className="p-4 border-b">Sem Number</th>
              <th className="p-4 border-b">Name</th>
              <th className="p-4 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSemesters.map(s => (
              <tr key={s._id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold">{s.program?.code}</td>
                <td className="p-4">{s.semesterNumber}</td>
                <td className="p-4 font-medium">{s.name}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => openEditModal(s)} className="text-university-500 hover:bg-university-50 p-2 rounded transition-colors"><Pencil size={18}/></button>
                    <button onClick={() => handleDelete(s._id)} className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"><Trash2 size={18}/></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredSemesters.length === 0 && (
                <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500">No semesters found matching the filters.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Semester' : 'Add Semester'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <select required className="w-full border p-2 rounded focus:ring-2 focus:ring-university-500 outline-none" value={formData.program} onChange={e => setFormData({...formData, program: e.target.value})}>
                <option value="">Select Program</option>
                {programs.map(p => <option key={p._id} value={p._id}>{p.code} - {p.name}</option>)}
              </select>
              <input required type="number" placeholder="Semester Number (e.g. 1)" className="w-full border p-2 rounded focus:ring-2 focus:ring-university-500 outline-none" value={formData.semesterNumber} onChange={e => setFormData({...formData, semesterNumber: e.target.value})} />
              <input required placeholder="Semester Name (e.g. First Semester)" className="w-full border p-2 rounded focus:ring-2 focus:ring-university-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
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