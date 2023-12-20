// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '笔记',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://djzzwx.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'djzzwx', // Usually your GitHub org/user name.
  projectName: 'djzzwx.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'djzzwx',
        logo: {
          alt: 'Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'leetcode',
            position: 'left',
            label: 'leetcode',
          },
          {
            type: 'docSidebar',
            sidebarId: 'mysql',
            position: 'left',
            label: 'mysql',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   items: [
          //     {
          //       html: `
          //               <div style="display: flex; justify-content: center;">
          //                   <a href="http://beian.miit.gov.cn/" rel="noreferrer" target="_blank">冀ICP备2022030903号</a>
          //                   &nbsp;&nbsp;&nbsp;&nbsp;
          //                   <img src="img/beian.png" style="width: 18px; height: 20px;"> &nbsp;
          //                   <a href="https://beian.mps.gov.cn/#/query/webSearch?code=13010902000412" rel="noreferrer" target="_blank">冀公网安备13010902000412号</a>&nbsp;&nbsp;&nbsp;&nbsp;
          //                   <span>Built with Docusaurus.</span>
          //               </div>
          //             `
          //     },
          //   ],
          // },
        ],
        copyright: ` `,
        // copyright: `Built with Docusaurus. <br/>本网站由<a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" rel="noreferrer" target="_blank"> <img src="img/upyunlogo.png" style="width: 56px; height: 29px; vertical-align:middle;" /> </a> 提供CDN加速/云存储服务`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
          'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
};

export default config;
