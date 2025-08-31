import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Partner } from '@shared/types';
import { mockPartners } from '@shared/mockData';
import { isFavorite as isFav, toggleFavorite as toggleFav } from '@/lib/favorites';
import { 
  ArrowLeft, 
  Star, 
  Send, 
  Heart, 
  MessageCircle, 
  ExternalLink, 
  Github, 
  FileText, 
  Calendar,
  MapPin,
  Users,
  Lightbulb,
  Target,
  Sparkles,
  Award,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function PartnerDetails() {
  const { id } = useParams<{ id: string }>();
  const [partner, setPartner] = useState<Partner | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (id) {
      const foundPartner = mockPartners.find(p => p.id === id);
      setPartner(foundPartner || null);
      if (foundPartner) {
        setIsFavorite(isFav(foundPartner.id));
      }
      setTimeout(() => setIsLoaded(true), 100);
    }
  }, [id]);

  if (!partner) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center glass-strong rounded-3xl p-12 max-w-md mx-4">
          <div className="w-16 h-16 bg-brand-2/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Users className="w-8 h-8 text-brand-4" />
          </div>
          <h2 className="heading-secondary mb-4">Partner not found</h2>
          <p className="text-muted mb-6">This profile doesn't exist or was removed.</p>
          <Link to="/" className="btn-primary">
            Back home
          </Link>
        </div>
      </div>
    );
  }

  const getProjectStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-blue-600" />;
      case 'planned': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getProjectStatusBadge = (status: string) => {
    const statusConfig = {
      'completed': { bg: 'bg-green-50 border-green-200', text: 'text-green-700', label: 'Completed' },
      'in-progress': { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-700', label: 'In progress' },
      'planned': { bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-700', label: 'Planned' }
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <div className={`${config.bg} ${config.text} border inline-flex items-center space-x-2 text-sm font-medium px-3 py-1.5 rounded-lg`}>
        {getProjectStatusIcon(status)}
        <span>{config.label}</span>
      </div>
    );
  };

  const getPublicationIcon = (type: string) => {
    switch (type) {
      case 'github': return <Github className="w-5 h-5" />;
      case 'paper': return <FileText className="w-5 h-5" />;
      case 'article': return <ExternalLink className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      {/* Enhanced Header */}
      <header className="header-glass sticky top-0 z-50">
        <div className="container-max">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-3 text-brand-5 hover:text-brand-4 transition-colors group">
              <div className="w-10 h-10 bg-brand-2/20 rounded-xl flex items-center justify-center group-hover:bg-brand-2/30 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-semibold">Back to partners</span>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="logo-icon">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-brand-5">PartenairIA</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Partner Hero Section */}
          <div className={`glass-strong rounded-3xl p-8 lg:p-12 mb-8 animate-fade-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="relative">
                <img
                  src={partner.avatar}
                  alt={partner.name}
                  className="w-32 h-32 rounded-3xl object-cover shadow-2xl ring-6 ring-white/40 hover:ring-brand-3/50 transition-all duration-300"
                />
                {partner.isRecommended && (
                  <div className="absolute -top-3 -right-3">
                    <div className="ai-badge">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Recommended
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-brand-5 mb-2">{partner.name}</h1>
                    <div className="flex items-center space-x-3 text-brand-4 mb-3">
                      <MapPin className="w-5 h-5" />
                      <span className="text-lg font-medium">{partner.institution}</span>
                    </div>
                    <div className="inline-flex items-center px-4 py-2 bg-brand-2/30 rounded-xl">
                      <Award className="w-5 h-5 text-brand-4 mr-2" />
                      <span className="text-brand-5 font-semibold">{partner.domain}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-brand-4 mb-1">Compatibility score</div>
                    <div className="text-4xl font-bold text-brand-5">{partner.compatibilityScore}%</div>
                    <div className="progress-bar w-24 mt-2">
                      <div
                        className="progress-fill"
                        style={{ width: `${partner.compatibilityScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {partner.specialties.map(specialty => (
                    <span key={specialty} className="specialty-tag">
                      #{specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-8 border-t border-brand-2/20">
              <button className="btn-primary flex items-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Send proposal</span>
              </button>
              <button
                onClick={() => partner && setIsFavorite(toggleFav(partner.id))}
                className={`btn-outline flex items-center space-x-2 ${isFavorite ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100' : ''}`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                <span>{isFavorite ? 'Remove from favorites' : 'Add to favorites'}</span>
              </button>
              <button className="btn-secondary flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Contact</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="xl:col-span-2 space-y-8">
              {/* Bio Section */}
              <div className="glass-strong rounded-2xl p-8">
                <h2 className="heading-secondary mb-6 flex items-center space-x-3">
                  <Users className="w-6 h-6 text-brand-4" />
                  <span>About</span>
                </h2>
                <p className="text-brand-5 leading-relaxed text-lg">{partner.bio}</p>
              </div>

              {/* Technical Skills */}
              <div className="glass-strong rounded-2xl p-8">
                <h2 className="heading-secondary mb-6 flex items-center space-x-3">
                  <Lightbulb className="w-6 h-6 text-brand-4" />
                  <span>Technical skills</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {partner.technicalSkills.map(skill => (
                    <div 
                      key={skill} 
                      className="bg-gradient-to-r from-brand-3/80 to-brand-4/70 text-white text-sm font-semibold px-4 py-3 rounded-xl text-center shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="glass-strong rounded-2xl p-8">
                <h2 className="heading-secondary mb-6 flex items-center space-x-3">
                  <Target className="w-6 h-6 text-brand-4" />
                  <span>Projects ({partner.projects.length})</span>
                </h2>
                <div className="space-y-6">
                  {partner.projects.map(project => (
                    <div key={project.id} className="bg-gradient-to-br from-white/40 via-brand-1/20 to-brand-2/15 border border-brand-2/30 rounded-2xl p-6 hover-lift">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-semibold text-brand-5">{project.title}</h3>
                        {getProjectStatusBadge(project.status)}
                      </div>
                      <p className="text-brand-4 mb-4 leading-relaxed">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map(tech => (
                          <span 
                            key={tech} 
                            className="bg-brand-1/80 text-brand-5 text-sm font-medium px-3 py-1.5 rounded-lg border border-brand-2/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Publications */}
              <div className="glass-strong rounded-2xl p-8">
                <h2 className="heading-secondary mb-6 flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-brand-4" />
                  <span>Publications & Documents</span>
                </h2>
                <div className="space-y-4">
                  {partner.publications.map(pub => (
                    <a
                      key={pub.id}
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-4 p-6 bg-gradient-to-br from-white/40 via-brand-1/20 to-brand-2/15 border border-brand-2/30 rounded-2xl hover-lift group"
                    >
                      <div className="w-12 h-12 bg-brand-2/30 rounded-xl flex items-center justify-center text-brand-4 group-hover:bg-brand-3/30 group-hover:text-brand-5 transition-colors">
                        {getPublicationIcon(pub.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-brand-5 mb-1">{pub.title}</h4>
                        <div className="flex items-center space-x-3 text-sm text-brand-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(pub.date).toLocaleDateString('fr-FR')}</span>
                          </div>
                          <span>•</span>
                          <span className="capitalize font-medium">{pub.type}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-brand-4 group-hover:text-brand-5 group-hover:translate-x-1 transition-all duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Collaboration Offers */}
              <div className="glass-strong rounded-2xl p-6">
                <h3 className="heading-secondary text-lg mb-4 flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5 text-brand-4" />
                  <span>Collaboration offers</span>
                </h3>
                <ul className="space-y-3">
                  {partner.collaborationOffers.map((offer, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-brand-3 to-brand-4 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-brand-5 text-sm leading-relaxed">{offer}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Collaboration Needs */}
              <div className="glass-strong rounded-2xl p-6">
                <h3 className="heading-secondary text-lg mb-4 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-brand-4" />
                  <span>Collaboration needs</span>
                </h3>
                <ul className="space-y-3">
                  {partner.collaborationNeeds.map((need, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-brand-4 to-brand-5 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-brand-5 text-sm leading-relaxed">{need}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact CTA */}
              <div className="bg-gradient-to-br from-brand-4 via-brand-3 to-brand-5 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="relative">
                  <h3 className="text-xl font-bold mb-3">Start the collaboration</h3>
                  <p className="text-brand-1 mb-6 leading-relaxed">
                    Contact {partner.name} right now to explore synergies and build innovative projects together.
                  </p>
                  <button className="w-full bg-white/90 hover:bg-white text-brand-5 font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    Start a conversation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
