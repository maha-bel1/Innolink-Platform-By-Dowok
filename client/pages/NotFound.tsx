import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Star } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-1 via-brand-1 to-brand-2">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-brand-2/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-brand-4 to-brand-5 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-brand-5">PartenairIA</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-24 h-24 bg-brand-2 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold text-brand-5">404</span>
          </div>
          <h1 className="text-3xl font-bold text-brand-5 mb-4">Page not found</h1>
          <p className="text-brand-4 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Back home</span>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
