"use client";

import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import ThemeSetter from "@/components/ThemeSetter";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";

const MOODS = [
  { id: 'hopeful', label: 'Hopeful', icon: 'fa-sun', colorClass: 'text-daruma-gold', bgClass: 'bg-grad-hopeful' },
  { id: 'calm', label: 'Calm', icon: 'fa-water', colorClass: 'text-daruma-softblue', bgClass: 'bg-grad-calm' },
  { id: 'determined', label: 'Determined', icon: 'fa-fire', colorClass: 'text-daruma-red', bgClass: 'bg-grad-determined' },
  { id: 'grateful', label: 'Grateful', icon: 'fa-hands-praying', colorClass: 'text-daruma-purple', bgClass: 'bg-grad-grateful' },
  { id: 'healing', label: 'Healing', icon: 'fa-leaf', colorClass: 'text-daruma-green', bgClass: 'bg-grad-healing' },
  { id: 'courage', label: 'Courage', icon: 'fa-shield-heart', colorClass: 'text-daruma-orange', bgClass: 'bg-grad-courage' },
];

export default function MoodPage() {
  const { selectedMood, setSelectedMood } = useAppStore();
  const router = useRouter();

  const handleContinue = () => {
    if (selectedMood) {
      router.push('/wish/new');
    }
  };

  return (
    <>
      <ThemeSetter theme="dark" />
      <TopNav theme="dark" showBack={true} />
      
      <main className="flex-1 flex flex-col pb-24 relative">
        {/* Ambient Background Glows */}
        <div className="absolute top-20 left-10 w-48 h-48 bg-daruma-softblue/20 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-daruma-purple/10 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Header Section */}
        <section id="mood-header" className="px-6 pt-8 pb-6 text-center relative z-10">
          <h1 className="font-display font-black text-3xl md:text-4xl leading-tight mb-2 text-white">
            How are you feeling?
          </h1>
          <p className="text-gray-300 text-base font-medium">
            Select a mood to set the tone for your wish.
          </p>
        </section>

        {/* Daruma Preview Section */}
        <section id="daruma-preview" className="px-6 py-4 flex justify-center relative z-10">
          <div className="relative w-40 h-40 bg-white/5 rounded-full p-4 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg">
            {/* Glow effect behind daruma */}
            <div className="absolute inset-0 bg-daruma-gold/20 rounded-full blur-xl animate-pulse"></div>
            <img 
              className="w-full h-full object-contain drop-shadow-2xl relative z-10" 
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/0d2ba59086-22ba7b64ec72d7a814bb.png" 
              alt="Cute Daruma doll preview" 
            />
            
            {/* Floating particles */}
            <div className="absolute top-2 left-4 text-daruma-gold text-xs animate-bounce"><i className="fa-solid fa-sparkles"></i></div>
            <div className="absolute bottom-4 right-2 text-white/50 text-xs animate-pulse"><i className="fa-solid fa-star"></i></div>
          </div>
        </section>

        {/* Mood Grid Section */}
        <section id="mood-grid" className="px-6 py-6 relative z-10">
          <div className="grid grid-cols-2 gap-4">
            {MOODS.map((mood) => {
              const isActive = selectedMood === mood.id;
              return (
                <button 
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`mood-chip ${mood.bgClass} rounded-2xl p-4 flex flex-col items-center justify-center gap-3 h-28 ${isActive ? 'chip-active-state' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center ${mood.colorClass} text-xl`}>
                    <i className={`fa-solid ${mood.icon}`}></i>
                  </div>
                  <span className="font-display font-bold text-white text-sm">{mood.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Action Footer */}
        <section id="action-footer" className="px-6 py-8 mt-auto relative z-10 flex flex-col gap-4">
          <button 
            onClick={handleContinue}
            disabled={!selectedMood}
            className={`btn-press w-full ${selectedMood ? 'bg-daruma-blue hover:bg-blue-600' : 'bg-gray-600 opacity-50 cursor-not-allowed'} text-white font-display font-bold text-lg py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-colors`}
          >
            <span>Continue</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
          <button 
            onClick={() => router.push('/')}
            className="w-full bg-transparent border border-white/20 text-white font-display font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors"
          >
            Back to Home
          </button>
        </section>

      </main>

      <BottomNav theme="dark" />
    </>
  );
}
