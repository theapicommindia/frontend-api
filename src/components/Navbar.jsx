import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Info, Calendar, Mic, Users, ArrowRight, ExternalLink } from 'lucide-react';
import GradientMenu from './ui/gradient-menu';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Events', to: '/events' },
  { label: 'Speakers', to: '/speakers' },
  { label: 'Team', to: '/team' },
];

const navItemsWithIcons = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'About', to: '/about', icon: Info },
  { label: 'Events', to: '/events', icon: Calendar },
  { label: 'Speakers', to: '/speakers', icon: Mic },
  { label: 'Team', to: '/team', icon: Users },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToForm = () => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      let n = 0;
      const t = setInterval(() => {
        const el = document.getElementById('join-form');
        if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); clearInterval(t); }
        if (++n > 20) clearInterval(t);
      }, 100);
    } else {
      setTimeout(() => {
        document.getElementById('join-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  };

  return (
    <>
      {/* ─── FLOATING PILL NAVBAR ─── */}
      <div className="fixed top-0 inset-x-0 z-[100] flex justify-center pt-4 px-6 pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className={`
            pointer-events-auto w-fit
            flex items-center gap-1
            bg-white/90 backdrop-blur-xl
            border border-slate-200/80
            rounded-full px-2 py-2
            transition-shadow duration-500
            ${scrolled
              ? 'shadow-[0_8px_30px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.06)]'
              : 'shadow-[0_4px_20px_rgba(0,0,0,0.07),0_1px_4px_rgba(0,0,0,0.04)]'
            }
          `}
        >

          {/* ── LOGO CIRCLE (left) ── */}
          <Link
            to="/"
            className="
              flex-shrink-0 w-11 h-11 rounded-full
              bg-gradient-to-br from-[#0A7294] to-[#22B3AD]
              flex items-center justify-center
              shadow-[0_3px_12px_rgba(10,114,148,0.45)]
              transition-transform duration-300 hover:scale-110
            "
            aria-label="Home"
          >
            <img src="/logo.png" alt="The API Community" className="w-7 h-7 object-contain drop-shadow-sm" />
          </Link>

          {/* ── GRADIENT PILL NAV LINKS (center) ── */}
          <GradientMenu />

          {/* ── RIGHT PILL CTAs ── */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            {/* Join Community — outlined pill */}
            <button
              onClick={scrollToForm}
              className="
                relative overflow-hidden group
                border border-slate-200 text-slate-700
                rounded-full px-5 py-1.5
                text-[12px] font-bold uppercase tracking-wider
                transition-all duration-300
                hover:border-[#0A7294] hover:text-[#0A7294]
                hover:shadow-[0_0_16px_rgba(10,114,148,0.12)]
                cursor-pointer
              "
            >
              Join Community
            </button>

            {/* API CONF — filled gradient pill */}
            <a
              href="https://www.theapiconf.com"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-1.5
                bg-gradient-to-r from-[#0A7294] to-[#22B3AD]
                text-white rounded-full px-5 py-1.5
                text-[12px] font-bold uppercase tracking-wider
                transition-all duration-300
                hover:shadow-[0_4px_16px_rgba(10,114,148,0.4)]
                hover:-translate-y-0.5
                whitespace-nowrap
              "
            >
              THE API CONF
              <ExternalLink size={11} />
            </a>
          </div>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            className="
              lg:hidden ml-auto w-9 h-9
              flex items-center justify-center rounded-full
              bg-slate-100 hover:bg-slate-200
              transition-colors duration-200 cursor-pointer
            "
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <div className="flex flex-col items-center justify-center w-4 h-3 gap-[4px]">
              <motion.span animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="w-full h-[1.5px] bg-slate-700 rounded-full block origin-center" />
              <motion.span animate={isOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                className="w-[70%] h-[1.5px] bg-slate-700 rounded-full block" />
              <motion.span animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="w-full h-[1.5px] bg-slate-700 rounded-full block origin-center" />
            </div>
          </button>

        </motion.nav>
      </div>

      {/* ─── MOBILE DROPDOWN ─── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[80] bg-slate-900/20 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="
                fixed top-[72px] left-4 right-4 z-[90] lg:hidden
                bg-white/95 backdrop-blur-xl
                rounded-[1.5rem]
                shadow-[0_20px_50px_rgba(0,0,0,0.1)]
                border border-slate-100
                p-2 flex flex-col gap-0.5
              "
            >
              {navItemsWithIcons.map(({ label, to, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive ? 'bg-[#0A7294]/8 text-[#0A7294]' : 'text-slate-600 hover:bg-slate-50'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={17} strokeWidth={isActive ? 2.5 : 2}
                        className={isActive ? 'text-[#22B3AD]' : 'text-slate-400'} />
                      <span className={`text-[15px] font-bold ${isActive ? 'text-[#0A7294]' : 'text-slate-700'}`}>
                        {label}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}

              <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex flex-col gap-2 px-1 pb-1">
                <button
                  onClick={scrollToForm}
                  className="w-full border border-slate-200 text-slate-700 py-3 px-4 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Join Community <ArrowRight size={15} />
                </button>
                <a
                  href="https://www.theapiconf.com"
                  target="_blank" rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-[#0A7294] to-[#22B3AD] text-white py-3 px-4 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2"
                >
                  THE API CONF 2026 <ExternalLink size={13} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;