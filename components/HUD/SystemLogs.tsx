'use client'

import { useStore } from '@/lib/store'
import { clsx } from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal } from 'lucide-react'

export function SystemLogs() {
    const { logs } = useStore()

    return (
        <div className="w-full max-w-md bg-black/80 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-2xl pointer-events-auto">
            <div className="bg-white/5 p-2 px-4 border-b border-white/5 flex items-center gap-2 text-gray-300 text-xs font-mono uppercase">
                <Terminal className="w-3 h-3" />
                System Logs
            </div>
            <div className="p-4 h-48 overflow-hidden flex flex-col-reverse gap-2 font-mono text-xs">
                <AnimatePresence initial={false}>
                    {logs.map((log) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className={clsx(
                                "flex items-center gap-2",
                                log.type === 'info' && "text-gray-300",
                                log.type === 'success' && "text-green-300",
                                log.type === 'warning' && "text-amber-300"
                            )}
                        >
                            <span className="opacity-50 text-[10px] text-zinc-500 whitespace-nowrap">
                                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                            </span>
                            <span className="truncate">{`>`} {log.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}
