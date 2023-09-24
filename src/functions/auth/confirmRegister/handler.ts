import { confirmUserRegister } from 'src/services/auth';

export const confirmRegister = async (event) => {
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
                response: response,
            }),
        };
    } catch (error: any) {
        /* error logger */
        console.log('Error Confirm register Handler :', error);
        return {
            statusCode: 401,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: 'confirmation fail',
            }),
        };
    }
};
