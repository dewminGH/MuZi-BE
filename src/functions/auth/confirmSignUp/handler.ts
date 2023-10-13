import { confirmUserRegister } from 'src/services/auth';

export const confirmSignUp = async (event) => {
    const requestBody = JSON.parse(event.body);

    try {
        const response = await confirmUserRegister(requestBody);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: 'confirmation successful',
                response,
                error: null,
            }),
        };
    } catch (error: any) {
        /* error logger */
        console.log('Error Confirm register Handler :', error);
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: 'confirmation fail',
                response: null,
                error,
            }),
        };
    }
};
