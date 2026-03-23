import TopNav from "@/components/TopNav";
import ThemeSetter from "@/components/ThemeSetter";
import BottomNav from "@/components/BottomNav";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <ThemeSetter theme="light" />
      <TopNav />
      <main className="flex-1 flex flex-col pb-24">
        {/* Hero Section */}
        <section id="hero" className="px-6 pt-8 pb-12 flex flex-col items-center text-center relative">
          <div className="absolute top-10 right-10 w-16 h-16 bg-daruma-gold/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-daruma-orange/10 rounded-full blur-2xl"></div>
          
          <h1 className="font-display font-black text-4xl md:text-5xl leading-tight mb-4 z-10">
            Make a Wish,<br/>
            <span className="text-daruma-red">Find Comfort.</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-[280px] z-10 font-medium">
            Your pocket companion for healing, hope, and little moments of magic.
          </p>

          <div className="relative w-full max-w-[300px] aspect-square mb-10 z-10">
            <div className="absolute inset-0 bg-daruma-red/10 rounded-full animate-pulse blur-xl"></div>
            <img 
              className="w-full h-full object-contain drop-shadow-2xl relative z-10" 
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/0d2ba59086-22ba7b64ec72d7a814bb.png" 
              alt="Daruma doll" 
            />
          </div>

          <Link href="/mood" className="btn-press w-full max-w-[300px] bg-daruma-red text-white font-display font-bold text-xl py-4 rounded-2xl shadow-button flex items-center justify-center gap-3 z-10">
            <span>Start Your Wish</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </section>

        {/* Stats/Trust Section */}
        <section id="stats" className="px-6 py-8 bg-white border-y border-daruma-paper">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-display font-bold text-2xl text-daruma-dark">10k+</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Wishes</div>
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-daruma-dark">4.9</div>
              <div className="text-xs text-daruma-gold mt-1">
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star-half-stroke"></i>
              </div>
            </div>
            <div>
              <div className="font-display font-bold text-2xl text-daruma-dark">24/7</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-1">Support</div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="px-6 py-12">
          <div className="flex justify-between items-end mb-8">
            <h2 className="font-display font-black text-3xl">How it<br/>works.</h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400">
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <button className="w-10 h-10 rounded-full bg-daruma-dark text-white flex items-center justify-center">
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-[24px] shadow-card flex items-center gap-5 border border-transparent hover:border-daruma-red/20 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-daruma-orange/10 text-daruma-orange flex items-center justify-center text-2xl shrink-0">
                <i className="fa-solid fa-face-smile"></i>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg mb-1">1. Share your mood</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Tell Daruma how you&apos;re feeling today.</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-card flex items-center gap-5 border border-transparent hover:border-daruma-red/20 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-daruma-red/10 text-daruma-red flex items-center justify-center text-2xl shrink-0">
                <i className="fa-solid fa-pen-nib"></i>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg mb-1">2. Write your wish</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Pour your heart into a digital paper charm.</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[24px] shadow-card flex items-center gap-5 border border-transparent hover:border-daruma-red/20 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-daruma-gold/10 text-daruma-gold flex items-center justify-center text-2xl shrink-0">
                <i className="fa-solid fa-eye"></i>
              </div>
              <div>
                <h3 className="font-display font-bold text-lg mb-1">3. Paint the eye</h3>
                <p className="text-sm text-gray-500 leading-relaxed">Complete the ritual to set your intention.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Teaser */}
        <section id="community" className="px-6 py-10 bg-daruma-dark text-white rounded-t-[40px] mt-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-daruma-red/20 rounded-full blur-3xl"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <h2 className="font-display font-bold text-2xl">Community Wall</h2>
            <Link href="/community" className="text-sm text-daruma-gold font-bold">View all</Link>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/10 relative z-10 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full border-2 border-daruma-dark bg-gray-300 flex items-center justify-center text-daruma-dark text-xs">
                <i className="fa-solid fa-user"></i>
              </div>
              <div>
                <div className="text-sm font-bold">Anonymous</div>
                <div className="text-xs text-gray-400">2 hours ago</div>
              </div>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed italic">&quot;I wish for peace of mind during my exams next week...&quot;</p>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-daruma-gold">#peace</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-daruma-orange">#exams</span>
            </div>
          </div>

          <Link href="/community" className="w-full bg-white text-daruma-dark font-display font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
            <i className="fa-solid fa-users"></i>
            Join the Community
          </Link>
        </section>

        {/* Sign In Entry */}
        <section id="sign-in" className="px-6 py-10 bg-daruma-paper text-center">
          <h3 className="font-display font-bold text-xl mb-2">Already have a Daruma?</h3>
          <p className="text-sm text-gray-600 mb-6">Sign in to view your past wishes and rituals.</p>
          <button className="w-full bg-white border-2 border-daruma-dark text-daruma-dark font-display font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-sm">
            Sign In
          </button>
        </section>

      </main>
      <BottomNav />
    </>
  );
}
