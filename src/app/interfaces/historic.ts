import {SubPhase} from './subphase';
import {Task} from './task';
import {Phase} from './phase';

export interface Historic {
    id: number;
    subphase: SubPhase;
    phase: Phase;
    task: Task;
    date: Date;
    currentPhase: string;
    currentSubPhase: string;
}
