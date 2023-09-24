import type { AWS } from '@serverless/typescript';
import * as functions from '@functions/index';

const serverlessConfiguration: AWS = {
    service: 'aws-serverless-typescript-api',
    frameworkVersion: '3',
    plugins: ['serverless-esbuild'],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },
    },
    // import the function via paths
    functions: { ...functions },
    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            target: 'node14',
            define: { 'require.resolve': undefined },
            platform: 'node',
            concurrency: 10,
        },
    },
};

module.exports = serverlessConfiguration;
