import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// ── Palette (warm light theme) ────────────────────────────────────────────────
// #F7F3EE warm off-white bg | #0F0F0F text | #6B6560 muted | #7C3AED accent

// ── Icons ────────────────────────────────────────────────────────────────────

const LogoMark = () => (
  <img src="/icon.svg" alt="Triage" style={{ width: 28, height: 28, flexShrink: 0 }} />
);

const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

// Step icons
const SubmitIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const BrainIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

const CheckSquareIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

// Feature icons
const SparklesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3 L13.5 8.5 L19 10 L13.5 11.5 L12 17 L10.5 11.5 L5 10 L10.5 8.5 Z" />
    <path d="M19 3 l.9 2.6 2.6.9-2.6.9L19 10l-.9-2.6-2.6-.9 2.6-.9Z" />
  </svg>
);

const RouteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" />
  </svg>
);

const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

// ── Styled Div Mockups ────────────────────────────────────────────────────────

function AIMockup() {
  return (
    <div style={{ background: '#fff', border: '1px solid #E8E2DA', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.07)' }}>
      {/* Header */}
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #F0EBE4', background: '#FDFAF7' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7C3AED' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#0F0F0F', letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI Analysis</span>
        </div>
      </div>
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Badges row */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[{ label: 'Category', value: 'Billing', bg: '#EEF2FF', color: '#4338CA' },
            { label: 'Urgency', value: 'High', bg: '#FEF3C7', color: '#92400E' },
            { label: 'Sentiment', value: 'Negative', bg: '#FEE2E2', color: '#991B1B' }].map(b => (
            <div key={b.label} style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '8px 12px', background: '#FAFAF9', border: '1px solid #F0EBE4', borderRadius: 10 }}>
              <span style={{ fontSize: 10, color: '#6B6560', fontWeight: 500 }}>{b.label}</span>
              <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: b.bg, color: b.color }}>{b.value}</span>
            </div>
          ))}
        </div>
        {/* Confidence bar */}
        <div style={{ borderTop: '1px solid #F0EBE4', paddingTop: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: '#6B6560', fontWeight: 500 }}>Confidence Score</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#0F0F0F' }}>87%</span>
          </div>
          <div style={{ background: '#E8E2DA', borderRadius: 999, height: 8, overflow: 'hidden' }}>
            <div style={{ width: '87%', height: '100%', background: 'linear-gradient(90deg, #7C3AED, #5B21B6)', borderRadius: 999 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function AgentMockup() {
  return (
    <div style={{ background: '#fff', border: '1px solid #E8E2DA', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.07)' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #F0EBE4', background: '#FDFAF7' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#0F0F0F', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Assigned Agent</span>
        </div>
      </div>
      <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* AI Suggestion banner */}
        <div style={{ background: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: 10, padding: '10px 14px' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#4338CA', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            AI Suggestion
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0F0F0F' }}>Sarah Chen</div>
              <div style={{ fontSize: 11, color: '#6B6560' }}>sarah@support.co</div>
            </div>
            <div style={{ background: '#7C3AED', color: '#fff', fontSize: 11, fontWeight: 600, padding: '5px 12px', borderRadius: 8 }}>Accept</div>
          </div>
        </div>
        {/* Assigned */}
        <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#0F0F0F' }}>Marcus Rodriguez</div>
            <div style={{ fontSize: 11, color: '#059669', fontWeight: 500 }}>Assigned · AI Suggested</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QueueMockup() {
  const tickets = [
    { subject: 'Refund not processed', status: 'Open', urgency: 'High', bg: '#FEF3C7', color: '#92400E' },
    { subject: 'Billing cycle question', status: 'In Progress', urgency: 'Medium', bg: '#DBEAFE', color: '#1E40AF' },
    { subject: 'Account access issue', status: 'Open', urgency: 'Critical', bg: '#FEE2E2', color: '#991B1B' },
  ];
  return (
    <div style={{ background: '#fff', border: '1px solid #E8E2DA', borderRadius: 16, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.07)' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid #F0EBE4', background: '#FDFAF7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B82F6' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#0F0F0F', letterSpacing: '0.08em', textTransform: 'uppercase' }}>My Queue</span>
        </div>
        <span style={{ fontSize: 11, background: '#EEF2FF', color: '#4338CA', fontWeight: 600, padding: '2px 8px', borderRadius: 999 }}>3 tickets</span>
      </div>
      <div style={{ padding: '8px 0' }}>
        {tickets.map((t, i) => (
          <div key={i} style={{ padding: '10px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i < tickets.length - 1 ? '1px solid #F7F3EE' : 'none' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#0F0F0F', marginBottom: 2 }}>{t.subject}</div>
              <span style={{ fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 999, background: t.bg, color: t.color }}>{t.status}</span>
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: t.bg, color: t.color, marginLeft: 8 }}>{t.urgency}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Browser Mockup Frame for hero ─────────────────────────────────────────────

function BrowserMockup() {
  return (
    <div style={{
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: '0 24px 80px rgba(0,0,0,0.14), 0 4px 16px rgba(0,0,0,0.08)',
      border: '1px solid #E8E2DA',
      maxWidth: 820,
      width: '100%',
    }}>
      {/* Browser chrome */}
      <div style={{ background: '#F0EBE4', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #E8E2DA' }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#FF5F57','#FEBC2E','#28C840'].map((c, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, background: '#FDFAF7', border: '1px solid #E8E2DA', borderRadius: 6, padding: '4px 12px', fontSize: 11, color: '#6B6560' }}>
          app.triage.ai/admin/tickets/42
        </div>
      </div>
      {/* Simulated ticket detail UI */}
      <div style={{ background: '#F8F4EF', padding: 20, display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
        {/* Left col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Ticket header */}
          <div style={{ background: '#fff', border: '1px solid #E8E2DA', borderRadius: 14, padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0F0F0F' }}>Charged twice for same subscription</div>
              <span style={{ background: '#DBEAFE', color: '#1E40AF', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999 }}>Open</span>
            </div>
            <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#6B6560' }}>
              <span>👤 Alex Johnson</span>
              <span>✉ alex@company.co</span>
              <span>🕐 May 26, 2026</span>
            </div>
          </div>
          {/* Message */}
          <div style={{ background: '#fff', border: '1px solid #E8E2DA', borderRadius: 14, padding: 18 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#6B6560', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Original Message</div>
            <div style={{ background: '#FDFAF7', border: '1px solid #F0EBE4', borderRadius: 10, padding: 14, fontSize: 12, color: '#4A4540', lineHeight: 1.6 }}>
              Hi, I noticed that I was charged twice this month for my Pro subscription. I only have one account. Please could you look into this and issue a refund for the duplicate charge?
            </div>
          </div>
          {/* Draft response */}
          <div style={{ background: 'linear-gradient(135deg, #EEF2FF, #F5F3FF)', border: '1px solid #C7D2FE', borderRadius: 14, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#7C3AED', letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI Draft Response</span>
            </div>
            <div style={{ fontSize: 12, color: '#4338CA', lineHeight: 1.6 }}>
              Hi Alex, I can see the duplicate charge on your account and I'm sorry for the inconvenience. I'll initiate a refund for the extra charge within 3-5 business days...
            </div>
          </div>
        </div>
        {/* Right col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <AIMockup />
          <AgentMockup />
        </div>
      </div>
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

function Nav({ onLogin, onRegister }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-shadow duration-300"
      style={{
        background: '#F7F3EE',
        borderBottom: '1px solid #E8E2DA',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <LogoMark />
          <span style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#0F0F0F' }}>Triage</span>
        </div>

        {/* Center nav */}
        <nav style={{ display: 'flex', gap: 2, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
          className="hidden md:flex">
          {[
            { label: 'How it works', target: 'how-it-works' },
            { label: 'Features', target: 'features' },
            { label: 'Pricing', target: 'pricing' },
          ].map(item => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.target)}
              style={{
                padding: '6px 14px', borderRadius: 8, fontSize: 14, fontWeight: 500,
                color: '#6B6560', background: 'transparent', border: 'none', cursor: 'pointer',
                transition: 'color 0.15s, background 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#0F0F0F'; e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = '#6B6560'; e.currentTarget.style.background = 'transparent'; }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            id="nav-sign-in"
            onClick={onLogin}
            style={{
              padding: '7px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500,
              color: '#6B6560', background: 'transparent', border: '1px solid transparent', cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#0F0F0F'; e.currentTarget.style.borderColor = '#E8E2DA'; e.currentTarget.style.background = '#FFFFFF'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6B6560'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = 'transparent'; }}
          >
            Sign in
          </button>
          <button
            id="nav-get-started"
            onClick={onRegister}
            style={{
              padding: '7px 18px', borderRadius: 8, fontSize: 14, fontWeight: 600,
              color: '#fff', background: '#7C3AED', border: 'none', cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(124,58,237,0.3)',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#6D28D9'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(124,58,237,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#7C3AED'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(124,58,237,0.3)'; }}
          >
            Get started free
          </button>
        </div>
      </div>
    </header>
  );
}

// ── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 16 }}>
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: '#7C3AED',
        padding: '4px 12px', background: 'rgba(124,58,237,0.08)',
        borderRadius: 999, border: '1px solid rgba(124,58,237,0.15)',
      }}>
        {children}
      </span>
    </div>
  );
}

// ── How It Works steps ────────────────────────────────────────────────────────

const STEPS = [
  {
    number: '01',
    icon: <SubmitIcon />,
    title: 'Customer submits a ticket',
    desc: 'A support request comes in via your portal. No manual sorting needed.',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.06)',
    border: 'rgba(124,58,237,0.15)',
  },
  {
    number: '02',
    icon: <BrainIcon />,
    title: 'AI classifies and routes',
    desc: 'Triage analyzes the message, assigns a category, urgency, and confidence score, then suggests the best available agent.',
    color: '#0EA5E9',
    bg: 'rgba(14,165,233,0.06)',
    border: 'rgba(14,165,233,0.15)',
  },
  {
    number: '03',
    icon: <CheckSquareIcon />,
    title: 'Agent resolves it',
    desc: 'The assigned agent sees it in their queue, uses the AI draft response, and resolves it faster.',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.06)',
    border: 'rgba(16,185,129,0.15)',
  },
];

// ── Features data ─────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: <SparklesIcon />,
    iconColor: '#7C3AED',
    iconBg: 'rgba(124,58,237,0.08)',
    title: 'AI Classification',
    desc: "Every incoming ticket is automatically analyzed using Groq's LLaMA model. It extracts category, urgency level, and customer sentiment — in under a second.",
    mockup: <AIMockup />,
    reverse: false,
  },
  {
    icon: <RouteIcon />,
    iconColor: '#0EA5E9',
    iconBg: 'rgba(14,165,233,0.08)',
    title: 'Smart Agent Routing',
    desc: "Triage matches each ticket to the best available agent based on their specialization and current workload. The AI suggestion appears right in the admin view — one click to confirm.",
    mockup: <AgentMockup />,
    reverse: true,
  },
  {
    icon: <ZapIcon />,
    iconColor: '#10B981',
    iconBg: 'rgba(16,185,129,0.08)',
    title: 'Real-time Updates',
    desc: "Agents see new assignments land in their queue the moment they happen — no refresh needed. Server-sent events keep every view live, so nothing slips through.",
    mockup: <QueueMockup />,
    reverse: false,
  },
];

// ── Main page ─────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const navigate = useNavigate();
  const goLogin    = () => navigate('/login');
  const goRegister = () => navigate('/register');

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#F7F3EE', color: '#0F0F0F', fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif", overflowX: 'hidden' }}>

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <Nav onLogin={goLogin} onRegister={goRegister} />

      <main>
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section
          id="hero"
          style={{
            paddingTop: 120,
            paddingBottom: 80,
            background: 'linear-gradient(180deg, #F7F3EE 0%, #EDE8E2 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle warm grid */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.04) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }} />

          <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>
            {/* Badge */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 16px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                color: '#7C3AED', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED', animation: 'pulse 2s infinite' }} />
                Now live — AI-powered ticket routing
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              textAlign: 'center', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800,
              letterSpacing: '-0.03em', lineHeight: 1.1, color: '#0F0F0F',
              marginBottom: 24,
            }}>
              AI-powered support,<br />
              <span style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                routed instantly.
              </span>
            </h1>

            {/* Sub */}
            <p style={{
              textAlign: 'center', maxWidth: 560, margin: '0 auto 36px',
              fontSize: 18, lineHeight: 1.65, color: '#6B6560', fontWeight: 400,
            }}>
              Triage classifies every ticket, scores confidence, and assigns the right agent automatically — so nothing falls through the cracks.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 64 }}>
              <button
                id="hero-get-started"
                onClick={goRegister}
                style={{
                  padding: '13px 28px', borderRadius: 10, fontSize: 15, fontWeight: 700,
                  color: '#fff', background: '#7C3AED', border: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(124,58,237,0.35)',
                  transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#6D28D9'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(124,58,237,0.45)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#7C3AED'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,58,237,0.35)'; }}
              >
                Get started free <ArrowRightIcon />
              </button>
              <button
                id="hero-how-it-works"
                onClick={scrollToHowItWorks}
                style={{
                  padding: '13px 28px', borderRadius: 10, fontSize: 15, fontWeight: 600,
                  color: '#0F0F0F', background: '#FFFFFF', border: '1px solid #E8E2DA', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#7C3AED'; e.currentTarget.style.color = '#7C3AED'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8E2DA'; e.currentTarget.style.color = '#0F0F0F'; e.currentTarget.style.transform = ''; }}
              >
                See how it works
              </button>
            </div>

            {/* Hero browser mockup */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <BrowserMockup />
            </div>
          </div>
        </section>

        {/* ── How It Works ────────────────────────────────────────────── */}
        <section
          id="how-it-works"
          style={{ padding: '96px 24px', background: '#F7F3EE' }}
        >
          <div style={{ maxWidth: 1140, margin: '0 auto' }}>
            <SectionLabel>How it works</SectionLabel>
            <h2 style={{
              textAlign: 'center', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700,
              letterSpacing: '-0.025em', color: '#0F0F0F', marginBottom: 12,
            }}>
              From ticket to resolution in three steps
            </h2>
            <p style={{ textAlign: 'center', color: '#6B6560', maxWidth: 480, margin: '0 auto 64px', fontSize: 16, lineHeight: 1.6 }}>
              No configuration. No routing rules. Just connect and watch tickets flow to the right people.
            </p>

            {/* Steps grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, position: 'relative' }}>
              {STEPS.map((step, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  {/* Connector line (desktop) */}
                  {i < STEPS.length - 1 && (
                    <div style={{
                      position: 'absolute', top: 36, right: -12, width: 24, height: 1,
                      background: `linear-gradient(90deg, ${step.border}, transparent)`,
                      display: 'none',
                    }} className="hidden lg:block" />
                  )}
                  <div style={{
                    background: '#FFFFFF', border: `1px solid #E8E2DA`,
                    borderRadius: 16, padding: 28, height: '100%',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.07)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                        background: step.bg, border: `1px solid ${step.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: step.color,
                      }}>
                        {step.icon}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: step.color, fontVariantNumeric: 'tabular-nums' }}>{step.number}</span>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F0F0F', marginBottom: 8, lineHeight: 1.3 }}>{step.title}</h3>
                    <p style={{ fontSize: 14, color: '#6B6560', lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Features ────────────────────────────────────────────────── */}
        <section
          id="features"
          style={{ padding: '96px 24px', background: '#EDE8E2' }}
        >
          <div style={{ maxWidth: 1140, margin: '0 auto' }}>
            <SectionLabel>Features</SectionLabel>
            <h2 style={{
              textAlign: 'center', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700,
              letterSpacing: '-0.025em', color: '#0F0F0F', marginBottom: 12,
            }}>
              Everything your support team needs
            </h2>
            <p style={{ textAlign: 'center', color: '#6B6560', maxWidth: 480, margin: '0 auto 80px', fontSize: 16, lineHeight: 1.6 }}>
              Triage handles the routing so your agents can focus on what they do best — helping customers.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
              {FEATURES.map((feat, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 48,
                    alignItems: 'center',
                  }}
                >
                  {/* Text block */}
                  <div style={{ order: feat.reverse ? 2 : 1 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12, marginBottom: 20,
                      background: feat.iconBg, border: `1px solid ${feat.iconBg.replace('0.08', '0.25')}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: feat.iconColor,
                    }}>
                      {feat.icon}
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0F0F0F', marginBottom: 12, letterSpacing: '-0.02em' }}>
                      {feat.title}
                    </h3>
                    <p style={{ fontSize: 15, color: '#6B6560', lineHeight: 1.7, marginBottom: 20 }}>
                      {feat.desc}
                    </p>
                    <a
                      href="#"
                      onClick={e => e.preventDefault()}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: 14, fontWeight: 600, color: feat.iconColor,
                        textDecoration: 'none', transition: 'gap 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                      onMouseLeave={e => e.currentTarget.style.gap = '6px'}
                    >
                      Learn more <ChevronRightIcon />
                    </a>
                  </div>
                  {/* Mockup */}
                  <div style={{ order: feat.reverse ? 1 : 2 }}>
                    {feat.mockup}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing anchor (placeholder for anchor link) */}
        <div id="pricing" />

        {/* ── Bottom CTA ──────────────────────────────────────────────── */}
        <section style={{ background: '#F7F3EE', padding: '96px 24px' }}>
          <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800,
              letterSpacing: '-0.03em', color: '#0F0F0F', marginBottom: 16, lineHeight: 1.15,
            }}>
              Start routing smarter today
            </h2>
            <p style={{ fontSize: 17, color: '#6B6560', marginBottom: 40, lineHeight: 1.6 }}>
              Set up in minutes. No credit card required.
            </p>
            <button
              id="cta-get-started"
              onClick={goRegister}
              style={{
                padding: '15px 36px', borderRadius: 10, fontSize: 16, fontWeight: 700,
                color: '#fff', background: '#7C3AED', border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 24px rgba(124,58,237,0.35)',
                transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: 10,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#6D28D9'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 36px rgba(124,58,237,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#7C3AED'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 24px rgba(124,58,237,0.35)'; }}
            >
              Get started free <ArrowRightIcon />
            </button>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer style={{ background: '#F7F3EE', borderTop: '1px solid #E8E2DA', padding: '48px 24px' }}>
        <div style={{
          maxWidth: 1140, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40, alignItems: 'start',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <LogoMark />
              <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0F0F0F' }}>Triage</span>
            </div>
            <p style={{ fontSize: 13, color: '#6B6560', lineHeight: 1.6 }}>AI-powered support routing</p>
          </div>

          {/* Product links */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#0F0F0F', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Product</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['How it works', 'Features'].map(label => (
                <a key={label} href={`#${label.toLowerCase().replace(' ', '-')}`}
                  style={{ fontSize: 14, color: '#6B6560', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#0F0F0F'}
                  onMouseLeave={e => e.currentTarget.style.color = '#6B6560'}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#0F0F0F', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Company</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="https://github.com/nisarg-gandhi/triage-app" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 14, color: '#6B6560', textDecoration: 'none', transition: 'color 0.15s', display: 'flex', alignItems: 'center', gap: 6 }}
                onMouseEnter={e => e.currentTarget.style.color = '#0F0F0F'}
                onMouseLeave={e => e.currentTarget.style.color = '#6B6560'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
            <p style={{ fontSize: 13, color: '#9E9590' }}>© 2026 Triage</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
