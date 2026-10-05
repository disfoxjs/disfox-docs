import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Disfox — Build Powerful Discord Apps with Organization and Automation',
  tagline: 'Disfox JS Documentation',
  favicon: '/img/dfx-fav.png',

  url: 'https://disfox.js.org',
  baseUrl: '/',

  organizationName: 'DisfoxJS',
  projectName: 'disfox-docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
  },

  plugins: ['./plugins/local-search/index.cjs'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
   stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap',
      type: 'text/css',
    },
  ],

  themeConfig: {
    navbar: {
      items: [{type: 'search', position: 'right'}],
      
      logo: {
        alt: 'Disfox Logo',
        src: 'img/dfx-outline.png',
        href: '/',
      },
      
    },

    footer: {
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} Disfox`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;