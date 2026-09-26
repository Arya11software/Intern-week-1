const apiUrl = process.env.EMPLOYEE_API_URL;
const employeeId = "1";

async function deleteEmployee() {
  const response = await fetch(`${apiUrl}/${employeeId}`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(`DELETE failed with HTTP ${response.status}`);
  }
  console.log(`Employee ${employeeId} deleted successfully.`);
}

if (!apiUrl) {
  console.log("DELETE example ready. Set EMPLOYEE_API_URL to a running employee REST API to send the request.");
} else {
  try {
    await deleteEmployee();
  } catch (error) {
    console.error("DELETE request failed:", error.message);
    process.exitCode = 1;
  }
}