import { TextRenderProccessorApi } from 'openland-y-runtime-api/TextRenderProcessorApi';
import { emoji } from 'openland-y-utils/emoji';

export const TextRenderProccessor: TextRenderProccessorApi = {
    process(text: string, isBig?: boolean) {
        return emoji({
            src: text,
            size: isBig ? 38 : 16
        });
    }
};