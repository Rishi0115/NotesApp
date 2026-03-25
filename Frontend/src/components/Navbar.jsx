import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogOut, BookText } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 text-primary-600">
            <BookText className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight">NotesApp</span>
          </Link>

          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium hidden sm:inline">Logout</span>
              </button>
            ) : (
              <div className="space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">Login</Link>
                <Link to="/signup" className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 font-medium transition-colors">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
