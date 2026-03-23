"use client";

import React, { useState } from "react";
import ThemeSetter from "@/components/ThemeSetter";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Mock data for community posts
  const mockPosts = [
    {
      id: "1",
      mood: "Hopeful",
      moodIcon: "fa-face-smile-beam",
      moodColor: "text-daruma-purple",
      moodBg: "bg-purple-50",
      content: "Hoping to pass my final exams with flying colors so I can finally relax this summer.",
      timeAgo: "2 hours ago",
      reactions: { heart: 12, sparkle: 5, support: 8 }
    },
    {
      id: "2",
      mood: "Anxious",
      moodIcon: "fa-cloud",
      moodColor: "text-blue-500",
      moodBg: "bg-blue-50",
      content: "Starting a new job tomorrow. I really hope I fit in with the team and can handle the responsibilities.",
      timeAgo: "5 hours ago",
      reactions: { heart: 24, sparkle: 2, support: 45 }
    },
    {
      id: "3",
      mood: "Lost",
      moodIcon: "fa-compass",
      moodColor: "text-gray-500",
      moodBg: "bg-gray-100",
      content: "Feeling a bit directionless right now. I wish for clarity and the courage to take the next step.",
      timeAgo: "1 day ago",
      reactions: { heart: 56, sparkle: 12, support: 89 }
    },
    {
      id: "4",
      mood: "Grateful",
      moodIcon: "fa-heart",
      moodColor: "text-daruma-green",
      moodBg: "bg-green-50",
      content: "Thankful for the small moments of peace today. Wishing everyone a beautiful week.",
      timeAgo: "2 days ago",
      reactions: { heart: 102, sparkle: 45, support: 12 }
    }
  ];

  return (
    <>
      <ThemeSetter theme="light" />
      
      <TopNav title="Daruma Wish" />

      <main className="flex-1 flex flex-col relative overflow-y-auto pb-24 hide-scrollbar">
        {/* Header Section */}
        <section className="px-6 pt-6 pb-4">
          <h1 className="font-display font-black text-3xl text-gray-900 mb-2">Community Wall</h1>
          <p className="text-gray-500 text-sm font-medium">Shared hopes and dreams from around the world.</p>
        </section>

        {/* Filter Section */}
        <section className="px-6 pb-4 sticky top-0 z-30 bg-[#f8f9fa]/95 backdrop-blur-md pt-2">
          <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
            {["All", "Hopeful", "Anxious", "Lost", "Grateful"].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-bold shadow-sm whitespace-nowrap transition-all ${
                  activeFilter === filter 
                    ? "bg-daruma-purple text-white" 
                    : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-200 hover:text-gray-900 hover:border-gray-400"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* Posts Feed */}
        <section className="px-6 py-4 flex flex-col gap-4">
          {mockPosts
            .filter(post => activeFilter === "All" || post.mood === activeFilter)
            .map(post => (
            <div key={post.id} className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm relative overflow-hidden wish-card-texture">
              {/* Post Header */}
              <div className="flex justify-between items-start mb-3">
                <div className={`flex items-center gap-2 ${post.moodBg} px-3 py-1.5 rounded-full`}>
                  <i className={`fa-solid ${post.moodIcon} ${post.moodColor} text-sm`}></i>
                  <span className={`text-xs font-bold ${post.moodColor}`}>{post.mood}</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">{post.timeAgo}</span>
              </div>

              {/* Post Content */}
              <p className="font-sans text-gray-800 font-semibold text-sm leading-relaxed mb-4">
                &quot;{post.content}&quot;
              </p>

              {/* Reactions */}
              <div className="flex items-center gap-3 border-t border-gray-100 pt-3">
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                    <i className="fa-solid fa-heart text-xs"></i>
                  </div>
                  <span className="text-xs font-bold">{post.reactions.heart}</span>
                </button>
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-yellow-500 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-yellow-100 flex items-center justify-center transition-colors">
                    <i className="fa-solid fa-sparkles text-xs"></i>
                  </div>
                  <span className="text-xs font-bold">{post.reactions.sparkle}</span>
                </button>
                <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-500 transition-colors group">
                  <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <i className="fa-solid fa-hands-holding-child text-xs"></i>
                  </div>
                  <span className="text-xs font-bold">{post.reactions.support}</span>
                </button>
              </div>
            </div>
          ))}
          
          {mockPosts.filter(post => activeFilter === "All" || post.mood === activeFilter).length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i className="fa-solid fa-wind text-3xl text-gray-300"></i>
              </div>
              <h3 className="font-display font-bold text-lg text-gray-900 mb-1">No posts found</h3>
              <p className="text-gray-500 text-sm">Be the first to share a {activeFilter.toLowerCase()} wish.</p>
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </>
  );
}
