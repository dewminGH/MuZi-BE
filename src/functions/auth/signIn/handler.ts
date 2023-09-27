import { userSignIn } from 'src/services/auth';

export const signIn = async (event) => {
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
                response,
                error: null,
            }),
        };
    } catch (error: any) {
        /* error logger */
        console.log('Error Login Handler :', error);
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: 'check password and username',
                response: null,
                error,
            }),
        };
    }
};
