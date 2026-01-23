'use client'

import { Text, Html } from '@react-three/drei'
import * as THREE from 'three'
import { Label } from './Label'

export const OFFICE_POS = new THREE.Vector3(20, 0, 40)
export const SERVER_POS = new THREE.Vector3(20, 1.5, 40)
export const OFFICE_PC_POS = new THREE.Vector3(20, 1, 44.5)

export function Office() {
    return (
        <group position={OFFICE_POS}>
            {/* Floor Plate */}
            <mesh position={[0, 0.05, 1.5]} receiveShadow>
                <boxGeometry args={[6, 0.1, 7]} />
                <meshStandardMaterial color="#222" />
            </mesh>

            {/* Server Rack */}
            <group position={[0, 1.5, 0]}>
                <mesh castShadow>
                    <boxGeometry args={[1.5, 3, 1]} />
                    <meshStandardMaterial color="#1a1a1a" />
                </mesh>
                {/* Blinking Lights */}
                <mesh position={[0, 0, 0.51]}>
                    <planeGeometry args={[1.2, 2.8]} />
                    <meshStandardMaterial color="#00ff00" emissive="#00ff00" emissiveIntensity={0.5} opacity={0.5} transparent />
                </mesh>
            </group>

            {/* Workstation (Desk + PC) in front of server */}
            <group position={[0, 0, 4.5]}>
                {/* Desk - Now Brown (Cafe) */}
                <mesh position={[0, 0.75, 0]} castShadow>
                    <boxGeometry args={[2, 0.1, 1]} />
                    <meshStandardMaterial color="#5D4037" />
                </mesh>
                <mesh position={[-0.9, 0.375, 0]} castShadow>
                    <boxGeometry args={[0.1, 0.75, 0.8]} />
                    <meshStandardMaterial color="#4E342E" />
                </mesh>
                <mesh position={[0.9, 0.375, 0]} castShadow>
                    <boxGeometry args={[0.1, 0.75, 0.8]} />
                    <meshStandardMaterial color="#4E342E" />
                </mesh>

                {/* PC / Monitor - Now Light Gray for contrast */}
                <group position={[0, 1, -0.2]}>
                    <mesh castShadow>
                        <boxGeometry args={[0.8, 0.5, 0.05]} />
                        <meshStandardMaterial color="#e0e0e0" />
                    </mesh>
                    {/* Screen */}
                    <mesh position={[0, 0, 0.026]}>
                        <planeGeometry args={[0.75, 0.45]} />
                        <meshStandardMaterial color="#004488" emissive="#002244" emissiveIntensity={2} />
                    </mesh>
                    {/* Stand */}
                    <mesh position={[0, -0.3, 0]}>
                        <boxGeometry args={[0.1, 0.2, 0.1]} />
                        <meshStandardMaterial color="#bdbdbd" />
                    </mesh>
                </group>
            </group>

            <Label text="Oficinas / Servidor Central" position={[0, 3.5, 0]} color="bg-indigo-900/80" />
        </group>
    )
}
