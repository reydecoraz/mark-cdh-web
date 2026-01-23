'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Mermaid } from './Mermaid'

interface FlowchartModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    chart: string
}

export const FlowchartModal: React.FC<FlowchartModalProps> = ({ isOpen, onClose, title, chart }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100] cursor-pointer"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-6 pointer-events-none"
                    >
                        <div className="bg-[#0f172a] border border-white/10 w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col pointer-events-auto shadow-2xl shadow-blue-500/10">
                            {/* Header */}
                            <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                                <div>
                                    <h3 className="text-2xl font-black text-white italic tracking-tighter uppercase">{title}</h3>
                                    <p className="text-xs text-blue-400 font-mono tracking-widest uppercase mt-1">Diagrama de Flujo Técnico</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-auto p-12 bg-black/20">
                                <Mermaid chart={chart} />
                            </div>

                            {/* Footer */}
                            <div className="px-8 py-4 border-t border-white/5 bg-white/5 text-[10px] text-gray-500 font-mono text-center uppercase tracking-[0.2em]">
                                Ingeniería Proyectos CDH &bull; Grupo escaphmex sa de cv
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
