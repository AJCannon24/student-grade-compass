
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsMenuOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className="border-b bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="font-bold text-2xl">
              GradeCompass
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-blue-600">Home</Link>
            <Link to="/professors" className="text-sm font-medium hover:text-blue-600">Professors</Link>
            <Link to="/courses" className="text-sm font-medium hover:text-blue-600">Courses</Link>
            <Link to="/about" className="text-sm font-medium hover:text-blue-600">About</Link>
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium text-blue-600 hover:text-blue-800">Admin Panel</Link>
            )}
          </nav>
          
          {/* Desktop Search and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative w-64">
              <Input
                type="text"
                placeholder="Search..."
                className="pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-10 w-10"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
            
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm">{user.name}</span>
                <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-1">
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <User size={16} />
                  Login
                </Button>
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden container mx-auto px-4 pb-4 space-y-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search..."
              className="pr-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-0 top-0 h-10 w-10"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
          
          <nav className="flex flex-col space-y-2">
            <Link 
              to="/" 
              className="text-sm font-medium p-2 hover:bg-gray-100 rounded dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/professors" 
              className="text-sm font-medium p-2 hover:bg-gray-100 rounded dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Professors
            </Link>
            <Link 
              to="/courses" 
              className="text-sm font-medium p-2 hover:bg-gray-100 rounded dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              to="/about" 
              className="text-sm font-medium p-2 hover:bg-gray-100 rounded dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className="text-sm font-medium p-2 text-blue-600 hover:bg-blue-50 rounded dark:hover:bg-blue-900/20"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Panel
              </Link>
            )}
          </nav>
          
          <div className="pt-2 border-t">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-sm">{user.name}</span>
                <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-1">
                  <LogOut size={16} />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
                  <User size={16} />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
