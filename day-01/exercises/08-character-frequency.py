# Take a string input
text = input("Enter a string: ")

# Create an empty dictionary
frequency = {}

# Count each character
for character in text:
    if character in frequency:
        frequency[character] += 1
    else:
        frequency[character] = 1

# Display the frequency
print("Character frequency:", frequency)