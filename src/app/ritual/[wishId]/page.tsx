"use client";

import ThemeSetter from "@/components/ThemeSetter";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";

export default function RitualPage({ params }: { params: { wishId: string } }) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  
  const progressRef = useRef(progress);
  const isPressingRef = useRef(isPressing);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const maxProgress = 100;
  const circumference = 251.2;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update refs
  useEffect(() => {
    progressRef.current = progress;
    isPressingRef.current = isPressing;
  }, [progress, isPressing]);

  const completeRitual = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsPressing(false);
    setProgress(maxProgress);
    setIsCompleted(true);
  }, []);

  const startFilling = (e: React.TouchEvent | React.MouseEvent) => {
    if (e.type === 'touchstart') {
      // Prevent default to avoid selection/scrolling if needed, but in React we usually do it in a passive listener or via CSS `touch-action: none`
    }
    if (progressRef.current >= maxProgress || isCompleted) return;
    
    setIsPressing(true);
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      if (progressRef.current < maxProgress) {
        setProgress(p => Math.min(p + 2, maxProgress));
      } else {
        completeRitual();
      }
    }, 30);
  };

  const stopFilling = useCallback(() => {
    if (isCompleted) return;
    setIsPressing(false);
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    if (progressRef.current > 0 && progressRef.current < maxProgress) {
      intervalRef.current = setInterval(() => {
        if (progressRef.current > 0 && !isPressingRef.current) {
          setProgress(p => Math.max(p - 3, 0));
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 50);
    }
  }, [isCompleted]);

  useEffect(() => {
    const handleMouseUp = () => stopFilling();
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('blur', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('blur', handleMouseUp);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [stopFilling]);

  const offset = circumference - (progress / 100) * circumference;

  if (!isMounted) return null;

  return (
    <>
      <ThemeSetter theme="ritual" />
      
      <nav className="w-full px-6 pt-12 pb-4 flex justify-between items-center bg-[#141722]/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-daruma-purple to-purple-900 flex items-center justify-center text-white shadow-glow">
            <i className="fa-solid fa-yin-yang text-xl"></i>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white">Daruma Wish</span>
        </div>
        <button 
          onClick={() => router.push('/')}
          className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-white hover:bg-white/10 transition-colors"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </nav>

      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Ambient Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-daruma-purple/20 rounded-full blur-[80px] pointer-events-none z-0"></div>
        <div className="absolute bottom-20 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none z-0"></div>

        {/* Ritual Header */}
        <section id="ritual-header" className="px-6 pt-8 pb-2 relative z-10 text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-daruma-purple/20 border border-daruma-purple/30 text-daruma-purple text-xs font-bold tracking-wider uppercase mb-4 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <i className="fa-solid fa-sparkles mr-2"></i> The Ritual
          </div>
          <h1 className="font-display font-black text-3xl text-white mb-2">Seal Your Wish</h1>
          <p className="text-gray-400 text-sm font-medium px-4">Breathe deeply, focus your intention, and fill the Daruma&apos;s eye to commit your wish to the universe.</p>
        </section>

        {/* Daruma Interaction Area */}
        <section id="daruma-interaction" className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 py-8">
          
          <div className="relative w-64 h-64 md:w-72 md:h-72 animate-float">
            <img 
              className="w-full h-full object-contain drop-shadow-[-3px_20px_40px_rgba(0,0,0,0.5)] select-none pointer-events-none" 
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8079d95304-18f90020282ba7628eb4.png" 
              alt="Daruma doll" 
              draggable={false}
            />
            
            <div 
              onMouseDown={startFilling}
              onTouchStart={startFilling}
              onContextMenu={(e) => e.preventDefault()}
              className={`absolute -top-[64%] -right-[58%] w-[21%] h-[21%] daruma-eye-container rounded-full overflow-visible transition-transform touch-none cursor-pointer z-50 ${isPressing ? 'scale-95' : ''}`}
            >
              {/* This is an invisible, oversized hit area to make tapping much easier on mobile */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] rounded-full bg-transparent z-50"></div>
              
              <div className={`absolute inset-0 rounded-full overflow-hidden bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.8)] border-2 border-daruma-purple/50 ${isCompleted ? 'completed-glow' : (!isPressing && progress === 0 ? 'animate-pulse' : '')}`}>
                {!isPressing && progress === 0 && !isCompleted && (
                  <div className="pulse-ring"></div>
                )}
                <div 
                  className="ink-fill" 
                  style={{ height: `${progress}%`, backgroundColor: isCompleted ? '#000' : '#111' }}
                ></div>
                
                <svg className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] pointer-events-none" viewBox="0 0 100 100">
                  <circle className="text-white/20" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                  <circle 
                    className="text-daruma-purple progress-ring-circle" 
                    strokeWidth="8" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={offset} 
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50" 
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Interaction Hint */}
          <div className={`mt-12 glass-panel rounded-2xl p-4 flex items-center gap-4 max-w-sm w-full mx-auto animate-pulse-slow transition-opacity duration-300 ${isCompleted ? 'opacity-0 hidden' : 'opacity-100'}`}>
            <div className="w-12 h-12 rounded-full bg-daruma-purple/20 flex items-center justify-center text-daruma-purple shrink-0 border border-daruma-purple/30">
              <i className="fa-solid fa-hand-pointer text-xl"></i>
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-sm">Tap and Hold</h3>
              <p className="text-xs text-gray-400 mt-0.5">Press the blank eye to fill it with ink and seal your intention.</p>
            </div>
          </div>

          {/* Completion State */}
          <div className={`mt-8 text-center transition-opacity duration-500 ${isCompleted ? 'opacity-100' : 'opacity-0 hidden'}`}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-3 shadow-[0_0_20px_rgba(74,222,128,0.3)]">
              <i className="fa-solid fa-check text-3xl"></i>
            </div>
            <h2 className="font-display font-bold text-2xl text-white">Wish Sealed</h2>
            <p className="text-sm text-gray-400 mt-1">Your intention has been set into motion.</p>
          </div>

        </section>

        {/* Action Footer */}
        <section className={`px-6 py-6 mt-auto relative z-10 transition-all duration-500 ${isCompleted ? 'opacity-100 animate-pulse-slow pointer-events-auto' : 'opacity-50 pointer-events-none'}`}>
          <button 
            onClick={() => router.push(`/wish/${params.wishId}/result`)}
            className="btn-press w-full bg-gradient-to-r from-daruma-purple to-purple-700 text-white font-display font-bold text-lg py-4 rounded-2xl shadow-button flex items-center justify-center gap-2 hover:from-purple-600 hover:to-purple-800 transition-all"
          >
            <span>Reveal Result</span>
            <i className="fa-solid fa-arrow-right ml-1"></i>
          </button>
        </section>
      </main>
    </>
  );
}
