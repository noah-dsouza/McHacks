import { motion, AnimatePresence } from "motion/react";
import { X, Mail } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/8a114fe9edd116ad1d4b78871519eb6c4ffe55ba.png";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthComplete: (mode: "demo" | "authenticated") => void;
}

export function AuthModal({ isOpen, onClose, onAuthComplete }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleAuth = () => {
    // In a real app, this would trigger Auth0 Google flow
    onAuthComplete("authenticated");
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger Auth0 email/password flow
    onAuthComplete("authenticated");
  };

  const handleDemoMode = () => {
    onAuthComplete("demo");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Logo */}
              <div className="mb-8 flex justify-center">
                <img src={logo} alt="QuantPilot" className="h-12" />
              </div>

              {/* Title */}
              <h2 className="text-2xl mb-2 text-center">Welcome to QuantPilot</h2>
              <p className="text-sm text-muted-foreground text-center mb-8">
                Start your investment learning journey
              </p>

              {/* Auth Options */}
              <div className="space-y-3">
                <button
                  onClick={handleGoogleAuth}
                  className="w-full px-6 py-4 rounded-xl border-2 border-border hover:border-primary hover:bg-accent/30 transition-all flex items-center justify-center gap-3 group"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-muted-foreground">or</span>
                  </div>
                </div>

                <form onSubmit={handleEmailAuth} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-4 rounded-xl bg-primary text-primary-foreground hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Continue with Email</span>
                  </button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-muted-foreground">or</span>
                  </div>
                </div>

                <button
                  onClick={handleDemoMode}
                  className="w-full px-6 py-3 rounded-xl border border-border hover:bg-muted transition-all text-sm"
                >
                  Continue in demo mode
                </button>
              </div>

              {/* Footer */}
              <p className="text-xs text-muted-foreground text-center mt-6">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
