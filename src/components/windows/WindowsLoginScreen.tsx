import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lightbulb } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import windowsWallpaper from '@/assets/windows-wallpaper.jpg';
import avatarImage from '@/assets/avatar.jpg';

interface WindowsLoginScreenProps {
  onLogin: () => void;
}

export function WindowsLoginScreen({ onLogin }: WindowsLoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loginCredentials, user } = portfolioData;

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${windowsWallpaper})` }}
      />
      <div className="absolute inset-0 backdrop-blur-sm bg-black/20" />

      {/* Login Container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Avatar */}
          <motion.div 
            className="mb-6 h-32 w-32 rounded-full shadow-2xl overflow-hidden ring-4 ring-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={avatarImage} 
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Username */}
          <h1 className="mb-8 text-3xl font-light text-white drop-shadow-lg">
            {user.name}
          </h1>

          {/* Login Form */}
          <div className="w-72 space-y-4">
            {/* Username Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md bg-white/10 backdrop-blur-xl px-4 py-3 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md bg-white/10 backdrop-blur-xl px-4 py-3 pr-12 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Sign In Button */}
            <motion.button
              onClick={onLogin}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-md bg-primary px-4 py-3 font-medium text-primary-foreground hover:bg-win-accent-light transition-colors shadow-lg"
            >
              Sign In
            </motion.button>

            {/* Login Hint Button */}
            <motion.button
              onClick={() => setShowHint(!showHint)}
              whileHover={{ scale: 1.02 }}
              className="w-full flex items-center justify-center gap-2 rounded-md bg-white/10 backdrop-blur-xl px-4 py-2 text-white/80 hover:bg-white/20 transition-all border border-white/20"
            >
              <Lightbulb size={18} />
              Login Tip 💡
            </motion.button>
          </div>

          {/* Hint Panel */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="mt-6 w-80 rounded-xl bg-white/10 backdrop-blur-xl p-4 border border-white/20"
              >
                <p className="text-sm text-white/90 mb-3">
                  {loginCredentials.windows.hint}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Username:</span>
                    <span className="text-white font-mono">{loginCredentials.windows.username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Password:</span>
                    <span className="text-white font-mono">{loginCredentials.windows.password}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Time */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
          <div className="text-6xl font-light text-white drop-shadow-lg">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
          </div>
          <div className="mt-2 text-lg text-white/80 drop-shadow">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
}
