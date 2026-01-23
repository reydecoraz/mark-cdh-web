import Link from 'next/link'
import { ArrowRight, Box, FileText, Layers } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-white p-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600 blur-[150px] rounded-full mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="z-10 max-w-5xl w-full text-center">
        <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Proyecto Activo
        </div>

        <h1 className="text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
          Mark CDH
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Sistema integral de trazabilidad y gestión para Cedis Helados Holanda.
          <br />
          Integración <span className="text-white font-semibold">SAP ZPL</span> + <span className="text-white font-semibold">RFID</span> + <span className="text-white font-semibold">WMS Virtual</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Link href="/simulation" className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 text-left">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Box size={100} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-blue-400">
                <Layers size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Simulación 3D</h3>
              <p className="text-gray-400 mb-4">Visualización en tiempo real del flujo PoC con integración RFID y lógica de inventarios.</p>
              <div className="flex items-center text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                Iniciar Demo <ArrowRight size={16} className="ml-2" />
              </div>
            </div>
          </Link>

          <Link href="/design" className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 text-left">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <FileText size={100} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-purple-400">
                <FileText size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Documentación</h3>
              <p className="text-gray-400 mb-4">Especificaciones técnicas, diagramas de flujo y arquitectura de la solución.</p>
              <div className="flex items-center text-purple-400 font-medium group-hover:translate-x-1 transition-transform">
                Ver Diseño <ArrowRight size={16} className="ml-2" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 text-gray-500 text-sm">
        Desarrollado para CDH &bull; v1.0.0
      </div>
    </main>
  )
}
