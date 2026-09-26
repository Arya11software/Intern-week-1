console.log("1. Synchronous: start");

setTimeout(() => console.log("3. Timer callback"), 0);
Promise.resolve().then(() => console.log("2. Promise callback (microtask)"));

console.log("1. Synchronous: end");