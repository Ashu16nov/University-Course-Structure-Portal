import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, ShieldCheck } from 'lucide-react';

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '', role: 'user', otp: '' });
    const [step, setStep] = useState(1);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleLoginStep = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email: formData.email,
                password: formData.password,
                role: formData.role
            });
            // Proceed to OTP step
            setSuccessMsg(`OTP sent to ${res.data.email}. (Test OTP: ${res.data.otp})`);
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    const handleVerifyStep = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
                email: formData.email,
                otp: formData.otp
            });
            login(res.data, res.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'OTP Verification failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-indigo-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-brand-400/20 blur-[100px]"></div>
                <div className="absolute bottom-[10%] right-[5%] w-[30%] h-[30%] rounded-full bg-indigo-400/20 blur-[80px]"></div>
            </div>

            <div className="bg-white/80 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 w-full max-w-md z-10 relative">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-gradient-to-tr from-brand-500 to-indigo-500 p-4 rounded-2xl mb-5 shadow-lg shadow-brand-500/30 text-white">
                        {step === 1 ? <BookOpen size={36} /> : <ShieldCheck size={36} />}
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                        {step === 1 ? 'Welcome Back' : 'Two-Factor Auth'}
                    </h2>
                    <p className="text-gray-500 mt-2 font-medium">
                        {step === 1 ? 'Log in to your UniApp account' : 'Enter the OTP sent to your email'}
                    </p>
                </div>

                {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-semibold text-center border border-red-100">{error}</div>}
                {successMsg && step === 2 && <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 text-sm font-semibold text-center border border-green-100">{successMsg}</div>}

                {step === 1 ? (
                    <form onSubmit={handleLoginStep} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-3.5 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-medium text-gray-900 placeholder-gray-400" placeholder="hello@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                            <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-5 py-3.5 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-medium text-gray-900 placeholder-gray-400" placeholder="••••••••" />
                        </div>
                        <button type="submit" className="w-full py-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-0.5 mt-2">Sign In</button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyStep} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">One-Time Password</label>
                            <input required type="text" value={formData.otp} onChange={e => setFormData({...formData, otp: e.target.value})} className="w-full px-5 py-3.5 bg-white/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-bold tracking-widest text-center text-gray-900 placeholder-gray-400 text-lg" placeholder="123456" maxLength={6} />
                        </div>
                        <button type="submit" className="w-full py-4 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-0.5 mt-2">Verify OTP & Login</button>
                        <button type="button" onClick={() => { setStep(1); setError(''); setSuccessMsg(''); }} className="w-full py-3 text-brand-600 font-bold hover:bg-brand-50 rounded-xl transition-all">Back to Login</button>
                    </form>
                )}

                {step === 1 && (
                    <div className="mt-8 p-5 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl border border-gray-200/60">
                        <p className="text-[11px] font-extrabold tracking-widest text-gray-500 uppercase mb-4 text-center">Quick Test Access</p>
                        <div className="flex gap-3">
                            <button 
                                type="button"
                                onClick={() => setFormData({ ...formData, email: 'admin@test.com', password: 'password123', role: 'admin' })}
                                className="flex-1 py-2.5 px-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
                            >
                                Admin
                            </button>
                            <button 
                                type="button"
                                onClick={() => setFormData({ ...formData, email: 'user@test.com', password: 'password123', role: 'user' })}
                                className="flex-1 py-2.5 px-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-200 transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
                            >
                                Student
                            </button>
                        </div>
                    </div>
                )}
                <p className="mt-8 text-center text-sm text-gray-500 font-medium">
                    Don't have an account? <Link to="/register" className="text-brand-600 font-bold hover:text-brand-700 transition-colors ml-1 hover:underline underline-offset-4">Create one now</Link>
                </p>
            </div>
        </div>
    );
}
