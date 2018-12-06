export interface User {
    id?: string;
    photo?: string;
    email: string;
    prenom: string;
    nom: string;
    password?: string;
    token?: string;
}

export interface Skill {
    id?: string;
    userId?: string;
    type: string;
    nb_Works?: string;
}
