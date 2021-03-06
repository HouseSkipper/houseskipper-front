export interface House {
    id?: string;
    houseName: string;
    houseType: string;
    residence: string;
    exterieur: number;
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
    gaz: number;
    electricite: number;
    panneauxPhoto: number;
    eolienne: number;
    surfaceExterieurAvant: number;
    surfaceExterieurDroit: number;
    surfaceExterieurGauche: number;
    surfaceExterieurArriere: number;
    comment: string;
    nbDocument: number;
}

export interface Room {
    id?: string;
    roomName: string;
    space: number;
    nbFenetre: number;
    nbPorteFenetre: number;
    typeChauffage: string;
    nbRadiateur: number;
    volet: number;
    nbVolet: number;
}

export interface FileHouse {
    id: string;
    fileName: string;
    fileDownloadUri: string;
    fileType: string;
    size: number;
    pic: string;
    description: string;
}
