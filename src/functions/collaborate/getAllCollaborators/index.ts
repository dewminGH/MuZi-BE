import { getFunctionPath } from "src/util/path";

export default {
  handler: getFunctionPath(
    "/handler.getAllCollaborators",
    __dirname,
    process.cwd(),
  ),
  events: [
    {
      http: {
        method: "get",
        path: "muzi/client/get-collaborators",
        cors: {
          origin: "*",
          headers: ["Authorization"],
        },
      },
    },
  ],
};
