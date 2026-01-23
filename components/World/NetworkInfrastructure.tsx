'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { Line } from '@react-three/drei'
import { Scenario } from '@/lib/store'
import { DataPulse } from '../Effects/DataPulse'
import { SERVER_POS as OFFICE_SERVER_POS, OFFICE_PC_POS } from './Office'

interface NetworkingProps {
    scenario: Scenario
}

const SERVER_BASE_POS: [number, number, number] = [20, 0, 40]

export function NetworkInfrastructure({ scenario }: NetworkingProps) {
    const connections = useMemo(() => {
        const lines = []

        // 1. Printer PC (PoC+)
        if (scenario !== 'AS_IS') {
            lines.push({
                points: [
                    [-12.2, 0.1, 3],
                    [-12.2, 0.1, 40],
                    [SERVER_BASE_POS[0], 0.1, 40]
                ],
                color: '#00f2ff',
                bilateral: false
            })
        }

        // 2. Cool Store Exit Arch Leg (PoC+)
        if (scenario !== 'AS_IS') {
            lines.push({
                points: [
                    [14 + 5, 0.1, 2],
                    [19, 0.1, 40],
                    [SERVER_BASE_POS[0], 0.1, 40]
                ],
                color: '#00f2ff',
                bilateral: false
            })
        }

        // 3. Phase 1+ Connections
        if (scenario === 'PHASE1' || scenario === 'PHASE2') {
            // Cool Store Entry Leg
            lines.push({
                points: [
                    [-14 + 5, 0.1, 2],
                    [-9, 0.1, 40],
                    [SERVER_BASE_POS[0], 0.1, 40]
                ],
                color: '#00f2ff',
                bilateral: false
            })

            // Omega Exit Leg
            lines.push({
                points: [
                    [7 + 27, 0.1, 2],
                    [34, 0.1, 40],
                    [SERVER_BASE_POS[0], 0.1, 40]
                ],
                color: '#00f2ff',
                bilateral: false
            })

            // Yethi Exit Leg
            lines.push({
                points: [
                    [73, 0.1, 35],
                    [73, 0.1, 40],
                    [SERVER_BASE_POS[0], 0.1, 40]
                ],
                color: '#00f2ff',
                bilateral: false
            })

            // Loading Bays - Rampa 1
            lines.push({
                points: [
                    [81, 0.1, 42],
                    [81, 0.1, 40],
                    [SERVER_BASE_POS[0], 0.1, 40]
                ],
                color: '#00f2ff',
                bilateral: false
            })

            // Loading Bays - Rampa 2
            lines.push({
                points: [
                    [75, 0.1, 42],
                    [75, 0.1, 40],
                    [SERVER_BASE_POS[0], 0.1, 40]
                ],
                color: '#00f2ff',
                bilateral: false
            })

            // Labeling Station
            lines.push({
                points: [
                    [68, 0.1, 42],
                    [68, 0.1, 40],
                    [SERVER_BASE_POS[0], 0.1, 40]
                ],
                color: '#10b981', // Green for labeling station
                bilateral: true
            })
        }

        // 4. Office Terminal Connection (Always visible for context, or only PoC+)
        // Let's make it always visible as it's part of the office equipment
        lines.push({
            points: [
                [OFFICE_PC_POS.x, 0.1, OFFICE_PC_POS.z],
                [SERVER_BASE_POS[0], 0.1, SERVER_BASE_POS[2]]
            ],
            color: '#f59e0b', // Amber for local office connection
            bilateral: true
        })

        return lines
    }, [scenario])

    return (
        <group>
            {connections.map((conn, i) => (
                <group key={i}>
                    {/* The physical cable */}
                    <Line
                        points={conn.points as [number, number, number][]}
                        color={conn.color}
                        lineWidth={3}
                        transparent
                        opacity={0.3}
                    />
                    {/* The moving "data" spheres (Primary direction) */}
                    <DataPulse
                        points={conn.points as [number, number, number][]}
                        color={conn.color}
                        speed={0.15}
                        count={4}
                    />
                    {/* Reverse flow for bilateral connections */}
                    {conn.bilateral && (
                        <DataPulse
                            points={[...conn.points].reverse() as [number, number, number][]}
                            color={conn.color}
                            speed={0.15}
                            count={4}
                        />
                    )}
                </group>
            ))}
        </group>
    )
}
