'use client'

import { useStore } from '@/lib/store'
import { Server, Wifi, Box, Database } from 'lucide-react'

export function MetricsOverlay() {
    const { inventory, officeMetrics } = useStore()

    return (
        <div className="bg-black/70 backdrop-blur-md p-4 rounded-xl border border-white/10 text-white shadow-2xl flex gap-6 pointer-events-auto">
            <div>
                <h1 className="text-xl font-bold flex items-center gap-2 mb-2">
                    <Server className="text-blue-400" />
                    Mark CDH
                </h1>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Wifi className="w-3 h-3 text-green-400" />
                    Latency: 12ms
                </div>
            </div>

            <div className="h-full w-px bg-white/10" />

            <div>
                <div className="text-gray-400 text-xs mb-1 uppercase tracking-wider">Inventario Total</div>
                <div className="text-3xl font-mono font-bold text-blue-400 flex items-center gap-2">
                    <Box className="w-6 h-6" />
                    {inventory}
                </div>
            </div>

            <div className="h-full w-px bg-white/10" />

            <div>
                <div className="text-gray-400 text-xs mb-1 uppercase tracking-wider">Lecturas RFID</div>
                <div className="text-3xl font-mono font-bold text-purple-400 flex items-center gap-2">
                    <Database className="w-6 h-6" />
                    {officeMetrics.totalReads}
                </div>
            </div>
        </div>
    )
}
