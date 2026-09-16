# Here the user is suggesting a string as an input to reverse it
text = input("Enter a string: ")

# Now, by using slicing we are reversing the string as slicing gives an easy way to access the characters from the given string in a specific order.
reversed_text = text[::-1]

# Here we get the output as an reversed string 
print("Reversed string:", reversed_text)