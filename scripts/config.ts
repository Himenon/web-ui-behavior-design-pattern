import * as path from "path";
import * as PerformanceReport from "@himenon/performance-report";

export const gitConfig = (authToken?: string): PerformanceReport.Git => ({
  owner: "Himenon",
  repo: "performance-datalake",
  branch: "main",
  baseUrl: "https://github.com",
  baseSsh: "git@github.com",
  protocol: "https",
  authToken,
  committer: {
    username: "github-actions[bot]",
    email: "actions@gihub.com",
  },
});

export const applicationRoot = path.join(__dirname, "../");
export const workingDirectory = path.join(applicationRoot, "node_modules/.cache/performance-report");
export const snapshot = {
  filesize: "filesize.json",
};

export const taskId = {
  pr: "performanceReportId:pull-request",
  merge: "performanceReportId:merge",
};
