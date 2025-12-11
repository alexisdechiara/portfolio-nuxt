export default defineAppConfig({
  global: {
    picture: {
      dark: '/img/profil.avif',
      light: '/img/profil.avif',
      alt: 'Ma photo de profil'
    },
    meetingLink: 'https://calendly.com/alexisdechiara/rendez-vous',
    email: 'pro@alexisdechiara.fr'
  },
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'neutral'
    },
    container: {
      base: 'max-w-4xl 2xl:max-w-6xl'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    credits: `Réalisé avec Nuxt UI • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: [{
      'icon': 'i-simple-icons-linkedin',
      'to': 'https://www.linkedin.com/in/alexisdechiara/',
      'target': '_blank',
      'aria-label': 'LinkedIn'
    }, {
      'icon': 'i-simple-icons-bluesky',
      'to': 'https://bsky.app/profile/alexisdechiara.fr',
      'target': '_blank',
      'aria-label': 'Bluesky'
    }, {
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/alexisdechiara',
      'target': '_blank',
      'aria-label': 'GitHub'
    }]
  }
})
