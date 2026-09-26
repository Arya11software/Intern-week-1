function greetWithFunction(name) {
  return `Hello, ${name}!`;
}

const greetWithArrow = (name) => `Hello, ${name}!`;

console.log("Function declaration:", greetWithFunction("Maya"));
console.log("Equivalent arrow function:", greetWithArrow("Maya"));