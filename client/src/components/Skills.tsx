import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, BarChart3, Zap } from 'lucide-react';

/**
 * Skills section with animated progress rings and categories
 * Design: Refined Brutalism with skill visualization
 * - Animated skill rings on scroll
 * - Categorized by domain (Data, Databases, Development, Tools)
 * - Hover effects for interactivity
 */
export default function Skills() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

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

  const skillCategories = [
    {
      icon: BarChart3,
      title: 'Data Science',
      skills: [
        { name: 'Python', proficiency: 90 },
        { name: 'Pandas', proficiency: 85 },
        { name: 'PyTorch', proficiency: 80 },
        { name: 'scikit-learn', proficiency: 85 },
      ],
    },
    {
      icon: Database,
      title: 'Bases de données',
      skills: [
        { name: 'SQL avancé', proficiency: 90 },
        { name: 'PostgreSQL', proficiency: 85 },
        { name: 'MongoDB', proficiency: 80 },
        { name: 'Neo4j', proficiency: 75 },
      ],
    },
    {
      icon: Code2,
      title: 'Développement',
      skills: [
        { name: 'React.js', proficiency: 85 },
        { name: 'Spring Boot', proficiency: 80 },
        { name: 'TypeScript', proficiency: 85 },
        { name: 'Django', proficiency: 75 },
      ],
    },
    {
      icon: Zap,
      title: 'Outils & Plateformes',
      skills: [
        { name: 'GitHub', proficiency: 90 },
        { name: 'Power BI', proficiency: 80 },
        { name: 'Google Colab', proficiency: 85 },
        { name: 'VS Code', proficiency: 95 },
      ],
    },
  ];

  const SkillRing = ({ skill, inView }: { skill: { name: string; proficiency: number }; inView: boolean }) => {
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = inView ? circumference - (skill.proficiency / 100) * circumference : circumference;

    return (
      <motion.div
        className="flex flex-col items-center"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-24 h-24 mb-3">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="4"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#10B981"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              animate={{ strokeDashoffset: inView ? circumference - (skill.proficiency / 100) * circumference : circumference }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-foreground">{skill.proficiency}%</span>
          </div>
        </div>
        <p className="text-sm font-medium text-foreground text-center">{skill.name}</p>
      </motion.div>
    );
  };

  return (
    <section id="skills" className="py-20 md:py-32 bg-secondary">
      <div className="container max-w-6xl">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section header */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="accent-line mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Compétences</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Maîtrise des technologies modernes en Data Science, développement et ingénierie
            </p>
          </motion.div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {skillCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={categoryIndex}
                  variants={itemVariants}
                  className="bg-background rounded-lg p-8 hover-lift"
                >
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                  </div>

                  {/* Skills grid */}
                  <div className="grid grid-cols-2 gap-6">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillRing key={skillIndex} skill={skill} inView={inView} />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Additional skills section */}
          <motion.div variants={itemVariants} className="mt-16 bg-background rounded-lg p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Compétences supplémentaires</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                'Machine Learning',
                'Deep Learning',
                'Data Engineering',
                'Statistics',
                'Data Cleaning',
                'Cloud Computing',
                'API RESTful',
                'Agile/Scrum',
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  className="px-4 py-3 bg-secondary rounded-lg text-center text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
