// ==========================================
// JavaScript fetch() and REST API
// ==========================================


// ==========================================
// 1. Fetch data from an API
// ==========================================

// We will use a public test API.

async function fetchUsers() {

    try {

        console.log("Fetching users...");

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );


        // Check whether the HTTP request
        // was successful.

        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );
        }


        // Convert the response body
        // from JSON into JavaScript data.

        const users = await response.json();


        console.log("\nUsers received:");
        console.log(users);


        // Display only user names

        console.log("\nUser Names:");

        users.forEach(user => {

            console.log(user.name);

        });

    } catch (error) {

        console.log(
            "Failed to fetch users:",
            error.message
        );
    }
}


// Call the function

fetchUsers();