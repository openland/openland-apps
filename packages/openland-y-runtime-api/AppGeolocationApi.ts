export interface AppGeoilocationApi {
    getCurrentPosition(): Promise<{ latitude: number, longitude: number } | undefined>;
    
    permissionState(): Promise<'initial' | 'allow' | 'deny' | 'unsupported'>;
    requestPermissions(): Promise<'allow' | 'deny'>;
    watchPermissions(callback: (state: 'initial' | 'allow' | 'deny' | 'unsupported') => void): () => void;
}