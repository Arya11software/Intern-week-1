function createCounter() {
  let count = 0;

  return function increment() {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log("First count:", counter());
console.log("Second count:", counter());