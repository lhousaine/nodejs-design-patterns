const myModule = (() => {
  const author='lhoussaine';
  const privateAuthor = () => {
    console.log(author);
  }
  const privateNames = ['lhoussaine', 'lahcen']
  const exported = {
    publicFoo: () => {
      console.log('public Foo');
    },
    publicBar: () => {
      console.log('public Bar');
    }
  }
  return exported
 })() // once the parenthesis here are parsed, the function
  // will be invoked, 
  // this function is referensed as IIFE, and it is used to create a private scope, exporting only the parts that are meant to be public.
 console.log(myModule)
 console.log(myModule.privateAuthor, myModule.privateNames)