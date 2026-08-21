import React from 'react'
import Navbar from '../components/Navbar'
import SiteFooter from '../components/SiteFooter'
import { getPageUrl } from '../utils/env'

const AuditorSitioWebPage = () => (
    <div className="min-h-screen text-white bg-[#0B0B0F]">
        <Navbar activePage="productos" />
        <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6 py-16">
            <div className="max-w-2xl text-center">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Auditor de Sitio Web</h1>
                <p className="text-neutral-400 text-lg leading-relaxed">Esta página está siendo restaurada.</p>
                <a href={getPageUrl('home')} className="mt-6 inline-flex items-center gap-2 text-[#2962ff] font-semibold hover:underline">Volver al inicio</a>
            </div>
        </main>
        <SiteFooter />
    </div>
)
export default AuditorSitioWebPage
