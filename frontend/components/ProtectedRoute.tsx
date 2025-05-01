"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // Temporariamente removendo a proteção para testes
  return <>{children}</>;
} 