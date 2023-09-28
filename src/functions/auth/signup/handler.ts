import { userSignUp } from 'src/services/auth';

export const signUp = async (event) => {
    const requestBody = JSON.parse(event.body);

    try {
        const response = await userSignUp(requestBody);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: 'authentication successful',
                response: response,
                error: null,
            }),
        };
    } catch (error: any) {
        /* error logger */
        console.log('Error Register Handler :', error);
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: 'authentication failed',
                response: null,
                error,
            }),
        };
    }
};
