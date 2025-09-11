
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, ShoppingCart, Sun, Moon, ChevronDown, User, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import Translated from '@/components/Translated';
import { useTheme } from '@/contexts/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, translate } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
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
    { name: 'Government Schemes', nameHi: 'सरकारी योजनाएँ', path: '/government-schemes' },
    { name: 'Entrepreneurship', nameHi: 'उद्यमिता', path: '/entrepreneurship' },
    { name: 'Calculators', nameHi: 'कैलकुलेटर', path: '/calculators' },
    { name: 'Health & Wellness', nameHi: 'स्वास्थ्य और कल्याण', path: '/health-wellness' },
    { name: 'Legal Support', nameHi: 'कानूनी सहायता', path: '/legal-support' },
  ];

  const financialDropdownItems = [
    { name: 'Budget Planner', nameHi: 'बजट प्लानर', path: '/calculators/budget-planner' },
    { name: 'Investments', nameHi: 'निवेश', path: '/investments' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center mr-8" onClick={closeMenu}>
              <span className="text-2xl font-bold text-saheli-purple">Saheli</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
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
            
            {/* Financial Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-muted-foreground hover:text-foreground px-3 py-2">
                  <Translated en="Financial Tools" hi="वित्तीय उपकरण" />
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {financialDropdownItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link
                      to={item.path}
                      className="w-full cursor-pointer"
                      aria-label={`${item.name} / ${item.nameHi}`}
                    >
                      <Translated en={item.name} hi={item.nameHi} />
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Language Toggle */}
            <Button variant="ghost" onClick={toggleLanguage} className="flex items-center gap-1 text-saheli-purple px-3 py-2">
              <Globe className="h-4 w-4" />
              <span>{language === 'en' ? 'हिंदी' : 'EN'}</span>
            </Button>
            
            {/* Auth Section */}
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-saheli-purple">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.picture} alt={user.name} />
                      <AvatarFallback className="bg-saheli-purple text-white text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline-block">{user.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 w-full">
                      <User className="h-4 w-4" />
                      <Translated en="Profile" hi="प्रोफाइल" />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/add-product" className="flex items-center gap-2 w-full">
                      <span className="h-2 w-2 rounded-full bg-saheli-accent" />
                      <Translated en="Add Product" hi="उत्पाद जोड़ें" />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex items-center gap-2 text-red-600 dark:text-red-400"
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4" />
                    <Translated en="Logout" hi="लॉग आउट" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-sm text-saheli-purple hover:underline" aria-label="Login / लॉगिन">
                  <Translated en="Login" hi="लॉगिन" />
                </Link>
                <Link to="/register" className="text-sm px-5 py-2 rounded-full bg-secondary text-saheli-purple hover:bg-secondary/80 transition min-w-[80px] text-center" aria-label="Sign up / साइन अप">
                  <Translated en="Sign up" hi="साइन अप" />
                </Link>
              </div>
            )}
            
            {/* Cart and Theme Toggle */}
            <div className="flex items-center space-x-2">
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
          </div>
          {/* Mobile Menu Button and Icons */}
          <div className="flex md:hidden items-center space-x-2">
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
            
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="text-saheli-purple"
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
            
            {/* Financial Tools in Mobile */}
            <div className="px-3 py-2">
              <p className="text-sm font-semibold text-foreground mb-2">
                <Translated en="Financial Tools" hi="वित्तीय उपकरण" />
              </p>
              {financialDropdownItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-4 py-1 text-base text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                  onClick={closeMenu}
                  aria-label={`${item.name} / ${item.nameHi}`}
                >
                  <Translated en={item.name} hi={item.nameHi} />
                </Link>
              ))}
            </div>
            
            <Button variant="ghost" onClick={toggleLanguage} className="flex items-center gap-1 w-full justify-start text-saheli-purple mx-3">
              <Globe className="h-4 w-4" />
              <span>{language === 'en' ? 'Switch to हिंदी' : 'Switch to English'}</span>
            </Button>
            
            {/* Mobile Auth Section */}
            {isAuthenticated && user ? (
              <>
                <div className="px-3 py-2 border-t border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.picture} alt={user.name} />
                      <AvatarFallback className="bg-saheli-purple text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Link to="/profile" onClick={() => { closeMenu(); }} className="block px-3 py-2 rounded-md text-base font-medium text-saheli-purple hover:bg-muted">
                    <Translated en="Profile" hi="प्रोफाइल" />
                  </Link>
                  <Link to="/add-product" onClick={() => { closeMenu(); }} className="block px-3 py-2 rounded-md text-base font-medium text-saheli-purple hover:bg-muted">
                    <Translated en="Add Product" hi="उत्पाद जोड़ें" />
                  </Link>
            <Button 
                    variant="ghost" 
                    onClick={() => { logout(); closeMenu(); }}
              className="w-full justify-start text-red-600 dark:text-red-400"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <Translated en="Logout" hi="लॉग आउट" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted" aria-label="Login / लॉगिन">
                  <Translated en="Login" hi="लॉगिन" />
                </Link>
                <Link to="/register" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted" aria-label="Sign up / साइन अप">
                  <Translated en="Sign up" hi="साइन अप" />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
