export interface WorkerInterface {
    setHandler(handler: ((data: any) => void)): void;
    post(data: any): void;
}