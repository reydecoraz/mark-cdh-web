import { useMemo } from 'react'
import * as THREE from 'three'

export function Rack({ position, width = 3, height = 4, depth = 1 }: { position: [number, number, number], width?: number, height?: number, depth?: number }) {
    // Generate shelves
    const shelves = useMemo(() => {
        const items = []
        const levels = Math.floor(height / 1.5)
        for (let i = 0; i < levels; i++) {
            items.push(i * 1.5)
        }
        return items
    }, [height])

    return (
        <group position={position}>
            {/* Vertical Posts */}
            <mesh position={[-width / 2 + 0.1, height / 2, -depth / 2 + 0.1]}>
                <boxGeometry args={[0.1, height, 0.1]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[width / 2 - 0.1, height / 2, -depth / 2 + 0.1]}>
                <boxGeometry args={[0.1, height, 0.1]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[-width / 2 + 0.1, height / 2, depth / 2 - 0.1]}>
                <boxGeometry args={[0.1, height, 0.1]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[width / 2 - 0.1, height / 2, depth / 2 - 0.1]}>
                <boxGeometry args={[0.1, height, 0.1]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* Shelves */}
            {shelves.map((y, i) => (
                <group key={i} position={[0, y + 0.1, 0]}>
                    <mesh>
                        <boxGeometry args={[width, 0.05, depth]} />
                        <meshStandardMaterial color="#555" />
                    </mesh>
                    {/* Doubled pallets on shelf */}
                    <mesh position={[-width / 4, 0.2, -depth / 4]}>
                        <boxGeometry args={[0.8, 0.4, 0.4]} />
                        <meshStandardMaterial color="#cdb4db" />
                    </mesh>
                    <mesh position={[width / 4, 0.2, -depth / 4]}>
                        <boxGeometry args={[0.8, 0.4, 0.4]} />
                        <meshStandardMaterial color="#cdb4db" />
                    </mesh>
                    <mesh position={[-width / 4, 0.2, depth / 4]}>
                        <boxGeometry args={[0.8, 0.4, 0.4]} />
                        <meshStandardMaterial color="#cdb4db" />
                    </mesh>
                    <mesh position={[width / 4, 0.2, depth / 4]}>
                        <boxGeometry args={[0.8, 0.4, 0.4]} />
                        <meshStandardMaterial color="#cdb4db" />
                    </mesh>
                </group>
            ))}
        </group>
    )
}
