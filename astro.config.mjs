// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeWrapTables from './src/lib/rehype-wrap-tables.mjs';

export default defineConfig({
  site: 'https://bestcitiesinspain.com',
  trailingSlash: 'always',
  output: 'static',
  build: { format: 'directory', inlineStylesheets: 'always' },
  markdown: { processor: unified({ rehypePlugins: [rehypeWrapTables] }) },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/'),
    }),
  ],
});
