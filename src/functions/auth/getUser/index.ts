import { getFunctionPath } from "src/util/path";

export default {
  handler: getFunctionPath("/handler.getUser", __dirname, process.cwd()),
  events: [
    {
      http: {
        method: "get",
        path: "muzi/auth/get-user",
        cors: {
          origin: "*",
          headers: ["Authorization"],
        },
      },
    },
  ],
};
