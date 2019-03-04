import {Phase} from './phase';
import {Historic} from './historic';

export interface SubPhase {
    id: number;
    phase: Phase;
    sphaseName: string;
    historics: Historic[];
}
