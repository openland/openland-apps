import { ServiceMessageMetadata } from 'openland-api/spacex.types';
import { t } from './useText';
import { LocalizedResources } from './schema';

const SERVICE_MESSAGES = [
    {
        meta: 'VoiceChatStartedServiceMetadata',
        text: ' started live room',
        key: 'serviceVoiceChatStarted',
    },
    {
        meta: 'VoiceChatEndedServiceMetadata',
        text: 'Call ended',
        key: 'serviceCallEnded',
    },
    {
        meta: 'CallStartedServiceMetadata',
        text: ' started a call',
        key: 'serviceCallStarted',
    },
    {
        meta: 'ChatCreatedServiceMetadata',
        text: ' created the channel ',
        key: 'serviceChannelCreated',
    },
    {
        meta: 'ChatCreatedServiceMetadata',
        text: ' created the group ',
        key: 'serviceGroupCreated',
    },
    {
        meta: 'MessagePinnedServiceMetadata',
        text: ' pinned “',
        key: 'serviceMessagePinned',
    },
    {
        meta: 'InviteServiceMetadata',
        text: ' added ',
        key: 'serviceUserAdded',
    },
    {
        meta: 'InviteServiceMetadata',
        text: ' joined the group',
        key: 'serviceUserJoined',
    },
    {
        meta: 'KickServiceMetadata',
        text: ' kicked ',
        key: 'serviceUserKicked',
    },
    {
        meta: 'KickServiceMetadata',
        text: ' left the group',
        key: 'serviceUserLeft',
    },
    {
        meta: 'TitleChangeServiceMetadata',
        text: ' changed the group name to ',
        key: 'serviceTitleChanged',
    },
    {
        meta: 'PhotoChangeServiceMetadata',
        text: ' changed the group photo',
        key: 'servicePhotoChanged',
    },
];

export function getServiceSpanTranslation(
    serviceMetaData: ServiceMessageMetadata,
    textRaw?: string,
) {
    for (let message of SERVICE_MESSAGES) {
        if (serviceMetaData.__typename === message.meta && textRaw === message.text) {
            return t(message.key as LocalizedResources, textRaw);
        }
    }

    return null;
}

export function getServiceStringTranslation(serviceString: string) {
    return SERVICE_MESSAGES.reduce((result, item) => {
        return result.replace(item.text, t(item.key as LocalizedResources, item.text));
    }, serviceString);
}
