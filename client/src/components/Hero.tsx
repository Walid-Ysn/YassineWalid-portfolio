import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

/**
 * Hero section with animated typewriter effect and CTA
 * Design: Refined Brutalism with asymmetric layout
 * - Hero background image with data visualization elements
 * - Animated title with typewriter effect
 * - Subtitle with fade-in animation
 * - CTA buttons with hover effects
 */
export default function Hero() {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Ingénierie AI & Data Science';
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (displayedText.length < fullText.length && isTyping) {
      const timer = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 50);
      return () => clearTimeout(timer);
    } else if (displayedText.length === fullText.length) {
      setIsTyping(false);
    }
  }, [displayedText, isTyping, fullText]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/manus-storage/hero-background_0052793c.png')`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40" />
      </div>

      {/* Content */}
      <motion.div
        className="container relative z-10 max-w-4xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Accent line */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="accent-line" />
        </motion.div>

        {/* Main title with typewriter effect */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            {displayedText}
            <motion.span
              className="text-primary"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity } as any}
            >
              |
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants} className="mb-8">
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            Étudiant en 4ème année d'ingénierie informatique à EMSI Casablanca, spécialisé en
            Data Science et Intelligence Artificielle. Recherche un stage PFA en Data Analysis /
            Data Science.
          </p>
        </motion.div>

        {/* Personal info */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-4 md:gap-8 mb-12 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <span className="text-primary">📍</span>
            <span>Sidi Ma'rouf, Casablanca, Maroc</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary">📧</span>
            <a
              href="mailto:yassine.walid40@gmail.com"
              className="hover:text-foreground transition-colors"
            >
              yassine.walid40@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary">📱</span>
            <a href="tel:+212635260207" className="hover:text-foreground transition-colors">
              (+212) 635 260 207
            </a>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground group"
            asChild
          >
            <a href="/manus-storage/CV-Walid-Yassine_7da534cf.pdf" download="CV-Yassine-WALID.pdf" className="flex items-center gap-2">
              Télécharger CV
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            asChild
          >
            <a href="#projects">Voir mes projets</a>
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity } as any}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground">Défiler pour découvrir</span>
            <div className="w-6 h-10 border-2 border-primary rounded-full flex items-center justify-center">
              <motion.div
                className="w-1 h-2 bg-primary rounded-full"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity } as any}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
