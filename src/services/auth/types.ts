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
