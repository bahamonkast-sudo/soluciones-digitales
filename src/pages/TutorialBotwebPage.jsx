import React from 'react'
import SiteFooter from '../components/SiteFooter'
import SEO from '../components/SEO';
import { SEO_CONFIG } from '../config/seoConfig';
const TutorialBotwebPage = () => (
    <div className="flex items-center justify-center min-h-screen text-white bg-neutral-900">
        <SEO {...SEO_CONFIG.tutorialBotweb} />
        <h1>Esta pagina esta siendo restaurada. (TutorialBotwebPage)</h1>
        <SiteFooter />
    </div>
)
export default TutorialBotwebPage
