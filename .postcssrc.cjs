let autoprefixer = require('autoprefixer')
let mixins = require('postcss-mixins')
let importPlugin = require('postcss-import')
let presetEnv = require('postcss-preset-env')
module.exports = {
  plugins: [autoprefixer, mixins, importPlugin, presetEnv]
}
