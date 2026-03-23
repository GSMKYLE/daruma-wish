"use client";

import React, { useState } from "react";
import ThemeSetter from "@/components/ThemeSetter";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";

// Mock data for archive
const mockWishes = [
  {
    id: "1",
    content: "Pass my final exams with flying colors",
    date: "Oct 24, 2023",
    mood: "Hopeful",
    moodIcon: "fa-face-smile-beam",
    moodColor: "text-daruma-purple",
    moodBg: "bg-purple-50",
    isPrivate: true,
    isShared: false,
    isFulfilled: false
  },
  {
    id: "2",
    content: "Find a healthy work-life balance",
    date: "Sep 12, 2023",
    mood: "Grateful",
    moodIcon: "fa-heart",
    moodColor: "text-green-500",
    moodBg: "bg-green-50",
    isPrivate: false,
    isShared: true,
    isFulfilled: false
  },
  {
    id: "3",
    content: "Travel to Japan this year",
    date: "Aug 05, 2023",
    mood: "Excited",
    moodIcon: "fa-star",
    moodColor: "text-daruma-gold",
    moodBg: "bg-yellow-50",
    isPrivate: true,
    isShared: false,
    isFulfilled: true
  },
  {
    id: "4",
    content: "Learn to play the piano",
    date: "Jul 20, 2023",
    mood: "Calm",
    moodIcon: "fa-cloud",
    moodColor: "text-blue-500",
    moodBg: "bg-blue-50",
    isPrivate: true,
    isShared: false,
    isFulfilled: false
  }
];

export default function ArchivePage() {
  const [activeFilter, setActiveFilter] = useState("All Wishes");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWish, setSelectedWish] = useState<typeof mockWishes[0] | null>(null);

  const filters = ["All Wishes", "Private", "Shared", "Completed"];

  const filteredWishes = mockWishes.filter(wish => {
    // Apply search
    if (searchQuery && !wish.content.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply filter
    if (activeFilter === "Private") return wish.isPrivate && !wish.isFulfilled;
    if (activeFilter === "Shared") return wish.isShared && !wish.isFulfilled;
    if (activeFilter === "Completed") return wish.isFulfilled;
    return true;
  });

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

        {/* Search & Filter Section */}
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

        {/* Wish Grid */}
        <section className="px-6 py-4 grid grid-cols-2 gap-4">
          {filteredWishes.map(wish => (
            <div 
              key={wish.id}
              onClick={() => setSelectedWish(wish)}
              className={`rounded-[24px] p-4 border shadow-sm relative overflow-hidden wish-card-texture cursor-pointer hover:shadow-md transition-shadow ${
                wish.isFulfilled 
                  ? "bg-daruma-paper border-daruma-gold/20 opacity-80" 
                  : "bg-white border-gray-100"
              }`}
            >
              {wish.isFulfilled && (
                <div className="absolute inset-0 bg-white/40 z-0"></div>
              )}
              
              <div className="relative z-10">
                <div className={`absolute top-3 right-3 flex gap-1 ${wish.isFulfilled ? "text-daruma-gold" : ""}`}>
                  {wish.isFulfilled ? (
                    <i className="fa-solid fa-check-circle"></i>
                  ) : (
                    <div className={`w-2 h-2 rounded-full ${
                      wish.isShared ? "bg-daruma-green" : "bg-daruma-purple"
                    }`}></div>
                  )}
                </div>
                
                <div className="mb-3 flex justify-between items-start">
                  <div className={`${wish.moodBg} p-2 rounded-xl ${wish.moodColor}`}>
                    <i className={`fa-solid ${wish.moodIcon}`}></i>
                  </div>
                </div>
                
                {/* Card Content */}
                  <h3 className={`font-display font-bold text-gray-900 text-sm mb-1 line-clamp-2 ${
                    wish.isFulfilled ? "line-through decoration-gray-400" : ""
                  }`}>
                    &quot;{wish.content}&quot;
                  </h3>
                
                <p className={`text-xs font-medium ${wish.isFulfilled ? "text-gray-500" : "text-gray-400"}`}>
                  {wish.date}
                </p>
                
                <div className="mt-3 flex items-center gap-1">
                  {wish.isFulfilled ? (
                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded-md text-[10px] font-bold uppercase tracking-wider">Fulfilled</span>
                  ) : wish.isShared ? (
                    <span className="px-2 py-1 bg-blue-50 text-blue-500 rounded-md text-[10px] font-bold uppercase tracking-wider">Shared</span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-50 text-gray-500 rounded-md text-[10px] font-bold uppercase tracking-wider">Private</span>
                  )}
                </div>
              </div>
            </div>
          ))}
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
                  <div className={`${selectedWish.moodBg} p-3 rounded-2xl ${selectedWish.moodColor}`}>
                    <i className={`fa-solid ${selectedWish.moodIcon} text-xl`}></i>
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl text-gray-900">{selectedWish.mood}</h2>
                    <p className="text-sm text-gray-500">{selectedWish.date}</p>
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
                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500">
                      <i className={`fa-solid ${selectedWish.isShared ? 'fa-globe' : 'fa-lock'}`}></i>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{selectedWish.isShared ? 'Shared Wish' : 'Private Wish'}</p>
                      <p className="text-xs text-gray-500">{selectedWish.isShared ? 'Visible to community' : 'Only visible to you'}</p>
                    </div>
                  </div>
                  {/* Toggle Switch (Visual only) */}
                  <div className={`w-12 h-6 rounded-full relative cursor-pointer ${selectedWish.isShared ? 'bg-daruma-purple' : 'bg-gray-200'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-all ${selectedWish.isShared ? 'left-6' : 'left-0.5'}`}></div>
                  </div>
                </div>

                {/* Fulfill Action */}
                {!selectedWish.isFulfilled && (
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
                    <button className="px-4 py-2 bg-white text-daruma-gold font-bold text-sm rounded-xl shadow-sm border border-yellow-200 hover:bg-yellow-100 transition-colors">
                      Fulfill
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-gray-100 flex gap-3 mt-auto">
              <button className="flex-1 py-3.5 bg-gray-100 text-red-500 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
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

