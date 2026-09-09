import { useEffect, useState, useMemo } from 'react';
import { getSubjects, getPrograms, getSemestersByProgram, createSubject, updateSubject, deleteSubject } from '../services/api';
import toast from 'react-hot-toast';
import { Trash2, Plus, Filter, Pencil } from 'lucide-react';

export default function ManageSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ program: '', semester: '', subjectCode: '', name: '', credits: '', type: 'Core' });
  
  // Filters
  const [filterProgram, setFilterProgram] = useState('');
  const [filterSemester, setFilterSemester] = useState('');

  const fetchData = () => {
    getSubjects().then(res => setSubjects(res.data.data)).catch(console.error);
    getPrograms().then(res => setPrograms(res.data.data)).catch(console.error);
  };
  
  useEffect(() => { fetchData(); }, []);

  const handleProgramChange = async (e) => {
    const progId = e.target.value;
    setFormData({...formData, program: progId, semester: ''});
    if(progId) {
      const res = await getSemestersByProgram(progId);
      setSemesters(res.data.data);
    } else {
      setSemesters([]);
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setEditId(null);
    setFormData({ program: '', semester: '', subjectCode: '', name: '', credits: '', type: 'Core' });
    setSemesters([]);
    setShowModal(true);
  };

  const openEditModal = async (subject) => {
    setIsEditing(true);
    setEditId(subject._id);
    const progId = subject.program?._id || subject.program;
    
    // Load semesters for the program before opening modal
    if(progId) {
      const res = await getSemestersByProgram(progId);
      setSemesters(res.data.data);
    }

    setFormData({ 
      program: progId, 
      semester: subject.semester?._id || subject.semester, 
      subjectCode: subject.subjectCode, 
      name: subject.name, 
      credits: subject.credits, 
      type: subject.type || 'Core' 
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateSubject(editId, formData);
        toast.success('Subject updated');
      } else {
        await createSubject(formData);
        toast.success('Subject created');
      }
      setShowModal(false);
      setFormData({ program: '', semester: '', subjectCode: '', name: '', credits: '', type: 'Core' });
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving subject');
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete this subject?')) {
      try {
        await deleteSubject(id);
        toast.success('Subject deleted');
        fetchData();
      } catch (err) {
        toast.error('Error deleting subject');
      }
    }
  };

  // Filter logic
  const filteredSubjects = useMemo(() => {
    return subjects.filter(s => {
      if (filterProgram && s.program?._id !== filterProgram) return false;
      if (filterSemester && s.semester?._id !== filterSemester) return false;
      return true;
    });
  }, [subjects, filterProgram, filterSemester]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Subjects</h1>
        <button onClick={openAddModal} className="bg-university-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-university-900 transition-colors shadow-sm">
          <Plus size={18}/> Add Subject
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
            onChange={e => { setFilterProgram(e.target.value); setFilterSemester(''); }}
        >
            <option value="">All Programs</option>
            {programs.map(p => <option key={p._id} value={p._id}>{p.code}</option>)}
        </select>
        
        {/* We can quickly derive semesters for the selected program filter by extracting them from the subjects list, or just leave it out for simplicity. Let's just do a simple text filter for semester number instead, or extract unique semesters from the filtered subjects. */}
        <select 
            className="border p-2 rounded w-full md:w-64 focus:ring-2 focus:ring-university-500 outline-none" 
            value={filterSemester} 
            onChange={e => setFilterSemester(e.target.value)}
            disabled={!filterProgram}
        >
            <option value="">All Semesters</option>
            {/* Extract unique semesters for the selected program from the subjects array */}
            {Array.from(new Set(subjects.filter(s => s.program?._id === filterProgram && s.semester).map(s => JSON.stringify({id: s.semester._id, num: s.semester.semesterNumber}))))
                .map(str => JSON.parse(str))
                .sort((a,b) => a.num - b.num)
                .map(sem => <option key={sem.id} value={sem.id}>Semester {sem.num}</option>)
            }
        </select>
        
        <div className="ml-auto text-sm text-gray-500">
            Showing {filteredSubjects.length} subjects
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm uppercase whitespace-nowrap">
                <tr>
                <th className="p-4 border-b">Code</th>
                <th className="p-4 border-b">Name</th>
                <th className="p-4 border-b">Program</th>
                <th className="p-4 border-b">Sem</th>
                <th className="p-4 border-b">Type</th>
                <th className="p-4 border-b text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredSubjects.map(s => (
                <tr key={s._id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-bold whitespace-nowrap">{s.subjectCode}</td>
                    <td className="p-4 font-medium">{s.name}</td>
                    <td className="p-4 text-sm">{s.program?.code}</td>
                    <td className="p-4 text-sm">{s.semester?.semesterNumber}</td>
                    <td className="p-4 text-sm">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">{s.type}</span>
                    </td>
                    <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEditModal(s)} className="text-university-500 hover:bg-university-50 p-2 rounded transition-colors"><Pencil size={18}/></button>
                      <button onClick={() => handleDelete(s._id)} className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors"><Trash2 size={18}/></button>
                    </div>
                    </td>
                </tr>
                ))}
                {filteredSubjects.length === 0 && (
                    <tr>
                        <td colSpan="6" className="p-8 text-center text-gray-500">No subjects found matching the filters.</td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Subject' : 'Add Subject'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <select required className="w-full border p-2 rounded focus:ring-2 focus:ring-university-500 outline-none" value={formData.program} onChange={handleProgramChange}>
                <option value="">Select Program</option>
                {programs.map(p => <option key={p._id} value={p._id}>{p.code}</option>)}
              </select>
              <select required className="w-full border p-2 rounded focus:ring-2 focus:ring-university-500 outline-none" value={formData.semester} onChange={e => setFormData({...formData, semester: e.target.value})} disabled={!formData.program}>
                <option value="">Select Semester</option>
                {semesters.map(s => <option key={s._id} value={s._id}>Sem {s.semesterNumber}</option>)}
              </select>
              <input required placeholder="Subject Code" className="w-full border p-2 rounded focus:ring-2 focus:ring-university-500 outline-none" value={formData.subjectCode} onChange={e => setFormData({...formData, subjectCode: e.target.value})} />
              <input required placeholder="Subject Name" className="w-full border p-2 rounded focus:ring-2 focus:ring-university-500 outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input required type="number" placeholder="Credits" className="w-full border p-2 rounded focus:ring-2 focus:ring-university-500 outline-none" value={formData.credits} onChange={e => setFormData({...formData, credits: e.target.value})} />
              <select required className="w-full border p-2 rounded focus:ring-2 focus:ring-university-500 outline-none" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="Core">Core</option>
                <option value="Elective">Elective</option>
                <option value="Practical">Practical</option>
                <option value="Project">Project</option>
                <option value="Laboratory">Laboratory</option>
              </select>
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