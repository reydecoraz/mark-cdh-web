import { useState, useRef } from 'react'
import { Label } from './Label'
import { useStore } from '@/lib/store'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ArchProps {
    position: [number, number, number]
    rotation?: [number, number, number]
    label: string
}

export function Arch({ position, rotation = [0, 0, 0], label }: ArchProps) {
    const setModalType = useStore(state => state.setModalType)
    const [hovered, setHovered] = useState(false)
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!groupRef.current) return
        const time = state.clock.getElapsedTime()
        const intensity = 0.2 + Math.sin(time * 3) * 0.2 // Pulsating between 0 and 0.4

        groupRef.current.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshLambertMaterial) {
                child.material.emissive = new THREE.Color("#00f2ff")
                child.material.emissiveIntensity = hovered ? 1 : intensity
            }
        })
    })

    return (
        <group
            ref={groupRef}
            position={position}
            rotation={rotation}
            onClick={(e) => {
                e.stopPropagation()
                setModalType('ARCH')
            }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <mesh position={[0, 2, 2]}>
                <boxGeometry args={[0.5, 4, 0.5]} />
                <meshLambertMaterial color={hovered ? "#00f2ff" : "#eeeeee"} />
            </mesh>
            <mesh position={[0, 2, -2]}>
                <boxGeometry args={[0.5, 4, 0.5]} />
                <meshLambertMaterial color={hovered ? "#00f2ff" : "#eeeeee"} />
            </mesh>
            <mesh position={[0, 4, 0]}>
                <boxGeometry args={[0.5, 0.5, 4.5]} />
                <meshLambertMaterial color={hovered ? "#00f2ff" : "#eeeeee"} />
            </mesh>
            <Label text={label} position={[0, 4.5, 0]} />
        </group>
    )
}
