import { EOL } from "os";
import * as path from "path";
import * as PerformanceReport from "@himenon/performance-report";
import * as GitHubActions from "./actions";
import * as Config from "./config";
import { setEnv, getEnv } from "./env";
const pkg = require("../package.json");

const generateHideComment = (value: string): string => `<!-- ${value} -->`;

export interface Option {
  isPullRequest: boolean;
  isLocal: boolean;
}

export const createPerformanceReport = async ({ isPullRequest, isLocal }: Option): Promise<void> => {
  if (!isLocal) {
    setEnv({ isPullRequest });
  }
  const { baseRef, datalakeGitHubToken } = getEnv();
  const taskId = isPullRequest ? Config.taskId.pr : Config.taskId.merge;
  const gitHubActions = GitHubActions.create();
  const meta = gitHubActions.generateMeta();

  const option: PerformanceReport.Option = {
    snapshot: {
      minimize: true,
    },
    filesize: {
      applicationRoot: Config.applicationRoot,
    },
    exectime: {
      averageList: [2, "all"],
    },
  };

  const query: PerformanceReport.Filesize.Repository.Query = {
    git: {
      base: {
        ref: baseRef,
      },
    },
  };

  const filesize: PerformanceReport.Filesize.InitialParams = {
    snapshot: {
      filename: path.join(Config.workingDirectory, pkg.name, Config.snapshot.filesize),
      query,
    },
    meta,
    groups: [
      {
        name: `${pkg.name}-cjs`,
        version: `${pkg.version}`,
        items: {
          "app.js": {
            absolutePath: path.join(Config.applicationRoot, "dist/js/app.js"),
          },
          "essential.js": {
            absolutePath: path.join(Config.applicationRoot, "dist/js/essential.js"),
          },
          "style.js": {
            absolutePath: path.join(Config.applicationRoot, "dist/js/style.js"),
          },
          "vendor.js": {
            absolutePath: path.join(Config.applicationRoot, "dist/js/vendor.js"),
          },
        },
      },
    ],
  };

  const config: PerformanceReport.Config = {
    reporter: {
      filesize,
    },
    git: Config.gitConfig(datalakeGitHubToken),
    applicationRoot: Config.applicationRoot,
    workingDirectory: Config.workingDirectory,
  };

  const report = await PerformanceReport.generate(config, option);

  if (isPullRequest) {
    const text = [report.markdown.exectime, report.markdown.filesize, generateHideComment(taskId)].join(EOL + EOL);
    await gitHubActions.createOrUpdateComment(text, taskId);
  }

  if (!isPullRequest && !isLocal) {
    await report.sync();
  }

  if (!isLocal) {
    report.clearWorkingDirectory();
  }
};
