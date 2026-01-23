'use client'

import { Line } from '@react-three/drei'
import { TRANSIT_DATA } from '@/lib/transit'

export function StaticPathRenderer({ scenario }: { scenario: string }) {
    if (scenario === 'AS_IS' || scenario === 'POC') return null

    const phase = (scenario === 'PHASE1' || scenario === 'PHASE2') ? scenario : 'PHASE1'
    const paths = TRANSIT_DATA.filter(s => s.phase === phase)
    const color = phase === 'PHASE1' ? "#00f2ff" : "#f59e0b"

    return (
        <group>
            {paths.map((s, i) => (
                <group key={i}>
                    {s.points.length > 1 && (
                        <Line
                            points={s.points}
                            color={color}
                            lineWidth={1}
                            transparent
                            opacity={0.2}
                            dashed
                            dashScale={2}
                            gapSize={1}
                        />
                    )}
                </group>
            ))}
        </group>
    )
}
