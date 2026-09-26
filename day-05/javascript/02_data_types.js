const values = {
  text: "JavaScript",
  count: 5,
  isLearning: true,
  emptyValue: null,
  notAssigned: undefined,
  topics: ["arrays", "objects"],
  learner: { name: "Maya" },
};

for (const [label, value] of Object.entries(values)) {
  console.log(`${label}:`, value, `| typeof: ${typeof value}`);
}
console.log("Arrays are objects according to typeof:", typeof values.topics);