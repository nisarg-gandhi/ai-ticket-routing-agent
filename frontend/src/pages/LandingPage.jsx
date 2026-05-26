import { useNavigate } from 'react-router-dom';

// ── Icons (inline SVGs, no extra deps) ──────────────────────────────────────

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3 L13.5 8.5 L19 10 L13.5 11.5 L12 17 L10.5 11.5 L5 10 L10.5 8.5 Z" />
    <path d="M19 3 l.9 2.6 2.6.9-2.6.9L19 10l-.9-2.6-2.6-.9 2.6-.9Z" />
    <path d="M5 17l.7 2 2 .7-2 .7L5 22l-.7-2-2-.7 2-.7Z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const FlagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

// ── Feature data ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: <SparklesIcon />,
    title: 'AI Classification',
    description: "Automatically categorizes tickets using Groq's LLaMA model.",
    accent: 'from-indigo-500/20 to-violet-500/10',
    iconColor: 'text-indigo-400',
    borderColor: 'border-indigo-500/20',
    glowColor: 'group-hover:shadow-indigo-500/10',
  },
  {
    icon: <ShieldCheckIcon />,
    title: 'Confidence Scoring',
    description: 'Every routing decision comes with a confidence score and reasoning.',
    accent: 'from-violet-500/20 to-purple-500/10',
    iconColor: 'text-violet-400',
    borderColor: 'border-violet-500/20',
    glowColor: 'group-hover:shadow-violet-500/10',
  },
  {
    icon: <FlagIcon />,
    title: 'Needs Review Flagging',
    description: 'Low confidence tickets are automatically flagged for human review.',
    accent: 'from-purple-500/20 to-pink-500/10',
    iconColor: 'text-purple-400',
    borderColor: 'border-purple-500/20',
    glowColor: 'group-hover:shadow-purple-500/10',
  },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function Nav({ onLogin, onRegister }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 h-16
      border-b border-white/[0.06] bg-[#0d0f14]/80 backdrop-blur-xl">

      {/* Wordmark */}
      <div className="flex items-center gap-2 select-none">
        {/* Logo mark */}
        <span className="flex items-center justify-center w-7 h-7 rounded-lg
          bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 1L9 5.5H13L9.5 8.5L11 13L7 10.5L3 13L4.5 8.5L1 5.5H5L7 1Z"
              fill="white" fillOpacity="0.95" />
          </svg>
        </span>
        <span className="text-[1.05rem] font-semibold tracking-tight text-white">Triage</span>
      </div>

      {/* Actions */}
      <nav className="flex items-center gap-3">
        <button
          id="nav-sign-in"
          onClick={onLogin}
          className="px-4 py-1.5 text-sm font-medium text-slate-300 rounded-lg
            hover:text-white hover:bg-white/[0.06]
            transition-all duration-200 cursor-pointer"
        >
          Sign in
        </button>
        <button
          id="nav-get-started"
          onClick={onRegister}
          className="px-4 py-1.5 text-sm font-semibold text-white rounded-lg
            bg-indigo-600 hover:bg-indigo-500
            shadow-md shadow-indigo-500/20
            transition-all duration-200 cursor-pointer"
        >
          Get started
        </button>
      </nav>
    </header>
  );
}

function HeroBadge() {
  return (
    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold
      text-indigo-300 bg-indigo-500/10 border border-indigo-500/20
      ring-1 ring-inset ring-indigo-500/10 select-none">
      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
      AI-powered ticket routing
    </span>
  );
}

function FeatureCard({ icon, title, description, accent, iconColor, borderColor, glowColor }) {
  return (
    <div className={`group relative flex flex-col gap-4 p-6 rounded-2xl border ${borderColor}
      bg-gradient-to-br ${accent} backdrop-blur-sm
      hover:shadow-xl ${glowColor}
      transition-all duration-300 hover:-translate-y-1`}>

      {/* Subtle top highlight */}
      <div className="absolute inset-x-0 top-0 h-px rounded-t-2xl
        bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className={`flex items-center justify-center w-10 h-10 rounded-xl
        bg-white/[0.06] border border-white/[0.08] ${iconColor}
        group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>

      <div>
        <h3 className="text-base font-semibold text-white mb-1.5">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-400">{description}</p>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const navigate = useNavigate();

  const goLogin    = () => navigate('/login');
  const goRegister = () => navigate('/register');

  return (
    // Force dark background regardless of system / app theme
    <div className="min-h-screen bg-[#0d0f14] text-white overflow-x-hidden font-sans antialiased">

      {/* ── Ambient background glows ───────────────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Top-left glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full
          bg-indigo-600/10 blur-[120px]" />
        {/* Top-right glow */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full
          bg-violet-600/8 blur-[100px]" />
        {/* Bottom glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full
          bg-indigo-900/20 blur-[120px]" />
      </div>

      {/* ── Nav ────────────────────────────────────────────────────────── */}
      <Nav onLogin={goLogin} onRegister={goRegister} />

      <main>
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <section
          id="hero"
          className="relative flex flex-col items-center justify-center text-center
            px-6 pt-40 pb-28 md:pt-48 md:pb-36">

          {/* Subtle grid overlay */}
          <div aria-hidden="true"
            className="absolute inset-0 bg-[image:radial-gradient(circle,rgba(255,255,255,0.03)_1px,transparent_1px)]
              [background-size:32px_32px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-8">

            <HeroBadge />

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]
              bg-gradient-to-b from-white via-white/95 to-slate-400 bg-clip-text text-transparent">
              Route every ticket to the<br className="hidden md:block" />
              right team,{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                instantly
              </span>
            </h1>

            <p className="max-w-xl text-base md:text-lg text-slate-400 leading-relaxed">
              Triage uses AI to classify support tickets, score confidence, and route
              them to the right agent — so nothing falls through the cracks.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                id="hero-get-started"
                onClick={goRegister}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-white
                  bg-indigo-600 hover:bg-indigo-500
                  shadow-lg shadow-indigo-500/25
                  transition-all duration-200 hover:shadow-indigo-500/40 hover:-translate-y-0.5
                  cursor-pointer w-full sm:w-auto"
              >
                Get started free
              </button>
              <button
                id="hero-sign-in"
                onClick={goLogin}
                className="px-6 py-3 rounded-xl text-sm font-semibold text-slate-300
                  bg-white/[0.06] border border-white/[0.08]
                  hover:bg-white/[0.10] hover:text-white
                  transition-all duration-200 hover:-translate-y-0.5
                  cursor-pointer w-full sm:w-auto"
              >
                Sign in
              </button>
            </div>
          </div>
        </section>

        {/* ── Features strip ─────────────────────────────────────────── */}
        <section
          id="features"
          className="relative px-6 pb-28 md:pb-36">

          {/* Divider line */}
          <div className="max-w-5xl mx-auto mb-12 h-px bg-gradient-to-r
            from-transparent via-white/10 to-transparent" />

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map((feat) => (
              <FeatureCard key={feat.title} {...feat} />
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="relative border-t border-white/[0.06] py-8 text-center">
        <p className="text-sm text-slate-500 select-none">© 2026 Triage</p>
      </footer>
    </div>
  );
}
