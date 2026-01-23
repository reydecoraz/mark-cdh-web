'use client'

import { useStore } from '@/lib/store'
import { clsx } from 'clsx'
import { Activity } from 'lucide-react'

export function ScenarioSelector() {
    const { scenario, setScenario, pathEditorEnabled, setPathEditorEnabled } = useStore()

    return (
        <div className="flex gap-3 pointer-events-auto">
            {pathEditorEnabled && (
                <button
                    onClick={() => window.dispatchEvent(new CustomEvent('toggle-top-view'))}
                    className="bg-indigo-600 hover:bg-indigo-500 p-3 rounded-xl border border-indigo-400 text-white shadow-lg transition-all flex items-center gap-2"
                >
                    <span>🗺️</span>
                    <span className="text-xs font-bold uppercase">Vista 2D/3D</span>
                </button>
            )}

            <button
                onClick={() => setPathEditorEnabled(!pathEditorEnabled)}
                className={clsx(
                    "p-3 rounded-xl border backdrop-blur-md transition-all flex items-center gap-3",
                    pathEditorEnabled
                        ? "bg-cyan-600/20 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)] text-cyan-400"
                        : "bg-black/70 border-white/10 text-gray-500 hover:text-white hover:bg-white/5"
                )}
            >
                <Activity className={clsx("w-5 h-5", pathEditorEnabled && "animate-pulse")} />
                <div className="text-left leading-none">
                    <div className="text-[10px] font-bold uppercase tracking-tighter">Editor de Tránsito</div>
                    <div className="text-[9px] opacity-60 font-mono">{pathEditorEnabled ? "ACTIVE" : "DISABLED"}</div>
                </div>
            </button>

            <div className="bg-black/70 backdrop-blur-md p-1.5 rounded-xl border border-white/10 flex gap-1">
                <ScenarioButton
                    active={scenario === 'AS_IS'}
                    onClick={() => setScenario('AS_IS')}
                    label="AS-IS"
                    sub="Situación Actual"
                />
                <ScenarioButton
                    active={scenario === 'POC'}
                    onClick={() => setScenario('POC')}
                    label="Fase 0"
                    sub="PoC (ZPL)"
                />
                <ScenarioButton
                    active={scenario === 'PHASE1'}
                    onClick={() => setScenario('PHASE1')}
                    label="Fase 1"
                    sub="Full RFID"
                />
                <ScenarioButton
                    active={scenario === 'PHASE2'}
                    onClick={() => setScenario('PHASE2')}
                    label="Fase 2"
                    sub="WMS + App"
                />
            </div>
        </div>
    )
}

function ScenarioButton({ active, onClick, label, sub }: { active: boolean, onClick: () => void, label: string, sub: string }) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "px-4 py-2 rounded-lg text-left transition-all min-w-[120px]",
                active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "hover:bg-white/10 text-gray-400 hover:text-white"
            )}
        >
            <div className="font-bold text-sm">{label}</div>
            <div className={clsx("text-[10px]", active ? "text-blue-200" : "text-gray-500")}>{sub}</div>
        </button>
    )
}
