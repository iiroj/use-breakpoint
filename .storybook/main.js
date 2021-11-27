module.exports = {
  addons: ['@storybook/addon-storysource'],
  core: {
    builder: 'webpack5',
  },
  stories: ['../story.tsx'],
  webpack: (config) => {
    config.module.rules.unshift(
      {
        test: /\.(j|t)sx?$/,
        loader: 'swc-loader',
      },
      {
        test: /story\.tsx?$/,
        loader: require.resolve('@storybook/source-loader'),
        options: { parser: 'typescript' },
        enforce: 'pre',
      }
    )

    config.resolve.extensions.unshift('.ts', '.tsx')

    return config
  },
}
