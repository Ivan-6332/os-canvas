import projectEcommerce from '@/assets/project-ecommerce.jpg';
import projectTasks from '@/assets/project-tasks.jpg';
import projectAi from '@/assets/project-ai.jpg';
import projectPortfolio from '@/assets/project-portfolio.jpg';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export const portfolioData = {
  user: {
    name: "Alex Chen",
    username: "alexchen",
    title: "Full-Stack Developer & UI Designer",
    bio: "Passionate about creating beautiful, functional digital experiences. I specialize in React, TypeScript, and modern web technologies. When I'm not coding, you'll find me exploring new design trends or contributing to open-source projects.",
    email: "hello@alexchen.dev",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA"
  },
  skills: [
    "React", "TypeScript", "Next.js", "Node.js", 
    "Tailwind CSS", "Framer Motion", "PostgreSQL", 
    "GraphQL", "AWS", "Docker", "Figma", "Git"
  ],
  projects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "A full-featured online store with real-time inventory, payment processing, and admin dashboard.",
      techStack: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
      image: projectEcommerce,
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      id: "2",
      title: "Task Management App",
      description: "Collaborative project management tool with drag-and-drop boards, real-time updates, and team features.",
      techStack: ["React", "Node.js", "Socket.io", "MongoDB"],
      image: projectTasks,
      liveUrl: "https://example.com",
      githubUrl: "https://github.com"
    },
    {
      id: "3",
      title: "AI Writing Assistant",
      description: "Smart content creation tool powered by GPT with templates, tone adjustment, and export options.",
      techStack: ["React", "OpenAI API", "Express", "Redis"],
      image: projectAi,
      githubUrl: "https://github.com"
    },
    {
      id: "4",
      title: "Portfolio Website",
      description: "This very site! A creative dual-OS experience built with React and Tailwind CSS.",
      techStack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
      image: projectPortfolio,
      githubUrl: "https://github.com"
    }
  ] as Project[],
  socials: [
    { platform: "GitHub", url: "https://github.com", icon: "github" },
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
    { platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
    { platform: "Instagram", url: "https://instagram.com", icon: "instagram" }
  ] as SocialLink[],
  loginCredentials: {
    windows: {
      username: "visitor",
      password: "welcome2024",
      hint: "Don't worry 😄 This PC only runs my portfolio. No real data here!"
    },
    pixel: {
      pin: "1234",
      hint: "No fingerprint needed 😄 Just tap and enjoy my portfolio!"
    }
  }
};
