import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MapPin, Bell, BookOpen, Phone, LogIn, BarChart as ChartBar, UserPlus, LogOut, Menu, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Auth from './Auth';

const Navbar = () => {
  const location = useLocation();
  const currentPage = location.pathname.slice(1) || 'home';
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<null | import('@supabase/supabase-js').User>(null);

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
  setUser(null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 const handleSignOut = async () => {
  await supabase.auth.signOut();
  setUser(null); // This works if your user state allows null
};

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: "/", icon: <Home size={18} />, text: "Home" },
    { to: "/map", icon: <MapPin size={18} />, text: "Safety Map" },
    { to: "/alerts", icon: <Bell size={18} />, text: "Alerts" },
    { to: "/stats", icon: <ChartBar size={18} />, text: "Statistics" },
    { to: "/about", icon: <BookOpen size={18} />, text: "About" },
    { to: "/contact", icon: <Phone size={18} />, text: "Contact" }
  ];

  return (
    <>
      <nav className="bg-purple-900/90 backdrop-blur-sm fixed w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link 
              to="/"
              className="text-white font-bold text-2xl cursor-pointer"
            >
              AuraZone
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.to}
                to={link.to}
                icon={link.icon}
                text={link.text}
                active={currentPage === link.to.slice(1) || (link.to === '/' && currentPage === 'home')}
              />
            ))}
            {user ? (
              <button 
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 border border-white/20 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
              >
                <LogOut size={18} className="text-white" />
                <span className="text-white">Sign Out</span>
              </button>
            ) : (
              <button 
                onClick={() => setShowAuth(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-white/20 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
              >
                <LogIn size={18} className="text-white" />
                <span className="text-white">Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-purple-200 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[72px] bg-purple-900/95 backdrop-blur-sm">
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    currentPage === link.to.slice(1) || (link.to === '/' && currentPage === 'home')
                      ? 'bg-purple-800 text-white'
                      : 'text-purple-200 hover:bg-purple-800/50 hover:text-white'
                  }`}
                >
                  {link.icon}
                  <span>{link.text}</span>
                </Link>
              ))}
              {user ? (
                <button 
                  onClick={() => {
                    handleSignOut();
                    closeMenu();
                  }}
                  className="flex items-center space-x-3 p-3 w-full rounded-lg text-purple-200 hover:bg-purple-800/50 hover:text-white transition-colors"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setShowAuth(true);
                    closeMenu();
                  }}
                  className="flex items-center space-x-3 p-3 w-full rounded-lg text-purple-200 hover:bg-purple-800/50 hover:text-white transition-colors"
                >
                  <LogIn size={18} />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
}

const NavLink = ({ to, icon, text, active }: NavLinkProps) => (
  <Link 
    to={to}
    className={`flex items-center space-x-2 transition-colors ${
      active ? 'text-white' : 'text-white/80 hover:text-white'
    }`}
  >
    {icon}
    <span>{text}</span>
  </Link>
);

export default Navbar;