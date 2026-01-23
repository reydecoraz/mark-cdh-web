'use client'

export function Forklift() {
    return (
        <group>
            {/* Body */}
            <mesh position={[0, 0.4, 0]} castShadow>
                <boxGeometry args={[1.2, 0.6, 1.8]} />
                <meshStandardMaterial color="#fdd835" /> {/* High Vis Yellow */}
            </mesh>
            {/* Cab */}
            <mesh position={[0, 1.2, -0.4]} castShadow>
                <boxGeometry args={[0.8, 1, 0.8]} />
                <meshStandardMaterial color="#333" transparent opacity={0.4} />
            </mesh>
            {/* Mast */}
            <mesh position={[0, 1, 0.95]} castShadow>
                <boxGeometry args={[0.1, 2, 0.1]} />
                <meshStandardMaterial color="#222" />
            </mesh>
            {/* Forks */}
            <mesh position={[0.2, 0.2, 1.2]} castShadow>
                <boxGeometry args={[0.1, 0.1, 1]} />
                <meshStandardMaterial color="#555" />
            </mesh>
            <mesh position={[-0.2, 0.2, 1.2]} castShadow>
                <boxGeometry args={[0.1, 0.1, 1]} />
                <meshStandardMaterial color="#555" />
            </mesh>
        </group>
    )
}
