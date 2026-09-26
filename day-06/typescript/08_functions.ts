function calculateAnnualSalary(monthlySalary: number): number {
  return monthlySalary * 12;
}

const formatSalary = (salary: number): string => `₹${salary.toLocaleString("en-IN")}`;

console.log("Annual salary:", formatSalary(calculateAnnualSalary(50000)));

export {};