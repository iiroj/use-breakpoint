module.exports = {
  addons: [
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: { test: [/story\.tsx?$/] },
        loaderOptions: { parser: 'typescript' },
      },
    },
    {
      name: 'storybook-addon-swc',
    },
  ],
  core: {
    builder: 'webpack5',
    options: {
      fsCache: true,
      lazyCompilation: true,
    },
  },
  stories: ['../story.tsx'],
  webpackFinal: async (config) => {
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.js'],
      '.mjs': ['.mts', '.mjs'],
    }

    return config
  },
}
