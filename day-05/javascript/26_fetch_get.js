const apiUrl = process.env.EMPLOYEE_API_URL;

async function getEmployees() {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`GET failed with HTTP ${response.status}`);
  }
  return response.json();
}

if (!apiUrl) {
  console.log("GET example ready. Set EMPLOYEE_API_URL to a running employee REST API to send the request.");
} else {
  try {
    console.log("Employees:", await getEmployees());
  } catch (error) {
    console.error("GET request failed:", error.message);
    process.exitCode = 1;
  }
}