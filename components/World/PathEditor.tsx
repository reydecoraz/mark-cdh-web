'use client'

import { useCallback } from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import { useStore } from '@/lib/store'

export function PathEditor() {
    const { transitPoints, addTransitPoint, completeSegment } = useStore()

    const handleFloorClick = useCallback((e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        if (e.button === 0) {
            const { x, z } = e.point
            addTransitPoint([Math.round(x * 10) / 10, 0.1, Math.round(z * 10) / 10])
        }
    }, [addTransitPoint])

    const handleFloorRightClick = useCallback((e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation()
        if (e.nativeEvent) (e.nativeEvent as any).preventDefault()
        const { x, z } = e.point
        addTransitPoint([Math.round(x * 10) / 10, 0.1, Math.round(z * 10) / 10])
        completeSegment()
    }, [addTransitPoint, completeSegment])

    return (
        <group>
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[50, -0.01, 0]}
                onPointerDown={handleFloorClick}
                onContextMenu={handleFloorRightClick}
            >
                <planeGeometry args={[250, 150]} />
                <meshBasicMaterial transparent opacity={0.01} color="white" />
            </mesh>

            {transitPoints.map((segment, sIdx) => {
                const isPhase2 = segment.phase === 'PHASE2'
                const mainColor = isPhase2 ? "#f59e0b" : "#00f2ff" // Amber vs Cyan

                return (
                    <group key={sIdx}>
                        {segment.points.map((p, pIdx) => (
                            <mesh key={`${sIdx}-${pIdx}`} position={p}>
                                <sphereGeometry args={[0.3]} />
                                <meshBasicMaterial
                                    color={pIdx === 0 ? "#00ff00" : pIdx === segment.points.length - 1 ? "#ff0000" : mainColor}
                                />
                            </mesh>
                        ))}
                        {segment.points.length > 1 && (
                            <Line
                                points={segment.points}
                                color={mainColor}
                                lineWidth={3}
                            />
                        )}
                    </group>
                )
            })}
        </group>
    )
}
