import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Timeline from '@/components/Timeline';
import Languages from '@/components/Languages';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

/**
 * Home page - Main portfolio page
 * Combines all sections: Header, Hero, About, Skills, Projects, Education, Contact
 * Design: Refined Brutalism with asymmetric layout and smooth animations
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Languages />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
