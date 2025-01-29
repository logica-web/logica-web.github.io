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
      { text: 'Getting Started', link: '/start-what-is-logica/' },
      { text: 'User Guide', link: '/usrguide-basic/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'API', link: '/api/' },
      { text: 'Community', link: '/community/' }
    ],

    sidebar: {
      // Getting Started part
      '/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'What is Logica', link: '/start-what-is-logica/' },
            { text: 'Why is Logica', link: '/start-why-is-logica/' },
            { text: 'Logica Installation', link: '/start-installation/' },
            { text: 'Logica Quickstart', link: '/start-quickstart/' },
          ]
        },
      ],
      '/usrguide-basic/': [
        {
          text: 'User Guide',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/usrguide-basic/' },
          ]
        },
        {
          text: 'Logica Basic',
          collapsed: false,
          items: [
            { text: 'Query Engine', link: '/usrguide-basic/query-engine' },
            { text: 'Predicates', link: '/usrguide-basic/predicates' },
            { text: 'Facts', link: '/usrguide-basic/facts' },
            { text: 'Rules', link: '/usrguide-basic/rules' },
            { text: 'Build-In Operators', link: '/usrguide-basic/built-in-operators' },
            { text: 'Named Arguments', link: '/usrguide-basic/named-arguments' },
            { text: 'Data Types', link: '/usrguide-basic/data-types' },
            { text: 'Multiset Semantics', link: '/usrguide-basic/multi-semantics' },
          ]
        },
        {
          text: 'Logica Advanced',
          collapsed: false,
          items: [
            { text: 'Aggregation', link: '/usrguide-basic/aggregation' },
            { text: 'Function', link: '/usrguide-basic/function' },
            { text: 'Computation', link: '/usrguide-basic/computation' },
            { text: 'Functional Notation', link: '/usrguide-basic/notation' },
            { text: 'Recursion', link: '/usrguide-basic/recursion' },
            { text: 'Functors', link: '/usrguide-basic/functors' },
          ]
        },
      ],

      // examples
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'PageRank', link: '/examples' },
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
