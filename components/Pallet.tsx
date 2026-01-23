'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Forklift } from './Forklift'
import { ManualJack } from './ManualJack'
import { TransitController } from '@/lib/transit'

const PALLET_SPEED = 0.25

export function Pallet({ id, scenario, onRemove, onZoneChange, onDataEvent }: any) {
    const meshRef = useRef<THREE.Group>(null)
    const [paused, setPaused] = useState(false)
    const [initialized, setInitialized] = useState(false)

    // Create controller based on phase
    const controller = useMemo(() => {
        const phase = (scenario === 'PHASE2' || scenario === 'PHASE1') ? scenario : 'PHASE1'
        return new TransitController(phase as any)
    }, [scenario])

    const color = useMemo(() => new THREE.Color().setHSL(Math.random() * 0.1 + 0.1, 0.8, 0.5), [])

    useEffect(() => {
        if (meshRef.current && !initialized) {
            const startPos = controller.getInitialPosition()
            meshRef.current.position.copy(startPos)
            setInitialized(true)
        }
    }, [controller, initialized])

    const triggerWMSInteraction = () => {
        if (scenario !== 'PHASE2') return
        setPaused(true)
        setTimeout(() => {
            onDataEvent(meshRef.current?.position.clone())
            setTimeout(() => setPaused(false), 500)
        }, 500)
    }

    useFrame((state, delta) => {
        if (!meshRef.current || paused || !initialized) return

        const result = controller.update(PALLET_SPEED, delta, meshRef.current.position)

        // Handle rotation to face movement direction
        if (!result.jumped && !result.finished) {
            const direction = result.pos.clone().sub(meshRef.current.position).normalize()
            if (direction.lengthSq() > 0.001) {
                const targetRotation = Math.atan2(direction.x, direction.z)

                // Deterministic rotation (no lerp for sudden turns in transit nodes)
                meshRef.current.rotation.y = targetRotation
            }
        }

        meshRef.current.position.copy(result.pos)

        // Event Triggers based on "jump" (segment transitions)
        if (result.jumped) {
            onDataEvent(meshRef.current.position.clone())
            if (scenario === 'PHASE2') triggerWMSInteraction()
        }

        if (result.finished) {
            onRemove(id)
        }
    })

    return (
        <group ref={meshRef}>
            {scenario === 'PHASE2' ? (
                <group>
                    <Forklift />
                    <mesh position={[0, 0.3, 1.2]} castShadow>
                        <boxGeometry args={[1.0, 0.8, 1.0]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                </group>
            ) : scenario === 'PHASE1' ? (
                <group>
                    <ManualJack />
                    <mesh position={[0, 0.5, 0.2]} castShadow>
                        <boxGeometry args={[1.0, 0.8, 1.0]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                </group>
            ) : (
                <mesh castShadow>
                    <boxGeometry args={[1.0, 0.8, 1.0]} />
                    <meshStandardMaterial color={color} />
                </mesh>
            )}
        </group>
    )
}
