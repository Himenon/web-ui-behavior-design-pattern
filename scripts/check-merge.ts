import { createPerformanceReport } from "./check-performance";

createPerformanceReport({ isPullRequest: false, isLocal: false }).catch(error => {
  console.error(error);
  process.exit(1);
});
