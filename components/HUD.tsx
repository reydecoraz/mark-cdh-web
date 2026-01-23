'use client'

import { useStore } from '@/lib/store'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { Home, ChevronLeft } from 'lucide-react'

// Sub-components
import { MetricsOverlay } from './HUD/MetricsOverlay'
import { ScenarioSelector } from './HUD/ScenarioSelector'
import { SystemLogs } from './HUD/SystemLogs'
import { StageInfoPanel } from './HUD/StageInfoPanel'
import { PathEditorDashboard } from './HUD/PathEditorDashboard'

// Modals
import { ArchModal } from './Modals/ArchModal'
import { PCPrinterModal } from './Modals/PCPrinterModal'

export function HUD() {
    const {
        scenario,
        modalType,
        setModalType
    } = useStore()

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between overflow-hidden">

            {/* TOP HEADER */}
            <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                            whileTap={{ scale: 0.95 }}
                            className="pointer-events-auto bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center gap-2 group transition-all hover:border-blue-500/50"
                        >
                            <Home className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
                            <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors tracking-widest uppercase px-1">Menú</span>
                        </motion.button>
                    </Link>
                    <MetricsOverlay />
                </div>
                <ScenarioSelector />
            </div>

            {/* BOTTOM: LOGS + INFO PANEL + EDITOR UI */}
            <div className="flex items-end justify-between gap-6">
                <SystemLogs />
                <div className="flex items-end gap-4 h-full">
                    <StageInfoPanel />
                    <PathEditorDashboard />
                </div>
            </div>

            {/* GLOBAL MODALS */}
            <AnimatePresence>
                {modalType === 'ARCH' && (
                    <ArchModal scenario={scenario} onClose={() => setModalType(null)} />
                )}
                {modalType === 'PC_PRINTER' && (
                    <PCPrinterModal onClose={() => setModalType(null)} />
                )}
            </AnimatePresence>
        </div>
    )
}
