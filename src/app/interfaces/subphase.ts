import {Phase} from './phase';
import {Historic} from './historic';

export interface SubPhase {
    id: number;
    sPhaseName: string;
    phase: Phase;
    historic: Historic;
}
