const firstTeam = ["Maya", "Rahul"];
const fullTeam = [...firstTeam, "Asha"];
console.log("Original team:", firstTeam);
console.log("Copied team with one more member:", fullTeam);

const employee = { name: "Maya", department: "IT" };
const updatedEmployee = { ...employee, department: "Engineering" };
console.log("Updated copy:", updatedEmployee);

function calculateTotal(...numbers) {
  return numbers.reduce((total, number) => total + number, 0);
}
console.log("Rest parameters total:", calculateTotal(10, 20, 30));