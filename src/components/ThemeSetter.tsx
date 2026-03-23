"use client";

import { useEffect } from "react";

export default function ThemeSetter({ theme }: { theme: 'light' | 'dark' | 'ritual' }) {
  useEffect(() => {
    if (theme === 'light') {
      document.body.style.backgroundColor = '#FDFBF7';
      document.body.style.backgroundImage = "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23e04a3a\\' fill-opacity=\\'0.02\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')";
      
      const appRoot = document.getElementById('app-root');
      if (appRoot) {
        appRoot.className = "w-full max-w-[480px] mx-auto min-h-screen bg-daruma-cream relative shadow-[0_0_50px_rgba(0,0,0,0.1)] flex flex-col text-daruma-dark";
      }
    } else if (theme === 'dark') {
      document.body.style.backgroundColor = '#0E152A';
      document.body.style.backgroundImage = "url('data:image/svg+xml,%3Csvg width=\\'20\\' height=\\'20\\' viewBox=\\'0 0 20 20\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'%23ffffff\\' fill-opacity=\\'0.02\\' fill-rule=\\'evenodd\\'%3E%3Ccircle cx=\\'3\\' cy=\\'3\\' r=\\'3\\'/%3E%3Ccircle cx=\\'13\\' cy=\\'13\\' r=\\'3\\'/%3E%3C/g%3E%3C/svg%3E')";
      
      const appRoot = document.getElementById('app-root');
      if (appRoot) {
        appRoot.className = "w-full max-w-[480px] mx-auto min-h-screen bg-[#0E152A] relative shadow-[0_0_50px_rgba(0,0,0,0.3)] flex flex-col text-white";
      }
    } else if (theme === 'ritual') {
      document.body.style.backgroundColor = '#141722';
      document.body.style.backgroundImage = "radial-gradient(circle at 50% 0%, #2A1B3D 0%, #141722 70%)";
      
      const appRoot = document.getElementById('app-root');
      if (appRoot) {
        appRoot.className = "w-full max-w-[480px] mx-auto min-h-screen relative shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col bg-[#141722] text-white";
      }
    }
  }, [theme]);

  return null;
}
