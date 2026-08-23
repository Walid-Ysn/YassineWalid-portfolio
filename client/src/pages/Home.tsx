import { lazy } from 'react';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LazySection from '@/components/LazySection';
import { useLanguage } from '@/contexts/LanguageContext';

const About = lazy(() => import('@/components/About'));
const Skills = lazy(() => import('@/components/Skills'));
const Projects = lazy(() => import('@/components/Projects'));
const News = lazy(() => import('@/components/News'));
const DataChallenge = lazy(() => import('@/components/DataChallenge'));
const Timeline = lazy(() => import('@/components/Timeline'));
const Languages = lazy(() => import('@/components/Languages'));
const Contact = lazy(() => import('@/components/Contact'));

function SectionFallback() {
  return (
    <div className="container flex min-h-[12rem] items-center justify-center" aria-hidden="true">
      <div className="h-1 w-20 animate-pulse rounded-full bg-primary/30" />
    </div>
  );
}

/**
 * Home page - Main portfolio page
 * Below-the-fold sections are code-split so the hero can render quickly on mobile.
 */
export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t('a11y.skipToContent')}
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <LazySection id="about" component={About} fallback={<SectionFallback />} />
        <LazySection id="skills" component={Skills} fallback={<SectionFallback />} />
        <LazySection id="projects" component={Projects} fallback={<SectionFallback />} />
        <LazySection id="news" component={News} fallback={<SectionFallback />} />
        <LazySection id="game" component={DataChallenge} fallback={<SectionFallback />} />
        <LazySection id="education" component={Timeline} fallback={<SectionFallback />} />
        <LazySection id="languages" component={Languages} fallback={<SectionFallback />} />
        <LazySection id="contact" component={Contact} fallback={<SectionFallback />} />
      </main>
      <Footer />
    </div>
  );
}
