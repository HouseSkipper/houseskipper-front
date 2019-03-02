export interface Task {
    id?: string;
    nom: string;
    username: string;
    residence: string;
    partiesExacte: PartieExacte[];
    description: string;
    type: string;
    typeSecondaire: TypeSecondaire[];
    start_date: Date;
    status: string;
    resultat: string;
    connaissance: string;
    partie: string;
}
export interface PartieExacte {
    local: string;
}

export interface TypeSecondaire {
    type: string;
}
