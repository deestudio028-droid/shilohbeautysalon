// scratch/test-date-validation.js
// Automated verification for the past date booking validation logic.

const getLocalDateStr = (d = new Date()) => {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const validateDate = (preferredDate) => {
  const today = getLocalDateStr();
  if (preferredDate < today) {
    throw new Error("Appointments can only be booked for today or future dates.");
  }
  return "Allowed";
};

// Generate test dates
const today = new Date();
const todayStr = getLocalDateStr(today);

const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const tomorrowStr = getLocalDateStr(tomorrow);

const nextMonth = new Date();
nextMonth.setMonth(today.getMonth() + 1);
const nextMonthStr = getLocalDateStr(nextMonth);

const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
const yesterdayStr = getLocalDateStr(yesterday);

const lastWeek = new Date();
lastWeek.setDate(today.getDate() - 7);
const lastWeekStr = getLocalDateStr(lastWeek);

const lastMonth = new Date();
lastMonth.setMonth(today.getMonth() - 1);
const lastMonthStr = getLocalDateStr(lastMonth);

const testCases = [
  { name: "Today", date: todayStr, expected: "Allowed" },
  { name: "Tomorrow", date: tomorrowStr, expected: "Allowed" },
  { name: "Next Month", date: nextMonthStr, expected: "Allowed" },
  { name: "Yesterday", date: yesterdayStr, expected: "Blocked" },
  { name: "Last Week", date: lastWeekStr, expected: "Blocked" },
  { name: "Last Month", date: lastMonthStr, expected: "Blocked" },
];

console.log("=== Running Date Validation Test Cases ===");
let allPassed = true;

testCases.forEach((tc) => {
  try {
    const result = validateDate(tc.date);
    if (tc.expected === "Allowed" && result === "Allowed") {
      console.log(`✓ ${tc.name} (${tc.date}) -> ${result} (Expected: Allowed)`);
    } else {
      console.log(`✗ ${tc.name} (${tc.date}) -> ${result} (Expected: ${tc.expected})`);
      allPassed = false;
    }
  } catch (error) {
    if (tc.expected === "Blocked") {
      console.log(`✓ ${tc.name} (${tc.date}) -> Blocked: "${error.message}" (Expected: Blocked)`);
    } else {
      console.log(`✗ ${tc.name} (${tc.date}) -> Threw error: "${error.message}" (Expected: Allowed)`);
      allPassed = false;
    }
  }
});

console.log("\n=== Test Summary ===");
if (allPassed) {
  console.log("SUCCESS: All date validation test cases passed!");
  process.exit(0);
} else {
  console.log("FAILURE: Some test cases failed.");
  process.exit(1);
}
