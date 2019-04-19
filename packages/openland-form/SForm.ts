export interface SForm {
    doAction(action: () => any): void;
    error: string | null;
    loading: boolean;
    enabled: boolean;
}