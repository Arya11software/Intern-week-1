console.log("A function declaration can be called before its definition:", describeDay());

function describeDay() {
  return "Day 5 is JavaScript.";
}

console.log("var is hoisted and initialized as:", lessonName);
var lessonName = "Modern JavaScript";
console.log("After assignment:", lessonName);

// let and const are also hoisted, but cannot be used before their declaration.