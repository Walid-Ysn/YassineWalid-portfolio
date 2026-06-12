# Checklist d'accessibilité - Portfolio Yassine WALID

Ce document fournit une checklist complète pour vérifier et maintenir l'accessibilité du portfolio selon les normes WCAG 2.1 AA.

## ✅ Checklist d'accessibilité

### 1. Contraste et couleurs

- [x] Contraste texte/fond minimum 4.5:1 pour le texte normal
- [x] Contraste texte/fond minimum 3:1 pour le texte large
- [x] Les informations ne sont pas transmises uniquement par la couleur
- [x] Palette de couleurs testée avec les simulateurs de daltonisme

**Outils de test :**
- WebAIM Contrast Checker : https://webaim.org/resources/contrastchecker/
- Accessible Colors : https://accessible-colors.com/

### 2. Navigation au clavier

- [x] Tous les éléments interactifs sont accessibles au clavier
- [x] L'ordre de tabulation est logique
- [x] Les raccourcis clavier n'interfèrent pas avec les raccourcis du navigateur
- [x] Les focus rings sont visibles et clairs
- [x] Pas de pièges au clavier

**Tester :**
```bash
# Naviguer avec Tab et Shift+Tab
# Activer les éléments avec Enter ou Espace
# Vérifier que le focus est toujours visible
```

### 3. Structure sémantique

- [x] Utilisation correcte des balises HTML sémantiques (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- [x] Hiérarchie des titres correcte (h1 → h2 → h3, pas de sauts)
- [x] Les listes utilisent `<ul>`, `<ol>`, `<li>`
- [x] Les boutons utilisent `<button>` ou `role="button"`
- [x] Les liens utilisent `<a>` avec href valide

### 4. Texte alternatif et labels

- [x] Toutes les images ont un `alt` descriptif
- [x] Les icônes décoratives ont `aria-hidden="true"`
- [x] Les formulaires ont des labels associés (`<label for="id">`)
- [x] Les inputs ont des `aria-label` ou `aria-labelledby` si pas de label visible
- [x] Les boutons ont un texte visible ou `aria-label`

### 5. Formulaires

- [x] Tous les champs requis sont marqués
- [x] Les messages d'erreur sont clairs et liés au champ
- [x] Les suggestions de correction sont fournies
- [x] La validation se fait au niveau du champ
- [x] Les formulaires peuvent être soumis au clavier

### 6. Animations et mouvement

- [x] Respect de `prefers-reduced-motion`
- [x] Les animations ne clignotent pas (< 3 fois par seconde)
- [x] Les animations auto-play peuvent être arrêtées
- [x] Les animations ne sont pas essentielles pour comprendre le contenu

**Tester :**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 7. Responsive et zoom

- [x] Le site est responsive jusqu'à 320px de largeur
- [x] Le texte peut être zoomé jusqu'à 200% sans perte de fonctionnalité
- [x] Pas de scroll horizontal à 320px
- [x] Les éléments tactiles ont une taille minimum de 44x44px
- [x] Le viewport est correctement configuré

### 8. Contenu et langue

- [x] La langue principale est définie dans `<html lang="fr">`
- [x] Les changements de langue sont marqués avec `lang` attribute
- [x] Le contenu est organisé logiquement
- [x] Les abréviations sont expliquées
- [x] Le texte est clair et simple

### 9. Lecteurs d'écran

- [x] Les landmarks sont utilisés correctement (`<header>`, `<nav>`, `<main>`, `<footer>`)
- [x] Les sections ont des titres descriptifs
- [x] Les listes de navigation sont marquées avec `<nav>`
- [x] Les régions dynamiques utilisent `aria-live` si nécessaire
- [x] Les modales sont correctement marquées

### 10. Liens et boutons

- [x] Le texte des liens est descriptif (pas "Cliquez ici")
- [x] Les liens externes sont marqués (icône ou texte)
- [x] Les boutons ont un but clair
- [x] Les boutons désactivés sont marqués avec `disabled` ou `aria-disabled`
- [x] Les focus rings sont visibles sur les liens

### 11. Médias

- [x] Les vidéos ont des sous-titres
- [x] Les images complexes ont des descriptions longues
- [x] Les graphiques ont des descriptions textuelles
- [x] Les fichiers audio ont des transcriptions

### 12. Performance et temps de chargement

- [x] Le site charge rapidement (< 3 secondes)
- [x] Les images sont optimisées
- [x] Le CSS et JavaScript sont minifiés
- [x] Les fonts sont optimisées
- [x] Les ressources externes sont chargées efficacement

## 🧪 Outils de test

### Outils automatisés

1. **axe DevTools** (Chrome/Firefox)
   - Extension : https://www.deque.com/axe/devtools/
   - Détecte les problèmes d'accessibilité courants

2. **WAVE** (WebAIM)
   - Extension : https://wave.webaim.org/extension/
   - Visualise les éléments d'accessibilité

3. **Lighthouse** (Chrome DevTools)
   - Inclus dans Chrome DevTools
   - Audit d'accessibilité automatisé

4. **NVDA** (Lecteur d'écran gratuit)
   - Télécharger : https://www.nvaccess.org/
   - Tester avec un lecteur d'écran réel

### Tests manuels

```bash
# Test au clavier
Tab              # Naviguer vers l'avant
Shift+Tab        # Naviguer vers l'arrière
Enter/Espace     # Activer les boutons
Arrow keys       # Naviguer dans les menus

# Test du zoom
Ctrl+Plus        # Zoomer
Ctrl+Minus       # Dé-zoomer
Ctrl+0           # Réinitialiser

# Test du lecteur d'écran
# Windows: NVDA (gratuit) ou JAWS (payant)
# macOS: VoiceOver (gratuit, Cmd+F5)
# Linux: Orca (gratuit)
```

## 📊 Résultats des tests

### Lighthouse Accessibility Score

**Target: > 95/100**

Pour vérifier :
1. Ouvrir Chrome DevTools (F12)
2. Aller dans Lighthouse
3. Sélectionner "Accessibility"
4. Cliquer "Analyze page load"

### WCAG 2.1 Conformité

**Target: Level AA**

- Level A : Critères de base
- Level AA : Critères intermédiaires (recommandé)
- Level AAA : Critères avancés

## 🔄 Maintenance continue

### Avant chaque déploiement

- [ ] Exécuter axe DevTools
- [ ] Vérifier le score Lighthouse
- [ ] Tester au clavier
- [ ] Tester avec un lecteur d'écran
- [ ] Vérifier le zoom jusqu'à 200%
- [ ] Tester sur mobile

### Lors de l'ajout de nouvelles fonctionnalités

- [ ] Ajouter des labels aux formulaires
- [ ] Ajouter des textes alternatifs aux images
- [ ] Tester la navigation au clavier
- [ ] Vérifier la hiérarchie des titres
- [ ] Tester avec les lecteurs d'écran

## 📚 Ressources

### Documentation

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM Articles](https://webaim.org/articles/)
- [A11y Project](https://www.a11yproject.com/)

### Outils

- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)
- [Accessible Colors](https://accessible-colors.com/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Screen Reader Testing](https://www.nvaccess.org/)

### Communauté

- [A11y Slack](https://www.a11yproject.com/join/)
- [WebAIM Mailing List](https://webaim.org/articles/subscribe/)
- [Accessibility Stack Exchange](https://accessibility.stackexchange.com/)

## 🎯 Objectifs d'accessibilité

1. **Perceptible** : Les utilisateurs peuvent percevoir le contenu
2. **Opérable** : Les utilisateurs peuvent naviguer et interagir
3. **Compréhensible** : Les utilisateurs peuvent comprendre le contenu
4. **Robuste** : Le contenu fonctionne avec les technologies d'assistance

---

Pour toute question sur l'accessibilité, consultez les ressources ci-dessus ou contactez un expert en accessibilité.
