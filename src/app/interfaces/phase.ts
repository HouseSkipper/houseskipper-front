import {SubPhase} from './subphase';
import {Commentaire, Task} from './task';

export interface Phase {
    id: number;
    phaseName: string;
    subphase: SubPhase[];
    commentaires: Commentaire[];
    tasks: Task[];
}
