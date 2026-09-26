function checkEmployeeRecord(shouldSucceed) {
  return new Promise((resolve, reject) => {
    if (shouldSucceed) {
      resolve("Employee record loaded.");
    } else {
      reject(new Error("Employee record could not be loaded."));
    }
  });
}

const successExample = checkEmployeeRecord(true)
  .then((message) => console.log("Resolved:", message));
const failureExample = checkEmployeeRecord(false)
  .catch((error) => console.log("Rejected:", error.message));

await Promise.all([successExample, failureExample]);