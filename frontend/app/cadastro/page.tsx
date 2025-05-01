"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, UserPlus, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { auth } from "@/config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import AuthRedirect from "@/components/AuthRedirect";

// Cor verde neon da marca
const neonGreen = "#A3FF6A";

export default function Cadastro() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: ""
      }));
    }
    if (name === "confirmPassword" || (name === "password" && formData.confirmPassword)) {
      const password = name === "password" ? value : formData.password;
      const confirmValue = name === "confirmPassword" ? value : formData.confirmPassword;
      if (password && confirmValue && password !== confirmValue) {
        setErrors((prev: any) => ({
          ...prev,
          passwordMatch: "As senhas não coincidem"
        }));
      } else {
        setErrors((prev: any) => ({
          ...prev,
          passwordMatch: ""
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!formData.username.trim()) newErrors.username = "Nome de usuário é obrigatório";
    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
    if (!formData.email.includes('@')) newErrors.email = "E-mail inválido";
    if (!formData.password) newErrors.password = "Senha é obrigatória";
    if (formData.password.length < 6) newErrors.password = "A senha deve ter pelo menos 6 caracteres";
    if (formData.password !== formData.confirmPassword) newErrors.passwordMatch = "As senhas não coincidem";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    try {
      // Cria o usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      // Atualiza o nome de usuário
      await updateProfile(userCredential.user, { displayName: formData.username });
      router.push('/dashboard');
    } catch (error: any) {
      let msg = "Erro ao criar conta. Tente novamente.";
      if (error.code === "auth/email-already-in-use") msg = "E-mail já cadastrado.";
      if (error.code === "auth/invalid-email") msg = "E-mail inválido.";
      if (error.code === "auth/weak-password") msg = "Senha fraca. Use pelo menos 6 caracteres.";
      setErrors({ general: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthRedirect>
      <div className="min-h-screen flex items-center justify-center relative" style={{ background: "#101010" }}>
        {/* Textura de pontos no fundo */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0" style={{backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "18px 18px"}} />
        <div className="relative z-10 w-full max-w-md space-y-8 rounded-2xl bg-black/90 p-8 shadow-2xl border border-gray-800" style={{backdropFilter: 'blur(2px)'}}>
          {/* Logo real */}
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-black border border-green-400 p-2 flex items-center justify-center" style={{width: 56, height: 56}}>
              <Image src="/logo.png" alt="Logo Hyper Solution" width={40} height={40} />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight" style={{color: neonGreen}}>Criar conta</h2>
            <p className="mt-2 text-sm text-gray-400">
              Preencha os dados abaixo para se cadastrar
            </p>
          </div>
          {errors.general && (
            <div className="bg-red-900/40 border border-red-800 text-red-100 rounded p-2 text-center mb-2">
              {errors.general}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-300">
                  Nome de Usuário
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Seu nome de usuário"
                  value={formData.username}
                  onChange={handleChange}
                  className={`bg-black border border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-green-400 w-full rounded-xl px-3 py-2 outline-none transition-all duration-150 ${errors.username ? "border-red-500" : ""}`}
                />
                {errors.username && (
                  <p className="text-xs text-red-400 mt-1">{errors.username}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-black border border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-green-400 w-full rounded-xl px-3 py-2 outline-none transition-all duration-150 ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-300">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={`bg-black border border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-green-400 w-full rounded-xl px-3 py-2 outline-none transition-all duration-150 ${errors.password ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400 mt-1">{errors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                  Confirmar Senha
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`bg-black border border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-green-400 w-full rounded-xl px-3 py-2 outline-none transition-all duration-150 ${errors.passwordMatch ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.passwordMatch && (
                  <p className="text-xs text-red-400 mt-1">{errors.passwordMatch}</p>
                )}
              </div>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black border border-green-400 hover:bg-green-400 hover:text-black text-white py-2 rounded-xl transition-all duration-200 focus:ring-4 focus:ring-green-400/40 disabled:opacity-70 flex items-center justify-center font-semibold text-lg"
                style={{boxShadow: `0 0 0 2px ${neonGreen}33`}}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Cadastrar
                  </span>
                )}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="flex items-center justify-center text-sm font-semibold transition-colors"
              style={{color: neonGreen}}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Voltar para o login
            </Link>
          </div>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-800" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-black px-2 text-gray-400">
                © 2024 Todos os direitos reservados
              </span>
            </div>
          </div>
        </div>
      </div>
    </AuthRedirect>
  );
} 