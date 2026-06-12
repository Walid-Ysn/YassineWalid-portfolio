import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * About section with personal biography
 * Design: Refined Brutalism with asymmetric layout
 * - Animated content on scroll
 * - Accent line for visual interest
 * - Clean typography hierarchy
 */
export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container max-w-4xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="accent-line mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">À propos</h2>
            <p className="text-lg text-muted-foreground">
              Découvrez mon parcours et mes motivations
            </p>
          </motion.div>

          {/* Main content */}
          <motion.div variants={itemVariants} className="space-y-6 text-lg text-foreground">
            <p className="leading-relaxed">
              Je suis Yassine WALID, un étudiant passionné en ingénierie informatique à EMSI
              Casablanca, actuellement en 4ème année de mon cycle d'ingénieur. Ma spécialisation
              porte sur la Data Science et l'Intelligence Artificielle, deux domaines qui
              façonnent l'avenir de la technologie.
            </p>

            <p className="leading-relaxed">
              Célibataire, 23 ans, basé à Sidi Ma'rouf à Casablanca, je suis un professionnel
              en herbe qui combine une solide formation théorique avec une expérience pratique
              concrète. Mon parcours m'a permis de maîtriser les technologies modernes et les
              méthodologies agiles.
            </p>

            <p className="leading-relaxed">
              En juillet 2025, j'ai complété un stage de 1 mois en tant que Full Stack Developer
              chez xHub, au Technopark de Casablanca. Pendant cette expérience, j'ai contribué
              au développement de la plateforme bancaire numérique X-Bank, en travaillant sur
              des APIs RESTful robustes avec Spring Boot et des interfaces réactives avec React
              et TypeScript.
            </p>

            <p className="leading-relaxed">
              Actuellement, je recherche un stage PFA (Projet de Fin d'Année) en Data Analysis
              ou Data Science pour approfondir mes compétences et contribuer à des projets
              d'impact. Je suis motivé par les défis complexes et l'apprentissage continu.
            </p>
          </motion.div>

          {/* Key stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-border"
          >
            {[
              { label: 'Années d\'étude', value: '4' },
              { label: 'Projets complétés', value: '10+' },
              { label: 'Langues parlées', value: '3' },
              { label: 'Technologies maîtrisées', value: '15+' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
