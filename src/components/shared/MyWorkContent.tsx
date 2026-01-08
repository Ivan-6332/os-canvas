import { portfolioData } from '@/data/portfolioData';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export function MyWorkContent() {
  const { projects } = portfolioData;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-foreground mb-6">My Projects</h1>
      
      <div className="grid gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group rounded-xl bg-muted/50 hover:bg-muted transition-colors overflow-hidden"
          >
            {/* Project Image */}
            <div className="relative h-40 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Links overlay */}
              <div className="absolute top-3 right-3 flex items-center gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/90 hover:bg-white text-foreground transition-colors shadow-lg"
                    title="Live Demo"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/90 hover:bg-white text-foreground transition-colors shadow-lg"
                    title="GitHub"
                  >
                    <Github size={16} />
                  </a>
                )}
              </div>
            </div>

            {/* Project Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                {project.description}
              </p>
              
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
