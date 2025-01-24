import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Logica",
  description: "Logic Programming Language for Data Analysis",
  head: [['link', { rel: 'icon', href: '/logica_favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      light: '/logica_logo.png',
      dark: '/logica_logo.png',
      alt: 'logica logo'
    },
    footer: {
      message: '',
      copyright: 'Released under the Apache 2.0 License. Copyright © 2024-present Logica Devs'
    },
    siteTitle: false,
    nav: [
      { text: 'Getting Started', link: '/intro_what_is_logica/' },
      { text: 'User Guide', link: '/usrguide_installation/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'API', link: '/api/' },
      { text: 'Community', link: '/community/' }
    ],

    sidebar: {
      // Getting Started part
      '/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'What is Logica', link: '/intro_what_is_logica/' },
            { text: 'Why is Logica', link: '/intro_why_is_logica/' },
          ]
        },
        {
          text: 'User Guide',
          collapsed: false,
          items: [
            { text: 'Installation', link: '/usrguide_installation/' },
            { text: 'Query Engines', link: '/usrguide_engines/' },
            { text: 'Notebook Support', link: '/usrguide_notebook/' },
          ]
        },
        { text: 'Examples', link: '/examples/' },
        { text: 'API Reference', link: '/api/' },
      ],

      // examples
      '/examples/': [
        {
          text: 'PageRank',
          items: [
            { text: 'Example', link: '/examples' },
          ]
        },
      ],
      // api
      '/api/': [
        {
          text: 'API',
          items: [
            { text: 'API', link: '/api' },
          ]
        }
      ],
      // community
      '/community/': [
        {
          text: 'Community',
          items: [
            { text: 'Community', link: '/community' },
          ]
        }
      ],
    },
    search: {
      provider: "local"
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/evgskv/logica' }
    ]
  }
})
