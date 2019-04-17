
export interface AppBackgroundTaskApi {
    setTimeout(task: () => void, timeout: number): number;
    setInterval(task: () => void, timeout: number): number;
    clearTimeout(id: number): void;
    clearInterval(id: number): void;
}