function parseEmployeeJson(jsonText) {
  try {
    const employee = JSON.parse(jsonText);
    if (!employee.name) {
      throw new Error("Employee name is required.");
    }
    console.log("Employee loaded:", employee.name);
  } catch (error) {
    console.log("Handled error:", error.message);
  } finally {
    console.log("Finished trying to read the employee record.");
  }
}

parseEmployeeJson('{"name":"Maya"}');
parseEmployeeJson("not valid JSON");
parseEmployeeJson('{"department":"IT"}');