import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BookOpen, Briefcase } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Timeline component for Education & Experience
 * Design: Refined Brutalism with animated connector line
 * - Animated timeline with staggered entries
 * - Connector line animation
 * - Icons for education vs experience
 */

interface TimelineEntry {
  type: 'education' | 'experience';
  title: string;
  organization: string;
  period: string;
  description: string[];
  location?: string;
}

export default function Timeline() {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const timelineData: TimelineEntry[] = [
    {
      type: 'experience',
      title: t('timeline.internship.title'),
      organization: 'xHub, Technopark Casablanca',
      period: t('timeline.internship.period'),
      description: [
        t('timeline.internship.d1'),
        t('timeline.internship.d2'),
        t('timeline.internship.d3'),
      ],
      location: t('location.casablanca'),
    },
    {
      type: 'education',
      title: t('timeline.engineering.title'),
      organization: 'EMSI Casablanca',
      period: t('timeline.engineering.period'),
      description: [
        t('timeline.engineering.d1'),
        t('timeline.engineering.d2'),
        t('timeline.engineering.d3'),
      ],
      location: t('location.casablanca'),
    },
    {
      type: 'education',
      title: t('timeline.baccalaureate.title'),
      organization: 'Lycée Ibn Arabi',
      period: t('timeline.baccalaureate.period'),
      description: [t('timeline.baccalaureate.d1')],
      location: t('location.casablanca'),
    },
  ];

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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="education" className="py-20 md:py-32 bg-secondary">
      <div className="container max-w-4xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="accent-line mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('timeline.title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('timeline.subtitle')}
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <motion.div
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary to-primary/30"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              style={{ transformOrigin: 'top' }}
            />

            {/* Timeline entries */}
            <div className="space-y-12">
              {timelineData.map((entry, index) => {
                const isExperience = entry.type === 'experience';
                const Icon = isExperience ? Briefcase : BookOpen;

                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className={`flex gap-6 md:gap-0 ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="flex flex-col items-center md:w-1/2">
                      <motion.div
                        className="relative z-10 w-12 h-12 bg-background border-4 border-primary rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="w-6 h-6 text-primary" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <motion.div
                      className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}
                      whileHover={{ x: index % 2 === 0 ? 10 : -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-background rounded-lg p-6 border border-border hover-lift">
                        {/* Badge */}
                        <div className="inline-block mb-3">
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              isExperience
                                ? 'bg-primary/20 text-primary'
                                : 'bg-accent/20 text-accent'
                            }`}
                          >
                            {isExperience ? t('timeline.experience') : t('timeline.education')}
                          </span>
                        </div>

                        {/* Title and organization */}
                        <h3 className="text-xl font-bold text-foreground mb-1">{entry.title}</h3>
                        <p className="text-primary font-semibold mb-1">{entry.organization}</p>

                        {/* Period and location */}
                        <div className="flex flex-col gap-1 mb-4 text-sm text-muted-foreground">
                          <span>{entry.period}</span>
                          {entry.location && <span>{entry.location}</span>}
                        </div>

                        {/* Description */}
                        <ul className="space-y-2">
                          {entry.description.map((desc, i) => (
                            <li key={i} className="text-foreground text-sm flex gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
