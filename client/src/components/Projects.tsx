import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { Github, Star, GitFork, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Projects section with GitHub API integration
 * Design: Refined Brutalism with card hover effects
 * - Fetches top 6 repositories from GitHub
 * - Displays stats (stars, language, forks)
 * - Includes featured X-Bank project
 * - Animated on scroll
 */

interface GithubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
  homepage?: string;
}

export default function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        // Fetch top repositories from GitHub user Walid-Ysn
        const response = await fetch(
          'https://api.github.com/users/Walid-Ysn/repos?sort=stars&per_page=6&type=owner'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }

        const data = await response.json();
        setRepos(data);
      } catch (err) {
        console.error('Error fetching repos:', err);
        setError('Impossible de charger les projets GitHub');
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

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

  // Featured X-Bank project
  const featuredProject = {
    name: 'X-Bank Digital Platform',
    description:
      'Application bancaire fullstack avec APIs RESTful Spring Boot et interfaces React/TypeScript. Gestion des annonces, uploads, authentification JWT, dashboards admin et analytics.',
    technologies: ['Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'JWT', 'Tailwind CSS'],
    link: '#',
    featured: true,
  };

  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
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
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Projets</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Découvrez mes projets en Data Science, développement fullstack et ingénierie
            </p>
          </motion.div>

          {/* Featured Project */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-8 md:p-12 border-l-4 border-primary hover-lift">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full mb-3">
                    Projet en vedette
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{featuredProject.name}</h3>
                </div>
              </div>

              <p className="text-lg text-foreground mb-6 leading-relaxed">
                {featuredProject.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredProject.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary text-foreground text-sm font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex gap-4">
                <Button variant="default" className="bg-primary hover:bg-primary/90">
                  <Github className="w-4 h-4 mr-2" />
                  Voir le code
                </Button>
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Démo
                </Button>
              </div>
            </div>
          </motion.div>

          {/* GitHub Projects Grid */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-foreground mb-8">Projets récents</h3>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-secondary rounded-lg p-6 animate-pulse">
                    <div className="h-6 bg-muted rounded mb-4" />
                    <div className="h-4 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="bg-destructive/10 text-destructive p-6 rounded-lg text-center">
                {error}
              </div>
            ) : repos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map((repo, index) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-card border border-border rounded-lg p-6 hover-lift group"
                    variants={itemVariants}
                  >
                    {/* Repo header */}
                    <div className="flex items-start justify-between mb-4">
                      <Github className="w-5 h-5 text-primary" />
                      {repo.stargazers_count > 0 && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-4 h-4" />
                          {repo.stargazers_count}
                        </div>
                      )}
                    </div>

                    {/* Repo name */}
                    <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {repo.name}
                    </h4>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {repo.description || 'Pas de description'}
                    </p>

                    {/* Footer with language and forks */}
                    <div className="flex items-center justify-between pt-4 border-t border-border text-xs text-muted-foreground">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-primary rounded-full" />
                          {repo.language}
                        </span>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          {repo.forks_count}
                        </span>
                      )}
                    </div>
                  </motion.a>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Aucun projet trouvé</p>
              </div>
            )}
          </motion.div>

          {/* View all on GitHub */}
          <motion.div variants={itemVariants} className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-primary text-primary hover:bg-primary/10"
            >
              <a href="https://github.com/Walid-Ysn" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Voir tous les projets sur GitHub
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
