function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}

console.log("First name:", firstItem(["Maya", "Rahul"]));
console.log("First salary:", firstItem([62000, 58000]));

export {};