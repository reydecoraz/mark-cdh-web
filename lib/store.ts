import { create } from 'zustand'

export interface LogEntry {
    id: string
    message: string
    timestamp: number
    type: 'info' | 'success' | 'warning'
}

export type Scenario = 'AS_IS' | 'POC' | 'PHASE1' | 'PHASE2'

interface SimulationState {
    scenario: Scenario
    inventory: number
    logs: LogEntry[]
    officeMetrics: {
        totalReads: number
        connectionStatus: boolean
    }
    pathEditorEnabled: boolean
    transitPoints: { points: [number, number, number][], phase: string }[]
    currentPathPhase: 'PHASE1' | 'PHASE2'
    modalType: 'ARCH' | 'PC_PRINTER' | null
    setScenario: (scenario: Scenario) => void
    setPathEditorEnabled: (enabled: boolean) => void
    setCurrentPathPhase: (phase: 'PHASE1' | 'PHASE2') => void
    setModalType: (type: 'ARCH' | 'PC_PRINTER' | null) => void
    addTransitPoint: (point: [number, number, number]) => void
    completeSegment: () => void
    undoTransitPoint: () => void
    clearTransitPoints: () => void
    incrementInventory: () => void
    decrementInventory: () => void
    addLog: (message: string, type?: 'info' | 'success' | 'warning') => void
    incrementRead: () => void
}

export const useStore = create<SimulationState>((set) => ({
    scenario: 'POC',
    inventory: 0,
    logs: [],
    officeMetrics: {
        totalReads: 0,
        connectionStatus: true
    },
    pathEditorEnabled: false,
    transitPoints: [],
    currentPathPhase: 'PHASE1',
    modalType: null,
    setScenario: (scenario) => set({ scenario }),
    setPathEditorEnabled: (enabled) => set({ pathEditorEnabled: enabled }),
    setCurrentPathPhase: (phase) => set({ currentPathPhase: phase }),
    setModalType: (type) => set({ modalType: type }),
    addTransitPoint: (point) => set((state) => {
        const segments = [...state.transitPoints]
        if (segments.length === 0) {
            segments.push({ points: [point], phase: state.currentPathPhase })
        } else {
            // Find the last segment. If it's a "fresh" empty segment from completeSegment, 
            // ensure it has the correct phase.
            const last = segments[segments.length - 1]
            if (last.points.length === 0) {
                last.points.push(point)
                last.phase = state.currentPathPhase
            } else {
                last.points.push(point)
            }
        }
        return { transitPoints: segments }
    }),
    completeSegment: () => set((state) => {
        if (state.transitPoints.length > 0 && state.transitPoints[state.transitPoints.length - 1].points.length > 0) {
            return { transitPoints: [...state.transitPoints, { points: [], phase: state.currentPathPhase }] }
        }
        return state
    }),
    undoTransitPoint: () => set((state) => {
        const segments = [...state.transitPoints]
        if (segments.length === 0) return state

        const last = segments[segments.length - 1]
        if (last.points.length === 0) {
            segments.pop()
            if (segments.length > 0) {
                segments[segments.length - 1].points.pop()
            }
        } else {
            last.points.pop()
        }
        return { transitPoints: segments }
    }),
    clearTransitPoints: () => set({ transitPoints: [] }),
    incrementInventory: () => set((state) => ({ inventory: state.inventory + 1 })),
    decrementInventory: () => set((state) => ({ inventory: Math.max(0, state.inventory - 1) })),
    addLog: (message, type = 'info') => set((state) => {
        const newLog: LogEntry = {
            id: Math.random().toString(36).substr(2, 9),
            message,
            timestamp: Date.now(),
            type
        }
        return { logs: [newLog, ...state.logs].slice(0, 10) }
    }),
    incrementRead: () => set((state) => ({
        officeMetrics: { ...state.officeMetrics, totalReads: state.officeMetrics.totalReads + 1 }
    }))
}))
