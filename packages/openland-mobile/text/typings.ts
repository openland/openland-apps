import { t } from './useText';
import { LocalizedResources } from './schema';

const TYPINGS = [
    {
        text: ' and ',
        key: 'serviceAnd',
    },
    {
        text: ' more',
        key: 'serviceOthers',
    },
    {
        text: 'is typing',
        key: 'isTyping',
    },
    {
        text: 'is sending a file',
        key: 'isSendingAFile',
    },
    {
        text: 'is sending a photo',
        key: 'isSendingAPhoto',
    },
    {
        text: 'is picking a sticker',
        key: 'isPickingASticker',
    },
    {
        text: 'is uploading a video',
        key: 'isUploadingAVideo',
    },
    {
        text: 'are typing',
        key: 'areTyping',
    },
    {
        text: 'are sending a file',
        key: 'areSendingAFile',
    },
    {
        text: 'are sending a photo',
        key: 'areSendingAPhoto',
    },
    {
        text: 'are picking a sticker',
        key: 'arePickingASticker',
    },
    {
        text: 'are uploading a video',
        key: 'areUploadingAVideo',
    },
];

export function getTypingsTranslation(typing: string) {
    return TYPINGS.reduce((result, item) => {
        return result.replace(item.text, t(item.key as LocalizedResources, item.text));
    }, typing);
}
