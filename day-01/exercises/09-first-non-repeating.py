# Take a string input
text = input("Enter a string: ")

# Create a dictionary to store character frequencies
frequency = {}

# Count each character
for character in text:
    if character in frequency:
        frequency[character] += 1
    else:
        frequency[character] = 1

# Find the first character that appears only once
for character in text:
    if frequency[character] == 1:
        print("First non-repeating character:", character)
        break
else:
    print("No non-repeating character found")