// ==========================================
// JavaScript Promises
// ==========================================

// A Promise represents an operation that
// will finish in the future.
//
// A Promise can have three states:
//
// 1. Pending
// 2. Fulfilled
// 3. Rejected


// ==========================================
// 1. Creating a Promise
// ==========================================

const employeePromise = new Promise((resolve, reject) => {

    const employeeFound = true;

    if (employeeFound) {

        resolve("Employee found successfully");

    } else {

        reject("Employee not found");

    }
});


// ==========================================
// 2. Handling the Promise
// ==========================================

employeePromise
    .then((message) => {

        console.log("Success:", message);

    })
    .catch((error) => {

        console.log("Error:", error);

    });


// ==========================================
// 3. Simulating an API Request
// ==========================================

function fetchEmployee() {

    return new Promise((resolve) => {

        // setTimeout simulates a delayed
        // operation such as an API request.

        setTimeout(() => {

            const employee = {
                id: 101,
                name: "Rahul",
                department: "IT"
            };

            resolve(employee);

        }, 2000);
    });
}


// Call the function

console.log("\nFetching employee...");

fetchEmployee()
    .then((employee) => {

        console.log("Employee received:");
        console.log(employee);

    })
    .catch((error) => {

        console.log("Error:", error);

    });


// This executes before the Promise finishes
console.log("Program continues running...");