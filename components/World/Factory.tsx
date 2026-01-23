import { useState, useRef } from 'react'
import { Label } from './Label'
import { useStore } from '@/lib/store'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Factory() {
    const setModalType = useStore(state => state.setModalType)
    const [hovered, setHovered] = useState(false)
    const pcRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (!pcRef.current) return
        const time = state.clock.getElapsedTime()
        const intensity = 0.2 + Math.sin(time * 3) * 0.2

        pcRef.current.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                child.material.emissive = new THREE.Color("#00f2ff")
                child.material.emissiveIntensity = hovered ? 1 : intensity
            }
        })
    })

    return (
        <group position={[-13, 0, 3]}>
            {/* Desk */}
            <mesh receiveShadow position={[0, 0.5, 0]}>
                <boxGeometry args={[3, 0.1, 1.5]} />
                <meshStandardMaterial color="#555" />
            </mesh>

            {/* PC Monitor */}
            <group
                ref={pcRef}
                position={[0.8, 1, 0]}
                onClick={(e) => {
                    e.stopPropagation()
                    setModalType('PC_PRINTER')
                }}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <mesh castShadow position={[0, 0.3, 0]}>
                    <boxGeometry args={[0.8, 0.6, 0.1]} />
                    <meshStandardMaterial color={hovered ? "#00f2ff" : "#111"} />
                </mesh>
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[0.1, 0.4, 0.1]} />
                    <meshStandardMaterial color={hovered ? "#00f2ff" : "#333"} />
                </mesh>
                <Label text="PC SAP" position={[0, 0.8, 0]} />
            </group>

            {/* Printer Zebra */}
            <group position={[-0.8, 1, 0]}>
                <mesh castShadow position={[0, 0.2, 0]}>
                    <boxGeometry args={[0.6, 0.5, 0.8]} />
                    <meshLambertMaterial color="#ffad42" />
                </mesh>
                <Label text="Zebra" position={[0, 0.8, 0]} />
            </group>
        </group>
    )
}
