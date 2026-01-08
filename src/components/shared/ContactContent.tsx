import { useState } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactContent() {
  const { user } = portfolioData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally send the form data
    alert('Thanks for your message! (This is a demo portfolio - no actual email sent)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-foreground">Get in Touch</h1>
      
      {/* Contact Info */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="p-2 rounded-lg bg-primary/10">
            <Mail size={18} className="text-primary" />
          </div>
          <a href={`mailto:${user.email}`} className="hover:text-primary transition-colors">
            {user.email}
          </a>
        </div>
        
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="p-2 rounded-lg bg-primary/10">
            <Phone size={18} className="text-primary" />
          </div>
          <span>{user.phone}</span>
        </div>
        
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="p-2 rounded-lg bg-primary/10">
            <MapPin size={18} className="text-primary" />
          </div>
          <span>{user.location}</span>
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-border">
        <h2 className="text-lg font-semibold text-foreground">Send a Message</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        
        <Textarea
          placeholder="Your message..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          required
        />
        
        <Button type="submit" className="w-full gap-2">
          <Send size={16} />
          Send Message
        </Button>
      </form>
    </div>
  );
}
