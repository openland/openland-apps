export interface SForm {
    doAction(action: () => any): void;
    error: string | null;
    errorFields: { key: string; messages: string[] }[];
    loading: boolean;
    enabled: boolean;
    triedToSubmit: boolean;
}
