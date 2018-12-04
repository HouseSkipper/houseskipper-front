export interface House {
    id?: string;
    houseName: string;
    houseType: string;
    address: string;
    posatlCode: number;
    city: string;
    livingSpace: number;
    outsideSpace: number;
    numberPieces: number;
    constructionYear: number;
    standardType: string;
    standardTypeNumber: number;
    rooms: Room[];
    heatingType: string;
    amperage: number;
    comment: string;
    username?: string;
}

export interface Room {
    id?: string;
    roomName: string;
    space: string;
    description: string;
}
