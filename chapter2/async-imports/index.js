// main.js
const SUPPORTED_LANGUAGES = ['el', 'en', 'es', 'it', 'pl'] // (1)
const selectedLanguage = process.argv[2] // (2)

if (!SUPPORTED_LANGUAGES.includes(selectedLanguage)) { // (3)
  console.error('The specified language is not supported')
  process.exit(1) 
}
const translationModule = `./i18n/strings-${selectedLanguage}.js` // (4)
import(translationModule) // (5) => to trigger the dynamic import of the module based on user language.
 .then((strings) => { // (6)
 console.log(strings.HELLO)
 })