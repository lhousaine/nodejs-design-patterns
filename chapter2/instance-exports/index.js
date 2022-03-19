// main.js
const logger = require('./logger')
logger.log('This is an informational message')


require('./patcher')
const logger = require('./logger')
logger.customMessage()