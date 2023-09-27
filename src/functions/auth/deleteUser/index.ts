import { getFunctionPath } from 'src/util/path';

export default {
    handler: getFunctionPath('/handler.deleteUser', __dirname, process.cwd()),
    events: [
        {
            http: {
                method: 'post',
                path: 'muzi/auth/deleteUser',
                cors: {
                    origin: '*',
                    headers: ['Authorization'],
                },
            },
        },
    ],
};
