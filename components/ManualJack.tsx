'use client'

export function ManualJack() {
    return (
        <group>
            {/* Main frame / Forks */}
            <group position={[0, 0.05, 0.2]}>
                <mesh position={[0.2, 0, 0]} castShadow>
                    <boxGeometry args={[0.15, 0.05, 1.2]} />
                    <meshStandardMaterial color="#ff5722" />
                </mesh>
                <mesh position={[-0.2, 0, 0]} castShadow>
                    <boxGeometry args={[0.15, 0.05, 1.2]} />
                    <meshStandardMaterial color="#ff5722" />
                </mesh>
            </group>

            {/* Pump Unit / Battery box */}
            <mesh position={[0, 0.35, -0.4]} castShadow>
                <boxGeometry args={[0.6, 0.7, 0.4]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* Handle / Tiller */}
            <group position={[0, 0.6, -0.4]} rotation={[0.4, 0, 0]}>
                <mesh position={[0, 0.3, 0]}>
                    <boxGeometry args={[0.05, 0.6, 0.05]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                {/* Grip */}
                <mesh position={[0, 0.6, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <capsuleGeometry args={[0.04, 0.3, 4, 8]} />
                    <meshStandardMaterial color="#000" />
                </mesh>
            </group>

            {/* Wheels (simplified) */}
            <mesh position={[0, 0, -0.4]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.1, 0.1, 0.5, 12]} />
                <meshStandardMaterial color="#000" />
            </mesh>
        </group>
    )
}
