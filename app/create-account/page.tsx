"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const CreateAccountPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  async function signUpNewUser(email: string, password: string) {
    try {
      setIsLoading(true);
      setFeedbackMessage('');
      setIsError(false);

      // Tenta criar a conta usando supabase.auth.signUp.
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        // Se ocorrer um erro (como email duplicado), lança o erro
        throw error;
      }

      // Se não houve erro, exibe mensagem de sucesso.
      setFeedbackMessage(
        'Conta criada com sucesso! Verifique seu email para confirmar o cadastro. Redirecionando para a Home...'
      );

      // Redireciona após 2 segundos para a Home (ou ajuste a rota conforme necessário)
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error: any) {
      setIsError(true);
      setFeedbackMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUpNewUser(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="max-w-md w-full space-y-8 p-10 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold bg-gradient-to-b from-gray-50 to-gray-400 bg-clip-text text-transparent">
            Crie sua Conta
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Preencha os campos abaixo para criar sua conta.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="email" className="text-sm font-medium text-zinc-300">
                Email
              </label>
              <div className="mt-1 relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-zinc-500"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="password" className="text-sm font-medium text-zinc-300">
                Senha
              </label>
              <div className="mt-1 relative rounded-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-zinc-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-zinc-500 hover:text-zinc-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-zinc-500 hover:text-zinc-300" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {feedbackMessage && (
            <div
              className={`text-sm mt-2 p-3 rounded-lg ${
                isError ? 'text-red-400 bg-red-900/30' : 'text-green-400 bg-green-900/30'
              }`}
            >
              {feedbackMessage}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2.5 px-4 border font-bold border-transparent text-sm rounded-lg text-zinc-700 bg-gradient-to-br from-gray-50 to-gray-200 hover:from-gray-100 hover:to-gray-400"
            >
              {isLoading ? "Carregando..." : "Criar Conta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;
  