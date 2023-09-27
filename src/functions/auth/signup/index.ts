import { getFunctionPath } from 'src/util/path';

export default {
    handler: getFunctionPath('/handler.signUp', __dirname, process.cwd()),
    events: [
        {
            http: {
                method: 'post',
                path: 'muzi/auth/signup',
                cors: {
                    origin: '*',
                },
            },
        },
    ],
};
