import { HUD } from '@/components/HUD'
import { Scene } from '@/components/Scene'

export default function SimulationPage() {
    return (
        <div className="w-full h-screen bg-black relative overflow-hidden">
            <Scene />
            <HUD />
        </div>
    )
}
