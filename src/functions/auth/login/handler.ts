import { userSignIn } from 'src/services/auth';

export const login = async (event) => {
    const requestBody = JSON.parse(event.body);

    try {
        const response = await userSignIn(requestBody);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: 'login successful',
                response: response,
            }),
        };
    } catch (error: any) {
        /* error logger */
        console.log('Error Login Handler :', error);
        return {
            statusCode: 401,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: 'check password and username',
            }),
        };
    }
};
