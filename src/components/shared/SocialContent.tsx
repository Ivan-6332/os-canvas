import { portfolioData } from '@/data/portfolioData';
import { Github, Linkedin, Twitter, Instagram, LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
};

export function SocialContent() {
  const { socials, user } = portfolioData;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Connect with Me</h1>
        <p className="text-muted-foreground mt-1">
          Find me on your favorite social platforms
        </p>
      </div>

      <div className="grid gap-3">
        {socials.map((social) => {
          const Icon = iconMap[social.icon] || Github;
          
          return (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-all"
            >
              <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon size={24} className="text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {social.platform}
                </h3>
                <p className="text-sm text-muted-foreground">
                  @{user.username}
                </p>
              </div>
              <span className="text-muted-foreground group-hover:text-primary transition-colors">
                →
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
