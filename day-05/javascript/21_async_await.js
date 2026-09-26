function loadDepartment() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Engineering"), 100);
  });
}

async function showDepartment() {
  const department = await loadDepartment();
  console.log("Loaded with async/await:", department);
}

await showDepartment();