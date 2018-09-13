export interface SRouter {
    route: string;
    index: number;
    key: string;
    params: any;
    push: (route: string, params?: any) => void;
    back: () => void;
}