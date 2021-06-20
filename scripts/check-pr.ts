import { createPerformanceReport } from "./check-performance";

createPerformanceReport({ isPullRequest: true, isLocal: false }).catch(error => {
  console.error(error);
  process.exit(1);
});
