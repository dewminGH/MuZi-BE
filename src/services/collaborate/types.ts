export interface IOnboardUser {
    id: string;
    email: string;
    f_name: string;
    l_name: string;
    date: string;
    country: string;
    languages: string[];
    bio: string;
    talents: string[];
    on_board: boolean;
}
