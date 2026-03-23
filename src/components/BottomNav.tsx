"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav({ theme = "light" }: { theme?: 'light'|'dark' }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: "fa-house" },
    { name: "Community", href: "/community", icon: "fa-earth-americas" },
    { name: "Archive", href: "/archive", icon: "fa-book-bookmark" },
    { name: "Profile", href: "/profile", icon: "fa-user" },
  ];

  const navClass = theme === 'light'
    ? "fixed bottom-0 w-full max-w-[480px] bg-white border-t border-gray-100 pb-safe pt-2 px-6 flex justify-between items-center z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-3xl"
    : "fixed bottom-0 w-full max-w-[480px] bg-[#0E152A] border-t border-white/10 pb-safe pt-2 px-6 flex justify-between items-center z-50 rounded-t-3xl";

  return (
    <nav id="bottom-nav" className={navClass}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        
        let itemClass = "";
        let iconBgClass = "";

        if (theme === 'light') {
          itemClass = isActive ? 'text-daruma-red' : 'text-gray-400 hover:text-daruma-dark';
          iconBgClass = isActive ? 'bg-daruma-red/10' : '';
        } else {
          itemClass = isActive ? 'text-daruma-red' : 'text-gray-400 hover:text-white';
          iconBgClass = isActive ? 'bg-white/5' : '';
        }

        return (
          <Link key={item.name} href={item.href} className={`flex flex-col items-center p-2 ${itemClass} transition-colors`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${iconBgClass}`}>
              <i className={`fa-solid ${item.icon} text-xl`}></i>
            </div>
            <span className="text-[10px] font-bold">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
