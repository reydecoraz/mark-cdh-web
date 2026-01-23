import { Html } from '@react-three/drei'

interface LabelProps {
    text: string
    position: [number, number, number]
    color?: string
}

export function Label({ text, position, color = 'bg-black/60' }: LabelProps) {
    return (
        <Html position={position} center transform zIndexRange={[100, 0]}>
            <div className={`${color} text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap backdrop-blur-sm border border-white/10`}>
                {text}
            </div>
        </Html>
    )
}
