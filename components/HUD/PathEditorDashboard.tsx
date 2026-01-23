'use client'

import { useStore } from '@/lib/store'
import { clsx } from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity } from 'lucide-react'

export function PathEditorDashboard() {
    const {
        pathEditorEnabled,
        transitPoints,
        undoTransitPoint,
        clearTransitPoints,
        currentPathPhase,
        setCurrentPathPhase
    } = useStore()

    if (!pathEditorEnabled) return null

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-black/90 p-5 rounded-2xl border border-cyan-500/50 text-white w-80 shadow-[0_0_30px_rgba(6,182,212,0.2)] backdrop-blur-xl pointer-events-auto"
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-cyan-400 font-bold flex items-center gap-2">
                        <Activity className="w-4 h-4 animate-pulse" />
                        Panel de Tránsito
                    </h3>
                    <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
                        <button
                            onClick={() => setCurrentPathPhase('PHASE1')}
                            className={clsx(
                                "px-2 py-1 rounded text-[9px] font-bold transition",
                                currentPathPhase === 'PHASE1' ? "bg-cyan-600 text-white" : "text-gray-500 hover:text-gray-300"
                            )}
                        >
                            F1
                        </button>
                        <button
                            onClick={() => setCurrentPathPhase('PHASE2')}
                            className={clsx(
                                "px-2 py-1 rounded text-[9px] font-bold transition",
                                currentPathPhase === 'PHASE2' ? "bg-amber-600 text-white" : "text-gray-500 hover:text-gray-300"
                            )}
                        >
                            F2
                        </button>
                    </div>
                </div>

                <div className="space-y-3 mb-4 max-h-40 overflow-y-auto text-[10px] font-mono bg-gray-950/50 p-2 rounded-lg border border-white/10">
                    {transitPoints.length === 0 && <div className="text-gray-600 italic text-center py-4">Esperando coordenadas...<br />(Click Izq: Punto | Click Der: Fin)</div>}
                    {transitPoints.map((segment, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                            <div className="text-cyan-500/50 border-b border-cyan-500/20 pb-1 flex justify-between items-center">
                                <span className="flex items-center gap-1">
                                    TRAMO {sIdx + 1}
                                    <span className={clsx(
                                        "px-1 rounded-[2px] text-[8px] font-bold",
                                        segment.phase === 'PHASE1' ? "bg-cyan-900/50 text-cyan-300" : "bg-amber-900/50 text-amber-300"
                                    )}>
                                        {segment.phase === 'PHASE1' ? 'F1' : 'F2'}
                                    </span>
                                </span>
                                <span>{segment.points.length} pts</span>
                            </div>
                            {segment.points.map((p, pIdx) => (
                                <div key={pIdx} className="flex justify-between pl-2">
                                    <span className="text-gray-500">P{pIdx}:</span>
                                    <span className="text-cyan-200">[{p[0]}, {p[2]}]</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                    <button
                        onClick={undoTransitPoint}
                        className="bg-gray-800 hover:bg-gray-700 p-2.5 rounded-xl text-xs transition border border-gray-600/30 flex items-center justify-center gap-2"
                    >
                        ↩ Deshacer
                    </button>
                    <button
                        onClick={clearTransitPoints}
                        className="bg-red-950/30 hover:bg-red-900/50 p-2.5 rounded-xl text-xs transition border border-red-900/30 text-red-200 flex items-center justify-center gap-2"
                    >
                        🗑️ Limpiar
                    </button>
                    <button
                        onClick={() => {
                            const cleanPath = transitPoints.filter(s => s.points.length > 0)
                            console.log("Phased Path Segments:", JSON.stringify(cleanPath, null, 2))
                            alert("Rutas por Fase impresas en Consola (F12)")
                        }}
                        className="col-span-2 bg-blue-950/40 hover:bg-blue-800/60 p-2.5 rounded-xl text-xs font-bold transition border border-blue-500/30 text-blue-50"
                    >
                        📋 Exportar Rutas por Fase
                    </button>
                </div>


                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('toggle-top-view'))}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 p-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/30 border border-indigo-400/50"
                >
                    <span className="text-lg">🗺️</span> ALTERNAR VISTA 2D / 3D
                </button>
            </motion.div>
        </AnimatePresence>
    )
}
