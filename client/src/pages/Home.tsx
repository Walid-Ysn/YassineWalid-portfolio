import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import News from '@/components/News';
import DataChallenge from '@/components/DataChallenge';
import Timeline from '@/components/Timeline';
import Languages from '@/components/Languages';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Home page - Main portfolio page
 * Combines all sections: Header, Hero, About, Skills, Projects, Education, Contact
 * Design: Refined Brutalism with asymmetric layout and smooth animations
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
        <About />
        <Skills />
        <Projects />
        <News />
        <DataChallenge />
        <Timeline />
        <Languages />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
