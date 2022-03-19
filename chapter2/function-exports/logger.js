module.exports = (message) => {
  console.log(`info: ${message}`)
}

module.exports.verbose = (message) => {  // this shows how we could extends the default defined module
  console.log(`verbose: ${message}`)
}
