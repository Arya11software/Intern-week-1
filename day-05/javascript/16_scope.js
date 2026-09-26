const officeName = "North Office";

function showEmployeeScope() {
  const employeeName = "Rahul";
  console.log("Inside function:", employeeName, "works at", officeName);
}

showEmployeeScope();

if (true) {
  const blockMessage = "This const belongs to the if block.";
  console.log(blockMessage);
}

console.log("Outside the function, the global value is still available:", officeName);