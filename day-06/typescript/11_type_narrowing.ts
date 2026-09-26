function formatId(id: number | string): string {
  if (typeof id === "number") {
    return `Employee #${id}`;
  }

  return `Employee ${id.toUpperCase()}`;
}

console.log(formatId(7));
console.log(formatId("emp-8"));

export {};