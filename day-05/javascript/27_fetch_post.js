const apiUrl = process.env.EMPLOYEE_API_URL;
const newEmployee = {
  name: "Leena Shah",
  email: "leena@example.com",
  department: "Finance",
};

async function addEmployee() {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEmployee),
  });
  if (!response.ok) {
    throw new Error(`POST failed with HTTP ${response.status}`);
  }
  return response.json();
}

if (!apiUrl) {
  console.log("POST example ready. Set EMPLOYEE_API_URL to a running employee REST API to send the request.");
} else {
  try {
    console.log("Created employee:", await addEmployee());
  } catch (error) {
    console.error("POST request failed:", error.message);
    process.exitCode = 1;
  }
}