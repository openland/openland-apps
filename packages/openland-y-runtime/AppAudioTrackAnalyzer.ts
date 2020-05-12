import { AppAudioTrackAnalyzerApi } from "openland-y-runtime-api/AppAudioTrackAnalyzerApi";

export const AppAudioTrackAnalyzerFactory: AppAudioTrackAnalyzerApi = {
    createAnalyzer() {
        throw Error('Unsupported');
    }
};
