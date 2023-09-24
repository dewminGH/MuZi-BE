import { getFunctionPath } from 'src/util/path';

export default {
    handler: getFunctionPath('/handler.register', __dirname, process.cwd()),
    events: [
        {
            http: {
                method: 'post',
                path: 'register',
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
