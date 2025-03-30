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
      { text: 'Community', link: '/community/' },
      { text: 'Contributing', link: '/contributing/' }
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
            { text: 'Value Types', link: '/usrguide/value-types' },
            { text: 'Basic Operations', link: '/usrguide/basic-operators' },
            { text: 'Named Arguments', link: '/usrguide/named-arguments' },
            { text: 'Multiset Semantics', link: '/usrguide/multi-semantics' },
          ]
        },
        {
          text: 'Logica Advanced',
          collapsed: false,
          items: [
            { text: 'Aggregation', link: '/usrguide/aggregation' },
            { text: 'Negation', link: '/usrguide/negation' },
            { text: 'Computation', link: '/usrguide/computation' },
            { text: 'Boolean Logic', link: '/usrguide/boolean-logic' },
            { text: 'Functional Notation', link: '/usrguide/notation' },
            { text: 'Recursion', link: '/usrguide/recursion' },
            { text: 'Functors', link: '/usrguide/functors' },
          ]
        },
        {
          text: 'Logica Cheatsheet',
          collapsed: false,
          items: [
            { text: 'Build-In Operators', link: '/usrguide/built-in-operators' },
            { text: 'Imperatives', link: '/usrguide/imperatives' },
          ]
        }
      ],

      // examples
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Overview', link: '/examples/' },
          ]
        },
        {
          text: 'Recursive Queries',
          items: [
            { text: 'Transitive Closure', link: '/examples/tc' },
            { text: 'Same Generation', link: '/examples/sg' },
          ]
        },
        {
          text: ' Aggregation Queries',
          items: [
            { text: 'Triangle Counting', link: '/examples/triangle' },
          ]
        },
        {
          text: ' Aggregation in Recursion',
          items: [
            { text: 'Single Shortest Path', link: '/examples/sssp' },
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
        // {
        //   text: 'Community',
        //   items: [
        //     { text: 'Community', link: '/community' },
        //   ]
        // }
      ],
      // contribution
      '/contributing/': [
        {
          text: 'Contributing',
          items: [
            { text: 'contributing', link: '/contributing' },
          ]
        }
      ],
    },
    search: {
      provider: "local"
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/evgskv/logica' },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Football</title><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm4.66 3.6L19 8.5l-2.29 1.1-2-1.2-.79-2.58A7.89 7.89 0 0 1 16.66 3.6zM12 4l1.35 4.42-3.7 2.88-4.11-1.8-.15-.06A7.992 7.992 0 0 1 12 4zm-7.91 5.95l4.59 2 1.08 4.72-1.6 2.5a8.006 8.006 0 0 1-4.07-9.22zm6.66 11.22l1.68-3.08h3.2l1.68 3.08A8.019 8.019 0 0 1 12 21zm6.31-1.2l-1.6-2.5 1.08-4.72 4.59-2a8.006 8.006 0 0 1-4.07 9.22zM15.45 12l-3.45-2.69-3.45 2.69 1.31 4.92h4.28L15.45 12z"/></svg>'
        },
        link: 'https://logica.dev/sandbox.html',
        ariaLabel: 'Logica Playground'
      }
    ]
  }
})