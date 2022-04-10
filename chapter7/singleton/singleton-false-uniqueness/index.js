import { getDbInstance as getDbFromA } from 'package-a'
import { getDbInstance as getDbFromB } from 'package-b'

const isSame = getDbFromA() === getDbFromB()
console.log('Is the db instance in package-a the same ' +
  `as package-b? ${isSame ? 'YES' : 'NO'}`);

// package-a and package-b will actually load two different instances of the dbInstance object 
// because the mydb module will resolve to a different directory, depending on the package it 
// is required from.