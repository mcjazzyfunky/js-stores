'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('../dist/js-stores.react.cjs.production.js')
} else {
  module.exports = require('../dist/js-stores.react.cjs.development.js')
}
