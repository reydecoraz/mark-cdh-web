'use client'

import { useStore } from '@/lib/store'
import { clsx } from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity } from 'lucide-react'
import { SCENARIO_DETAILS } from './constants'

export function StageInfoPanel() {
    const { scenario } = useStore()
    const currentDetails = SCENARIO_DETAILS[scenario]

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={scenario}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className={clsx(
                    "bg-black/90 p-5 rounded-2xl border w-80 shadow-2xl backdrop-blur-xl pointer-events-auto",
                    currentDetails.accent.split(' ')[0]
                )}
            >
                <h2 className={clsx("text-lg font-bold mb-2 flex items-center gap-2", currentDetails.accent.split(' ')[1])}>
                    <Activity className="w-5 h-5" />
                    {currentDetails.title}
                </h2>
                <p className="text-gray-300 text-xs leading-relaxed mb-4">
                    {currentDetails.desc}
                </p>
                <div className="space-y-2">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 pb-1 mb-2">
                        Novedades de Etapa
                    </div>
                    {currentDetails.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-[11px] text-gray-400 font-medium">
                            <div className={clsx("w-1.5 h-1.5 rounded-full mt-1 shrink-0", currentDetails.accent.split(' ')[1].replace('text', 'bg'))} />
                            {feature}
                        </div>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
