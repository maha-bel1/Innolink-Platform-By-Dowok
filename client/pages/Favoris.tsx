import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { mockPartners } from '@shared/mockData';
import { Partner } from '@shared/types';
import { getFavoriteIds, toggleFavorite, clearFavorites, isFavorite } from '@/lib/favorites';
import { Heart, Trash2, Sparkles, ExternalLink, Search, Star } from 'lucide-react';

export default function Favoris() {
  const [favorites, setFavorites] = useState<Partner[]>([]);
  const [search, setSearch] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const refresh = () => {
    const ids = new Set(getFavoriteIds());
    const favs = mockPartners.filter(p => ids.has(p.id));
    setFavorites(favs);
  };

  useEffect(() => {
    refresh();
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const filtered = useMemo(() => {
    if (!search) return favorites;
    const s = search.toLowerCase();
    return favorites.filter(p =>
      p.name.toLowerCase().includes(s) ||
      p.domain.toLowerCase().includes(s) ||
      p.specialties.some(sp => sp.toLowerCase().includes(s)) ||
      p.institution.toLowerCase().includes(s)
    );
  }, [favorites, search]);

  const onToggle = (id: string) => {
    toggleFavorite(id);
    refresh();
  };

  const onClear = () => {
    clearFavorites();
    refresh();
  };

  return (
    <div className="min-h-screen gradient-bg">
      <header className="header-glass sticky top-0 z-50">
        <div className="container-max">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="logo-icon">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-brand-5">PartenairIA</h1>
                <p className="text-sm text-brand-4 font-medium">Collaborative Intelligence</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="nav-link text-brand-4 hover:text-brand-5">Home</Link>
              <Link to="/favoris" className="nav-link active text-brand-5">Favorites</Link>
              <Link to="/profil" className="nav-link text-brand-4 hover:text-brand-5">My Profile</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="section-padding">
        <div className="container-max">
          <div className={`text-center mb-10 animate-fade-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`}> 
            <h2 className="heading-primary mb-3">My favorites</h2>
            <p className="text-brand-4 max-w-2xl mx-auto">Find your saved partners here. You can view them or remove them from your favorites.</p>
          </div>

          {favorites.length > 0 && (
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-4 w-5 h-5" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search your favorites..."
                  className="search-input w-full pl-12 pr-4 py-4 text-lg font-medium placeholder:text-brand-4/60"
                />
              </div>
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-brand-4 font-medium">{filtered.length} favorite partner(s)</div>
              <button onClick={onClear} className="btn-outline flex items-center space-x-2">
                <Trash2 className="w-4 h-4" />
                <span>Clear all</span>
              </button>
            </div>
          ) : null}

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filtered.map(p => (
                <div key={p.id} className="partner-card group p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <img src={p.avatar} alt={p.name} className="w-16 h-16 rounded-2xl object-cover shadow-xl ring-4 ring-white/60 hover:ring-brand-3/50 transition-all duration-300" />
                        {p.isRecommended && (
                          <div className="absolute -top-2 -right-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                              <Star className="w-3 h-3 text-white fill-current" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="heading-secondary text-lg mb-1">{p.name}</h3>
                        <p className="text-brand-4 text-sm font-medium mb-2">{p.institution}</p>
                        <div className="inline-flex items-center px-3 py-1 bg-brand-2/30 rounded-lg">
                          <span className="text-brand-5 text-sm font-medium">{p.domain}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => onToggle(p.id)} className={`btn-outline flex items-center space-x-2 ${isFavorite(p.id) ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100' : ''}`}>
                      <Heart className={`w-4 h-4 ${isFavorite(p.id) ? 'fill-current' : ''}`} />
                      <span>{isFavorite(p.id) ? 'Remove' : 'Add'}</span>
                    </button>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-emphasis text-sm">Compatibility</span>
                      <span className="text-xl font-bold text-brand-5">{p.compatibilityScore}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${p.compatibilityScore}%` }}></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.specialties.slice(0,3).map(s => (
                      <span key={s} className="specialty-tag">#{s}</span>
                    ))}
                  </div>

                  <Link to={`/partner/${p.id}`} className="btn-primary w-full inline-flex items-center justify-center space-x-2 group">
                    <span>View profile</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-brand-2/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-brand-4" />
              </div>
              <h3 className="heading-secondary mb-4">No favorites yet</h3>
              <p className="text-muted max-w-md mx-auto mb-6">Add partners to your favorites from their profile page to find them easily here.</p>
              <Link to="/" className="btn-primary">Discover partners</Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
