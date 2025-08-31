import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, User, Building2, FileText, Save, BadgeCheck } from 'lucide-react';

type UserProfile = {
  name: string;
  title: string;
  institution: string;
  location: string;
  bio: string;
  skills: string[];
  preferences: {
    remote: boolean;
    notifications: boolean;
  };
};

const PROFILE_KEY = 'userProfile';

const defaultProfile: UserProfile = {
  name: 'Your name',
  title: 'Your role',
  institution: 'Your organization',
  location: 'City, Country',
  bio: "Describe your experience, goals, and what you're looking for in collaboration.",
  skills: ['React', 'TypeScript', 'Design'],
  preferences: { remote: true, notifications: true }
};

function loadProfile(): UserProfile {
  if (typeof window === 'undefined') return defaultProfile;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return defaultProfile;
    const parsed = JSON.parse(raw);
    return { ...defaultProfile, ...parsed } as UserProfile;
  } catch {
    return defaultProfile;
  }
}

function saveProfile(p: UserProfile) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(p));
}

export default function Profil() {
  const [profile, setProfile] = useState<UserProfile>(loadProfile());
  const [saved, setSaved] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { setTimeout(() => setIsLoaded(true), 100); }, []);

  useEffect(() => {
    if (!saved) return;
    const t = setTimeout(() => setSaved(false), 1500);
    return () => clearTimeout(t);
  }, [saved]);

  const skillsText = useMemo(() => profile.skills.join(', '), [profile.skills]);

  const onSave = () => {
    saveProfile(profile);
    setSaved(true);
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
              <Link to="/favoris" className="nav-link text-brand-4 hover:text-brand-5">Favorites</Link>
              <Link to="/profil" className="nav-link active text-brand-5">My Profile</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="section-padding">
        <div className="container-max grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className={`xl:col-span-2 glass-strong rounded-3xl p-8 animate-fade-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="heading-secondary mb-6 flex items-center space-x-3">
              <User className="w-6 h-6 text-brand-4" />
              <span>Personal information</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-sm text-brand-4 mb-2">Full name</label>
                <input className="search-input w-full px-4 py-3" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm text-brand-4 mb-2">Role / Title</label>
                <input className="search-input w-full px-4 py-3" value={profile.title} onChange={e => setProfile({ ...profile, title: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm text-brand-4 mb-2">Organization</label>
                <input className="search-input w-full px-4 py-3" value={profile.institution} onChange={e => setProfile({ ...profile, institution: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm text-brand-4 mb-2">Location</label>
                <input className="search-input w-full px-4 py-3" value={profile.location} onChange={e => setProfile({ ...profile, location: e.target.value })} />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm text-brand-4 mb-2">Bio</label>
              <textarea className="search-input w-full px-4 py-3 h-32 resize-none" value={profile.bio} onChange={e => setProfile({ ...profile, bio: e.target.value })} />
            </div>
            <div className="mb-6">
              <label className="block text-sm text-brand-4 mb-2">Skills (comma-separated)</label>
              <input className="search-input w-full px-4 py-3" value={skillsText} onChange={e => setProfile({ ...profile, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
              <div className="flex flex-wrap gap-2 mt-3">
                {profile.skills.map(s => (
                  <span key={s} className="specialty-tag">#{s}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="glass rounded-2xl p-5">
                <label className="flex items-center justify-between">
                  <span className="text-brand-5 font-medium">Open to remote</span>
                  <input type="checkbox" checked={profile.preferences.remote} onChange={e => setProfile({ ...profile, preferences: { ...profile.preferences, remote: e.target.checked } })} className="w-5 h-5" />
                </label>
                <p className="text-brand-4 text-sm mt-2">Indicate if you're open to remote work.</p>
              </div>
              <div className="glass rounded-2xl p-5">
                <label className="flex items-center justify-between">
                  <span className="text-brand-5 font-medium">Email notifications</span>
                  <input type="checkbox" checked={profile.preferences.notifications} onChange={e => setProfile({ ...profile, preferences: { ...profile.preferences, notifications: e.target.checked } })} className="w-5 h-5" />
                </label>
                <p className="text-brand-4 text-sm mt-2">Receive alerts for new matches.</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button onClick={onSave} className="btn-primary inline-flex items-center space-x-2">
                <Save className="w-5 h-5" />
                <span>Save</span>
              </button>
              {saved && (
                <div className="inline-flex items-center space-x-2 text-green-700 bg-green-50 border border-green-200 px-4 py-2 rounded-xl">
                  <BadgeCheck className="w-5 h-5" />
                  <span>Profile saved</span>
                </div>
              )}
            </div>
          </div>

          <aside className={`space-y-6 animate-fade-in ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="glass-strong rounded-3xl p-8">
              <h3 className="heading-secondary text-lg mb-4 flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-brand-4" />
                <span>Profile preview</span>
              </h3>
              <div className="bg-gradient-to-br from-white/40 via-brand-1/20 to-brand-2/15 border border-brand-2/30 rounded-2xl p-6">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-brand-5">{profile.name}</div>
                  <div className="text-brand-4 font-medium">{profile.title} • {profile.institution}</div>
                  <div className="text-brand-4 text-sm mt-1">{profile.location}</div>
                </div>
                <p className="text-brand-5 mb-4 leading-relaxed">{profile.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map(s => (
                    <span key={s} className="specialty-tag">#{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-strong rounded-3xl p-8">
              <h3 className="heading-secondary text-lg mb-4 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-brand-4" />
                <span>Tips</span>
              </h3>
              <ul className="space-y-3 text-sm text-brand-5">
                <li>• Use precise keywords in your skills.</li>
                <li>• Describe concrete examples of achievements.</li>
                <li>• Keep your profile up to date for better recommendations.</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
