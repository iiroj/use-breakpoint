module.exports = {
  addons: ['@storybook/addon-storysource'],
  stories: ['../story.tsx'],
  webpack: (config) => {
    config.module.rules.unshift(
      {
        test: /\.(j|t)sx?$/,
        loader: 'swc-loader',
      },
      {
        test: /story\.tsx?$/,
        loader: '@storybook/source-loader',
        options: { parser: 'typescript' },
        enforce: 'pre',
      }
    )

    config.resolve.extensions.unshift('.ts', '.tsx')

    return config
  },
}
