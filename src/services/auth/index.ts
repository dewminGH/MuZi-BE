import * as AWS from 'aws-sdk';
import { IConfirmData, IUser, IUserData } from './types';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

/*configure region*/
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
    region: process.env.REGION,
});

/*create user attribute helper*/
const getAttributes = (user: IUser) => {
    return [
        new CognitoUserAttribute({ Name: 'email', Value: user.username }),
        new CognitoUserAttribute({ Name: 'name', Value: user.name }),
        new CognitoUserAttribute({ Name: 'profile', Value: user.profile }),
    ];
};

/*sign up helper*/
export const userSignUp = async (user: IUser) => {
    try {
        const authParams = {
            ClientId: process.env.CLIENT_ID,
            Password: user.password,
            Username: user.username,
            UserAttributes: getAttributes(user),
        };

        const authData = await cognitoIdentityServiceProvider.signUp(authParams).promise();
        return authData;
    } catch (error: any) {
        /* error logger */
        console.log('Error User Sign Up :', error);
        throw error;
    }
};

const getUserByEmail = async (username: string) => {
    try {
        const params = {
            UserPoolId: process.env.USER_POOL_ID,
            Filter: `email = \"${username}\"`,
        };
        const data = await cognitoIdentityServiceProvider.listUsers(params).promise();
        return data.Users[0];
    } catch (error: any) {
        /* error logger */
        console.log('Error Get User By Email :', error);
        throw error;
    }
};

/*confirm sign up helper*/
export const confirmUserRegister = async (confirmData: IConfirmData) => {
    try {
        const user = await getUserByEmail(confirmData.username);
        const params = {
            ClientId: process.env.CLIENT_ID,
            Username: user.Username,
            ConfirmationCode: confirmData.code,
        };
        if (user.UserStatus === 'UNCONFIRMED') {
            await cognitoIdentityServiceProvider.confirmSignUp(params).promise();
            return 'account activated';
        }
        return 'failed to activate account';
    } catch (error: any) {
        /* error logger */
        console.log('Error Confirm Register :', error);
        throw error;
    }
};

/*User SignIn user helper*/
export const userSignIn = async (userData: IUserData) => {
    try {
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: process.env.CLIENT_ID,
            AuthParameters: {
                USERNAME: userData.username,
                PASSWORD: userData.password,
            },
        };

        const data = await new Promise((resolve, reject) => {
            cognitoIdentityServiceProvider.initiateAuth(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data.AuthenticationResult);
                }
            });
        });
        return data;
    } catch (error: any) {
        /* error logger */
        console.log('Error User Sign In :', error);
        throw error;
    }
};

/*token refresh helper*/
export const userGetNewTokens = async (authorization: string) => {
    try {
        const params = {
            AuthFlow: 'REFRESH_TOKEN_AUTH',
            ClientId: process.env.CLIENT_ID,
            AuthParameters: {
                REFRESH_TOKEN: authorization,
            },
            ClientMetadata: {
                REFRESH_TOKEN: authorization,
            },
        };
        const data = await new Promise((resolve, reject) => {
            cognitoIdentityServiceProvider.initiateAuth(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
        return data;
    } catch (error: any) {
        /* error logger */
        console.log('Error Get New Tokens :', error);
        throw error;
    }
};

/*get current helper*/
export const getUserDetails = async (AccessToken: string) => {
    try {
        var params = {
            AccessToken,
        };
        const data = await new Promise((resolve, reject) => {
            cognitoIdentityServiceProvider.getUser(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
        return data;
    } catch (error: any) {
        /* error logger */
        console.log('Error Get User Details :', error);
        throw error;
    }
};

/*get delete helper*/
export const setDeleteUser = async (AccessToken: string) => {
    try {
        var params = {
            AccessToken,
        };
        const data = await new Promise((resolve, reject) => {
            cognitoIdentityServiceProvider.deleteUser(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
        return data;
    } catch (error: any) {
        /* error logger */
        console.log('Error Delete User :', error);
        throw error;
    }
};
