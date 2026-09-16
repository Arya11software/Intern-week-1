# Take marks as input
marks = int(input("Enter your marks: "))

# Check the grade
if marks >= 90:
    print("Grade: A")
elif marks >= 75:
    print("Grade: B")
elif marks >= 60:
    print("Grade: C")
elif marks >= 40:
    print("Grade: D")
else:
    print("Grade: F")


# For loop
print("\nNumbers from 1 to 5:")

for number in range(1, 6):
    print(number)


# While loop
print("\nCountdown:")

count = 5

while count > 0:
    print(count)
    count -= 1

print("Done")