'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

interface BeamProps {
    start: THREE.Vector3
    end: THREE.Vector3
    color?: string
    onComplete: () => void
}

export function DataBeam({ start, end, color = '#00ff00', onComplete }: BeamProps) {
    const [progress, setProgress] = useState(0)

    useFrame((state, delta) => {
        if (progress >= 1) {
            onComplete()
            return
        }
        setProgress(p => Math.min(p + delta * 2, 1)) // Speed 2x
    })

    // Calculate current tip position
    const tip = useMemo(() => new THREE.Vector3().lerpVectors(start, end, progress), [start, end, progress])
    const tail = useMemo(() => new THREE.Vector3().lerpVectors(start, end, Math.max(0, progress - 0.2)), [start, end, progress])

    if (progress >= 1) return null

    return (
        <Line points={[tail, tip]} color={color} lineWidth={3} transparent opacity={0.8} />
    )
}
