import { useMemo } from 'react'

interface StaticPalletPileProps {
    position: [number, number, number]
    count: number
    color: string
}

export function StaticPalletPile({ position, count, color }: StaticPalletPileProps) {
    // Generate structured stacks of boxes (Racks simulation)
    const pile = useMemo(() => {
        const items = []
        const cols = 2
        const rows = 3
        for (let i = 0; i < count; i++) {
            const col = i % cols
            const row = Math.floor(i / cols) % rows
            const level = Math.floor(i / (cols * rows))

            items.push({
                pos: [
                    (col - 0.5) * 1.2,
                    0.4 + (level * 1.0),
                    (row - 1) * 1.2
                ] as [number, number, number],
                rot: [0, 0, 0] as [number, number, number]
            })
        }
        return items
    }, [count])

    return (
        <group position={position}>
            {pile.map((p, i) => (
                <mesh key={i} position={p.pos} rotation={p.rot} castShadow>
                    <boxGeometry args={[1, 0.9, 1.1]} />
                    <meshStandardMaterial color={color} />
                    <mesh position={[0, 0.455, 0]}>
                        <planeGeometry args={[1, 1.1]} />
                        <meshBasicMaterial color="#ffffff" opacity={0.3} transparent />
                    </mesh>
                </mesh>
            ))}
        </group>
    )
}
