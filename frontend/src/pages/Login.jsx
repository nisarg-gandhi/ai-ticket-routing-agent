import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, AlertCircle } from 'lucide-react';

// ── Logo mark using the new icon ─────────────────────────────────────────────
function TriageLogo() {
  return (
    <div className="flex items-center justify-center gap-2.5 mb-8 select-none">
      <img src="/icon.svg" alt="Triage" className="w-8 h-8" />
      <span className="text-[1.15rem] font-semibold tracking-tight text-[#0F0F0F]">Triage</span>
    </div>
  );
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userData = await login(email, password);
      if (userData.role === 'admin' || userData.role === 'agent') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/user/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Failed to login');
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page min-h-screen flex items-center justify-center px-4 font-sans antialiased"
      style={{ backgroundColor: '#F7F3EE' }}>

      {/* ── Auth card ─────────────────────────────────────────────────────── */}
      <div className="w-full max-w-md">
        <div className="bg-white border border-[#E8E2DA] shadow-sm rounded-2xl px-8 py-10 sm:px-10">

          {/* Wordmark */}
          <TriageLogo />

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-[#0F0F0F]">
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-[#6B6560]">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200
              bg-red-50 px-4 py-3 text-sm text-red-600">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-xs font-medium text-[#6B6560] mb-1.5 uppercase tracking-wider">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-[#6B6560]" />
                </div>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm
                    bg-white border border-[#E8E2DA]
                    text-[#0F0F0F] placeholder-[#6B6560]
                    focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/30
                    transition-colors duration-150"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block text-xs font-medium text-[#6B6560] mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-[#6B6560]" />
                </div>
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm
                    bg-white border border-[#E8E2DA]
                    text-[#0F0F0F] placeholder-[#6B6560]
                    focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]/30
                    transition-colors duration-150"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                id="login-submit"
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white
                  bg-[#7C3AED] hover:bg-[#6D28D9]
                  shadow-md shadow-[#7C3AED]/20 hover:shadow-[#7C3AED]/30
                  transition-all duration-200 hover:-translate-y-0.5
                  disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
                  cursor-pointer"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          {/* Footer link */}
          <p className="mt-7 text-center text-sm text-[#6B6560]">
            Don&apos;t have an account?{' '}
            <Link
              to="/register"
              className="text-[#7C3AED] hover:text-[#6D28D9] transition-colors duration-150 font-medium"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
