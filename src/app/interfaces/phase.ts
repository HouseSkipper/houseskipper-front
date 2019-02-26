import {SubPhase} from './subphase';


export interface Phase {
    id: number;
    phaseName: string;
    subphase: SubPhase[];
}
