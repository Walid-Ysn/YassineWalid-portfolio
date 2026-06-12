# Guide de déploiement - Portfolio Yassine WALID

Ce document fournit des instructions détaillées pour déployer le portfolio sur différentes plateformes.

## 📋 Prérequis

- Build production : `pnpm build`
- Dossier `dist/` généré et testé localement avec `pnpm preview`

## 🚀 Options de déploiement

### 1. Vercel (Recommandé)

Vercel est optimisé pour les applications Vite et offre une excellente performance.

#### Installation et déploiement

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

#### Configuration Vercel

Créez un fichier `vercel.json` à la racine du projet :

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_ANALYTICS_ENDPOINT": "@vite_analytics_endpoint",
    "VITE_ANALYTICS_WEBSITE_ID": "@vite_analytics_website_id"
  }
}
```

#### Domaine personnalisé

1. Allez sur https://vercel.com/dashboard
2. Sélectionnez votre projet
3. Allez dans Settings > Domains
4. Ajoutez votre domaine personnalisé
5. Configurez les DNS records selon les instructions

### 2. Netlify

Netlify offre une excellente intégration GitHub et des déploiements automatiques.

#### Installation et déploiement

```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Se connecter à Netlify
netlify login

# Déployer
netlify deploy

# Déployer en production
netlify deploy --prod
```

#### Configuration Netlify

Créez un fichier `netlify.toml` à la racine du projet :

```toml
[build]
  command = "pnpm build"
  publish = "dist"

[context.production]
  environment = { NODE_ENV = "production" }

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
```

#### Déploiement automatique depuis GitHub

1. Connectez votre repository GitHub à Netlify
2. Configurez les paramètres de build :
   - Build command: `pnpm build`
   - Publish directory: `dist`
3. Netlify déploiera automatiquement à chaque push sur `main`

### 3. GitHub Pages

Gratuit et simple pour les projets open-source.

#### Configuration

Créez un fichier `vite.config.ts` avec la base correcte :

```typescript
export default defineConfig({
  base: '/yassine-portfolio/', // Remplacez par votre nom de repo
  plugins: [react()],
})
```

#### Déploiement

```bash
# Build
pnpm build

# Créer une branche gh-pages
git checkout --orphan gh-pages
git rm -rf .

# Copier les fichiers de dist
cp -r dist/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

Ou utilisez GitHub Actions :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - uses: pnpm/action-setup@v2
      - run: pnpm install
      - run: pnpm build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 4. Render

Plateforme cloud moderne avec support Node.js.

#### Déploiement

1. Créez un compte sur https://render.com
2. Créez un nouveau Web Service
3. Connectez votre repository GitHub
4. Configurez :
   - Build command: `pnpm install && pnpm build`
   - Start command: `pnpm preview`
   - Publish directory: `dist`
5. Déployez

### 5. Railway

Plateforme cloud simple avec intégration GitHub.

#### Déploiement

1. Créez un compte sur https://railway.app
2. Connectez GitHub
3. Sélectionnez votre repository
4. Railway détectera automatiquement Vite
5. Configurez les variables d'environnement si nécessaire
6. Déployez

## 🔒 Configuration de sécurité

### Headers de sécurité

Configurez les headers suivants sur votre serveur :

```
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com
```

### HTTPS

Assurez-vous que HTTPS est activé sur votre domaine. Utilisez Let's Encrypt pour un certificat gratuit.

## 📊 Monitoring et Analytics

### Google Analytics

1. Créez un compte Google Analytics
2. Obtenez votre Tracking ID
3. Ajoutez à `client/index.html` :

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Sentry (Error Tracking)

1. Créez un compte Sentry
2. Créez un projet React
3. Installez le SDK :

```bash
pnpm add @sentry/react
```

4. Initialisez dans `client/src/main.tsx` :

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

## 🔄 Mise à jour continue

### Automatiser les mises à jour

Utilisez Dependabot pour automatiser les mises à jour de dépendances :

1. Allez dans Settings > Code security and analysis
2. Activez Dependabot alerts et version updates
3. Configurez le fichier `.github/dependabot.yml`

## ✅ Checklist de déploiement

- [ ] Build production testée localement
- [ ] Variables d'environnement configurées
- [ ] Domaine personnalisé configuré
- [ ] HTTPS activé
- [ ] Headers de sécurité configurés
- [ ] Redirects configurées (SPA)
- [ ] Analytics configuré
- [ ] Error tracking configuré
- [ ] Backups configurés
- [ ] Monitoring activé
- [ ] Performance testée (Lighthouse)
- [ ] Accessibilité vérifiée
- [ ] SEO vérifiée

## 🆘 Dépannage

### Build échoue

```bash
# Nettoyer le cache
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### Performance lente

- Vérifiez les images (compression, lazy-loading)
- Vérifiez les bundles JavaScript (code splitting)
- Vérifiez les animations (GPU acceleration)
- Utilisez Lighthouse pour identifier les problèmes

### Problèmes de routing

Assurez-vous que votre serveur redirige toutes les routes vers `index.html` (SPA).

## 📞 Support

Pour plus d'aide :
- Documentation Vite : https://vitejs.dev
- Documentation React : https://react.dev
- Documentation Tailwind : https://tailwindcss.com

---

Bon déploiement! 🚀
