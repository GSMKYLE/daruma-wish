"use client";

import React, { useState, useEffect } from "react";
import ThemeSetter from "@/components/ThemeSetter";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/lib/supabase";

// 定義 Post 的型別
interface CommunityPost {
  id: string;
  wish_id: string;
  mood: string;
  content_preview: string;
  reaction_count: number;
  created_at: string;
}

export default function CommunityPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Supabase error fetching posts:", error);
        throw error;
      }
      
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to map mood to styles
  const getMoodStyles = (mood: string) => {
    const styles: Record<string, { icon: string, color: string, bg: string }> = {
      'Hopeful': { icon: 'fa-face-smile-beam', color: 'text-daruma-purple', bg: 'bg-purple-50' },
      'Anxious': { icon: 'fa-cloud', color: 'text-blue-500', bg: 'bg-blue-50' },
      'Lost': { icon: 'fa-compass', color: 'text-gray-500', bg: 'bg-gray-100' },
      'Grateful': { icon: 'fa-heart', color: 'text-daruma-green', bg: 'bg-green-50' },
      'Excited': { icon: 'fa-star', color: 'text-yellow-500', bg: 'bg-yellow-50' }
    };
    return styles[mood] || { icon: 'fa-circle', color: 'text-gray-500', bg: 'bg-gray-100' };
  };

  // Helper function to format date relative time
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

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
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center">
              <i className="fa-solid fa-circle-notch fa-spin text-3xl text-daruma-purple mb-4"></i>
              <p className="text-gray-500 text-sm">Loading wishes...</p>
            </div>
          ) : posts.length > 0 ? (
            posts
              .filter(post => activeFilter === "All" || post.mood === activeFilter)
              .map(post => {
                const moodStyle = getMoodStyles(post.mood);
                return (
                  <div key={post.id} className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm relative overflow-hidden wish-card-texture">
                    {/* Post Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className={`flex items-center gap-2 ${moodStyle.bg} px-3 py-1.5 rounded-full`}>
                        <i className={`fa-solid ${moodStyle.icon} ${moodStyle.color} text-sm`}></i>
                        <span className={`text-xs font-bold ${moodStyle.color}`}>{post.mood}</span>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">{timeAgo(post.created_at)}</span>
                    </div>

                    {/* Post Content */}
                    <p className="font-sans text-gray-800 font-semibold text-sm leading-relaxed mb-4">
                      &quot;{post.content_preview}&quot;
                    </p>

                    {/* Reactions */}
                    <div className="flex items-center gap-3 border-t border-gray-100 pt-3">
                      <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                          <i className="fa-solid fa-heart text-xs"></i>
                        </div>
                        <span className="text-xs font-bold">{Math.floor(Math.random() * 50) + post.reaction_count}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-400 hover:text-yellow-500 transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-yellow-100 flex items-center justify-center transition-colors">
                          <i className="fa-solid fa-sparkles text-xs"></i>
                        </div>
                        <span className="text-xs font-bold">{Math.floor(Math.random() * 30)}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-400 hover:text-blue-500 transition-colors group">
                        <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                          <i className="fa-solid fa-hands-holding-child text-xs"></i>
                        </div>
                        <span className="text-xs font-bold">{Math.floor(Math.random() * 20)}</span>
                      </button>
                    </div>
                  </div>
                );
              })
          ) : null}
          
          {!isLoading && posts.filter(post => activeFilter === "All" || post.mood === activeFilter).length === 0 && (
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
