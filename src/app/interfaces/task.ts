export interface Task {
    id?: string;
    nom: string;
    username: string;
    residence: string;
    partiesExacte: PartieExacte[];
    description: string;
    type: string;
    typeSecondaires: TypeSecondaire[];
    start_date: Date;
    status: Phase;
    currentPhase: string;
    resultat: string;
    connaissance: string;
    partie: string;
    historics: Historic[];
}
export interface PartieExacte {
    local: string;
}

export interface TypeSecondaire {
    type: string;
}

export interface Phase {
    phaseName: string;
}

export interface Historic {
    date: Date;
    currentSubPhase: string;
}
