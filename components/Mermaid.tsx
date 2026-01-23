'use client'

import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

// Initialize mermaid with custom theme
mermaid.initialize({
    startOnLoad: true,
    theme: 'dark' as any,
    securityLevel: 'loose',
    fontFamily: 'monospace',
    themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: '#fff',
        primaryBorderColor: '#3b82f6',
        lineColor: '#60a5fa',
        secondaryColor: '#1e293b',
        tertiaryColor: '#0f172a',
    }
})

interface MermaidProps {
    chart: string
}

export const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (ref.current) {
            mermaid.contentLoaded()
        }
    }, [chart])

    return (
        <div className="mermaid bg-black/30 p-8 rounded-2xl flex justify-center overflow-x-auto" ref={ref}>
            {chart}
        </div>
    )
}
