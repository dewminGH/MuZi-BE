import { setDeleteUser } from 'src/services/auth';

export const deleteUser = async (event) => {
    const authorization = event.headers.Authorization;

    if (authorization) {
        try {
            const response = await setDeleteUser(authorization);
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    message: 'account delete successful',
                    response,
                    error: null,
                }),
            };
        } catch (error: any) {
            /* error logger */
            console.log('Error Delete User Handler :', error);
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    message: 'account delete failed',
                    response: null,
                    error,
                }),
            };
        }
    } else {
        return {
            statusCode: 401,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: 'required header not provided',
                response: null,
                error: 'required header not provided',
            }),
        };
    }
};
