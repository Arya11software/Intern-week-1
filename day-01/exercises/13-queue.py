# Create an empty queue
queue = []

# Add elements to the queue
queue.append(10)
queue.append(20)
queue.append(30)

print("Queue:", queue)

# Remove the first element
removed = queue.pop(0)

print("Removed element:", removed)
print("Queue after removal:", queue)

# Check the first element
if queue:
    print("Front element:", queue[0])
else:
    print("Queue is empty")