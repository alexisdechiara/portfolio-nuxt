// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt',
    '@nuxtjs/seo',
    'nuxt-llms'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-11-01',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    customCollections: [
      {
        prefix: 'local',
        dir: './app/assets/icons'
      }
    ]
  },

  llms: {
    domain: 'https://alexisdechiara.fr',
    title: 'Alexis De Chiara',
    description: 'Mon portfolio officiel : Mes projets, ma carrière, mes expériences et mon blog',
    sections: [
      {
        title: 'Navigation principale',
        description: 'Pages essentielles du portfolio',
        links: [
          {
            title: 'Accueil',
            description: 'Présentation générale',
            href: '/'
          },
          {
            title: 'Projets',
            description: 'Mes projets, démos et réalisations',
            href: '/projets'
          },
          {
            title: 'Blog',
            description: 'Mes articles de blog les plus récents',
            href: '/blog'
          },
          {
            title: 'À propos',
            description: 'Pour en savoir plus sur moi',
            href: '/a-propos'
          }
        ]
      },
      {
        title: 'Ressources externes',
        description: 'Liens professionnels utiles',
        links: [
          {
            title: 'Courriel',
            description: 'Mon adresse de courriel (email)',
            href: 'mailto:pro@alexisdechiara.fr'
          },
          {
            title: 'Rendez-vous',
            description: 'Page de prise de rendez-vous',
            href: 'https://calendly.com/alexisdechiara/rendez-vous'
          },
          {
            title: 'LinkedIn',
            description: 'Mon profil LinkedIn professionnel',
            href: 'https://www.linkedin.com/in/alexisdechiara/'
          },
          {
            title: 'GitHub',
            description: 'Mes repositories et contributions',
            href: 'https://github.com/alexisdechiara'
          },
          {
            title: 'Bluesky',
            description: 'Mon profil Bluesky personnel',
            href: 'https://bsky.app/profile/alexisdechiara.fr'
          }
        ]
      }
    ]
  },

  robots: {
    groups: [
      {
        userAgent: 'Googlebot-Image',
        disallow: '/'
      }
    ]
  }
})
