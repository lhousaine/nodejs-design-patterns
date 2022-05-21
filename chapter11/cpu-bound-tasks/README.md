# CPU BOund Tasks:
CPU-bound: It is a synchronous task that takes a long time to complete and that never gives back the control to the event loop until it has finished.
- With long time request, this block all incoming requests, until the synchronous task fished.

# SOlutions:
***Interleaving with setImmediate***:
By Applying This solution, any pending I/O can still be processed by the event loop in those intervals in which the long-running algorithm yields the CPU. A simple way to achieve this is to schedule the next step of the algorithm to run after any pending I/O requests.
***Using external processes***:

***Using worker threads***:
Worker threads are essentially threads that, by default, don't share anything with the
main application thread; they run within their own V8 instance, with an independent
Node.js runtime and event loop. Communication with the main thread is possible
thanks to message-based communication channels, the transfer of ArrayBuffer
objects, and the use of SharedArrayBuffer objects whose synchronization is managed
by the user (usually with the help of Atomics ).

# WILD:
- workerpool ( nodejsdp.link/workerpool ). 
- piscina( nodejsdp.link/piscina )