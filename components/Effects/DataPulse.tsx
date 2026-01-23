'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface DataPulseProps {
    points: [number, number, number][]
    color: string
    speed?: number
    count?: number
}

function Pulse({ curve, color, speed, delay }: { curve: THREE.CatmullRomCurve3, color: string, speed: number, delay: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame(({ clock }) => {
        if (!meshRef.current) return

        // Use clock with delay for staggered start
        const t = ((clock.getElapsedTime() * speed) + delay) % 1
        const pos = curve.getPointAt(t)
        meshRef.current.position.copy(pos)

        // Subtle scale pulse
        const s = 1 + Math.sin(clock.getElapsedTime() * 10) * 0.2
        meshRef.current.scale.setScalar(s)
    })

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshBasicMaterial color={color} />
        </mesh>
    )
}

export function DataPulse({ points, color, speed = 0.2, count = 3 }: DataPulseProps) {
    const curve = useMemo(() => {
        const vPoints = points.map(p => new THREE.Vector3(...p))
        return new THREE.CatmullRomCurve3(vPoints, false, 'catmullrom', 0.1)
    }, [points])

    const pulses = useMemo(() => {
        return Array.from({ length: count }).map((_, i) => ({
            delay: i / count
        }))
    }, [count])

    return (
        <group>
            {pulses.map((p, i) => (
                <Pulse
                    key={i}
                    curve={curve}
                    color={color}
                    speed={speed}
                    delay={p.delay}
                />
            ))}
        </group>
    )
}
