"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Dashboard from "../components/Dashboard";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black">
        <Dashboard />
      </main>
    </ProtectedRoute>
  );
} 