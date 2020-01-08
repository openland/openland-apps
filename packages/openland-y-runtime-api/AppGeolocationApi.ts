export interface AppGeoilocationApi {
    getCurrentPosition(): Promise<{ latitude: number, longitude: number } | undefined>;
}