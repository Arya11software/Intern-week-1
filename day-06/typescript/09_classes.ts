class Employee {
  constructor(
    public name: string,
    private salary: number,
  ) {}

  describe(): string {
    return `${this.name} earns ₹${this.salary.toLocaleString("en-IN")} per year.`;
  }
}

const employee = new Employee("Sana Khan", 46000);
console.log(employee.describe());

export {};