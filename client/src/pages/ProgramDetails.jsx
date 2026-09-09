import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProgramById, getSemestersByProgram, getSubjectsBySemester } from '../services/api';

export default function ProgramDetails() {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const [subjectsMap, setSubjectsMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const progRes = await getProgramById(id);
        setProgram(progRes.data.data);
        const semRes = await getSemestersByProgram(id);
        const sems = semRes.data.data.sort((a,b) => a.semesterNumber - b.semesterNumber);
        setSemesters(sems);
        
        const subMap = {};
        for (let sem of sems) {
          const subRes = await getSubjectsBySemester(sem._id);
          subMap[sem._id] = subRes.data.data;
        }
        setSubjectsMap(subMap);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="p-12 text-center text-xl text-gray-500">Loading course structure...</div>;
  if (!program) return <div className="p-12 text-center text-xl text-red-500">Program not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-university-900 text-white rounded-2xl p-8 mb-12 shadow-lg">
        <div className="inline-block bg-white text-university-900 font-black px-3 py-1 rounded mb-4">{program.code}</div>
        <h1 className="text-4xl font-extrabold mb-4">{program.name}</h1>
        <p className="text-university-100 text-lg mb-6 max-w-3xl">{program.description}</p>
        <div className="flex gap-6 font-medium text-university-50">
          <div className="bg-university-600 px-4 py-2 rounded-lg">Duration: {program.duration}</div>
          <div className="bg-university-600 px-4 py-2 rounded-lg">Total Semesters: {program.totalSemesters}</div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Course Structure</h2>

      <div className="space-y-8">
        {semesters.map(sem => {
          const subjects = subjectsMap[sem._id] || [];
          const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);

          return (
            <div key={sem._id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Semester {sem.semesterNumber}: {sem.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{sem.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Credits</div>
                  <div className="text-2xl font-black text-university-600">{totalCredits}</div>
                </div>
              </div>
              
              <div className="p-0 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-600 text-sm">
                      <th className="p-4 border-b">Code</th>
                      <th className="p-4 border-b">Subject</th>
                      <th className="p-4 border-b">Type</th>
                      <th className="p-4 border-b text-right">Credits</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map(sub => (
                      <tr key={sub._id} className="hover:bg-gray-50 border-b last:border-0 transition-colors">
                        <td className="p-4 font-mono text-sm text-gray-600">{sub.subjectCode}</td>
                        <td className="p-4 font-medium text-gray-900">
                          {sub.name}
                          <div className="text-xs text-gray-500 mt-1 font-normal line-clamp-1">{sub.description}</div>
                        </td>
                        <td className="p-4 text-sm">
                          <span className={`px-2 py-1 rounded text-xs font-semibold
                            ${sub.type === 'Core' ? 'bg-blue-100 text-blue-800' : 
                               sub.type === 'Elective' ? 'bg-purple-100 text-purple-800' : 
                               sub.type === 'Practical' || sub.type === 'Laboratory' ? 'bg-green-100 text-green-800' : 
                               'bg-gray-100 text-gray-800'}`}>
                            {sub.type}
                          </span>
                        </td>
                        <td className="p-4 text-right font-bold text-gray-700">{sub.credits}</td>
                      </tr>
                    ))}
                    {subjects.length === 0 && (
                      <tr><td colSpan="4" className="p-8 text-center text-gray-500">No subjects assigned to this semester yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}