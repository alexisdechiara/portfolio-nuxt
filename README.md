# Portfolio Nuxt

Ce projet est mon portfolio personnel, une application web moderne et performante conçue pour présenter mes compétences, mes projets et mes articles de blog. Il est construit sur la base du template **[Nuxt UI Portfolio](https://ui.nuxt.com/templates/portfolio)** et personnalisé pour répondre à mes besoins.

## ✨ Fonctionnalités Clés

- 📝 **Blog Intégré** : Gestion d'articles techniques et personnels via Nuxt Content.
- 📁 **Showcase de Projets** : Une section dédiée pour présenter mes réalisations avec détails et liens.
- 🎨 **Design Premium** : Interface soignée, minimaliste et responsive utilisant Nuxt UI.
- 🌗 **Mode Sombre/Clair** : Support natif et automatique pour un confort visuel optimal.
- ✨ **Animations Fluides** : Expérience utilisateur enrichie grâce à `motion-v`.
- 🔍 **SEO Optimisé** : Bonnes pratiques SEO intégrées nativement avec Nuxt SEO.

## 🛠️ Stack Technique

Ce projet tire parti des dernières technologies de l'écosystème Vue et Nuxt :

- 🏗️ **Framework** : [Nuxt 4](https://nuxt.com/) pour une architecture solide et performante.
- 🎨 **UI & Styling** : [Nuxt UI](https://ui.nuxt.com/) (basé sur Tailwind CSS) pour le système de design.
- 📝 **Contenu** : [Nuxt Content](https://content.nuxt.com/) pour la gestion du blog et des données en Markdown.
- 🖼️ **Images** : [Nuxt Image](https://image.nuxt.com/) pour l'optimisation automatique des médias.
- 🎭 **Animations** : [Motion One (Vue)](https://motion.dev/) pour les animations d'interface.
- 🤖 **IA** : [Nuxt LLMs](https://github.com/hrcd-agency/nuxt-llms) pour l'intégration de fonctionnalités liées aux LLM.
- ✨ **Icônes** : [Nuxt Icon](https://nuxt.com/modules/icon) avec `lucide` et `simple-icons`.

## 📂 Structure du Projet

Voici un aperçu de l'organisation des fichiers :

```bash
portfolio-nuxt/
├── app/
│   ├── components/      # Composants Vue réutilisables
│   ├── composables/     # Logique partagée (hooks)
│   ├── layouts/         # Mises en page globales
│   ├── pages/           # Routes de l'application (blog, projets, etc.)
│   ├── app.config.ts    # Configuration de l'interface
│   └── app.vue          # Point d'entrée de l'application
├── content/             # Fichiers Markdown (articles de blog, données projets)
├── public/              # Fichiers statiques
├── server/              # API et routes serveur
├── nuxt.config.ts       # Configuration principale de Nuxt
└── package.json         # Dépendances et scripts
```

## 🚀 Installation et Démarrage

Ce projet utilise **Bun** comme gestionnaire de paquets principal.

### 1. Cloner le dépôt

```bash
git clone https://github.com/alexisdechiara/portfolio-nuxt.git
cd portfolio-nuxt
```

### 2. Installer les dépendances

```bash
bun install
```

### 3. Lancer le serveur de développement

```bash
bun dev
```

L'application sera accessible à l'adresse : `http://localhost:3000`

## 📦 Build pour la Production

Pour créer une version optimisée pour la production :

```bash
bun run build
```

Vous pouvez ensuite prévisualiser le build localement avec :

```bash
bun run preview
```

## 📱 Contact

Vous pouvez me retrouver sur [GitHub](https://github.com/alexisdechiara) ou visiter [mon site web](https://alexisdechiara.fr).

## 🧾 Licences

Ce projet ne possède pas de licence. N'hésitez pas à vous en inspirer, voire à le forker pour votre propre portfolio !
