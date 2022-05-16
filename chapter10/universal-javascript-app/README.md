# 🚀 Welcome to your new awesome project!

This project has been created using **webpack-cli**, you can now run

```
npm run build
```

or

```
yarn build
```

to bundle your application


## Universal data retrieval
- Server-side rendering is a synchronous operation and this makes it tricky to preload
all the necessary data effectively. Being able to avoid the problems we underlined at
the end of the previous section is not as straightforward as you might expect.

- The root of the problem is that we are keeping our routing logic within the React
application, so, on the server, we cannot know which page we are actually going
to render before we call renderToString() . This is why the server cannot establish
whether we need to preload some data for a particular page.

- Universal data retrieval is still quite a nebulous area in React, and different
frameworks or libraries that facilitate React server-side rendering have come up with
different solutions to this problem.

- As of today, the two patterns that we believe are worth discussing are ```two-pass rendering``` 
And ```async pages```. These two techniques have different ways of figuring
out which data needs to be preloaded. In both cases, once the data is fully loaded on
the server, the generated HTML page will provide an inline script block to inject all
the data into the global scope (the window object) so that when the application runs on
the browser, the same data already loaded on the server won't have to be reloaded
from the client.