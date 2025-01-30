"use client";

import React from "react";
import { ChevronRight, MessageCircle, Shield, Zap } from "lucide-react";
import Link from "next/link";

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
            Connect with friends and family instantly through our cloud-based
            messaging service.
          </p>

          {/* Google Login Button */}
          <div className="flex">
            <Link
              className="py-3 px-8 bg-white text-gray-900 rounded-lg mx-auto hover:bg-gray-100 transition-colors shadow-lg"
              href="/login"
            >
              Login Bitch
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl text-white border border-gray-700 hover:bg-gray-800/70 transition-colors">
            <MessageCircle className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Instant Messaging</h3>
            <p className="text-gray-400">
              Send messages, photos, and files instantly to anyone around the
              world.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl text-white border border-gray-700 hover:bg-gray-800/70 transition-colors">
            <Shield className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Secure Encryption</h3>
            <p className="text-gray-400">
              Your messages are protected with end-to-end encryption for maximum
              privacy.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl text-white border border-gray-700 hover:bg-gray-800/70 transition-colors">
            <Zap className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-400">
              Experience blazing-fast message delivery and seamless
              synchronization.
            </p>
          </div>
        </div>

        {/* Added subtle pattern overlay for depth */}
      </main>
    </div>
  );
};

export default HomePage;
