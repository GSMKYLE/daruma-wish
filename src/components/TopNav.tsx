"use client";

import { useRouter } from "next/navigation";

export default function TopNav({ title = "Daruma Wish", showBack = false, theme = "light" }: { title?: string, showBack?: boolean, theme?: 'light'|'dark' }) {
  const router = useRouter();
  
  const navClass = theme === 'light' 
    ? "w-full px-6 pt-12 pb-4 flex justify-between items-center bg-daruma-cream/90 backdrop-blur-md sticky top-0 z-50 border-b border-daruma-paper"
    : "w-full px-6 pt-12 pb-4 flex justify-between items-center bg-[#0E152A]/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/10";

  const btnClass = theme === 'light'
    ? "w-10 h-10 rounded-full bg-white shadow-card flex items-center justify-center text-daruma-dark hover:bg-gray-50 transition-colors"
    : "w-10 h-10 rounded-full bg-white/10 shadow-card flex items-center justify-center text-white hover:bg-white/20 transition-colors";

  return (
    <nav id="header" className={navClass}>
      <div className="flex items-center gap-2">
        {showBack ? (
          <button 
            onClick={() => router.back()}
            className={btnClass}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        ) : (
          <div className="w-10 h-10 rounded-full bg-daruma-red flex items-center justify-center text-white shadow-sm">
            <i className="fa-solid fa-yin-yang text-xl"></i>
          </div>
        )}
        <span className={`font-display font-bold text-xl tracking-tight ${theme === 'dark' ? 'text-white' : ''}`}>{title}</span>
      </div>
      <button className={btnClass}>
        <i className="fa-solid fa-bars"></i>
      </button>
    </nav>
  );
}
