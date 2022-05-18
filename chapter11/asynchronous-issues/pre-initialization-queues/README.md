# WILD:
- The pattern we just presented is used by many database drivers and ORM libraries.
The most notable is Mongoose ( nodejsdp.link/mongoose ), which is an ORM
for MongoDB. With Mongoose, it's not necessary to wait for the database connection
to open in order to be able to send queries. This is because each operation is queued
and then executed later when the connection with the database is fully established,
exactly as we've described in this section. This is clearly a must for any API that
wants to provide a good developer experience (DX).

- Similarly, the pg package ( nodejsdp.link/pg ), which is a client for the PostgreSQL
database, leverages pre-initialization queues, but in a slightly different fashion.
pg queues every query, regardless of the initialization status of the database, and
then immediately tries to execute all the commands in the queue. Take a look at the
relevant code line at nodejsdp.link/pg-queue .