# Portfolio Yassine WALID - Ingénierie AI & Data Science

Portfolio professionnel interactif et animé pour Yassine WALID, ingénieur en Intelligence Artificielle et Data Science. Construit avec React, TypeScript, Tailwind CSS et Framer Motion.

## 🎨 Design Philosophy

Ce portfolio suit une philosophie de design appelée **Refined Brutalism** :

- **Asymmetric Layout** : Évite les mises en page centrées uniformes pour créer un intérêt visuel
- **Typography First** : La typographie est l'élément de design principal
- **Strategic Color** : Palette monochrome avec accent couleur émeraude (#10B981)
- **Intentional Whitespace** : Espaces généreux pour créer du rythme
- **Purposeful Motion** : Animations qui guident l'attention et révèlent le contenu

## 🚀 Quick Start

### Prérequis

- Node.js 18+ et pnpm 10+
- Git

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd yassine-portfolio

# Installer les dépendances
pnpm install

# Démarrer le serveur de développement
pnpm dev
```

Le site sera accessible à `http://localhost:3000`

### Build pour la production

```bash
# Construire l'application
pnpm build

# Prévisualiser la build production
pnpm preview
```

## 📁 Structure du projet

```
YassineWalid-portfolio/
├── client/
│   ├── public/              # Fichiers statiques (favicon, robots.txt)
│   ├── src/
│   │   ├── components/      # Composants React réutilisables
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Timeline.tsx
│   │   │   ├── Languages.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx     # Page principale
│   │   │   └── NotFound.tsx
│   │   ├── lib/             # Utilitaires
│   │   ├── index.css        # Styles globaux et design tokens
│   │   ├── main.tsx         # Point d'entrée React
│   │   └── App.tsx          # Composant racine
│   └── index.html           # HTML template
├── server/                  # Serveur Express (placeholder)
├── package.json
├── tailwind.config.cjs
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Sections du portfolio

### 1. Hero Section
- Titre animé avec effet typewriter
- Sous-titre avec fade-in animation
- Informations de contact (email, téléphone, localisation)
- Boutons CTA (Télécharger CV, Voir les projets)
- Indicateur de scroll animé

### 2. About Section
- Biographie professionnelle
- Statistiques clés (années d'étude, projets, langues, technologies)
- Contenu en français polished

### 3. Skills Section
- 4 catégories de compétences (Data, Bases de données, Développement, Outils)
- Anneaux de progression animés avec pourcentages
- Compétences supplémentaires en tags

### 4. Projects Section
- Intégration GitHub API pour afficher les 6 meilleurs repositories
- Affichage des stats (stars, langage, forks)
- Projet en vedette : X-Bank Digital Platform
- Liens vers GitHub et démo

### 5. Timeline Section
- Formation et expérience professionnelle
- Ligne de connexion animée
- Icônes pour différencier formation vs expérience
- Descriptions détaillées

### 6. Languages Section
- 3 langues avec niveaux de proficiency
- Barres de progression animées
- Centres d'intérêt (Gaming, IA, Voyage)

### 7. Contact Section
- Formulaire de contact avec validation
- Informations de contact (email, téléphone, localisation)
- Liens vers réseaux sociaux (GitHub, LinkedIn)
- Notifications toast pour succès/erreur

### 8. Footer
- Navigation rapide
- Liens sociaux
- Copyright et attribution

## 🎨 Palette de couleurs

| Couleur | Hex | Usage |
|---------|-----|-------|
| Fond | #FAFAF8 | Arrière-plan principal |
| Texte | #1A1A18 | Texte principal |
| Accent | #10B981 | Boutons, highlights, accents |
| Accent foncé | #059669 | Hover states |
| Gris neutre | #E5E7EB | Bordures, dividers |
| Gris muted | #6B7280 | Texte secondaire |

## 🔤 Typographie

- **Display** : Sora (bold, 700) - Pour les titres
- **Body** : Inter (regular, 400-700) - Pour le texte principal
- **Monospace** : JetBrains Mono (400-600) - Pour le code

## ⚡ Animations

Toutes les animations respectent `prefers-reduced-motion` pour l'accessibilité.

### Animations principales

- **Typewriter** : Titre hero avec effet machine à écrire
- **Fade-up** : Contenu qui apparaît en remontant au scroll
- **Scroll reveal** : Animations déclenchées par IntersectionObserver
- **Skill rings** : Anneaux de progression qui se remplissent au scroll
- **Hover lift** : Cartes qui se soulèvent au survol
- **Timeline draw** : Ligne de timeline qui se dessine

## 🔧 Personnalisation

### Mettre à jour les informations personnelles

Modifiez les fichiers suivants :

1. **client/src/components/Hero.tsx** - Informations de contact
2. **client/src/components/About.tsx** - Biographie
3. **client/src/components/Skills.tsx** - Compétences
4. **client/src/components/Timeline.tsx** - Formation et expérience
5. **client/src/components/Projects.tsx** - Projets en vedette
6. **client/src/components/Contact.tsx** - Informations de contact

### Changer la couleur d'accent

Modifiez `client/src/index.css` :

```css
:root {
  --primary: #10B981; /* Changez cette couleur */
  /* ... autres variables */
}
```

### Ajouter/Modifier les projets GitHub

Les projets sont chargés automatiquement depuis le compte GitHub `Walid-Ysn`. Pour modifier :

1. Modifiez l'URL GitHub dans `client/src/components/Projects.tsx`
2. Le projet en vedette peut être modifié dans la même section

### Télécharger un CV

Placez votre fichier PDF dans `client/public/resume.pdf` et mettez à jour le lien dans `client/src/components/Header.tsx` et `client/src/components/Hero.tsx`.

## 📱 Responsive Design

Le portfolio est entièrement responsive avec breakpoints Tailwind :

- **Mobile** : 320px - 640px
- **Tablet** : 641px - 1024px
- **Desktop** : 1025px+

## ♿ Accessibilité

- Contraste WCAG AA pour tous les textes
- Navigation au clavier complète
- ARIA labels sur les éléments interactifs
- Respect de `prefers-reduced-motion`
- Sémantique HTML correcte

## 🚀 Déploiement

### Déployer sur Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Déployer sur Netlify

```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Déployer
netlify deploy --prod --dir=dist
```

### Déployer sur GitHub Pages

```bash
# Build
pnpm build

# Déployer manuellement les fichiers du dossier dist
```

## 📊 Performance

Lighthouse targets :

- Performance : > 90
- Accessibility : > 95
- Best Practices : > 90
- SEO : > 95

### Optimisations appliquées

- Images compressées et lazy-loaded
- Code splitting avec Vite
- CSS minifié avec Tailwind
- Fonts optimisées (Google Fonts avec subsets)
- Animations GPU-accelerated (transform, opacity only)

## 🔐 Sécurité

- Pas de données sensibles en frontend
- Validation des formulaires côté client et serveur
- HTTPS requis en production
- Content Security Policy headers recommandés

## 📝 Checklist avant publication

- [ ] Mettre à jour toutes les informations personnelles
- [ ] Vérifier les liens (GitHub, LinkedIn, email)
- [ ] Ajouter votre CV en PDF
- [ ] Tester sur mobile et desktop
- [ ] Vérifier l'accessibilité (axe DevTools)
- [ ] Tester les animations (prefers-reduced-motion)
- [ ] Vérifier les performances (Lighthouse)
- [ ] Configurer le domaine personnalisé
- [ ] Activer HTTPS
- [ ] Ajouter Google Analytics (optionnel)

## 🛠️ Stack technologique

- **Framework** : React 19 + TypeScript
- **Styling** : Tailwind CSS 4
- **Animations** : Framer Motion
- **Build Tool** : Vite
- **UI Components** : shadcn/ui
- **Icons** : Lucide React
- **Notifications** : Sonner
- **Routing** : Wouter
- **API** : GitHub REST API

## 📚 Ressources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com)
- [Vite](https://vitejs.dev)

## 📄 Licence

Ce projet est sous licence MIT. Libre d'utilisation et de modification.

## 👤 Auteur

**Yassine WALID**
- Email: yassine.walid40@gmail.com
- GitHub: https://github.com/Walid-Ysn
- LinkedIn: https://shorturl.at/ZeIzo
- Localisation: Sidi Ma'rouf, Casablanca, Maroc

---

Fait avec ❤️ en Maroc
