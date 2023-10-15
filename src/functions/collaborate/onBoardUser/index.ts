import { getFunctionPath } from "src/util/path";

export default {
  handler: getFunctionPath("/handler.onBoardUser", __dirname, process.cwd()),
  events: [
    {
      http: {
        method: "post",
        path: "muzi/client/onboard-user",
        cors: {
          origin: "*",
          headers: ["Authorization"],
        },
      },
    },
  ],
};
