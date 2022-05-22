import astroPlugin from './plugin.js';

export default () => {
  return {
    name: 'astro-integration',
    hooks: {
      'astro:config:setup': (setup) => {
        setup.command = 'dev';
        setup.updateConfig({
          vite: {
            plugins: [astroPlugin()],
            ssr: {
              external: ['astro'],
            },
          },
        });
      },
    },
  };
};
