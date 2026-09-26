const apiUrl = process.env.EMPLOYEE_API_URL;
const employeeId = "1";
const updates = { department: "Engineering" };

async function updateEmployee() {
  const response = await fetch(`${apiUrl}/${employeeId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!response.ok) {
    throw new Error(`PUT failed with HTTP ${response.status}`);
  }
  return response.json();
}

if (!apiUrl) {
  console.log("PUT example ready. Set EMPLOYEE_API_URL to a running employee REST API to send the request.");
} else {
  try {
    console.log("Updated employee:", await updateEmployee());
  } catch (error) {
    console.error("PUT request failed:", error.message);
    process.exitCode = 1;
  }
}