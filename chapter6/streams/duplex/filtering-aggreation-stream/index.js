import { createReadStream } from 'fs';
import { Parser } from 'csv-parse';
import { FilterByCountry } from './filter-by-country.js';
import { SumProfit } from './sum-profit.js';

const csvParser = new Parser({ columns: true });

createReadStream('data.csv') // (1)
    .pipe(csvParser) // (2)
    .pipe(new FilterByCountry('Italy')) // (3)
    .pipe(new SumProfit()) // (4)
    .pipe(process.stdout); // (5)