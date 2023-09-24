import { setDeleteUser } from 'src/services/auth';

export const deleteUser = async (event) => {
    const requestBody = JSON.parse(event.body);

    try {
        const response = await setDeleteUser(requestBody);
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: 'account delete successful',
                response: response,
            }),
        };
    } catch (error: any) {
        /* error logger */
        console.log('Error Delete User Handler :', error);
        return {
            statusCode: 401,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: 'account deletion fail',
            }),
        };
    }
};
