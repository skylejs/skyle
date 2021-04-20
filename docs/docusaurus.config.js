module.exports = {
  title: 'Skyle',
  tagline: '+ Styling made easy',
  url: 'https://skyle.js.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'skylejs',
  projectName: 'skyle',
  scripts: [{ src: 'https://snack.expo.io/embed.js', defer: true }],
  themeConfig: {
    navbar: {
      title: 'Skyle',
      logo: {
        alt: 'Skyle Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/skylejs/skyle',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'About',
              to: 'docs/',
            },
            {
              label: 'Get Started',
              to: 'docs/get-started/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Skyle. Built with Docusaurus.`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/palenight'),
    },
  },
  themes: ['@docusaurus/theme-live-codeblock'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/skylejs/skyle/edit/master/docs/',
          remarkPlugins: [require('./plugins/remark-snackplayer')],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
