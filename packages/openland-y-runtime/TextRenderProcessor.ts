import { TextRenderProccessorApi } from 'openland-y-runtime-api/TextRenderProcessorApi';

export const TextRenderProccessor: TextRenderProccessorApi = {
    process(text: string, isBig?: boolean) {
        return text;
    }
};