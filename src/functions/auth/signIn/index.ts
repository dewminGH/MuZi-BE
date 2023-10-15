import { getFunctionPath } from "src/util/path";

export default {
  handler: getFunctionPath("/handler.signIn", __dirname, process.cwd()),
  events: [
    {
      http: {
        method: "post",
        path: "muzi/auth/signin",
        cors: {
          origin: "*",
        },
      },
    },
  ],
};
