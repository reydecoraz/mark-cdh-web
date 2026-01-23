'use client'

import React from 'react'
import { Label } from './Label'

export function LabelingStation({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
    return (
        <group position={position} rotation={rotation}>
            {/* Table/Workstation - Now Brown (Cafe) */}
            <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[1.5, 0.8, 0.8]} />
                <meshStandardMaterial color="#5D4037" />
            </mesh>
            <mesh position={[0, 0.825, 0]}>
                <boxGeometry args={[1.6, 0.05, 0.9]} />
                <meshStandardMaterial color="#4E342E" />
            </mesh>

            {/* Industrial PC - Now Light Gray for contrast */}
            <mesh position={[-0.4, 1.05, 0]}>
                <boxGeometry args={[0.4, 0.4, 0.1]} />
                <meshStandardMaterial color="#e0e0e0" />
            </mesh>
            <mesh position={[-0.4, 1.05, 0.051]}>
                <planeGeometry args={[0.35, 0.35]} />
                <meshBasicMaterial color="#00ff00" transparent opacity={0.2} />
            </mesh>
            {/* PC Case below */}
            <mesh position={[-0.4, 0.4, 0]}>
                <boxGeometry args={[0.3, 0.5, 0.5]} />
                <meshStandardMaterial color="#2e7d32" />
            </mesh>

            {/* Label Printer */}
            <group position={[0.4, 0.95, 0]}>
                <mesh>
                    <boxGeometry args={[0.4, 0.3, 0.4]} />
                    <meshStandardMaterial color="#555" />
                </mesh>
                <mesh position={[0, -0.05, 0.201]}>
                    <planeGeometry args={[0.3, 0.05]} />
                    <meshBasicMaterial color="#fff" />
                </mesh>
                {/* Status light */}
                <mesh position={[0.15, 0.1, 0.201]}>
                    <sphereGeometry args={[0.02, 16, 16]} />
                    <meshBasicMaterial color="#00ff00" />
                </mesh>
            </group>

            <Label text="Estación de Etiquetado" position={[0, 1.5, 0]} color="bg-green-800/60" />
        </group>
    )
}
