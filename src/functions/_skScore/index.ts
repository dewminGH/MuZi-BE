import { AwsLambdaRuntime } from "@serverless/typescript";
import { getFunctionPath } from "src/util/path";

export default {
  handler: getFunctionPath("/handler.sklearnHandler", __dirname, process.cwd()),
  runtime: "python3.8" as AwsLambdaRuntime,
  package: {
    individually: true,
    exclude: ["**"],
    include: ["src/functions/_skScore/**"],
  },
  layers: [
    "arn:aws:lambda:ap-south-1:610128457601:layer:extra-layer:1",
    "arn:aws:lambda:ap-south-1:610128457601:layer:sk-deps:1",
    "arn:aws:lambda:ap-south-1:610128457601:layer:numpy:3",
  ],
  events: [
    {
      http: {
        method: "post",
        path: "muzi/sk/score-me",
        cors: {
          origin: "*",
        },
      },
    },
  ],
};
