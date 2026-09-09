import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from './pages/Home';
import Programs from './pages/Programs';
import ProgramDetails from './pages/ProgramDetails';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManagePrograms from './pages/ManagePrograms';
import ManageSemesters from './pages/ManageSemesters';
import ManageSubjects from './pages/ManageSubjects';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="programs" element={<Programs />} />
          <Route path="programs/:id" element={<ProgramDetails />} />
        </Route>

        <Route path="/admin" element={<AdminLogin />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="programs" element={<ManagePrograms />} />
          <Route path="semesters" element={<ManageSemesters />} />
          <Route path="subjects" element={<ManageSubjects />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;