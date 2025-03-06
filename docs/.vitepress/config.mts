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
      { text: 'Getting Started', link: '/start/' },
      { text: 'User Guide', link: '/usrguide/' },
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
            { text: 'What is Logica', link: '/start/' },
            { text: 'Why is Logica', link: '/start/start-why-is-logica' },
          ]
        },
      ],
      '/usrguide/': [
        {
          text: 'User Guide',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/usrguide/' },
          ]
        },
        {
          text: 'Logica Execution',
          collapsed: false,
          items: [
            { text: 'Logica Installation', link: '/usrguide/installation' },
            { text: 'Query Engine', link: '/usrguide/query-engine' },
            { text: 'Run in Terminal', link: '/usrguide/run-in-terminal' },
            { text: 'Run in Notebook', link: '/usrguide/run-in-notebook' },
          ]
        },
        {
          text: 'Logica Basic',
          collapsed: false,
          items: [
            { text: 'Facts', link: '/usrguide/facts' },
            { text: 'Rules', link: '/usrguide/rules' },
            { text: 'Named Arguments', link: '/usrguide/named-arguments' },
            { text: 'Build-In Operators', link: '/usrguide/built-in-operators' },
            { text: 'Data Types', link: '/usrguide/data-types' },
            { text: 'Multiset Semantics', link: '/usrguide/multi-semantics' },
          ]
        },
        {
          text: 'Logica Advanced',
          collapsed: false,
          items: [
            { text: 'Aggregation', link: '/usrguide/aggregation' },
            { text: 'Computation', link: '/usrguide/computation' },
            { text: 'Boolean Logic', link: '/usrguide/boolean-logic' },
            { text: 'Functional Notation', link: '/usrguide/notation' },
            { text: 'Recursion', link: '/usrguide/recursion' },
            { text: 'Functors', link: '/usrguide/functors' },
          ]
        },
        // {
        //   text: 'Logica for Data Science',
        //   collapsed: false,
        //   items: [

        //   ]
        // },
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