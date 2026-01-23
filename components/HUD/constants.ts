export const SCENARIO_DETAILS = {
    'AS_IS': {
        title: 'Situación Actual (AS-IS)',
        desc: 'Procesos manuales basados en papel y memoria. Alta dependencia del factor humano.',
        features: [
            'Sin visibilidad de inventario en tiempo real',
            'Errores frecuentes en lecturas y despachos',
            'Falta de trazabilidad en zonas críticas',
            'Silos de información'
        ],
        accent: 'border-gray-500/50 text-gray-400'
    },
    'POC': {
        title: 'Fase 0: Prueba de Concepto (PoC)',
        desc: 'Digitalización inicial mediante la intercepción de etiquetas de impresión ZPL.',
        features: [
            'Intercepción de datos SAP / ZPL',
            'Trazabilidad en salida de Cámara de Frío',
            'Validación de etiquetas RFID',
            'Dashboard básico de monitoreo'
        ],
        accent: 'border-blue-500/50 text-blue-400'
    },
    'PHASE1': {
        title: 'Fase 1: RFID Omnipresente',
        desc: 'Automatización total de la captura de datos en todos los puntos de tránsito.',
        features: [
            'Arcos RFID en todas las compuertas',
            'Comunicación bilateral Activa',
            'Eliminación de escaneo manual',
            'Trazabilidad 100% automatizada'
        ],
        accent: 'border-cyan-500/50 text-cyan-400'
    },
    'PHASE2': {
        title: 'Fase 2: Almacén Inteligente (WMS)',
        desc: 'Optimización avanzada con WMS y App móvil para control total de activos.',
        features: [
            'Integración profunda con WMS',
            'App móvil para guiado inteligente',
            'Gestión de montacargas industriales',
            'Optimización dinámica de rutas'
        ],
        accent: 'border-amber-500/50 text-amber-400'
    }
} as const
