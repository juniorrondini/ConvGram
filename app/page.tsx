"use client";

import React from "react";
import Link from "next/link";
import { MessageCircle, Shield, Zap } from "lucide-react";

const HomePage = () => {
  // Base de estilo para garantir mesma altura/largura dos botões
  const buttonBase = 
    "px-8 py-3 rounded-md transition-colors font-medium text-lg focus:outline-none border border-white/10";

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between w-full px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="text-2xl font-bold tracking-wide">Convgram</div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold max-w-3xl leading-tight">
          Conecte-se de forma{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">
            rápida
          </span>{" "}
          e{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-500">
            segura
          </span>
        </h1>
        <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
          Converse com amigos, familiares e colegas em um aplicativo de mensagens
          baseado em nuvem que une velocidade e privacidade.
        </p>

        {/* Área de Botões */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/login"
            className={`${buttonBase} bg-white text-black hover:bg-gray-100`}
          >
            Login
          </Link>
          <Link
            href="/create-account"
            className={`${buttonBase} bg-gray-900 text-white hover:bg-gray-800`}
          >
            Create Account
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 w-full max-w-5xl">
          <div className="bg-white/5 p-6 rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
            <MessageCircle className="w-10 h-10 mb-4 text-white" />
            <h3 className="text-2xl font-bold mb-2">Mensagens Instantâneas</h3>
            <p className="text-gray-300">
              Envie textos, fotos e arquivos rapidamente para qualquer lugar do mundo.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
            <Shield className="w-10 h-10 mb-4 text-white" />
            <h3 className="text-2xl font-bold mb-2">Criptografia Segura</h3>
            <p className="text-gray-300">
              Suas conversas são protegidas com criptografia de ponta a ponta.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
            <Zap className="w-10 h-10 mb-4 text-white" />
            <h3 className="text-2xl font-bold mb-2">Extremamente Rápido</h3>
            <p className="text-gray-300">
              Desfrute de entrega de mensagens incrivelmente veloz e sincronização perfeita.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
