function greetEmployee(name, onGreetingComplete) {
  console.log(`Hello, ${name}!`);
  onGreetingComplete();
}

greetEmployee("Maya", () => {
  console.log("The greeting callback ran after the greeting.");
});