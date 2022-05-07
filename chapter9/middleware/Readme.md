# MiddleWare
the Middleware pattern allows us to obtain a plugin infrastructure with incredibly little effort, providing an unobtrusive way to extend a system with new filters and handlers.

# Wild:
***Express***: is the most notable example of the Middleware pattern out there.
***Koa( nodejsdp.link/koa )***: is known as the successor of Express. It was
created by the same team behind Express and it shares with it its philosophy
and main design principles. Koa's middleware is slightly different than that
of Express since it uses modern programming techniques such as async/
await instead of callbacks.

***Middy ( nodejsdp.link/middy )***:  is a classic example of the Middleware pattern
applied to something different than a web framework. Middy is, in fact, a
middleware engine for AWS Lambda functions. 