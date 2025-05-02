"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import AuthRedirect from "@/components/AuthRedirect";

// Cor verde neon da marca
const neonGreen = "#A3FF6A";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
    if (!formData.email.includes('@')) newErrors.email = "E-mail inválido";
    if (!formData.password) newErrors.password = "Senha é obrigatória";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      router.replace('/dashboard');
    } catch (error: any) {
      let msg = "Erro ao fazer login. Tente novamente.";
      if (error.code === "auth/invalid-email") msg = "E-mail inválido.";
      if (error.code === "auth/wrong-password") msg = "Senha incorreta.";
      if (error.code === "auth/user-not-found") msg = "Usuário não encontrado.";
      setErrors({ general: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthRedirect>
      <div className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8" style={{ background: "#101010" }}>
        {/* Textura de pontos no fundo */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0" style={{backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "18px 18px"}} />
        <div className="relative z-10 w-full max-w-md space-y-6 sm:space-y-8 rounded-2xl bg-black/90 p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-800" style={{backdropFilter: 'blur(2px)'}}>
          {/* Logo real */}
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-black border border-green-400 p-2 flex items-center justify-center" style={{width: 48, height: 48}}>
              <Image src="/logo.png" alt="Logo Hyper Solution" width={32} height={32} />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{color: neonGreen}}>Login</h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-400">
              Entre com suas credenciais
            </p>
          </div>
          {errors.general && (
            <div className="bg-red-900/40 border border-red-800 text-red-100 rounded p-2 text-center mb-2 text-xs sm:text-sm">
              {errors.general}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-300">
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`bg-black border border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-green-400 w-full rounded-xl px-3 py-2 text-sm sm:text-base outline-none transition-all duration-150 ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-xs sm:text-sm font-medium text-gray-300">
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
                    className={`bg-black border border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-green-400 w-full rounded-xl px-3 py-2 text-sm sm:text-base outline-none transition-all duration-150 ${errors.password ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-400"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                    ) : (
                      <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-red-400 mt-1">{errors.password}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-2.5 text-sm sm:text-base font-semibold text-black hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 active:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
              style={{backgroundColor: neonGreen}}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
            <Link href="/cadastro" className="block text-center text-xs sm:text-sm text-gray-400 hover:text-green-400 transition-colors duration-150">
              Não tem uma conta? Cadastre-se
            </Link>
          </form>
          <p className="text-center text-xs text-gray-500">© 2024 Todos os direitos reservados</p>
        </div>
      </div>
    </AuthRedirect>
  );
} 