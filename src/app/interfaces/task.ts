export interface Task {
    id?: string;
    idas: string;
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
    currentPhaseId: number;
    resultat: string;
    connaissance: string;
    partie: string;
    historics: Historic[];
    commentaires: Commentaire[];
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

export interface Commentaire {
    datec: Date;
    commentaire: string;
    auteur: string;
    etat: string;
    phasec: string;
}
