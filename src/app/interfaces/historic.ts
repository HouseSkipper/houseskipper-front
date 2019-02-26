import {SubPhase} from './subphase';
import {Task} from './task';

export interface Historic {
    id: number;
    subphase: SubPhase;
    task: Task;
    date: Date;
}
