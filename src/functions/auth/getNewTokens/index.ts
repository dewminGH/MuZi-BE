import { getFunctionPath } from 'src/util/path';

export default {
    handler: getFunctionPath('/handler.getNewTokens', __dirname, process.cwd()),
    events: [
        {
            http: {
                method: 'post',
                path: 'getNewTokens',
                cors: {
                    origin: '*',
                    headers: [
                        'Content-Type',
                        'X-Amz-Date',
                        'Authorization',
                        'X-Api-Key',
                        'X-Amz-Security-Token',
                        'X-Amz-User-Agent',
                    ],
                },
            },
        },
    ],
};
