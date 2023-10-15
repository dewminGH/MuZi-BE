import { getFunctionPath } from "src/util/path";

export default {
  handler: getFunctionPath("/handler.confirmSignUp", __dirname, process.cwd()),
  events: [
    {
      http: {
        method: "post",
        path: "muzi/auth/signup/confirm",
        cors: {
          origin: "*",
        },
      },
    },
  ],
};
