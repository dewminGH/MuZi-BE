export interface IUser {
    name: string;
    username: string;
    password: string;
    profile: string;
    phoneNumber?: string;
}

export interface IConfirmData {
    username: string;
    code: string;
}

export interface IUserData {
    username: string;
    password: string;
}

export interface IGetNewTokens {
    refreshToken: string;
}

export interface IGetUser {
    accessToken: string;
}

export interface IDeleteUser {
    accessToken: string;
}
