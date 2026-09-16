# the code asks user to give an input string 
text = input("Enter a string: ")

# here we are slicing the given string to give an easy way to access the characters and understand better 
reversed_text = text[::-1]

# Now we are comparing both the original string and reversed string to check whether both of them are same or not. If it is then the string is "Palindrome" otherwise it is "Not a Palindrome"
if text == reversed_text:
    print("It is a palindrome")
else:
    print("It is not a palindrome")