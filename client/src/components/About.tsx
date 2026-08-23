import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * About section with personal biography
 * Design: Refined Brutalism with asymmetric layout
 * - Animated content on scroll
 * - Accent line for visual interest
 * - Clean typography hierarchy
 */
export default function About() {
  const { t } = useLanguage();
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
    <section className="py-20 md:py-32 bg-background">
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
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t('about.title')}</h2>
            <p className="text-lg text-muted-foreground">
              {t('about.subtitle')}
            </p>
          </motion.div>

          {/* Main content */}
          <motion.div variants={itemVariants} className="space-y-6 text-lg text-foreground">
            <p className="leading-relaxed">
              {t('about.p1')}
            </p>

            <p className="leading-relaxed">
              {t('about.p2')}
            </p>

            <p className="leading-relaxed">
              {t('about.p3')}
            </p>

            <p className="leading-relaxed">
              {t('about.p4')}
            </p>
          </motion.div>

          {/* Key stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-border"
          >
            {[
              { label: t('about.stats.study'), value: '4' },
              { label: t('about.stats.projects'), value: '10+' },
              { label: t('about.stats.languages'), value: '3' },
              { label: t('about.stats.technologies'), value: '15+' },
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
