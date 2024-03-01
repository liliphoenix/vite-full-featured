// let autoprefixer = require('autoprefixer')
// let mixins = require('postcss-mixins')
// let importPlugin = require('postcss-import')
// let presetEnv = require('postcss-preset-env')
// let tailwindCss = require('tailwindcss')
module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  },
  corePlugins: {
    // Remove Tailwind CSS's preflight style so it can use the antd's preflight instead (reset.css).
    preflight: false
  },
  important: '#app'
}
