import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Partner } from '@shared/types';
import { mockPartners } from '@shared/mockData';
import { Search, Filter, Star, ExternalLink, TrendingUp, Users, Award, Sparkles } from 'lucide-react';

export default function Index() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPartners(mockPartners);
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDomain = !selectedDomain || partner.domain === selectedDomain;
    
    return matchesSearch && matchesDomain;
  });

  const domains = [...new Set(partners.map(p => p.domain))];
  const recommendedCount = partners.filter(p => p.isRecommended).length;
  const averageScore = Math.round(partners.reduce((acc, p) => acc + p.compatibilityScore, 0) / partners.length);

  return (
    <div className="min-h-screen gradient-bg">
      {/* Enhanced Header */}
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
              <Link to="/" className="nav-link active text-brand-5">Home</Link>
              <Link to="/favoris" className="nav-link text-brand-4 hover:text-brand-5">Favorites</Link>
              <Link to="/profil" className="nav-link text-brand-4 hover:text-brand-5">My Profile</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className={`text-center animate-fade-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="max-w-4xl mx-auto">
              <h2 className="heading-primary mb-6">
                Discover your{' '}
                <span className="bg-gradient-to-r from-brand-4 to-brand-5 bg-clip-text text-transparent">
                  ideal partners
                </span>
              </h2>
              <p className="text-xl text-brand-4 mb-8 leading-relaxed">
                Our AI analyzes profiles and identifies the most promising collaborations to move your projects forward.
              </p>
              
              {/* Enhanced Search Section */}
              <div className="max-w-3xl mx-auto mb-12">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-4 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search by name, domain or expertise..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input w-full pl-12 pr-4 py-4 text-lg font-medium placeholder:text-brand-4/60"
                    />
                  </div>
                  <div className="relative lg:w-64">
                    <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-brand-4 w-5 h-5" />
                    <select
                      value={selectedDomain}
                      onChange={(e) => setSelectedDomain(e.target.value)}
                      className="search-input w-full pl-12 pr-4 py-4 text-lg font-medium appearance-none cursor-pointer"
                    >
                      <option value="">All domains</option>
                      {domains.map(domain => (
                        <option key={domain} value={domain}>{domain}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="stats-card p-6">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <Users className="w-8 h-8 text-brand-4" />
                    <div className="text-3xl font-bold text-brand-5">{partners.length}</div>
                  </div>
                  <div className="text-brand-4 font-medium">Available experts</div>
                </div>
                <div className="stats-card p-6">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <Award className="w-8 h-8 text-brand-4" />
                    <div className="text-3xl font-bold text-brand-5">{recommendedCount}</div>
                  </div>
                  <div className="text-brand-4 font-medium">AI recommendations</div>
                </div>
                <div className="stats-card p-6">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <TrendingUp className="w-8 h-8 text-brand-4" />
                    <div className="text-3xl font-bold text-brand-5">{averageScore}%</div>
                  </div>
                  <div className="text-brand-4 font-medium">Average score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="section-padding pt-0" ref={gridRef}>
        <div className="container-max">
          {filteredPartners.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredPartners.map((partner, index) => (
                <div
                  key={partner.id}
                  className={`partner-card group p-8 animate-fade-in stagger-delay-${(index % 6) + 1}`}
                >
                  {/* Partner Header */}
                  <div className="relative">
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="relative">
                        <img
                          src={partner.avatar}
                          alt={partner.name}
                          className="w-16 h-16 rounded-2xl object-cover shadow-xl ring-4 ring-white/60 hover:ring-brand-3/50 transition-all duration-300"
                        />
                        {partner.isRecommended && (
                          <div className="absolute -top-2 -right-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                              <Star className="w-3 h-3 text-white fill-current" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="heading-secondary text-lg mb-1 truncate">{partner.name}</h3>
                        <p className="text-brand-4 text-sm font-medium mb-2">{partner.institution}</p>
                        <div className="inline-flex items-center px-3 py-1 bg-brand-2/30 rounded-lg">
                          <span className="text-brand-5 text-sm font-medium">{partner.domain}</span>
                        </div>
                      </div>
                    </div>

                    {partner.isRecommended && (
                      <div className="ai-badge mb-4 inline-flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>AI Recommended</span>
                      </div>
                    )}
                  </div>

                  {/* Compatibility Score */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-emphasis text-sm">Compatibility</span>
                      <span className="text-2xl font-bold text-brand-5">{partner.compatibilityScore}%</span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${partner.compatibilityScore}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {partner.specialties.slice(0, 3).map(specialty => (
                        <span key={specialty} className="specialty-tag">
                          #{specialty}
                        </span>
                      ))}
                      {partner.specialties.length > 3 && (
                        <span className="specialty-tag bg-brand-1 text-brand-4">
                          +{partner.specialties.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bio Preview */}
                  <p className="text-muted text-sm mb-6 leading-relaxed line-clamp-3">
                    {partner.bio.substring(0, 150)}...
                  </p>

                  {/* Action Button */}
                  <Link
                    to={`/partner/${partner.id}`}
                    className="btn-primary w-full text-center inline-flex items-center justify-center space-x-2 group"
                  >
                    <span>View profile</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-brand-2/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-brand-4" />
              </div>
              <h3 className="heading-secondary mb-4">No partners found</h3>
              <p className="text-muted max-w-md mx-auto">
                Try adjusting your search criteria or remove filters to discover more collaboration opportunities.
              </p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedDomain(''); }}
                className="btn-secondary mt-6"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="section-padding">
        <div className="container-max">
          <div className="glass-strong rounded-3xl p-12 text-center">
            <h3 className="heading-secondary mb-4">
              Ready to turn ideas into reality?
            </h3>
            <p className="text-muted mb-8 max-w-2xl mx-auto">
              Join our community of innovators and discover how AI can accelerate your most ambitious collaborations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/profil" className="btn-primary">
                Get started
              </Link>
              <button onClick={() => gridRef.current?.scrollIntoView({ behavior: 'smooth' })} className="btn-outline">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
