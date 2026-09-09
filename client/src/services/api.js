import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const adminStr = localStorage.getItem('admin');
        if (adminStr) {
            const admin = JSON.parse(adminStr);
            if (admin.token) {
                config.headers.Authorization = `Bearer ${admin.token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getPrograms = () => api.get('/programs');
export const getProgramById = (id) => api.get(`/programs/${id}`);
export const createProgram = (data) => api.post('/programs', data);
export const updateProgram = (id, data) => api.put(`/programs/${id}`, data);
export const deleteProgram = (id) => api.delete(`/programs/${id}`);

export const getSemesters = () => api.get('/semesters');
export const getSemestersByProgram = (programId) => api.get(`/programs/${programId}/semesters`);
export const getSemesterById = (id) => api.get(`/semesters/${id}`);
export const createSemester = (data) => api.post('/semesters', data);
export const updateSemester = (id, data) => api.put(`/semesters/${id}`, data);
export const deleteSemester = (id) => api.delete(`/semesters/${id}`);

export const getSubjects = () => api.get('/subjects');
export const getSubjectsBySemester = (semesterId) => api.get(`/semesters/${semesterId}/subjects`);
export const createSubject = (data) => api.post('/subjects', data);
export const updateSubject = (id, data) => api.put(`/subjects/${id}`, data);
export const deleteSubject = (id) => api.delete(`/subjects/${id}`);

export const getDashboardStats = () => api.get('/dashboard/stats');
export const loginAdmin = (data) => api.post('/auth/login', data);

export default api;
