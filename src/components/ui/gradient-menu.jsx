import { NavLink } from 'react-router-dom';
import { Home, Info, Calendar, Mic, Users } from 'lucide-react';

const menuItems = [
  { label: 'Home',     to: '/',         icon: Home,     gradientFrom: '#0A7294', gradientTo: '#22B3AD' },
  { label: 'About',    to: '/about',    icon: Info,     gradientFrom: '#a855f7', gradientTo: '#ec4899' },
  { label: 'Events',   to: '/events',   icon: Calendar, gradientFrom: '#FF9966', gradientTo: '#FF5E62' },
  { label: 'Speakers', to: '/speakers', icon: Mic,      gradientFrom: '#56CCF2', gradientTo: '#2F80ED' },
  { label: 'Team',     to: '/team',     icon: Users,    gradientFrom: '#80FF72', gradientTo: '#22B3AD' },
];

/**
 * GradientMenu — pill nav items that collapse to an icon circle and expand
 * to a labeled gradient pill on hover / when the route is active.
 * Designed to sit inline inside the floating Navbar.
 */
export default function GradientMenu() {
  return (
    <ul className="hidden lg:flex items-center gap-2">
      {menuItems.map(({ label, to, icon: Icon, gradientFrom, gradientTo }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          style={{ '--gf': gradientFrom, '--gt': gradientTo }}
        >
          {({ isActive }) => (
            <li
              className={`
                relative flex items-center justify-center cursor-pointer
                rounded-full h-9 overflow-hidden
                transition-all duration-500 ease-in-out
                group
                ${isActive
                  ? 'w-[120px] shadow-none'
                  : 'w-9 bg-white shadow-md hover:w-[120px] hover:shadow-none'
                }
              `}
            >
              {/* Gradient fill */}
              <span
                className={`
                  absolute inset-0 rounded-full
                  bg-[linear-gradient(135deg,var(--gf),var(--gt))]
                  transition-opacity duration-500
                  ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                `}
              />

              {/* Glow */}
              <span
                className={`
                  absolute top-[6px] inset-x-0 h-full rounded-full -z-10
                  bg-[linear-gradient(135deg,var(--gf),var(--gt))]
                  blur-[12px]
                  transition-opacity duration-500
                  ${isActive ? 'opacity-40' : 'opacity-0 group-hover:opacity-40'}
                `}
              />

              {/* Icon — visible when collapsed */}
              <span
                className={`
                  relative z-10 flex items-center justify-center
                  transition-all duration-300
                  ${isActive
                    ? 'scale-0 w-0 opacity-0'
                    : 'scale-100 group-hover:scale-0 group-hover:w-0 group-hover:opacity-0'
                  }
                `}
              >
                <Icon size={16} strokeWidth={2} className="text-slate-500" />
              </span>

              {/* Label — visible when expanded */}
              <span
                className={`
                  absolute z-10 text-white text-[11px] font-bold uppercase tracking-[0.12em]
                  whitespace-nowrap transition-all duration-300 delay-100
                  ${isActive
                    ? 'scale-100 opacity-100'
                    : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                  }
                `}
              >
                {label}
              </span>
            </li>
          )}
        </NavLink>
      ))}
    </ul>
  );
}
