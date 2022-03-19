import MyLogger from './logger.js'; // we could give any name of our choice to this default expoted class
// import { default } from './logger.js => not allowed
const logger = new MyLogger('info')
logger.log('Hello World')