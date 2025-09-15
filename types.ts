
export enum AppStatus {
    IDLE = 'IDLE',
    PROCESSING = 'PROCESSING',
    DONE = 'DONE',
    ERROR = 'ERROR',
}

export interface ProcessingState {
    currentPage: number;
    totalPages: number;
    currentTask: string;
}

interface IdleState {
    status: AppStatus.IDLE;
}

interface ProcessingAppState extends ProcessingState {
    status: AppStatus.PROCESSING;
}

interface DoneState {
    status: AppStatus.DONE;
    resultText: string;
}

interface ErrorState {
    status: AppStatus.ERROR;
    error: string;
}

export type AppState = IdleState | ProcessingAppState | DoneState | ErrorState;
