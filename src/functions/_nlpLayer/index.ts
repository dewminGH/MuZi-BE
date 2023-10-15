import { AwsLambdaRuntime } from "@serverless/typescript";
import { getFunctionPath } from "src/util/path";

export default {
  handler: getFunctionPath("/handler.nlpLayer", __dirname, process.cwd()),
  runtime: "python3.8" as AwsLambdaRuntime,
  package: {
    individually: true,
    exclude: ["**"],
    include: ["src/functions/_nlpLayer/**"],
  },
  layers: [
    "arn:aws:lambda:ap-south-1:610128457601:layer:extra-layer:1",
    "arn:aws:lambda:ap-south-1:610128457601:layer:nlp-layer:1",
  ],
  events: [
    {
      http: {
        method: "post",
        path: "muzi/nlp/recommend-me",
        cors: {
          origin: "*",
        },
      },
    },
  ],
};
