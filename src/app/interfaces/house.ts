export interface House {
    id?: string;
    houseName: string;
    houseType: string;
    residence: string;
    exterieur: string;
    address: string;
    posatlCode: number;
    city: string;
    pays: string;
    outsideSpace: number;
    constructionYear: number;
    standardType: string;
    rooms: Room[];
    revetementExterieur: string;
    surfaceToiture: number;
    revetementToiture: string;
    classeEnergetique: string;
    gaz: string;
    electricite: string;
    panneauxPhoto: string;
    eolienne: string;
    surfaceExterieurAvant: number;
    surfaceExterieurDroit: number;
    surfaceExterieurGauche: number;
    surfaceExterieurArriere: number;
    comment: string;
}

export interface Room {
    id?: string;
    roomName: string;
    space: string;
    nbFenetre: number;
    nbPorteFenetre: number;
    typeChauffage: string;
    nbRadiateur: number;
    volet: string;
    nbVolet: number;
}
