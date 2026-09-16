# Create an empty stack
stack = []

# Push elements into the stack
stack.append(10)
stack.append(20)
stack.append(30)

print("Stack:", stack)

# Pop the top element
removed = stack.pop()

print("Removed element:", removed)
print("Stack after pop:", stack)

# Check the top element
if stack:
    print("Top element:", stack[-1])
else:
    print("Stack is empty")