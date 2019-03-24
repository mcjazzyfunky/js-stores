'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/js-stores.core.cjs.production.js')
} else {
  module.exports = require('./dist/js-stores.core.cjs.development.js')
}
