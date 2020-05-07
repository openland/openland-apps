import { AppMediaSessionTrackAnalyzerApi } from "openland-y-runtime-api/AppMediaSessionTrackAnalyzerApi";

export const AppMediaSessionTrackAnalyzerFactory: AppMediaSessionTrackAnalyzerApi = {
    createAnalyzer() {
        throw Error('Unsupported');
    }
};
