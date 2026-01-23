'use client'

import { motion } from 'framer-motion'
import { X, FileText, Settings, Zap, ShieldCheck, Database, Box } from 'lucide-react'

interface PCPrinterModalProps {
    onClose: () => void
}

export function PCPrinterModal({ onClose }: PCPrinterModalProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md pointer-events-auto"
        >
            <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                className="bg-zinc-900 border border-white/10 rounded-[2.5rem] w-full max-w-5xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-600/30 via-orange-600/20 to-zinc-900 p-8 flex justify-between items-center border-b border-white/5">
                    <div className="flex items-center gap-5">
                        <div className="bg-amber-500/20 p-4 rounded-2xl border border-amber-500/30 shadow-lg shadow-amber-900/20">
                            <FileText className="text-amber-400 w-8 h-8" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tight">Intercepción de Impresión (ZPL)</h2>
                            <p className="text-amber-400/80 text-sm font-mono tracking-[0.2em] uppercase mt-1">Middleware de Etiquetado Inteligente RFID</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-all hover:bg-white/10 p-3 rounded-full border border-white/10 flex items-center justify-center">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Side: Info cards */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all hover:bg-amber-500/5">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="bg-orange-500/20 p-2 rounded-xl">
                                    <Settings className="text-orange-400 w-5 h-5" />
                                </div>
                                <h4 className="text-lg font-bold text-white">Intercepción Transparente</h4>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                El sistema actúa como una <span className="text-orange-300 font-semibold">impresora virtual</span> que captura el flujo de datos nativo enviado desde SAP u otros ERPs sin requerir APIs complejas.
                            </p>
                        </div>

                        <div className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-all hover:bg-cyan-500/5">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="bg-cyan-500/20 p-2 rounded-xl">
                                    <Zap className="text-cyan-400 w-5 h-5" />
                                </div>
                                <h4 className="text-lg font-bold text-white">Inyección de Datos RFID</h4>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                El middleware analiza el archivo ZPL en tiempo real, extrae los identificadores, <span className="text-cyan-300 font-semibold">codifica el tag</span> y sincroniza la información con el <span className="text-blue-300 font-semibold">servidor central</span> para trazabilidad total.
                            </p>
                        </div>

                        <div className="group p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all hover:bg-emerald-500/5">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="bg-emerald-500/20 p-2 rounded-xl">
                                    <ShieldCheck className="text-emerald-400 w-5 h-5" />
                                </div>
                                <h4 className="text-lg font-bold text-white">Sin Modificar el ERP</h4>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Permite modernizar la operación <span className="text-emerald-300 font-semibold">sin tocar una sola línea de código</span> del software original del cliente.
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Large Diagram */}
                    <div className="lg:col-span-8 bg-black/40 rounded-[2rem] border border-white/5 p-12 relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
                        <h4 className="text-white/40 text-[10px] uppercase font-mono tracking-widest absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                            Arquitectura del Flujo de Datos
                        </h4>

                        <div className="w-full max-w-2xl flex items-center justify-between relative py-20">
                            {/* ERP Block */}
                            <div className="relative group flex flex-col items-center">
                                <div className="bg-zinc-800 border border-white/10 p-6 rounded-2xl flex flex-col items-center gap-3 shadow-xl group-hover:border-white/20 transition-all w-32">
                                    <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-500/30">
                                        <Database className="text-blue-400 w-6 h-6" />
                                    </div>
                                    <span className="text-white font-mono font-bold text-xs">SAP / ERP</span>
                                </div>
                                <div className="absolute top-full mt-4 text-[9px] font-mono text-gray-500 text-center w-40 leading-tight">
                                    Output ZPL Original
                                </div>

                                {/* Connection Line to Middleware */}
                                <div className="absolute left-[100%] top-1/2 -translate-y-1/2 w-24 h-0.5 bg-gradient-to-r from-blue-500/30 via-amber-500 to-amber-500">
                                    <motion.div
                                        animate={{ x: [0, 90], opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                        className="w-2 h-2 bg-amber-400 rounded-full top-[-3px] relative shadow-[0_0_100px_#f59e0b]"
                                    />
                                </div>
                            </div>

                            {/* Middleware Block (Center) */}
                            <div className="relative z-10 group flex flex-col items-center">
                                <motion.div
                                    className="bg-amber-600 border border-white/20 p-8 rounded-3xl flex flex-col items-center gap-4 shadow-[0_0_60px_rgba(245,158,11,0.3)] w-48"
                                    animate={{
                                        boxShadow: ["0 0 40px rgba(245,158,11,0.2)", "0 0 80px rgba(245,158,11,0.4)", "0 0 40px rgba(245,158,11,0.2)"]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <div className="relative">
                                        <Settings className="text-white w-10 h-10 animate-spin-slow" />
                                        <motion.div
                                            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 bg-white/20 blur-xl rounded-full"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-white font-black tracking-tighter text-xl leading-none block mb-1">MIDDLEWARE</span>
                                        <span className="text-white/60 text-[9px] font-mono tracking-widest">TRANSPARENT BRIDGE</span>
                                    </div>
                                </motion.div>

                                {/* Connection Line to Printer */}
                                <div className="absolute left-[100%] top-1/2 -translate-y-1/2 w-24 h-0.5 bg-gradient-to-r from-amber-500 via-orange-500 to-orange-500">
                                    <motion.div
                                        animate={{ x: [0, 90], opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.75 }}
                                        className="w-2 h-2 bg-orange-400 rounded-full top-[-3px] relative shadow-[0_0_100px_#f59e0b]"
                                    />
                                </div>
                            </div>

                            {/* Printer Block */}
                            <div className="relative group flex flex-col items-center">
                                <div className="bg-zinc-800 border border-white/10 p-6 rounded-2xl flex flex-col items-center gap-3 shadow-xl group-hover:border-white/20 transition-all w-32">
                                    <div className="bg-orange-500/20 p-3 rounded-xl border border-orange-500/30">
                                        <Box className="text-orange-400 w-6 h-6" />
                                    </div>
                                    <span className="text-white font-mono font-bold text-xs text-center leading-none">ZEBRA RFID</span>
                                </div>
                                <div className="absolute top-full mt-4 flex flex-col items-center">
                                    <motion.div
                                        animate={{
                                            backgroundColor: ["rgba(34,197,94,0.1)", "rgba(34,197,94,0.4)", "rgba(34,197,94,0.1)"],
                                            borderColor: ["rgba(34,197,94,0.2)", "rgba(34,197,94,0.6)", "rgba(34,197,94,0.2)"]
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="px-3 py-1 bg-green-500/10 rounded-full text-[10px] text-green-400 font-bold border border-green-500/20 whitespace-nowrap"
                                    >
                                        SUCCESSFULLY ENCODED
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/10 blur-3xl animate-pulse" />
                        <div className="absolute bottom-6 w-full text-center">
                            <span className="text-[10px] text-blue-400 font-mono tracking-widest uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                                ⇄ Sync Servidor CDH (Monitorización)
                            </span>
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
                    </div>
                </div>

                {/* Footer Action */}
                <div className="p-8 bg-black/40 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px] text-gray-500 font-bold">{i}</div>)}
                        </div>
                        <p className="text-gray-500 text-xs italic">
                            Proceso: Intercepción → Procesamiento → Codificación → <span className="text-blue-400">Cloud Sync</span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-amber-600 hover:bg-amber-500 text-white px-12 py-4 rounded-2xl font-black transition-all shadow-[0_10px_30px_rgba(217,119,6,0.3)] text-base hover:-translate-y-1 active:scale-95"
                    >
                        Entendido
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}
