# List
# Lists are ordered and can be changed
fruits = ["Apple", "Banana", "Mango"]

fruits.append("Orange")
print("List:", fruits)
print("First fruit:", fruits[0])


# Tuple
# Tuples are ordered but cannot be changed
coordinates = (10, 20)

print("Tuple:", coordinates)
print("X coordinate:", coordinates[0])


# Set
# Sets store unique values
numbers = {10, 20, 10, 30, 20}

print("Set:", numbers)

numbers.add(40)
print("Set after adding 40:", numbers)


# Dictionary
# Dictionaries store data as key-value pairs
student = {
    "name": "Arya",
    "age": 21,
    "course": "Computer Science"
}

print("Dictionary:", student)
print("Student name:", student["name"])

student["age"] = 22
print("Updated age:", student["age"])