'use client'

import { ArrowLeft, Layers, Box, FileText, Share2, Activity, Zap, Terminal } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { FlowchartModal } from '@/components/FlowchartModal'
import { motion } from 'framer-motion'

const CHARTS = {
    asis: `
        graph TD
            A[Manufactura] -->|Carga Manual| B(Cool Store -29C)
            B -->|Conteo Cíclico| C{¿Calidad?}
            C -->|OK| D(Omega -18C)
            C -->|Rechazo| E[Destrucción]
            D -->|Traslado Manual| F(Yethi -18C)
            F -->|Picking Manual| G(Bahías 3C)
            G -->|Embarque| H[Cliente]
    `,
    poc: `
        graph TD
            subgraph "Proceso Actual"
                A[Manufactura] --> B(Cool Store)
                B --> D(Omega)
            end
            
            subgraph "Integración Fase 0"
                SAP[SAP ERP] -->|Interceptar ZPL| INT{Bridge Interceptor}
                INT -->|Data| DB[(WMS Cloud)]
                INT -->|Print| ZEB[Zebra Printer]
                ZEB -->|Etiqueta RFID| B
            end
            
            D -->|Salida Arco RFID| EXIT{Arco PoC}
            EXIT -->|Match| DB
            EXIT -->|Mismatch| AL[Alerta Operador]
    `,
    fase1: `
        graph TD
            subgraph "Integración Fase 0"
                SAP[SAP ERP] --> INT{Interceptor}
                INT --> DB[(WMS Cloud)]
                INT --> ZEB[Zebra]
            end

            subgraph "Fase 1: Infraestructura"
                ZEB -->|Pallet ID| CS_IN{Arco Ent CS}
                CS_IN -->|Tag + Thermal| DB
                CS_IN --> CS[Cool Store]
                
                CS -->|Salida CS| CS_OUT{Arco Sal CS}
                CS_OUT -->|Data| DB
                
                CS_OUT --> OMG[Omega]
                OMG -->|Salida OMG| OMG_OUT{Arco Sal OMG}
                OMG_OUT --> DB
                
                IMP[Importación] -->|Estación Etiquetado| YETH_IN{Arco Ent Yethi}
                YETH_IN --> DB
                YETH_IN --> YETH[Yethi]
            end
    `,
    fase2: `
        graph TD
            subgraph "Capas de Datos"
                SAP[SAP ERP] --> INT{Interceptor}
                ARCOS[4 Arcos RFID] --> DB[(WMS Engine)]
                INT --> DB
            end

            subgraph "Operación WMS"
                DB -->|Tarea| APP[App Mobile]
                APP -->|Escaneo QR Ubicación| LOC[Validación Posición]
                LOC -->|Movimiento| OP(Operador)
            end

            subgraph "Gestión de Errores"
                OP -->|Paso por Arco| RFID{Lectura RFID}
                RFID -->|Correcto| TWIN[Gemelo Digital 3D]
                RFID -->|Incorrecto| AL[ALERTA MISMATCH]
                AL -->|Instrucción Emergencia| REDIR{Redirección}
                REDIR -->|Nueva Ubicación| CSR[Cool Store Rack Doble]
                REDIR -->|Nueva Ubicación| YETH[Zona Yethi]
                CSR --> DB
                YETH --> DB
            end
    `
}

export default function DesignPage() {
    const [modalConfig, setModalConfig] = useState<{ isOpen: boolean, type: string, title: string } | null>(null)

    const openModal = (type: string, title: string) => {
        setModalConfig({ isOpen: true, type, title })
    }
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-blue-500/30">
            <div className="max-w-[1400px] mx-auto px-6 py-12">
                <Link href="/" className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors group">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Volver al Inicio
                </Link>

                <header className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h1 className="text-6xl font-black text-white mb-4 italic tracking-tighter">SPEC: MARK CDH</h1>
                        <p className="text-xl text-gray-400 max-w-2xl">
                            Hoja de ruta técnica para la transformación digital del Cedis Helados Holanda.
                            Integración de trazabilidad RFID, visión térmica y lógica WMS.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-xl text-center">
                            <p className="text-[10px] uppercase tracking-widest text-blue-400 font-bold mb-1">Versión</p>
                            <p className="text-white font-mono text-lg">1.2.0</p>
                        </div>
                        <div className="bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-xl text-center">
                            <p className="text-[10px] uppercase tracking-widest text-purple-400 font-bold mb-1">Status</p>
                            <p className="text-white font-mono text-lg">In Review</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
                    {/* SECTION 1: AS-IS */}
                    <section className="space-y-8">
                        <div className="flex items-center justify-between border-l-4 border-gray-600 pl-6 py-2 bg-gradient-to-r from-gray-600/5 to-transparent">
                            <div>
                                <h2 className="text-4xl font-bold text-white tracking-tight">Proceso Actual (AS-IS)</h2>
                                <p className="text-gray-500 uppercase tracking-widest text-xs font-mono mt-1">Línea Base Operativa</p>
                            </div>
                            <button
                                onClick={() => openModal('asis', 'Proceso Actual (AS-IS)')}
                                className="bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 group"
                            >
                                <Share2 size={14} className="group-hover:rotate-12 transition-transform" /> Ver Diagrama
                            </button>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.07] transition-all">
                            <p className="text-lg leading-relaxed mb-8">
                                La operación actual depende de procesos manuales y condiciones extremas de temperatura que dificultan la captura de datos en tiempo real.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 bg-blue-900/20 border border-blue-500/20 rounded-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-blue-400/50">ZONE_01</div>
                                    <h3 className="font-bold text-blue-400 mb-3 text-xl">Cool Store</h3>
                                    <p className="text-sm text-gray-300 leading-relaxed">Maduración crítica a <span className="text-blue-300 font-bold">-29°C</span>. Racks de alta densidad con flujo dinámico.</p>
                                </div>
                                <div className="p-6 bg-indigo-900/20 border border-indigo-500/20 rounded-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-indigo-400/50">ZONE_02</div>
                                    <h3 className="font-bold text-indigo-400 mb-3 text-xl">Omega</h3>
                                    <p className="text-sm text-gray-300 leading-relaxed">Área de clasificación y calidad a <span className="text-indigo-300 font-bold">-18°C</span>. Punto de estrangulamiento logístico.</p>
                                </div>
                                <div className="p-6 bg-purple-900/20 border border-purple-500/20 rounded-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-purple-400/50">ZONE_03</div>
                                    <h3 className="font-bold text-purple-400 mb-3 text-xl">Yethi</h3>
                                    <p className="text-sm text-gray-300 leading-relaxed">Almacenamiento masivo a <span className="text-purple-300 font-bold">-18°C</span>. Pasillos de auditoría manual.</p>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest text-gray-500">Puntos de Dolor</h4>
                                    <ul className="text-sm space-y-2 text-gray-400">
                                        <li>• Inventario basado en conteos cíclicos manuales.</li>
                                        <li>• Cero visibilidad de transiciones entre zonas.</li>
                                        <li>• El frío extremo (-29°C) daña el hardware estándar.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-2 uppercase text-xs tracking-widest text-gray-500">Tecnología Actual</h4>
                                    <ul className="text-sm space-y-2 text-gray-400">
                                        <li>• SAP ERP Centralizado.</li>
                                        <li>• Impresoras Zebra ZT411.</li>
                                        <li>• Lectura de códigos de barras 1D/2D.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: PoC */}
                    <section className="space-y-8">
                        <div className="flex items-center justify-between border-l-4 border-blue-500 pl-6 py-2 bg-gradient-to-r from-blue-500/5 to-transparent">
                            <div>
                                <h2 className="text-4xl font-bold text-white tracking-tight">Fase 0: PoC</h2>
                                <p className="text-blue-500 uppercase tracking-widest text-xs font-mono mt-1">Validación de Hipótesis</p>
                            </div>
                            <button
                                onClick={() => openModal('poc', 'Fase 0: PoC (Cumulative)')}
                                className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 text-blue-400 group"
                            >
                                <Share2 size={14} className="group-hover:rotate-12 transition-transform" /> Ver Diagrama
                            </button>
                        </div>

                        <div className="bg-blue-500/5 border border-blue-500/10 rounded-3xl p-8">
                            <div className="flex flex-col xl:flex-row gap-8">
                                <div className="flex-1">
                                    <p className="text-lg leading-relaxed mb-6">
                                        Estrategia de <span className="text-white font-bold">"Zero Friction"</span>: Capturar datos de SAP sin modificar una sola línea de código del ERP.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                            <p><strong className="text-white">Interceptor ZPL:</strong> Bridge que escucha el puerto de impresión y parsea comandos en tiempo real.</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                            <p><strong className="text-white">Detección de Ingreso:</strong> Al imprimir, el sistema auto-asigna la tarima al inventario del Cool Store.</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                            <p><strong className="text-white">Primer Arco RFID:</strong> Ubicado en la salida del Cool Store para validar el primer movimiento físico.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="xl:w-64 bg-black/40 rounded-2xl p-6 border border-white/5 font-mono text-[11px] leading-relaxed">
                                    <p className="text-blue-400 mb-2">// Lógica de Interceptación</p>
                                    <p className="text-gray-500 italic">IF command contains "^XA"</p>
                                    <p className="text-gray-300 ml-4">EXTRACT PalletID</p>
                                    <p className="text-gray-300 ml-4">PUSH to WMS_Temp_Inv</p>
                                    <p className="text-gray-500 italic mt-4">IF RFID_Read(PalletID)</p>
                                    <p className="text-gray-300 ml-4">MOVE to Transit_Store</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: Phase 1 */}
                    <section className="space-y-8">
                        <div className="flex items-center justify-between border-l-4 border-emerald-500 pl-6 py-2 bg-gradient-to-r from-emerald-500/5 to-transparent">
                            <div>
                                <h2 className="text-4xl font-bold text-white tracking-tight">Fase 1: Infraestructura</h2>
                                <p className="text-emerald-500 uppercase tracking-widest text-xs font-mono mt-1">Conectividad Total</p>
                            </div>
                            <button
                                onClick={() => openModal('fase1', 'Fase 1: Infraestructura (Cumulative)')}
                                className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 text-emerald-400 group"
                            >
                                <Share2 size={14} className="group-hover:rotate-12 transition-transform" /> Ver Diagrama
                            </button>
                        </div>

                        <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white italic">Hardware Desplegado</h3>
                                <div className="space-y-4">
                                    <div className="bg-emerald-900/10 p-4 rounded-xl border border-emerald-500/20">
                                        <p className="text-sm font-bold text-emerald-400 uppercase tracking-tighter mb-1">4 Arcos RFID Profesionales</p>
                                        <p className="text-xs text-gray-400 leading-relaxed">Ubicados en Cool Store (Ent/Sal), Omega (Sal) y Yethi (Conexión).</p>
                                    </div>
                                    <div className="bg-emerald-900/10 p-4 rounded-xl border border-emerald-500/20">
                                        <p className="text-sm font-bold text-emerald-400 uppercase tracking-tighter mb-1">Cámaras Térmicas IP67</p>
                                        <p className="text-xs text-gray-400 leading-relaxed">Monitoreo de tª en transiciones críticas mediante visión térmica integrada en arcos.</p>
                                    </div>
                                    <div className="bg-emerald-900/10 p-4 rounded-xl border border-emerald-500/20">
                                        <p className="text-sm font-bold text-emerald-400 uppercase tracking-tighter mb-1">Redes de Baja Tª</p>
                                        <p className="text-xs text-gray-400 leading-relaxed">Conectividad mediante cableado blindado para resistir congelación continua.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white italic">Estación de Etiquetado</h3>
                                <div className="bg-black/40 border border-white/5 rounded-2xl p-6 h-full relative">
                                    <div className="absolute top-4 right-4 animate-pulse w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]" />
                                    <p className="text-sm mb-4">Ubicada estratégicamente en las <span className="text-white font-bold">Bahías de Carga</span> para procesar tarimas de importación.</p>
                                    <ul className="text-xs space-y-3 text-gray-400">
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> PC Industrial de Alto Desempeño</li>
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Impresora de Etiquetas RFID Centralizada</li>
                                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Sincronización Directa con Servidor Central</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: Phase 2 */}
                    <section className="space-y-8">
                        <div className="flex items-center justify-between border-l-4 border-cyan-500 pl-6 py-2 bg-gradient-to-r from-cyan-500/5 to-transparent">
                            <div>
                                <h2 className="text-4xl font-bold text-white tracking-tight">Fase 2: Cerebro WMS</h2>
                                <p className="text-cyan-500 uppercase tracking-widest text-xs font-mono mt-1">Inteligencia y Control</p>
                            </div>
                            <button
                                onClick={() => openModal('fase2', 'Fase 2: Cerebro WMS (Full Cumulative)')}
                                className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 text-cyan-400 group"
                            >
                                <Share2 size={14} className="group-hover:rotate-12 transition-transform" /> Ver Diagrama
                            </button>
                        </div>

                        <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-3xl p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <p className="text-xl leading-relaxed text-gray-300">
                                        La culminación del proyecto mediante el control digital total y la asistencia al operador.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="bg-cyan-900/10 px-5 py-4 rounded-2xl border border-cyan-500/10">
                                            <h4 className="text-white font-bold mb-1 italic">Validación Dual (QR + RFID)</h4>
                                            <p className="text-xs text-gray-400">Escaneo de QR en ubicación para inicio de tarea y validación pasiva vía RFID durante el movimiento.</p>
                                        </div>
                                        <div className="bg-red-500/10 px-5 py-4 rounded-2xl border border-red-500/20">
                                            <h4 className="text-red-400 font-bold mb-1 italic">Mismatch Redirection Logic</h4>
                                            <p className="text-xs text-gray-400">Si se extrae la tarima errónea, el sistema bloquea el re-ingreso al rack dinámico y redirige a <span className="text-white font-bold">Rack Doble</span> o <span className="text-white font-bold">Yethi</span>.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-cyan-500/10 rounded-3xl aspect-square border border-cyan-500/20 flex items-center justify-center relative group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-3xl" />
                                    <div className="text-center p-8 relative z-10 transition-transform group-hover:scale-105 duration-500">
                                        <div className="w-20 h-20 bg-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-[0_0_30px_#06b6d4]">
                                            <Layers size={40} className="text-white" />
                                        </div>
                                        <h4 className="text-2xl font-black text-white italic mb-2 tracking-tighter">TOTAL VISIBILITY</h4>
                                        <p className="text-xs text-cyan-400 font-mono uppercase tracking-[0.2em]">Efficiency Unlocked</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <footer className="mt-20 pt-8 border-t border-white/10 text-center flex flex-col items-center gap-4">
                    <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">Propiedad de Grupo escaphmex sa de cv &bull; Ingeniería CDH</p>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                    </div>
                </footer>
            </div>

            {/* FLOWCHART MODAL */}
            {modalConfig && (
                <FlowchartModal
                    isOpen={modalConfig.isOpen}
                    onClose={() => setModalConfig(null)}
                    title={modalConfig.title}
                    chart={CHARTS[modalConfig.type as keyof typeof CHARTS]}
                />
            )}
        </div>
    )
}
