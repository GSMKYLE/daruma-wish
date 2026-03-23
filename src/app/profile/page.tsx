"use client";

import React, { useState } from "react";
import ThemeSetter from "@/components/ThemeSetter";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";

export default function ProfilePage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [anonymousMode, setAnonymousMode] = useState(false);

  return (
    <>
      <ThemeSetter theme="light" />
      
      <TopNav title="Profile" showBack={false} />

      <main className="flex-1 flex flex-col relative overflow-y-auto pb-24 hide-scrollbar">
        {/* Profile Header */}
        <section className="px-6 pt-8 pb-6 flex flex-col items-center border-b border-gray-100 bg-white">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-daruma-purple/10 border-4 border-white shadow-sm flex items-center justify-center overflow-hidden">
              <i className="fa-solid fa-user text-4xl text-daruma-purple"></i>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-daruma-purple text-white flex items-center justify-center border-2 border-white shadow-sm hover:bg-purple-600 transition-colors">
              <i className="fa-solid fa-camera text-xs"></i>
            </button>
          </div>
          <h1 className="font-display font-black text-2xl text-gray-900 mb-1">Guest User</h1>
          <p className="text-gray-500 text-sm font-medium">Joined recently</p>
          
          <div className="flex gap-4 mt-6 w-full max-w-xs">
            <div className="flex-1 bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
              <div className="font-display font-black text-xl text-daruma-purple">12</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Wishes</div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-2xl p-3 text-center border border-gray-100">
              <div className="font-display font-black text-xl text-daruma-green">4</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Fulfilled</div>
            </div>
          </div>
        </section>

        {/* Settings List */}
        <section className="px-6 py-6 flex flex-col gap-6">
          
          {/* Account Settings */}
          <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Account</h2>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-sm">Email Address</div>
                    <div className="text-xs text-gray-500">Not linked</div>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-gray-300 text-sm"></i>
              </button>
              
              <div className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-daruma-purple">
                    <i className="fa-solid fa-mask"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-sm">Anonymous Mode</div>
                    <div className="text-xs text-gray-500">Hide identity in community</div>
                  </div>
                </div>
                <button 
                  onClick={() => setAnonymousMode(!anonymousMode)}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${anonymousMode ? 'bg-daruma-purple' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${anonymousMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Preferences</h2>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="w-full flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-500">
                    <i className="fa-solid fa-bell"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-sm">Push Notifications</div>
                    <div className="text-xs text-gray-500">Daily affirmations</div>
                  </div>
                </div>
                <button 
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${notificationsEnabled ? 'bg-daruma-purple' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${notificationsEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <i className="fa-solid fa-language"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-sm">Language</div>
                    <div className="text-xs text-gray-500">English</div>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-gray-300 text-sm"></i>
              </button>
            </div>
          </div>

          {/* Support & About */}
          <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">About</h2>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-daruma-green">
                    <i className="fa-solid fa-circle-question"></i>
                  </div>
                  <span className="font-bold text-gray-900 text-sm">Help & Support</span>
                </div>
                <i className="fa-solid fa-chevron-right text-gray-300 text-sm"></i>
              </button>
              
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <span className="font-bold text-gray-900 text-sm">Privacy Policy</span>
                </div>
                <i className="fa-solid fa-chevron-right text-gray-300 text-sm"></i>
              </button>
            </div>
          </div>

          {/* Sign Out Button */}
          <button className="mt-2 w-full py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 transition-colors flex items-center justify-center gap-2">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            Sign Out
          </button>
          
          <div className="text-center text-xs text-gray-400 font-medium mt-2">
            Daruma Wish v1.0.0
          </div>

        </section>
      </main>

      <BottomNav />
    </>
  );
}