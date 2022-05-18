import{db} from './db.js';

db.connect();
db.query('hello world query');