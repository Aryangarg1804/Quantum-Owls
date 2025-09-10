
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, ShoppingCart, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import Translated from '@/components/Translated';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, translate } = useLanguage();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { name: 'Home', nameHi: 'होम', path: '/' },
    { name: 'Government Schemes', nameHi: 'सरकारी योजनाएँ', path: '/government-schemes' },
    { name: 'Entrepreneurship', nameHi: 'उद्यमिता', path: '/entrepreneurship' },
    { name: 'Calculators', nameHi: 'कैलकुलेटर', path: '/calculators' },
    { name: 'Budget Planner', nameHi: 'बजट प्लानर', path: '/calculators/budget-planner' },
    { name: 'Investments', nameHi: 'निवेश', path: '/investments' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}>
              <span className="text-2xl font-bold text-saheli-purple">Saheli</span>
            </Link>
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label={`${item.name} / ${item.nameHi}`}
              >
                <Translated en={item.name} hi={item.nameHi} />
              </Link>
            ))}
            
            <Button variant="ghost" onClick={toggleLanguage} className="flex items-center gap-1 text-saheli-purple">
              <Globe className="h-4 w-4" />
              <span>{language === 'en' ? 'हिंदी' : 'EN'}</span>
            </Button>
            <Link to="/login" className="text-sm text-saheli-purple hover:underline" aria-label="Login / लॉगिन">
              <Translated en="Login" hi="लॉगिन" />
            </Link>
            <Link to="/register" className="text-sm px-3 py-1 rounded-full bg-secondary text-saheli-purple hover:bg-secondary/80 transition" aria-label="Sign up / साइन अप">
              <Translated en="Sign up" hi="साइन अप" />
            </Link>
            
            <Button 
              variant="ghost" 
              className="relative text-saheli-purple"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-saheli-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="text-saheli-purple"
              aria-label="Toggle theme"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>
          
          <div className="flex md:hidden items-center">
            <Button 
              variant="ghost" 
              className="relative text-saheli-purple mr-2"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-saheli-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
            {/* Theme toggle (mobile) */}
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="text-saheli-purple mr-1"
              aria-label="Toggle theme"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            
            <Button variant="ghost" onClick={toggleMenu} className="text-saheli-purple">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
  <div className="md:hidden bg-background/95 border-t border-border animate-fade-in-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={closeMenu}
                aria-label={`${item.name} / ${item.nameHi}`}
              >
                <Translated en={item.name} hi={item.nameHi} />
              </Link>
            ))}
            
            <Button variant="ghost" onClick={toggleLanguage} className="flex items-center gap-1 w-full justify-start text-saheli-purple">
              <Globe className="h-4 w-4" />
              <span>{language === 'en' ? 'Switch to हिंदी' : 'Switch to English'}</span>
            </Button>
            <Link to="/login" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted" aria-label="Login / लॉगिन">
              <Translated en="Login" hi="लॉगिन" />
            </Link>
            <Link to="/register" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted" aria-label="Sign up / साइन अप">
              <Translated en="Sign up" hi="साइन अप" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
