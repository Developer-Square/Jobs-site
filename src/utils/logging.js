export function logToConsole(logs) {
  if (process.env.NODE_ENV !== "production") {
    console.log(logs);
  }
}
