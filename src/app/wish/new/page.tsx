"use client";

import ThemeSetter from "@/components/ThemeSetter";
import BottomNav from "@/components/BottomNav";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const CATEGORIES = [
  { id: 'love', label: 'Love', icon: 'fa-heart', color: 'text-daruma-red' },
  { id: 'work', label: 'Work', icon: 'fa-briefcase', color: 'text-daruma-gold' },
  { id: 'health', label: 'Health', icon: 'fa-leaf', color: 'text-daruma-green' },
  { id: 'study', label: 'Study', icon: 'fa-graduation-cap', color: 'text-daruma-blue' },
];

export default function EnterWishPage() {
  const router = useRouter();
  const { 
    selectedMood, 
    draftWish, setDraftWish, 
    selectedCategory, setSelectedCategory, 
    isPrivate, setIsPrivate 
  } = useAppStore();

  const [charCount, setCharCount] = useState(draftWish.length);

  useEffect(() => {
    if (!selectedMood) {
      router.push('/mood');
    }
  }, [selectedMood, router]);

  const handleWishChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 280) {
      setDraftWish(text);
      setCharCount(text.length);
    }
  };

  const handleBeginRitual = () => {
    if (draftWish.trim().length === 0) return;
    
    // Instead of real db insert right now, we just move to the ritual page.
    // For now we can use a dummy wishId or generate a random one.
    const mockWishId = Math.random().toString(36).substring(2, 9);
    router.push(`/ritual/${mockWishId}`);
  };

  if (!selectedMood) return null; // or loading state

  return (
    <>
      <ThemeSetter theme="dark" />
      
      {/* Custom Top Nav for this page because it has a unique layout in prototype */}
      <nav className="w-full px-6 pt-12 pb-4 flex justify-between items-center bg-[#0E152A]/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-daruma-red flex items-center justify-center text-white shadow-sm">
            <i className="fa-solid fa-yin-yang text-xl"></i>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white">Daruma Wish</span>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/10 shadow-card flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <i className="fa-solid fa-bars"></i>
        </button>
      </nav>

      <main className="flex-1 flex flex-col pb-24 relative overflow-y-auto">
        {/* Ambient Background Glows */}
        <div className="absolute top-20 left-10 w-48 h-48 bg-daruma-red/20 rounded-full blur-[60px] pointer-events-none"></div>
        <div className="absolute bottom-40 right-10 w-64 h-64 bg-daruma-gold/10 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Wish Header Section */}
        <section id="wish-header" className="px-6 pt-8 pb-4 relative z-10 flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h1 className="font-display font-black text-2xl md:text-3xl leading-tight text-white">
              Write Your Wish
            </h1>
            <p className="text-daruma-softblue text-sm font-medium capitalize">
              Feeling {selectedMood} <i className={`fa-solid fa-${selectedMood === 'hopeful' ? 'sun' : selectedMood === 'calm' ? 'water' : 'face-smile'} ml-1`}></i>
            </p>
          </div>
        </section>

        {/* Charm Input Section */}
        <section id="charm-input-section" className="px-6 py-4 relative z-10">
          <div className="paper-charm rounded-2xl p-6 text-daruma-dark flex flex-col gap-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-display font-bold text-lg text-daruma-red">My Wish</span>
              <i className="fa-solid fa-pen-nib text-daruma-red/50"></i>
            </div>
            
            <textarea 
              className="w-full bg-transparent border-none outline-none resize-none font-sans text-lg placeholder-daruma-dark/40 min-h-[150px]" 
              placeholder="Dear Daruma, I wish for..."
              maxLength={280}
              value={draftWish}
              onChange={handleWishChange}
              id="wish-input"
            ></textarea>
            
            <div className="flex justify-between items-center border-t border-daruma-dark/10 pt-3">
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-daruma-dark/5 flex items-center justify-center text-daruma-dark/50 hover:bg-daruma-dark/10 transition">
                  <i className="fa-solid fa-face-smile"></i>
                </button>
                <button className="w-8 h-8 rounded-full bg-daruma-dark/5 flex items-center justify-center text-daruma-dark/50 hover:bg-daruma-dark/10 transition">
                  <i className="fa-solid fa-image"></i>
                </button>
              </div>
              <span className={`text-xs font-bold ${charCount > 250 ? 'text-daruma-red' : 'text-daruma-dark/40'}`} id="char-count">
                {charCount} / 280
              </span>
            </div>
          </div>
        </section>

        {/* Category Selector Section */}
        <section id="category-selector" className="px-6 py-4 relative z-10">
          <h3 className="font-display font-bold text-white mb-3 text-sm uppercase tracking-wider opacity-80">Category</h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button 
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full glass-panel font-bold text-sm transition ${isActive ? 'border border-daruma-red/50 bg-daruma-red/20 text-white' : 'text-white hover:bg-white/10'}`}
                >
                  <i className={`fa-solid ${cat.icon} mr-1 ${isActive ? cat.color : ''}`}></i> {cat.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Ritual Settings Section */}
        <section id="ritual-settings" className="px-6 py-4 relative z-10">
          <div className="glass-panel rounded-2xl p-5 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-display font-bold text-white text-lg">Privacy</h4>
                <p className="text-xs text-white/60 mt-1 max-w-[200px]">Keep private or share to community wall after the ritual.</p>
              </div>
              
              {/* Toggle */}
              <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                <input 
                  type="checkbox" 
                  id="toggle" 
                  checked={!isPrivate}
                  onChange={(e) => setIsPrivate(!e.target.checked)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer z-10 top-0 left-0 transition-all duration-300"
                />
                <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-600 cursor-pointer transition-colors duration-300"></label>
              </div>
            </div>
            
            {!isPrivate && (
              <div className="bg-daruma-blue/10 border border-daruma-blue/20 rounded-xl p-3 flex gap-3 items-start mt-2">
                <i className="fa-solid fa-circle-info text-daruma-softblue mt-0.5"></i>
                <p className="text-xs text-white/80 leading-relaxed">
                  Our community is a safe space. All shared wishes remain anonymous. Please be kind and respectful.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Illustration Area */}
        <section id="illustration-area" className="px-6 py-6 flex justify-center relative z-10 opacity-50">
          <img 
            className="w-32 h-32 object-contain" 
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/7c6fffb69c-f8fd6e57de75107c305d.png" 
            alt="Blank Daruma doll" 
          />
        </section>

        {/* Action Footer */}
        <section id="action-footer" className="px-6 py-4 mt-auto relative z-10">
          <button 
            onClick={handleBeginRitual}
            disabled={draftWish.trim().length === 0}
            className={`btn-press w-full text-white font-display font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors ${draftWish.trim().length > 0 ? 'bg-daruma-red shadow-[0_6px_0_#C1382B] hover:bg-[#D03A2A]' : 'bg-gray-600 opacity-50 cursor-not-allowed'}`}
          >
            <i className="fa-solid fa-paintbrush"></i>
            <span>Begin Ritual</span>
          </button>
        </section>

      </main>

      <BottomNav theme="dark" />
    </>
  );
}
