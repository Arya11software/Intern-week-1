function calculateAnnualSalary(monthlySalary, bonus) {
  return monthlySalary * 12 + bonus;
}

const annualSalary = calculateAnnualSalary(4000, 2500);
console.log("Annual salary including bonus:", annualSalary);