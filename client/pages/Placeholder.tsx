import { Link } from 'react-router-dom';
import { Star, ArrowLeft } from 'lucide-react';

interface PlaceholderProps {
  title: string;
  description: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-1 via-brand-1 to-brand-2">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-brand-2/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 text-brand-5 hover:text-brand-4">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back home</span>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-4 to-brand-5 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-brand-5">PartenairIA</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-24 h-24 bg-brand-2 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-12 h-12 text-brand-4" />
          </div>
          <h1 className="text-3xl font-bold text-brand-5 mb-4">{title}</h1>
          <p className="text-brand-4 text-lg mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="bg-white/50 rounded-xl p-8 max-w-md mx-auto">
            <p className="text-brand-5 mb-4">
              This page is under development. To continue building this feature, describe what you would like to see here in the chat.
            </p>
            <Link
              to="/"
              className="btn-primary"
            >
              Back home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
