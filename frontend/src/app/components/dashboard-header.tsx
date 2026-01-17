import { motion } from "motion/react";
import { User, Settings, LogOut } from "lucide-react";
import logo from "@/assets/8a114fe9edd116ad1d4b78871519eb6c4ffe55ba.png";

interface DashboardHeaderProps {
  userMode: "demo" | "authenticated";
  onLogout: () => void;
}

export function DashboardHeader({ userMode, onLogout }: DashboardHeaderProps) {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-b border-border px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="QuantPilot" className="h-8" />
          {userMode === "demo" && (
            <span className="px-2 py-1 text-xs rounded-full bg-gold/20 text-[#D4AF37]">
              Demo Mode
            </span>
          )}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
          <button 
            onClick={onLogout}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
