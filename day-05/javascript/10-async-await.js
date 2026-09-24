// ==========================================
// JavaScript async / await
// ==========================================


// ==========================================
// 1. Function returning a Promise
// ==========================================

function fetchEmployee() {

    return new Promise((resolve) => {

        setTimeout(() => {

            const employee = {
                id: 101,
                name: "Rahul",
                department: "IT",
                salary: 400000
            };

            resolve(employee);

        }, 2000);
    });
}


// ==========================================
// 2. Async Function
// ==========================================

// An async function always works with
// asynchronous operations.

async function displayEmployee() {

    console.log("Fetching employee...");


    // await pauses this function until
    // the Promise is completed.

    const employee = await fetchEmployee();


    console.log("Employee received:");
    console.log(employee);
}


// Call the async function

displayEmployee();


// This runs while the asynchronous operation
// is waiting.

console.log("Program continues...");