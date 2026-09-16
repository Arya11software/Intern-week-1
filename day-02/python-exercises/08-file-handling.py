# Write data to a file
with open("employees.txt", "w") as file:
    file.write("Arya, IT, 50000\n")
    file.write("Rahul, HR, 45000\n")
    file.write("Sneha, Finance, 55000\n")

print("Employee data written successfully.")


# Read data from the file
with open("employees.txt", "r") as file:
    data = file.read()

print("\nEmployee data:")
print(data)
