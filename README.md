<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# WoW Codex — Guides & tutoriels

Une application web (Vite + React) pour trouver des guides/tutoriels World of Warcraft via recherche (démo intégrée + IA optionnelle).

## Démarrer en local

**Prérequis :** Node.js (recommandé : 22, minimum : 20.19)

1. Installer les dépendances : `npm install`
2. Lancer le serveur : `npm run dev`

## Clé API Gemini (optionnel)

Par défaut (sans clé), l’app fonctionne en **mode démo** avec des données fictives.

Deux options :
- **Dans l’UI** : bouton **Clé API** (stockage local dans le navigateur).
- **En local** : définir `GEMINI_API_KEY` dans `.env.local` (ex : `GEMINI_API_KEY=...`).

## Déployer sur GitHub Pages

Le dépôt contient un workflow GitHub Actions (`.github/workflows/deploy.yml`) qui :
1) build l’app (`npm run build`)  
2) déploie `dist/` sur GitHub Pages

Étapes :
1. Pousser sur la branche `main`
2. Dans GitHub → **Settings → Pages** → **Build and deployment** → sélectionner **GitHub Actions**
3. Attendre la fin du workflow “Deploy to GitHub Pages”, puis ouvrir l’URL fournie

> Note : comme GitHub Pages sert l’app depuis un sous-chemin, `vite.config.ts` utilise `base: './'` pour que les assets fonctionnent quel que soit le nom du repo.
