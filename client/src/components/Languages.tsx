import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe } from 'lucide-react';

/**
 * Languages section
 * Design: Refined Brutalism with proficiency visualization
 * - Animated language cards
 * - Proficiency levels with visual indicators
 */

interface Language {
  name: string;
  level: string;
  proficiency: number;
  flag: string;
}

export default function Languages() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const languages: Language[] = [
    {
      name: 'Arabe',
      level: 'Langue maternelle',
      proficiency: 100,
      flag: '🇲🇦',
    },
    {
      name: 'Français',
      level: 'Courant',
      proficiency: 95,
      flag: '🇫🇷',
    },
    {
      name: 'Anglais',
      level: 'Professionnel',
      proficiency: 80,
      flag: '🇬🇧',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="languages" className="py-20 md:py-32 bg-background">
      <div className="container max-w-4xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">Langues</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Maîtrise de plusieurs langues pour une communication efficace
            </p>
          </motion.div>

          {/* Languages grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {languages.map((language, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-secondary rounded-lg p-8 hover-lift"
              >
                {/* Flag and name */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{language.flag}</span>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{language.name}</h3>
                    <p className="text-sm text-muted-foreground">{language.level}</p>
                  </div>
                </div>

                {/* Proficiency bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-muted-foreground">Proficiency</span>
                    <span className="text-sm font-bold text-primary">{language.proficiency}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-primary/70 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${language.proficiency}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interests section */}
          <motion.div variants={itemVariants} className="mt-16 bg-secondary rounded-lg p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Centres d'intérêt</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '🎮', title: 'Gaming', description: 'Passion pour les jeux vidéo et la stratégie' },
                { icon: '🤖', title: 'Intelligence Artificielle', description: 'Fascination pour l\'IA et le machine learning' },
                { icon: '✈️', title: 'Voyage', description: 'Découverte de nouvelles cultures et horizons' },
              ].map((interest, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-4xl mb-3">{interest.icon}</div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{interest.title}</h4>
                  <p className="text-sm text-muted-foreground">{interest.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
