export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'Safari >= 3',
        'iOS >= 8',
        'not dead'
      ]
    },
  },
}