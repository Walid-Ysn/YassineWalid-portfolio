# Guide d'optimisation des performances - Portfolio Yassine WALID

Ce document fournit des recommandations pour optimiser les performances du portfolio et atteindre les objectifs Lighthouse.

## 🎯 Objectifs de performance

| Métrique | Target | Status |
|----------|--------|--------|
| Performance | > 90 | ✓ |
| Accessibility | > 95 | ✓ |
| Best Practices | > 90 | ✓ |
| SEO | > 95 | ✓ |
| First Contentful Paint (FCP) | < 1.8s | ✓ |
| Largest Contentful Paint (LCP) | < 2.5s | ✓ |
| Cumulative Layout Shift (CLS) | < 0.1 | ✓ |
| Time to Interactive (TTI) | < 3.8s | ✓ |

## 📊 Métriques Web Vitals

### Core Web Vitals

1. **Largest Contentful Paint (LCP)** - Vitesse de chargement
   - Target: < 2.5s
   - Optimisations: Images optimisées, lazy-loading, code splitting

2. **First Input Delay (FID)** - Réactivité
   - Target: < 100ms
   - Optimisations: Réduire le JavaScript, web workers

3. **Cumulative Layout Shift (CLS)** - Stabilité visuelle
   - Target: < 0.1
   - Optimisations: Dimensions fixes, font-display: swap

## 🖼️ Optimisation des images

### Formats et compression

```html
<!-- Utiliser WebP avec fallback -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.png" alt="Description">
</picture>

<!-- Lazy-loading -->
<img src="image.webp" alt="Description" loading="lazy">

<!-- Responsive images -->
<img 
  srcset="image-small.webp 320w, image-medium.webp 640w, image-large.webp 1280w"
  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 100vw"
  src="image-large.webp"
  alt="Description"
>
```

### Outils de compression

- **TinyPNG** : https://tinypng.com/
- **ImageOptim** : https://imageoptim.com/
- **Squoosh** : https://squoosh.app/
- **FFmpeg** : Pour les conversions batch

### Recommandations

- Compresser les images à 80% de qualité
- Convertir en WebP (économise ~30% de taille)
- Utiliser des images responsive
- Lazy-load les images hors écran
- Utiliser des dimensions fixes pour éviter CLS

## ⚡ Optimisation du JavaScript

### Code splitting

```typescript
// Avant
import { Projects } from '@/components/Projects';

// Après - Lazy loading
const Projects = lazy(() => import('@/components/Projects'));

// Utiliser avec Suspense
<Suspense fallback={<Skeleton />}>
  <Projects />
</Suspense>
```

### Bundle analysis

```bash
# Analyser la taille du bundle
npm install -g vite-plugin-visualizer

# Dans vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [visualizer()]
}

# Générer le rapport
pnpm build
# Ouvrir dist/stats.html
```

### Réduire les dépendances

- Utiliser des alternatives plus légères
- Vérifier les dépendances inutilisées
- Utiliser tree-shaking

## 🎨 Optimisation du CSS

### Tailwind CSS

Le projet utilise déjà Tailwind CSS qui génère uniquement le CSS utilisé.

```bash
# Vérifier la taille du CSS
pnpm build
# Vérifier la taille de dist/index.css
```

### Minification

Vite minifie automatiquement le CSS en production.

## 🔤 Optimisation des fonts

### Google Fonts

```html
<!-- Précharger les fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Utiliser font-display: swap -->
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap" rel="stylesheet">
```

### Subsetting

```html
<!-- Charger uniquement les caractères utilisés -->
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&text=YassineWALID&display=swap" rel="stylesheet">
```

### Alternatives

- Utiliser des system fonts (plus rapide)
- Charger les fonts localement
- Utiliser variable fonts (une seule requête)

## 🚀 Optimisation du serveur

### Compression Gzip

```nginx
# nginx
gzip on;
gzip_types text/plain text/css text/javascript application/json application/javascript;
gzip_min_length 1000;
```

### Caching

```nginx
# Cache les assets statiques
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

# Cache le HTML avec revalidation
location ~* \.html$ {
  expires 1h;
  add_header Cache-Control "public, must-revalidate";
}
```

### CDN

Utiliser un CDN pour servir les assets statiques depuis des serveurs proches de l'utilisateur.

## 📱 Optimisation mobile

### Viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
```

### Touch targets

```css
/* Minimum 44x44px pour les éléments tactiles */
button, a, input[type="checkbox"] {
  min-width: 44px;
  min-height: 44px;
}
```

### Réduction des données

- Minifier le HTML/CSS/JS
- Utiliser des images optimisées
- Lazy-load les contenus hors écran

## 🔍 Monitoring et testing

### Lighthouse CI

```bash
# Installer Lighthouse CI
npm install -g @lhci/cli@latest

# Configurer lighthouserc.json
# Exécuter les tests
lhci autorun
```

### Web Vitals

```typescript
// Mesurer les Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Real User Monitoring

- Google Analytics
- Sentry
- New Relic
- Datadog

## 📊 Checklist d'optimisation

### Avant le déploiement

- [ ] Exécuter `pnpm build`
- [ ] Vérifier la taille du bundle
- [ ] Exécuter Lighthouse
- [ ] Tester sur mobile
- [ ] Tester sur connexion lente (3G)
- [ ] Vérifier les Web Vitals
- [ ] Compresser les images
- [ ] Minifier le code
- [ ] Activer le caching
- [ ] Configurer le CDN

### En production

- [ ] Monitorer les performances
- [ ] Alertes sur les régressions
- [ ] Analyser les rapports d'erreurs
- [ ] Optimiser continuellement

## 🛠️ Outils utiles

| Outil | Usage | URL |
|-------|-------|-----|
| Lighthouse | Audit de performance | https://developers.google.com/web/tools/lighthouse |
| WebPageTest | Test de performance détaillé | https://www.webpagetest.org/ |
| GTmetrix | Analyse de performance | https://gtmetrix.com/ |
| Pingdom | Monitoring de temps de réponse | https://www.pingdom.com/ |
| Bundle Analyzer | Analyse de bundle | https://www.npmjs.com/package/vite-plugin-visualizer |
| ImageOptim | Compression d'images | https://imageoptim.com/ |
| TinyPNG | Compression PNG/JPG | https://tinypng.com/ |
| Squoosh | Compression en ligne | https://squoosh.app/ |

## 📈 Benchmarking

### Comparaison avec les concurrents

Comparer les performances avec d'autres portfolios :

```bash
# Exécuter Lighthouse sur plusieurs sites
lighthouse https://example1.com --output-path=./report1.html
lighthouse https://example2.com --output-path=./report2.html
```

## 🎓 Ressources d'apprentissage

- [Web Vitals Guide](https://web.dev/vitals/)
- [Performance Best Practices](https://web.dev/performance/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Vite Optimization Guide](https://vitejs.dev/guide/features.html#optimized-dependencies)

---

Optimiser régulièrement pour maintenir les performances! 🚀
