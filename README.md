For Testing import the file which i sended along with this git sa postman:


Synchronous Communication (Order Service → Inventory Service)
In Part 2, the Order Service makes a synchronous HTTP request to the Inventory Service to check if the requested product is available in stock. This interaction is synchronous because the Order Service waits for a response from the Inventory Service before proceeding with the rest of the order logic.

If the Inventory Service is slow or unavailable, the Order Service request will hang until it times out or fails. This was observed by temporarily stopping or delaying the Inventory Service, which caused the Order Service to return an error to the client or become unresponsive.

Pros:

Simple to implement and debug.

Immediate response and decision-making.

Cons:

Fragile: if the Inventory Service is slow or down, the whole order process fails.

Tight coupling reduces flexibility and fault tolerance.

Asynchronous Communication (Order Service → Notification Service)
In Part 3, the Order Service adds a task to a file-based queue (notification_queue.log) instead of directly contacting the Notification Service. This task is picked up later by a separate worker (worker.js) in the Notification Service.

If the Notification Service is not running or is slow, the original client request to the Order Service is unaffected — it still succeeds with a status indicating that the notification has been queued. This is different from the synchronous case where the unavailability of the other service directly impacts the request.

Pros:

Increases fault tolerance and responsiveness.

Decouples the services, enabling independent scaling and error recovery.

Cons:

More complex to implement and monitor.

Delay in notification delivery if the worker is down or the queue is large.

Coupling
The synchronous approach resulted in tighter coupling between Order Service and Inventory Service, since the order creation logic directly depends on the immediate response from the inventory system. In contrast, the asynchronous mechanism used for notifications allowed the services to operate more independently.

Resilience
The asynchronous approach is generally more resilient to temporary failures. If the Notification Service is down, the order can still be processed, and the notification will be sent when the worker is back online. In the synchronous setup, if the Inventory Service fails, the whole request fails, making it less resilient.

Complexity
The asynchronous queue mechanism adds more implementation complexity compared to the synchronous approach. It required:

A queuing mechanism (e.g., writing to notification_queue.log).

A background worker (worker.js) to poll and process the queue.

Logging and error-handling mechanisms in the worker.

The synchronous implementation simply involves an HTTP call and is easier to reason about during development but harder to scale or make fault-tolerant.

