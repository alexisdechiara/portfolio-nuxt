export default defineAppConfig({
  global: {
    picture: {
      dark: 'https://alexisdechiara.fr/_astro/profil_1E6UYv.webp',
      light: 'https://alexisdechiara.fr/_astro/profil_1E6UYv.webp',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/',
    email: 'pro@alexisdechiara.fr',
    available: true
  },
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'neutral'
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
    credits: `Built with Nuxt UI • © ${new Date().getFullYear()}`,
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
