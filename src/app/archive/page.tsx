"use client";

import React, { useState, useEffect } from "react";
import ThemeSetter from "@/components/ThemeSetter";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/lib/supabase";

// 定義 Wish 的型別
interface Wish {
  id: string;
  content: string;
  mood: string;
  is_private: boolean;
  is_shared: boolean;
  fulfilled: boolean;
  created_at: string;
}

export default function ArchivePage() {
  const [activeFilter, setActiveFilter] = useState("All Wishes");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filters = ["All Wishes", "Private", "Shared", "Completed"];

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWishes(data || []);
    } catch (error) {
      console.error('Error fetching wishes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to map mood to styles
  const getMoodStyles = (mood: string) => {
    const styles: Record<string, { icon: string, color: string, bg: string }> = {
      'hopeful': { icon: 'fa-face-smile-beam', color: 'text-daruma-purple', bg: 'bg-purple-50' },
      'anxious': { icon: 'fa-cloud', color: 'text-blue-500', bg: 'bg-blue-50' },
      'lost': { icon: 'fa-compass', color: 'text-gray-500', bg: 'bg-gray-100' },
      'grateful': { icon: 'fa-heart', color: 'text-green-500', bg: 'bg-green-50' },
      'excited': { icon: 'fa-star', color: 'text-daruma-gold', bg: 'bg-yellow-50' }
    };
    return styles[mood?.toLowerCase()] || { icon: 'fa-circle', color: 'text-gray-500', bg: 'bg-gray-100' };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  const filteredWishes = wishes.filter(wish => {
    // Apply search
    if (searchQuery && !wish.content.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply filter
    if (activeFilter === "Private") return wish.is_private && !wish.fulfilled;
    if (activeFilter === "Shared") return wish.is_shared && !wish.fulfilled;
    if (activeFilter === "Completed") return wish.fulfilled;
    return true;
  });

  const handleToggleShare = async (wishId: string, currentSharedStatus: boolean) => {
    try {
      const newSharedStatus = !currentSharedStatus;
      
      // Update local state first for immediate UI feedback
      setWishes(wishes.map(w => w.id === wishId ? { ...w, is_shared: newSharedStatus, is_private: !newSharedStatus } : w));
      if (selectedWish && selectedWish.id === wishId) {
        setSelectedWish({ ...selectedWish, is_shared: newSharedStatus, is_private: !newSharedStatus });
      }

      // Update Supabase
      const { error } = await supabase
        .from('wishes')
        .update({ is_shared: newSharedStatus, is_private: !newSharedStatus })
        .eq('id', wishId);

      if (error) throw error;
      
      // If sharing, also create a post in community_posts
      if (newSharedStatus) {
        const wish = wishes.find(w => w.id === wishId);
        if (wish) {
          await supabase.from('community_posts').insert([{
            wish_id: wish.id,
            mood: wish.mood,
            content_preview: wish.content,
            reaction_count: 0
          }]);
        }
      } else {
        // If unsharing, remove from community_posts
        await supabase.from('community_posts').delete().eq('wish_id', wishId);
      }
    } catch (error) {
      console.error('Error toggling share status:', error);
      // Revert local state on error
      fetchWishes();
    }
  };

  const handleFulfill = async (wishId: string) => {
    try {
      // Update local state
      setWishes(wishes.map(w => w.id === wishId ? { ...w, fulfilled: true } : w));
      if (selectedWish && selectedWish.id === wishId) {
        setSelectedWish({ ...selectedWish, fulfilled: true });
      }

      // Update Supabase
      const { error } = await supabase
        .from('wishes')
        .update({ fulfilled: true })
        .eq('id', wishId);

      if (error) throw error;
    } catch (error) {
      console.error('Error fulfilling wish:', error);
      fetchWishes();
    }
  };

  const handleDelete = async (wishId: string) => {
    if (!confirm("Are you sure you want to delete this wish?")) return;
    
    try {
      // Remove from local state
      setWishes(wishes.filter(w => w.id !== wishId));
      setSelectedWish(null);

      // Delete from Supabase
      const { error } = await supabase
        .from('wishes')
        .delete()
        .eq('id', wishId);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting wish:', error);
      fetchWishes();
    }
  };

  return (
    <>
      <ThemeSetter theme="light" />
      
      <TopNav title="Daruma Wish" />

      <main className="flex-1 flex flex-col relative overflow-y-auto pb-24 hide-scrollbar">
        {/* Header Section */}
        <section className="px-6 pt-6 pb-4">
          <h1 className="font-display font-black text-3xl text-gray-900 mb-2">My Archive</h1>
          <p className="text-gray-500 text-sm font-medium">Your personal collection of hopes and dreams.</p>
        </section>

        {/* Loading State */}
        {isLoading && (
          <div className="py-12 flex flex-col items-center justify-center">
            <i className="fa-solid fa-circle-notch fa-spin text-3xl text-daruma-purple mb-4"></i>
            <p className="text-gray-500 text-sm">Loading archive...</p>
          </div>
        )}

        {/* Search & Filter Section */}
        {!isLoading && (
          <section className="px-6 pb-4 sticky top-0 z-30 bg-[#f8f9fa]/95 backdrop-blur-md pt-2">
          {/* Search Input */}
          <div className="relative mb-4">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Search wishes..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-daruma-purple/50 focus:border-daruma-purple transition-all text-gray-800 placeholder:text-gray-400 font-medium"
            />
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
            {filters.map(filter => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-bold shadow-sm whitespace-nowrap transition-colors ${
                  activeFilter === filter
                    ? "bg-daruma-purple text-white"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>
        )}

        {/* Wish Grid */}
        <section className="px-6 py-4 grid grid-cols-2 gap-4">
          {filteredWishes.map(wish => {
            const moodStyle = getMoodStyles(wish.mood);
            return (
            <div 
              key={wish.id}
              onClick={() => setSelectedWish(wish)}
              className={`rounded-[24px] p-4 border shadow-sm relative overflow-hidden wish-card-texture cursor-pointer hover:shadow-md transition-shadow ${
                wish.fulfilled 
                  ? "bg-daruma-paper border-daruma-gold/20 opacity-80" 
                  : "bg-white border-gray-100"
              }`}
            >
              {wish.fulfilled && (
                <div className="absolute inset-0 bg-white/40 z-0"></div>
              )}
              
              <div className="relative z-10">
                <div className={`absolute top-3 right-3 flex gap-1 ${wish.fulfilled ? "text-daruma-gold" : ""}`}>
                  {wish.fulfilled ? (
                    <i className="fa-solid fa-check-circle"></i>
                  ) : (
                    <div className={`w-2 h-2 rounded-full ${
                      wish.is_shared ? "bg-daruma-green" : "bg-daruma-purple"
                    }`}></div>
                  )}
                </div>
                
                <div className="mb-3 flex justify-between items-start">
                  <div className={`${moodStyle.bg} p-2 rounded-xl ${moodStyle.color}`}>
                    <i className={`fa-solid ${moodStyle.icon}`}></i>
                  </div>
                </div>
                
                {/* Card Content */}
                  <h3 className={`font-display font-bold text-gray-900 text-sm mb-1 line-clamp-2 ${
                    wish.fulfilled ? "line-through decoration-gray-400" : ""
                  }`}>
                    &quot;{wish.content}&quot;
                  </h3>
                
                <p className={`text-xs font-medium ${wish.fulfilled ? "text-gray-500" : "text-gray-400"}`}>
                  {formatDate(wish.created_at)}
                </p>
                
                <div className="mt-3 flex items-center gap-1">
                  {wish.fulfilled ? (
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded-md text-[10px] font-bold uppercase tracking-wider">Fulfilled</span>
                  ) : wish.is_shared ? (
                    <span className="px-2 py-1 bg-blue-50 text-blue-500 rounded-md text-[10px] font-bold uppercase tracking-wider">Shared</span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded-md text-[10px] font-bold uppercase tracking-wider">Private</span>
                  )}
                </div>
              </div>
            </div>
            );
          })}
        </section>

        {/* Empty State */}
        {filteredWishes.length === 0 && (
          <section className="px-6 py-12 flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <i className="fa-solid fa-ghost text-4xl text-gray-300"></i>
            </div>
            <h3 className="font-display font-bold text-xl text-gray-900 mb-2">No wishes found</h3>
            <p className="text-gray-500 text-sm mb-6">You haven&apos;t added any wishes to this category yet.</p>
            <button className="btn-press bg-daruma-purple text-white font-display font-bold text-sm px-6 py-3 rounded-full shadow-sm flex items-center justify-center gap-2 hover:bg-purple-600 transition-all">
              <i className="fa-solid fa-plus"></i>
              <span>Make a Wish</span>
            </button>
          </section>
        )}
      </main>

      <BottomNav />

      {/* Detail Modal */}
      {selectedWish && (
        <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex flex-col justify-end">
          <div className="w-full max-w-[480px] mx-auto bg-white rounded-t-[32px] p-6 pb-safe animate-slide-up shadow-2xl relative flex flex-col max-h-[90vh]">
            
            {/* Drag Handle */}
            <div 
              className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 cursor-pointer"
              onClick={() => setSelectedWish(null)}
            ></div>
            
            <div className="overflow-y-auto hide-scrollbar flex-1">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className={`${getMoodStyles(selectedWish.mood).bg} p-3 rounded-2xl ${getMoodStyles(selectedWish.mood).color}`}>
                    <i className={`fa-solid ${getMoodStyles(selectedWish.mood).icon} text-xl`}></i>
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl text-gray-900 capitalize">{selectedWish.mood}</h2>
                    <p className="text-sm text-gray-500">{formatDate(selectedWish.created_at)}</p>
                  </div>
                </div>
                <button 
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                  onClick={() => setSelectedWish(null)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              {/* Wish Content */}
              <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100 relative">
                <i className="fa-solid fa-quote-left absolute top-3 left-3 text-gray-200 text-2xl"></i>
                <p className="font-sans text-gray-700 font-semibold leading-relaxed relative z-10 pt-4 pb-2 text-lg">
                  &quot;{selectedWish.content}&quot;
                </p>
              </div>

              {/* Status Controls */}
              <div className="space-y-4 mb-8">
                <h3 className="font-display font-bold text-sm text-gray-400 uppercase tracking-wider">Settings</h3>
                
                {/* Privacy Toggle */}
                <div 
                  className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleToggleShare(selectedWish.id, selectedWish.is_shared)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
                      <i className={`fa-solid ${selectedWish.is_shared ? 'fa-globe' : 'fa-lock'}`}></i>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{selectedWish.is_shared ? 'Shared Wish' : 'Private Wish'}</p>
                      <p className="text-xs text-gray-500">{selectedWish.is_shared ? 'Visible to community' : 'Only visible to you'}</p>
                    </div>
                  </div>
                  {/* Toggle Switch */}
                  <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${selectedWish.is_shared ? 'bg-daruma-purple' : 'bg-gray-200'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-all duration-300 ${selectedWish.is_shared ? 'left-6' : 'left-0.5'}`}></div>
                  </div>
                </div>

                {/* Fulfill Action */}
                {!selectedWish.fulfilled && (
                  <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-100 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-daruma-gold shadow-sm">
                        <i className="fa-solid fa-eye"></i>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">Mark as Fulfilled</p>
                        <p className="text-xs text-gray-500">Paint the second eye</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleFulfill(selectedWish.id)}
                      className="px-4 py-2 bg-white text-daruma-gold font-bold text-sm rounded-xl shadow-sm border border-yellow-200 hover:bg-yellow-100 transition-colors"
                    >
                      Fulfill
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-gray-100 flex gap-3 mt-auto">
              <button 
                onClick={() => handleDelete(selectedWish.id)}
                className="flex-1 py-3.5 bg-gray-100 text-red-500 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
              >
                <i className="fa-solid fa-trash-can"></i> Delete
              </button>
              <button 
                className="flex-[2] py-3.5 bg-daruma-purple text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-sm hover:bg-purple-600 transition-colors"
                onClick={() => setSelectedWish(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

