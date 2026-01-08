import { portfolioData } from '@/data/portfolioData';
import { MapPin, Mail, Briefcase } from 'lucide-react';
import avatarImage from '@/assets/avatar.jpg';

export function AboutMeContent() {
  const { user, skills } = portfolioData;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 shadow-lg">
          <img 
            src={avatarImage} 
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-foreground">{user.name}</h1>
          <p className="text-muted-foreground flex items-center gap-2 mt-1">
            <Briefcase size={16} />
            {user.title}
          </p>
          <p className="text-muted-foreground flex items-center gap-2 mt-1">
            <MapPin size={16} />
            {user.location}
          </p>
        </div>
      </div>

      {/* Bio */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-2">About</h2>
        <p className="text-muted-foreground leading-relaxed">{user.bio}</p>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail size={16} />
          <a href={`mailto:${user.email}`} className="hover:text-primary transition-colors">
            {user.email}
          </a>
        </div>
      </div>
    </div>
  );
}
