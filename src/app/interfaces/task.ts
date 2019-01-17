export interface Task {
    id?: string;
    username: string;
    room: string;
    description: string;
    budget: string;
    file: FilePayload[];
    start_date: Date;
    status: string;
}

export interface FilePayload {
    id?: string;
    fileName: string;
    fileDownloadUri: string;
    fileType: string;
    size: number;
}
