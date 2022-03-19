// ./logger is another module
require('./logger').customMessage = function () {
  console.log('This is a new functionality')
}
// monkey patching => refers to the practice of modifying the existing objects at runtime to change or extend their behavior or to apply temporary fixes
// example: Nock (HTTP server mockin): it monkey patching the Node.js http module and by changing its behavior so that it will provide the mocked response rather than issuing a real HTTP request