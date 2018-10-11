export interface SRouter {
    route: string;
    index: number;
    key: string;
    params: any;
    present: (route: string, params?: any) => void;
    dismiss: () => void;
    push: (route: string, params?: any) => void;
    pushAndRemove: (route: string, params?: any) => void;
    back: () => void;
}