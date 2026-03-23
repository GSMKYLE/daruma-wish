"use client";

import ThemeSetter from "@/components/ThemeSetter";
import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import BottomNav from "@/components/BottomNav";
import { generateAffirmation } from "@/utils/affirmations";

import { supabase } from "@/lib/supabase";

export default function WishResultPage(props: { params: Promise<{ wishId: string }> | { wishId: string } }) {
  // Safe extraction for both Next.js 14 and 15
  const [wishIdState, setWishIdState] = useState<string>("unknown");

  useEffect(() => {
    if (props.params instanceof Promise) {
      props.params.then(p => setWishIdState(p.wishId)).catch(() => {});
    } else {
      setWishIdState(props.params?.wishId || "unknown");
    }
  }, [props.params]);
  
  // Disable warning for unused variable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _unused = wishIdState;
  const router = useRouter();
  const { selectedMood, draftWish } = useAppStore();
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Generate affirmation on client side
  const [affirmation, setAffirmation] = useState("");
  
  useEffect(() => {
    setAffirmation(generateAffirmation(selectedMood));
  }, [selectedMood]);
  const [mounted, setMounted] = useState(false);
  const [confetti, setConfetti] = useState<{ id: number, left: number, duration: number, delay: number, color: string, size: number, isRect: boolean }[]>([]);

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2, // Higher resolution
        useCORS: true // Allow loading cross-origin images
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `daruma-wish-${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to save image:", err);
      alert("Failed to save image. Please try again.");
    }
  };

  const handleShareWish = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Daruma Wish',
          text: `I just made a wish: "${draftWish}" 達摩心願屋`,
          url: window.location.origin,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`I just made a wish: "${draftWish}"\nMake yours at: ${window.location.origin}`);
      alert("Wish text copied to clipboard!");
    }
  };

  const [isPosting, setIsPosting] = useState(false);

  const handlePostToCommunity = async () => {
    if (isPosting) return;
    setIsPosting(true);

    try {
      // 確保 wish_id 是有效的 UUID，否則設為 null
      const isValidUUID = wishIdState && wishIdState.length === 36 && wishIdState.includes('-'); // 簡單判斷，如果是我們自己產生的 draft-xxx 就不算
      const finalWishId = isValidUUID ? wishIdState : null;

      let newWishId = finalWishId;

      // 如果這是一個全新的心願 (draft)，我們在發佈時順便把它寫入 wishes 表中
      // 這樣它才會出現在 Archive 中！
      if (!isValidUUID && draftWish) {
        const { data: newWishData, error: wishError } = await supabase
          .from('wishes')
          .insert([
            {
              content: draftWish,
              mood: selectedMood || 'Hopeful',
              category: 'General', // 預設值，因為 result 頁面目前沒有存 category
              is_private: false,
              is_shared: true,
              fulfilled: false
            }
          ])
          .select('id')
          .single();

        if (wishError) {
          console.error("Error saving to wishes table:", wishError);
        } else if (newWishData) {
          newWishId = newWishData.id;
        }
      } else if (finalWishId) {
        // 如果是已存在的心願，就更新狀態
        try {
          await supabase
            .from('wishes')
            .update({ is_shared: true, is_private: false })
            .eq('id', finalWishId);
        } catch (updateErr) {
          console.warn("Could not update wish status:", updateErr);
        }
      }

      // 接著寫入 community_posts 表
      const { error: postError } = await supabase
        .from('community_posts')
        .insert([
          {
            wish_id: newWishId, // 使用新產生的真實 ID，或原本的 ID，或 null
            mood: selectedMood || 'Hopeful',
            content_preview: draftWish || 'To find peace in the present moment...',
            reaction_count: 0
          }
        ]);

      if (postError) {
        throw postError;
      }

      alert("Your wish has been anonymously posted to the Community Wall!");
      router.push('/community');
    } catch (err) {
      console.error("Error posting to community:", err);
      alert("Failed to post. Please try again later.");
    } finally {
      setIsPosting(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    const colors = ['#A855F7', '#F4B942', '#E04A3A', '#71E07E', '#2471E7'];
    const newConfetti = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 5 + Math.random() * 10,
      isRect: Math.random() > 0.5
    }));
    setConfetti(newConfetti);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <ThemeSetter theme={"dark"} />
      
      {/* Confetti Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
        {confetti.map(c => (
          <div 
            key={c.id} 
            className="confetti-piece"
            style={{
              left: `${c.left}%`,
              backgroundColor: c.color,
              width: `${c.size}px`,
              height: `${c.size * (c.isRect ? 1 : 2)}px`,
              animation: `confetti ${c.duration}s ease-out ${c.delay}s forwards`
            }}
          />
        ))}
      </div>

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
          <i className="fa-solid fa-bars"></i>
        </button>
      </nav>

      <main className="flex-1 flex flex-col relative overflow-hidden pb-24">
        {/* Ambient Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-daruma-purple/20 rounded-full blur-[80px] pointer-events-none z-0"></div>
        <div className="absolute bottom-1/3 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none z-0"></div>
        <div className="absolute top-1/2 left-0 w-40 h-40 bg-daruma-red/10 rounded-full blur-[50px] pointer-events-none z-0"></div>

        {/* Header Section */}
        <section id="result-header" className="px-6 pt-6 pb-2 relative z-10 text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold tracking-wider uppercase mb-3 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
            <i className="fa-solid fa-check-circle mr-2"></i> Wish Sealed
          </div>
          <h1 className="font-display font-black text-2xl text-white mb-1">Your Daruma is Ready</h1>
          <p className="text-gray-400 text-sm font-medium">Keep it close, or share it with the world.</p>
        </section>

        {/* Wish Card Section */}
        <section id="wish-card-container" className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 py-4">
          <div ref={cardRef} className="w-full max-w-[340px] bg-daruma-paper rounded-[32px] p-6 relative shadow-wish-card animate-card-appear overflow-hidden wish-card-texture">
            
            {/* Decorative Corner Elements */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-daruma-dark/10 rounded-tl-xl"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-daruma-dark/10 rounded-tr-xl"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-daruma-dark/10 rounded-bl-xl"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-daruma-dark/10 rounded-br-xl"></div>

            {/* Seal / Stamp (Animated) */}
            <div className="absolute top-6 right-6 w-16 h-16 opacity-0 animate-stamp z-20 pointer-events-none mix-blend-multiply">
              <img 
                className="w-full h-full object-contain" 
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/4cdf6872a7-8fb5e5270fb44f7cb465.png" 
                alt="Stamp" 
              />
            </div>

            {/* Card Content */}
            <div className="relative z-10 flex flex-col items-center text-daruma-dark">
              
              {/* Date & Mood */}
              <div className="w-full flex justify-between items-center mb-6 border-b border-daruma-dark/10 pb-3">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date Sealed</span>
                  <span className="text-sm font-bold text-daruma-dark">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                {selectedMood && (
                  <div className="flex items-center gap-2 bg-daruma-purple/10 px-3 py-1.5 rounded-full">
                    <i className="fa-solid fa-face-smile-beam text-daruma-purple text-sm"></i>
                    <span className="text-xs font-bold text-daruma-purple capitalize">{selectedMood}</span>
                  </div>
                )}
              </div>

              {/* Daruma Illustration */}
              <div className="w-40 h-40 mb-6 relative">
                <img 
                  className="w-full h-full object-contain drop-shadow-xl" 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/bf3d74e82b-90b36c80a29348b4b012.png" 
                  alt="Daruma" 
                />
                <div className="absolute inset-0 bg-daruma-purple/20 blur-2xl rounded-full -z-10"></div>
              </div>

              {/* Wish Text */}
              <div className="text-center w-full mb-4">
                <h3 className="font-display font-bold text-lg mb-2 text-daruma-dark">My Intention</h3>
                <div className="bg-white/50 rounded-2xl p-4 border border-daruma-dark/5 relative mb-4">
                  <i className="fa-solid fa-quote-left absolute top-2 left-2 text-daruma-dark/10 text-xl"></i>
                  <p className="font-sans text-daruma-dark/80 font-semibold leading-relaxed relative z-10">
                  &quot;{draftWish || 'To find peace in the present moment and trust the journey ahead, knowing every step has purpose.'}&quot;
                </p>
                  <i className="fa-solid fa-quote-right absolute bottom-2 right-2 text-daruma-dark/10 text-xl"></i>
                </div>

                <h3 className="font-display font-bold text-sm mb-2 text-daruma-purple">A Message For You</h3>
                <p className="font-sans text-sm text-daruma-dark/70 italic px-2">
                  {affirmation}
                </p>
              </div>

              {/* Card Footer */}
              <div className="w-full flex justify-center items-center pt-3 border-t border-daruma-dark/10">
                <div className="flex items-center gap-2 opacity-60">
                  <i className="fa-solid fa-yin-yang text-daruma-dark text-xs"></i>
                  <span className="font-display font-bold text-[10px] tracking-widest uppercase">Daruma Wish</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Actions Section */}
        <section id="card-actions" className="px-6 py-4 relative z-10 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleSaveImage} className="btn-outline bg-daruma-panel/50 border border-white/10 hover:bg-white/10 text-white font-display font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors backdrop-blur-sm">
              <i className="fa-solid fa-download text-gray-400"></i>
              <span>Save Image</span>
            </button>
            <button onClick={handleShareWish} className="btn-outline bg-daruma-panel/50 border border-white/10 hover:bg-white/10 text-white font-display font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors backdrop-blur-sm">
              <i className="fa-solid fa-share-nodes text-gray-400"></i>
              <span>Share Wish</span>
            </button>
          </div>

          <button 
            onClick={handlePostToCommunity}
            disabled={isPosting}
            className={`btn-press w-full bg-gradient-to-r from-daruma-purple to-purple-700 text-white font-display font-bold text-base py-4 rounded-2xl shadow-button flex items-center justify-center gap-2 hover:from-purple-600 hover:to-purple-800 transition-all mt-2 ${isPosting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isPosting ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin"></i>
                <span>Posting...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-earth-americas"></i>
                <span>Post to Community Wall</span>
              </>
            )}
          </button>

          <button 
            onClick={() => router.push('/wish/new')}
            className="w-full text-gray-400 hover:text-white font-display font-bold text-sm py-3 mt-2 transition-colors flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-plus text-xs"></i>
            <span>Start Another Wish</span>
          </button>
        </section>
      </main>

      <BottomNav theme="dark" />
    </>
  );
}
