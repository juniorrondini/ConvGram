"use client"

import React from 'react';
import { ChevronRight, MessageCircle, Shield, Zap } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6">
        <div className="text-white text-2xl font-bold">Convgram</div>
        
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            Fast and Secure Messaging Platform
          </h1>
          <p className="text-xl mb-12 text-gray-400">
            Connect with friends and family instantly through our cloud-based messaging service.
          </p>

          {/* Google Login Button */}
          <button 
            className="flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-lg mx-auto hover:bg-gray-100 transition-colors shadow-lg"
            onClick={() => console.log('Google login clicked')}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl text-white border border-gray-700 hover:bg-gray-800/70 transition-colors">
            <MessageCircle className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Instant Messaging</h3>
            <p className="text-gray-400">Send messages, photos, and files instantly to anyone around the world.</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl text-white border border-gray-700 hover:bg-gray-800/70 transition-colors">
            <Shield className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Secure Encryption</h3>
            <p className="text-gray-400">Your messages are protected with end-to-end encryption for maximum privacy.</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl text-white border border-gray-700 hover:bg-gray-800/70 transition-colors">
            <Zap className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-400">Experience blazing-fast message delivery and seamless synchronization.</p>
          </div>
        </div>

        {/* Added subtle pattern overlay for depth */}
        <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIG9wYWNpdHk9IjAuMiI+PC9wYXRoPgo8L3N2Zz4=')] opacity-50 pointer-events-none" />
      </main>
    </div>
  );
};

export default HomePage;