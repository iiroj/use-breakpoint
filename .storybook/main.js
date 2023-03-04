export default {
  addons: [
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/story\.tsx?$/],
        },
        loaderOptions: {
          parser: 'typescript',
        },
      },
    },
    {
      name: 'storybook-addon-swc',
    },
  ],
  core: {
    disableTelemetry: true,
    options: {
      fsCache: true,
      lazyCompilation: true,
    },
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
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
