# CPU BOund Tasks:
CPU-bound: It is a synchronous task that takes a long time to complete and that never gives back the control to the event loop until it has finished.
- With long time request, this block all incoming requests, until the synchronous task fished.

# SOlutions:
***Interleaving with setImmediate***:
By Applying This solution, any pending I/O can still be processed by the event loop in those intervals in which the long-running algorithm yields the CPU. A simple way to achieve this is to schedule the next step of the algorithm to run after any pending I/O requests.
***Using external processes***: