import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  core: {
    disableTelemetry: true,
    enableCrashReports: false,
  },

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  stories: ['../story.tsx'],
}

export default config
