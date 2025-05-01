'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, DollarSign, BarChart2, PieChart as PieChartIcon,
  Settings, Home, Package
} from 'lucide-react';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line 
} from 'recharts';
import React from 'react';
import Image from "next/image";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] p-2 rounded border border-blue-500">
        <p className="text-white">Taxa: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

// Função para calcular a posição dos labels ao redor do gráfico
function getLabelPosition(
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number
) {
  const angle = (startAngle + endAngle) / 2;
  const radius = (innerRadius + outerRadius) / 2 + 30; // 30px para afastar do gráfico
  const rad = (Math.PI / 180) * angle;
  return {
    x: cx + radius * Math.cos(-rad),
    y: cy + radius * Math.sin(-rad),
    textAnchor: Math.cos(-rad) > 0 ? 'start' : 'end',
    dominantBaseline: 'middle',
  };
}

const Dashboard = () => {
  // Dados de exemplo
  const conversionData = [
    { name: 'Convertidos', value: 32 },
    { name: 'Não Convertidos', value: 68 },
  ];

  const ticketData = [
    { name: 'Jan', value: 90 },
    { name: 'Fev', value: 95 },
    { name: 'Mar', value: 100 },
    { name: 'Abr', value: 110 },
    { name: 'Mai', value: 105 },
    { name: 'Jun', value: 115 },
  ];

  const responseTimeData = [
    { name: 'Seg', value: 28 },
    { name: 'Ter', value: 25 },
    { name: 'Qua', value: 35 },
    { name: 'Qui', value: 28 },
    { name: 'Sex', value: 30 },
  ];

  const categoryData = [
    { name: 'Eletrônicos', value: 35, units: '400 un.' },
    { name: 'Vestuário', value: 26, units: '300 un.' },
    { name: 'Utensílios', value: 9, units: '100 un.' },
    { name: 'Alimentos', value: 17, units: '200 un.' },
    { name: 'Decoração', value: 13, units: '150 un.' },
  ];

  const COLORS = {
    blue: '#3B82F6',     // Azul para Eletrônicos
    green: '#4AE290',    // Verde neon para Vestuário
    orange: '#F59E0B',   // Laranja/Amarelo para Utensílios
    purple: '#8B5CF6',   // Roxo para Alimentos
    pink: '#EC4899',     // Rosa para Decoração
    darkGray: '#1a1a1a'  // Cinza escuro para fundo
  };

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white">
      {/* Sidebar */}
      <div className="w-64 bg-[#1a1a1a] p-6">
        <div className="flex items-center mb-8">
          <div className="rounded-full bg-black border border-green-400 p-2 flex items-center justify-center" style={{width: 40, height: 40}}>
            <Image src="/logo.png" alt="Logo Hyper Solution" width={28} height={28} />
          </div>
          <h1 className="text-xl font-bold ml-3 uppercase">HYPER</h1>
        </div>
        
        <nav className="space-y-6">
          <a href="#" className="flex items-center space-x-3 text-white bg-[#4AE290] bg-opacity-10 p-3 rounded-lg">
            <Home size={20} />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-[#4AE290] p-3">
            <Package size={20} />
            <span>Produtos</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-[#4AE290] p-3">
            <Settings size={20} />
            <span>Configurações</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Visão Geral</h2>
          <p className="text-gray-400">Monitoramento de métricas em tempo real</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#4AE290] border-opacity-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 mb-1">Atendimentos sem resposta</p>
                <h3 className="text-2xl font-bold">18%</h3>
                <p className="text-[#4AE290] text-sm mt-1">-2.5% em relação ao mês anterior</p>
              </div>
              <div className="bg-[#4AE290] bg-opacity-10 p-3 rounded-lg">
                <Clock className="text-[#4AE290]" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#4AE290] border-opacity-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 mb-1">Respostas insatisfatórias</p>
                <h3 className="text-2xl font-bold">7.2%</h3>
                <p className="text-[#4AE290] text-sm mt-1">-1.3% em relação ao mês anterior</p>
              </div>
              <div className="bg-[#4AE290] bg-opacity-10 p-3 rounded-lg">
                <Clock className="text-[#4AE290]" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#4AE290] border-opacity-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 mb-1">Tempo médio de resposta</p>
                <h3 className="text-2xl font-bold">3.2 min</h3>
                <p className="text-[#4AE290] text-sm mt-1">-14s em relação à semana anterior</p>
              </div>
              <div className="bg-[#4AE290] bg-opacity-10 p-3 rounded-lg">
                <Clock className="text-[#4AE290]" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#4AE290] border-opacity-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 mb-1">Custo por Token</p>
                <h3 className="text-2xl font-bold">R$ 0.00042</h3>
                <p className="text-red-500 text-sm mt-1">+0.00003 em relação ao mês anterior</p>
              </div>
              <div className="bg-[#4AE290] bg-opacity-10 p-3 rounded-lg">
                <DollarSign className="text-[#4AE290]" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#4AE290] border-opacity-10">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Taxa de Conversão</h3>
              <p className="text-gray-400 text-sm">Últimos 30 dias</p>
            </div>
            <div className="h-[300px] flex flex-col items-center justify-center">
              <ResponsiveContainer width={250} height={250}>
                <PieChart>
                  <Pie
                    data={conversionData}
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ cx, cy, midAngle, outerRadius, value, index }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius * 0.7;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#fff"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="16"
                          fontWeight="500"
                        >
                          {`${value}%`}
                        </text>
                      );
                    }}
                  >
                    {conversionData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? '#4AE290' : '#3B82F6'} 
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-8 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2 bg-[#4AE290]" />
                  <span className="text-sm text-gray-400">Leads Convertidos</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2 bg-[#3B82F6]" />
                  <span className="text-sm text-gray-400">Leads Não Convertidos</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#4AE290] border-opacity-10">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Ticket Médio</h3>
              <p className="text-gray-400 text-sm">Últimos 6 meses</p>
            </div>
            <div className="flex flex-col h-[300px] justify-between">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ticketData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{ background: '#1a1a1a', border: '1px solid rgba(74, 226, 144, 0.1)' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="value" fill="#4AE290" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-between mt-4 pt-4 border-t border-gray-800">
                <div>
                  <p className="text-2xl font-bold">R$ 146.53</p>
                  <p className="text-gray-400">Média atual</p>
                </div>
                <div className="text-[#4AE290] flex items-center">
                  <span className="text-lg">+15.3%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#4AE290] border-opacity-10">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Desempenho Mensal</h3>
              <p className="text-gray-400 text-sm">Gráfico de desempenho pode ser adicionado aqui</p>
            </div>
            <div className="h-[300px] flex items-center justify-center">
              <BarChart2 size={48} className="text-gray-600" />
            </div>
          </div>

          <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#4AE290] border-opacity-10">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Saída por Categoria</h3>
              <p className="text-gray-400 text-sm">Distribuição de vendas</p>
            </div>
            <div className="flex flex-col h-[300px]">
              <div className="flex-1 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                      labelLine={false}
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = outerRadius + 30;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        const textAnchor = x > cx ? 'start' : 'end';

                        return (
                          <text
                            x={x}
                            y={y}
                            fill={Object.values(COLORS)[index]}
                            textAnchor={textAnchor}
                            dominantBaseline="middle"
                            fontSize="16"
                            fontWeight="500"
                          >
                            {`${categoryData[index].name}: ${categoryData[index].value}%`}
                          </text>
                        );
                      }}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-4 mt-8">
                <div className="flex justify-center gap-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS.blue }} />
                    <span className="text-sm text-gray-400">Eletrônicos: 400 un.</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS.orange }} />
                    <span className="text-sm text-gray-400">Utensílios: 100 un.</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS.purple }} />
                    <span className="text-sm text-gray-400">Alimentos: 200 un.</span>
                  </div>
                </div>
                <div className="flex justify-center gap-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS.pink }} />
                    <span className="text-sm text-gray-400">Decoração: 150 un.</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS.green }} />
                    <span className="text-sm text-gray-400">Vestuário: 300 un.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 