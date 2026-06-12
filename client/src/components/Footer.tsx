import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail } from 'lucide-react';

/**
 * Footer component
 * Design: Refined Brutalism with minimal, clean design
 * - Copyright and attribution
 * - Social links
 * - Quick navigation
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'À propos', href: '#about' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Projets', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, url: 'https://github.com/Walid-Ysn', label: 'GitHub' },
    { icon: Linkedin, url: 'https://shorturl.at/ZeIzo', label: 'LinkedIn' },
    { icon: Mail, url: 'mailto:yassine.walid40@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/manus-storage/portfolio-logo_33e7a35b.png"
                alt="YW Logo"
                className="w-8 h-8"
              />
              <span className="font-bold text-foreground">Yassine WALID</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Ingénieur AI & Data Science
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-foreground mb-4">Réseaux sociaux</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border my-8" />

        {/* Bottom section */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p>
            © {currentYear} Yassine WALID. Tous droits réservés.
          </p>
          <p className="flex items-center gap-1">
            Fait avec <Heart className="w-4 h-4 text-primary fill-primary" /> en Maroc
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
