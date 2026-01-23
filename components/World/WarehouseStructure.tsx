'use client'

import * as THREE from 'three'

export function WarehouseStructure() {
    return (
        <group>
            {/* Ground / Floor edges - Correctly rotated to be horizontal */}
            <mesh position={[45, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[120, 80]} />
                <meshStandardMaterial color="#1a1a1a" />
            </mesh>

            {/* Subtle pillar markers for scale */}
            {[-10, 15, 40, 65, 85].map(x => (
                <group key={x}>
                    <mesh position={[x, 5, -35]}>
                        <boxGeometry args={[0.5, 10, 0.5]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                    <mesh position={[x, 5, 35]}>
                        <boxGeometry args={[0.5, 10, 0.5]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                </group>
            ))}
        </group>
    )
}
