export interface User {
    id?: string;
    photo?: string;
    username: string;
    firstname: string;
    lastname: string;
    password?: string;
    telephone?: string;
    role?: string;
    token?: string;
}

export interface Skill {
    id?: string;
    userId?: string;
    type: string;
    nb_works?: string;
}
