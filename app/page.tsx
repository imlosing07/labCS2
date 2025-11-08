"use client";
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Shield, Zap, Users, Code, Database, Activity } from 'lucide-react';

type ProjectKey = 'ecommerce-platform' | 'mobile-banking' | 'inventory-system';

type Project = {
  name: string;
  lastScan: string;
  overallScore: number;
  trend: string;
  metrics: {
    performance: {
      responseTime: number;
      requestsPerSecond: number;
      errorRate: number;
      cpuUsage: number;
      memoryUsage: number;
      activeUsers: number;
    };
    reliability: {
      uptime: number;
      meanTimeToRecover: number;
      failureRate: number;
      availabilityLast24h: number;
    };
    security: {
      vulnerabilitiesHigh: number;
      vulnerabilitiesMedium: number;
      vulnerabilitiesLow: number;
      securityScore: number;
      lastPenTest: string;
    };
    monitoring: {
      alertsLast24h: number;
      incidentsOpen: number;
      mttr: number; // Mean Time To Resolution
      grafanaDashboards: string[];
    };
  };
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProject, setSelectedProject] = useState<ProjectKey>('ecommerce-platform');

  // Datos simulados de métricas ISO 25010
  const projects: Record<ProjectKey, Project> = {
    'ecommerce-platform': {
      name: 'E-Commerce Platform',
      lastScan: '2025-11-06 14:30',
      overallScore: 82,
      trend: 'up',
      metrics: {
        performance: {
          responseTime: 245, // ms
          requestsPerSecond: 1250,
          errorRate: 0.05,
          cpuUsage: 65,
          memoryUsage: 72,
          activeUsers: 3420
        },
        reliability: {
          uptime: 99.98,
          meanTimeToRecover: 15, // minutos
          failureRate: 0.02,
          availabilityLast24h: 100
        },
        security: {
          vulnerabilitiesHigh: 2,
          vulnerabilitiesMedium: 8,
          vulnerabilitiesLow: 15,
          securityScore: 85,
          lastPenTest: '2025-10-15'
        },
        monitoring: {
          alertsLast24h: 5,
          incidentsOpen: 2,
          mttr: 45,
          grafanaDashboards: ['Performance Overview', 'User Transactions', 'Infrastructure Health']
        }
      }
    },
    'mobile-banking': {
      name: 'Mobile Banking App',
      lastScan: '2025-11-06 10:15',
      overallScore: 76,
      trend: 'down',
      metrics: {
        performance: {
          responseTime: 180,
          requestsPerSecond: 850,
          errorRate: 0.08,
          cpuUsage: 78,
          memoryUsage: 85,
          activeUsers: 1850
        },
        reliability: {
          uptime: 99.95,
          meanTimeToRecover: 22,
          failureRate: 0.03,
          availabilityLast24h: 99.8
        },
        security: {
          vulnerabilitiesHigh: 4,
          vulnerabilitiesMedium: 12,
          vulnerabilitiesLow: 23,
          securityScore: 78,
          lastPenTest: '2025-10-28'
        },
        monitoring: {
          alertsLast24h: 12,
          incidentsOpen: 4,
          mttr: 65,
          grafanaDashboards: ['API Performance', 'Security Metrics', 'User Authentication']
        }
      }
    },
    'inventory-system': {
      name: 'Inventory Management System',
      lastScan: '2025-11-05 16:45',
      overallScore: 88,
      trend: 'up',
      metrics: {
        performance: {
          responseTime: 120,
          requestsPerSecond: 450,
          errorRate: 0.02,
          cpuUsage: 45,
          memoryUsage: 58,
          activeUsers: 780
        },
        reliability: {
          uptime: 99.99,
          meanTimeToRecover: 12,
          failureRate: 0.01,
          availabilityLast24h: 100
        },
        security: {
          vulnerabilitiesHigh: 1,
          vulnerabilitiesMedium: 5,
          vulnerabilitiesLow: 12,
          securityScore: 92,
          lastPenTest: '2025-11-01'
        },
        monitoring: {
          alertsLast24h: 2,
          incidentsOpen: 1,
          mttr: 30,
          grafanaDashboards: ['Stock Levels', 'Warehouse Operations', 'System Health']
        }
      }
    }
  };

  // Características ISO 25010 con métricas simuladas
  const qualityCharacteristics = [
    {
      name: 'Adecuación Funcional',
      value: 85,
      subchars: [
        { name: 'Completitud Funcional', value: 88, source: 'Análisis de Requisitos' },
        { name: 'Corrección Funcional', value: 82, source: 'Pruebas Unitarias' },
        { name: 'Pertinencia Funcional', value: 85, source: 'Validación Usuario' }
      ],
      color: '#3b82f6'
    },
    {
      name: 'Eficiencia de Desempeño',
      value: 78,
      subchars: [
        { name: 'Comportamiento Temporal', value: 75, source: 'JMeter' },
        { name: 'Utilización de Recursos', value: 80, source: 'Prometheus' },
        { name: 'Capacidad', value: 79, source: 'Load Testing' }
      ],
      color: '#10b981'
    },
    {
      name: 'Compatibilidad',
      value: 82,
      subchars: [
        { name: 'Coexistencia', value: 85, source: 'Docker Tests' },
        { name: 'Interoperabilidad', value: 79, source: 'API Testing' }
      ],
      color: '#f59e0b'
    },
    {
      name: 'Usabilidad',
      value: 88,
      subchars: [
        { name: 'Reconocimiento de Adecuación', value: 90, source: 'UX Analytics' },
        { name: 'Aprendizaje', value: 87, source: 'User Testing' },
        { name: 'Operabilidad', value: 89, source: 'Hotjar Heatmaps' },
        { name: 'Protección Contra Errores', value: 86, source: 'Error Tracking' },
        { name: 'Estética UI', value: 88, source: 'Design Review' },
        { name: 'Accesibilidad', value: 85, source: 'WAVE Audit' }
      ],
      color: '#8b5cf6'
    },
    {
      name: 'Fiabilidad',
      value: 80,
      subchars: [
        { name: 'Madurez', value: 82, source: 'Production Logs' },
        { name: 'Disponibilidad', value: 85, source: 'Uptime Monitor' },
        { name: 'Tolerancia a Fallos', value: 78, source: 'Chaos Engineering' },
        { name: 'Recuperabilidad', value: 75, source: 'DR Testing' }
      ],
      color: '#ef4444'
    },
    {
      name: 'Seguridad',
      value: 75,
      subchars: [
        { name: 'Confidencialidad', value: 78, source: 'Penetration Test' },
        { name: 'Integridad', value: 80, source: 'OWASP ZAP' },
        { name: 'No Repudio', value: 72, source: 'Audit Logs' },
        { name: 'Responsabilidad', value: 75, source: 'Security Scan' },
        { name: 'Autenticidad', value: 73, source: 'Auth Testing' }
      ],
      color: '#ec4899'
    },
    {
      name: 'Mantenibilidad',
      value: 84,
      subchars: [
        { name: 'Modularidad', value: 88, source: 'SonarQube' },
        { name: 'Reusabilidad', value: 82, source: 'Code Analysis' },
        { name: 'Analizabilidad', value: 85, source: 'SonarQube' },
        { name: 'Modificabilidad', value: 83, source: 'Complexity Metrics' },
        { name: 'Capacidad de Prueba', value: 86, source: 'Coverage Report' }
      ],
      color: '#06b6d4'
    },
    {
      name: 'Portabilidad',
      value: 79,
      subchars: [
        { name: 'Adaptabilidad', value: 82, source: 'Multi-platform Tests' },
        { name: 'Instalabilidad', value: 80, source: 'Deploy Automation' },
        { name: 'Reemplazabilidad', value: 75, source: 'Migration Tests' }
      ],
      color: '#14b8a6'
    }
  ];

  // Datos de SonarQube simulados
  const sonarQubeData = {
    bugs: 23,
    vulnerabilities: 8,
    codeSmells: 145,
    coverage: 78.5,
    duplications: 3.2,
    technicalDebt: '15d 4h',
    reliabilityRating: 'B' as 'A' | 'B' | 'C' | 'D' | 'E',
    securityRating: 'C' as 'A' | 'B' | 'C' | 'D' | 'E',
    maintainabilityRating: 'A' as 'A' | 'B' | 'C' | 'D' | 'E',
    linesOfCode: 45320,
    complexity: 2847
  };

  // Datos históricos
  const historicalData = [
    { month: 'May', score: 75, bugs: 45, coverage: 72 },
    { month: 'Jun', score: 77, bugs: 38, coverage: 74 },
    { month: 'Jul', score: 79, bugs: 32, coverage: 76 },
    { month: 'Ago', score: 80, bugs: 28, coverage: 77 },
    { month: 'Sep', score: 81, bugs: 25, coverage: 78 },
    { month: 'Oct', score: 82, bugs: 23, coverage: 78.5 }
  ];

  // Datos de herramientas integradas
  const toolsIntegration = [
    { name: 'SonarQube', status: 'active', lastSync: '2 min ago', metrics: ['Code Quality', 'Security', 'Maintainability'] },
    { name: 'JMeter', status: 'active', lastSync: '15 min ago', metrics: ['Performance', 'Load Testing'] },
    { name: 'OWASP ZAP', status: 'active', lastSync: '1 hora ago', metrics: ['Security Vulnerabilities'] },
    { name: 'Selenium', status: 'active', lastSync: '30 min ago', metrics: ['Functional Testing'] },
    { name: 'Prometheus', status: 'active', lastSync: '5 min ago', metrics: ['Resource Monitoring'] },
    { name: 'Jest/JUnit', status: 'active', lastSync: '10 min ago', metrics: ['Unit Test Coverage'] },
    { name: 'Lighthouse', status: 'active', lastSync: '45 min ago', metrics: ['Performance', 'Accessibility'] },
    { name: 'ESLint', status: 'active', lastSync: '3 min ago', metrics: ['Code Style', 'Best Practices'] }
  ];

  const radarData = qualityCharacteristics.map(char => ({
    characteristic: char.name.split(' ')[0],
    value: char.value
  }));

  const getRatingColor = (rating: 'A' | 'B' | 'C' | 'D' | 'E') => {
    const colors = { A: 'text-green-500', B: 'text-blue-500', C: 'text-yellow-500', D: 'text-orange-500', E: 'text-red-500' } as const;
    return colors[rating] || 'text-gray-500';
  };

  const getRatingBg = (rating: 'A' | 'B' | 'C' | 'D' | 'E') => {
    const colors = { A: 'bg-green-100', B: 'bg-blue-100', C: 'bg-yellow-100', D: 'bg-orange-100', E: 'bg-red-100' } as const;
    return colors[rating] || 'bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf7f5] to-[#e6e0db]">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-[#d1c7bf]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-[#c75d3c] to-[#a64b2f] p-3 rounded-xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Dashboard de Calidad de Software</h1>
                <p className="text-sm text-slate-500">Métricas basadas en ISO/IEC 25010:2023</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
                <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value as ProjectKey)}
                className="px-4 py-2 border border-[#d1c7bf] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c75d3c]"
              >
                {Object.entries(projects).map(([key, proj]) => (
                  <option key={key} value={key}>{proj.name}</option>
                ))}
              </select>
              <div className="text-right">
                <div className="text-xs text-slate-500">Última actualización</div>
                <div className="text-sm font-medium text-slate-700">{projects[selectedProject].lastScan}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1">
            {['overview', 'characteristics', 'sonarqube', 'trends', 'tools'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium transition-all ${activeTab === tab
                    ? 'text-[#c75d3c] border-b-2 border-[#c75d3c] bg-[#faf7f5]'
                    : 'text-[#5c6b63] hover:text-[#3f4a44] hover:bg-[#f5f2f0]'
                  }`}
              >
                {tab === 'overview' && 'Vista General'}
                {tab === 'characteristics' && 'Características ISO 25010'}
                {tab === 'sonarqube' && 'Análisis SonarQube'}
                {tab === 'trends' && 'Tendencias Históricas'}
                {tab === 'tools' && 'Herramientas Integradas'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            {/* Grafana Integration Notice */}
            <div className="bg-[#5c6b63] text-white p-4 rounded-xl mb-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Activity className="w-6 h-6" />
                  <div>
                    <h3 className="font-semibold">Monitoreo en Tiempo Real con Grafana</h3>
                    <p className="text-sm opacity-90">Dashboards activos: {projects[selectedProject].metrics.monitoring.grafanaDashboards.join(', ')}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#3f4a44] rounded-full text-sm">
                  Última actualización: {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 border border-[#d1c7bf]">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-[#5c6b63]">Score General</div>
                  {projects[selectedProject].trend === 'up' ?
                    <TrendingUp className="w-5 h-5 text-[#68904d]" /> :
                    <TrendingDown className="w-5 h-5 text-[#c14953]" />
                  }
                </div>
                <div className="text-4xl font-bold text-slate-800">{projects[selectedProject].overallScore}</div>
                <div className="text-xs text-slate-500 mt-1">de 100 puntos</div>
                <div className="mt-3 pt-3 border-t border-[#d1c7bf]">
                  <div className="text-xs text-[#5c6b63]">Métricas en tiempo real:</div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="text-xs">
                      <span className="text-[#c75d3c]">CPU:</span> {projects[selectedProject].metrics.performance.cpuUsage}%
                    </div>
                    <div className="text-xs">
                      <span className="text-[#c75d3c]">RAM:</span> {projects[selectedProject].metrics.performance.memoryUsage}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-[#d1c7bf]">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-[#5c6b63]">Rendimiento</div>
                  <Activity className="w-5 h-5 text-[#c75d3c]" />
                </div>
                <div className="text-4xl font-bold text-slate-800">{projects[selectedProject].metrics.performance.responseTime}<span className="text-lg">ms</span></div>
                <div className="text-xs text-[#5c6b63] mt-1">Tiempo de respuesta promedio</div>
                <div className="mt-3 pt-3 border-t border-[#d1c7bf]">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-xs">
                      <span className="text-[#c75d3c]">RPS:</span> {projects[selectedProject].metrics.performance.requestsPerSecond}
                    </div>
                    <div className="text-xs">
                      <span className="text-[#c75d3c]">Error:</span> {projects[selectedProject].metrics.performance.errorRate}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-[#d1c7bf]">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-[#5c6b63]">Disponibilidad</div>
                  <CheckCircle className="w-5 h-5 text-[#68904d]" />
                </div>
                <div className="text-4xl font-bold text-slate-800">{projects[selectedProject].metrics.reliability.uptime}%</div>
                <div className="text-xs text-[#5c6b63] mt-1">Uptime últimas 24h</div>
                <div className="mt-3 pt-3 border-t border-[#d1c7bf]">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-xs">
                      <span className="text-[#c75d3c]">MTTR:</span> {projects[selectedProject].metrics.reliability.meanTimeToRecover}m
                    </div>
                    <div className="text-xs">
                      <span className="text-[#c75d3c]">Fallos:</span> {projects[selectedProject].metrics.reliability.failureRate}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-[#d1c7bf]">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-[#5c6b63]">Monitoreo</div>
                  <Database className="w-5 h-5 text-[#c75d3c]" />
                </div>
                <div className="text-4xl font-bold text-slate-800">{projects[selectedProject].metrics.monitoring.alertsLast24h}</div>
                <div className="text-xs text-[#5c6b63] mt-1">Alertas (24h)</div>
                <div className="mt-3 pt-3 border-t border-[#d1c7bf]">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-xs">
                      <span className="text-[#c75d3c]">Incidentes:</span> {projects[selectedProject].metrics.monitoring.incidentsOpen}
                    </div>
                    <div className="text-xs">
                      <span className="text-[#c75d3c]">MTTR:</span> {projects[selectedProject].metrics.monitoring.mttr}m
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prometheus & Grafana Integration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-xl shadow-md p-6 border border-[#d1c7bf]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#5c6b63]">Métricas de Prometheus</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#68904d] rounded-full animate-pulse"></div>
                    <span className="text-xs text-[#5c6b63]">Recolectando datos</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-[#f5f2f0] rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-[#3f4a44]">Usuarios Activos</div>
                      <div className="text-2xl font-bold text-[#c75d3c]">{projects[selectedProject].metrics.performance.activeUsers}</div>
                    </div>
                    <Users className="w-8 h-8 text-[#5c6b63]" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-[#f5f2f0] rounded-lg">
                      <div className="text-sm font-medium text-[#3f4a44] mb-1">CPU</div>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-[#e6e0db]">
                          <div
                            style={{ width: `${projects[selectedProject].metrics.performance.cpuUsage}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#c75d3c]"
                          ></div>
                        </div>
                        <div className="text-right mt-1">
                          <span className="text-sm font-semibold text-[#c75d3c]">
                            {projects[selectedProject].metrics.performance.cpuUsage}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-[#f5f2f0] rounded-lg">
                      <div className="text-sm font-medium text-[#3f4a44] mb-1">Memoria</div>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-[#e6e0db]">
                          <div
                            style={{ width: `${projects[selectedProject].metrics.performance.memoryUsage}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#c75d3c]"
                          ></div>
                        </div>
                        <div className="text-right mt-1">
                          <span className="text-sm font-semibold text-[#c75d3c]">
                            {projects[selectedProject].metrics.performance.memoryUsage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-[#d1c7bf]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#5c6b63]">Dashboards de Grafana</h3>
                  <Activity className="w-5 h-5 text-[#c75d3c]" />
                </div>
                
                <div className="space-y-3">
                  {projects[selectedProject].metrics.monitoring.grafanaDashboards.map((dashboard, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#f5f2f0] rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#5c6b63] rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#3f4a44]">{dashboard}</div>
                          <div className="text-xs text-[#5c6b63]">Actualizado en tiempo real</div>
                        </div>
                      </div>
                      <div className="text-[#c75d3c]">
                        <Activity className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Radar Chart */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Características ISO/IEC 25010</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#d1c7bf" />
                    <PolarAngleAxis dataKey="characteristic" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Score" dataKey="value" stroke="#c75d3c" fill="#c75d3c" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Top 5 Características</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={qualityCharacteristics.sort((a, b) => b.value - a.value).slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={80} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {qualityCharacteristics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quality Ratings */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Ratings de Calidad (SonarQube)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg ${getRatingBg(sonarQubeData.reliabilityRating)}`}>
                  <div className="text-sm font-medium text-slate-600 mb-2">Fiabilidad</div>
                  <div className={`text-3xl font-bold ${getRatingColor(sonarQubeData.reliabilityRating)}`}>
                    {sonarQubeData.reliabilityRating}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{sonarQubeData.bugs} bugs detectados</div>
                </div>
                <div className={`p-4 rounded-lg ${getRatingBg(sonarQubeData.securityRating)}`}>
                  <div className="text-sm font-medium text-slate-600 mb-2">Seguridad</div>
                  <div className={`text-3xl font-bold ${getRatingColor(sonarQubeData.securityRating)}`}>
                    {sonarQubeData.securityRating}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{sonarQubeData.vulnerabilities} vulnerabilidades</div>
                </div>
                <div className={`p-4 rounded-lg ${getRatingBg(sonarQubeData.maintainabilityRating)}`}>
                  <div className="text-sm font-medium text-slate-600 mb-2">Mantenibilidad</div>
                  <div className={`text-3xl font-bold ${getRatingColor(sonarQubeData.maintainabilityRating)}`}>
                    {sonarQubeData.maintainabilityRating}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{sonarQubeData.codeSmells} code smells</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Characteristics Tab */}
        {activeTab === 'characteristics' && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Modelo de Calidad ISO/IEC 25010</h3>
              <p className="text-xs text-blue-700">
                Este estándar define 8 características de calidad del producto software. Cada característica se descompone en sub-características
                que son medidas mediante métricas específicas obtenidas de diferentes herramientas de análisis.
              </p>
            </div>

            {qualityCharacteristics.map((char, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200" style={{ backgroundColor: `${char.color}10` }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: char.color }}>
                        <span className="text-white font-bold text-lg">{char.value}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">{char.name}</h3>
                        <div className="text-sm text-slate-500">{char.subchars.length} sub-características evaluadas</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold" style={{ color: char.color }}>{char.value}%</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {char.subchars.map((sub, subIdx) => (
                      <div key={subIdx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium text-slate-700 text-sm">{sub.name}</div>
                          <div className="text-xs text-slate-500 mt-1">Fuente: {sub.source}</div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-32 bg-slate-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all"
                              style={{
                                width: `${sub.value}%`,
                                backgroundColor: char.color
                              }}
                            />
                          </div>
                          <span className="font-semibold text-slate-700 w-12 text-right">{sub.value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SonarQube Tab */}
        {activeTab === 'sonarqube' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-800">Análisis Estático de Código - SonarQube</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-slate-600">Conectado</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <div className="text-sm text-blue-700 font-medium mb-1">Líneas de Código</div>
                  <div className="text-2xl font-bold text-blue-900">{sonarQubeData.linesOfCode.toLocaleString()}</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <div className="text-sm text-purple-700 font-medium mb-1">Complejidad Ciclomática</div>
                  <div className="text-2xl font-bold text-purple-900">{sonarQubeData.complexity.toLocaleString()}</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <div className="text-sm text-green-700 font-medium mb-1">Cobertura</div>
                  <div className="text-2xl font-bold text-green-900">{sonarQubeData.coverage}%</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                  <div className="text-sm text-orange-700 font-medium mb-1">Duplicaciones</div>
                  <div className="text-2xl font-bold text-orange-900">{sonarQubeData.duplications}%</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-700">Bugs</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingBg(sonarQubeData.reliabilityRating)} ${getRatingColor(sonarQubeData.reliabilityRating)}`}>
                      Rating {sonarQubeData.reliabilityRating}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-red-600 mb-2">{sonarQubeData.bugs}</div>
                  <div className="text-xs text-slate-500">Afectan a la característica de Fiabilidad ISO 25010</div>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Críticos</span>
                      <span className="font-medium">2</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Altos</span>
                      <span className="font-medium">35</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Medios</span>
                      <span className="font-medium">105</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-slate-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-700 mb-3">Mapeo a ISO/IEC 25010</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-700">Bugs → Fiabilidad</div>
                      <div className="text-xs text-slate-500">Madurez, Tolerancia a Fallos</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-700">Vulnerabilidades → Seguridad</div>
                      <div className="text-xs text-slate-500">Confidencialidad, Integridad</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-700">Code Smells → Mantenibilidad</div>
                      <div className="text-xs text-slate-500">Modularidad, Analizabilidad</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trends Tab */}
        {activeTab === 'trends' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Evolución Histórica de Métricas</h3>

              <div className="mb-6">
                <h4 className="font-semibold text-slate-700 mb-4">Score General de Calidad</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[70, 85]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#c75d3c" strokeWidth={3} name="Score ISO 25010" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#5c6b63] mb-4">Reducción de Bugs</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#d1c7bf" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="bugs" stroke="#c14953" strokeWidth={2} name="Bugs (SonarQube)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-700 mb-4">Mejora en Cobertura de Código</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={historicalData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[70, 80]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="coverage" stroke="#68904d" strokeWidth={2} name="Cobertura % (Jest/JUnit)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-6 bg-[#f5f2f0] border border-[#d1c7bf] rounded-lg p-4">
                <h4 className="font-semibold text-[#3f4a44] mb-2">Análisis de Tendencia</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">Score General: +7 puntos</span>
                    </div>
                    <p className="text-green-700">Mejora constante en los últimos 6 meses</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">Bugs: -22 defectos</span>
                    </div>
                    <p className="text-green-700">Reducción del 49% desde mayo</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">Cobertura: +6.5%</span>
                    </div>
                    <p className="text-green-700">Incremento gradual y sostenido</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tools Tab */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Herramientas Integradas</h3>
              <p className="text-sm text-slate-600 mb-6">
                Conjunto de herramientas automatizadas que recopilan métricas para evaluar las 8 características de calidad según ISO/IEC 25010
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {toolsIntegration.map((tool, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tool.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                          {tool.name === 'SonarQube' && <Code className="w-5 h-5 text-green-600" />}
                          {tool.name === 'JMeter' && <Zap className="w-5 h-5 text-yellow-600" />}
                          {tool.name === 'OWASP ZAP' && <Shield className="w-5 h-5 text-red-600" />}
                          {tool.name === 'Selenium' && <Activity className="w-5 h-5 text-blue-600" />}
                          {tool.name === 'Prometheus' && <Database className="w-5 h-5 text-orange-600" />}
                          {tool.name === 'Jest/JUnit' && <CheckCircle className="w-5 h-5 text-purple-600" />}
                          {tool.name === 'Lighthouse' && <TrendingUp className="w-5 h-5 text-indigo-600" />}
                          {tool.name === 'ESLint' && <AlertTriangle className="w-5 h-5 text-cyan-600" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-800">{tool.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${tool.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                              }`}></div>
                            <span className="text-xs text-slate-500">Última sync: {tool.lastSync}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {tool.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="text-xs bg-slate-50 px-2 py-1 rounded inline-block mr-1 mb-1">
                          {metric}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Integration Architecture */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Arquitectura de Integración</h3>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                      <Code className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">1. Análisis Estático de Código</div>
                      <div className="text-sm text-slate-600">SonarQube, ESLint → Mantenibilidad, Fiabilidad, Seguridad</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">2. Pruebas Automatizadas</div>
                      <div className="text-sm text-slate-600">Jest, JUnit, Selenium → Adecuación Funcional, Capacidad de Prueba</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                      <Zap className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">3. Pruebas de Rendimiento</div>
                      <div className="text-sm text-slate-600">JMeter, Lighthouse → Eficiencia de Desempeño</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                      <Shield className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">4. Análisis de Seguridad</div>
                      <div className="text-sm text-slate-600">OWASP ZAP → Seguridad, Confidencialidad, Integridad</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                      <Database className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">5. Monitoreo en Producción</div>
                      <div className="text-sm text-slate-600">Prometheus, Grafana → Fiabilidad, Disponibilidad</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="bg-white rounded-lg p-3 shadow-sm border border-slate-200">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">6. Análisis de Usabilidad</div>
                      <div className="text-sm text-slate-600">Lighthouse, Hotjar, WAVE → Usabilidad, Accesibilidad</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-slate-50 rounded-lg p-4">
                <h4 className="font-semibold text-slate-700 mb-3">Pipeline de Integración Continua</h4>
                <div className="flex items-center justify-between text-sm">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mb-2 mx-auto">1</div>
                    <div className="text-slate-600">Git Push</div>
                  </div>
                  <div className="flex-1 h-0.5 bg-slate-300 mx-2"></div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mb-2 mx-auto">2</div>
                    <div className="text-slate-600">Build & Test</div>
                  </div>
                  <div className="flex-1 h-0.5 bg-slate-300 mx-2"></div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mb-2 mx-auto">3</div>
                    <div className="text-slate-600">SonarQube Scan</div>
                  </div>
                  <div className="flex-1 h-0.5 bg-slate-300 mx-2"></div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mb-2 mx-auto">4</div>
                    <div className="text-slate-600">Security Scan</div>
                  </div>
                  <div className="flex-1 h-0.5 bg-slate-300 mx-2"></div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold mb-2 mx-auto">5</div>
                    <div className="text-slate-600">Dashboard Update</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Collection Methodology */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Metodología de Recopilación de Datos</h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Recolección Automatizada</h4>
                  <p className="text-sm text-slate-600">
                    Cada herramienta expone sus métricas a través de APIs REST o webhooks. Un servicio agregador
                    (desarrollado en Python) recopila los datos cada 15 minutos y los normaliza según las
                    sub-características de ISO 25010.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Normalización y Mapeo</h4>
                  <p className="text-sm text-slate-600">
                    Las métricas crudas (bugs, vulnerabilidades, cobertura, etc.) se convierten a una escala de
                    0-100 usando umbrales definidos por estándares de la industria y mejores prácticas.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Cálculo de Scores</h4>
                  <p className="text-sm text-slate-600">
                    Cada característica ISO 25010 se calcula como el promedio ponderado de sus sub-características.
                    El score general es el promedio de las 8 características principales.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Almacenamiento y Visualización</h4>
                  <p className="text-sm text-slate-600">
                    Los datos se almacenan en una base de datos PostgreSQL con series temporales. Este dashboard
                    React consume la API para presentar la información en tiempo real.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <div>
              Dashboard de Calidad de Software basado en <span className="font-semibold">ISO/IEC 25010:2023</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Curso: Calidad de Software</span>
              <span>•</span>
              <span>Actualización automática cada 15 minutos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};