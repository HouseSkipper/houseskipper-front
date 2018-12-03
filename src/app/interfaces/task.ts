export interface Task {
    id?: string;
    room: string;
    description: string;
    budget: string;
    start_date: Date;
    status: string;
}
