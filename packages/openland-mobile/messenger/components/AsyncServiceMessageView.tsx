import * as React from 'react';
import {
    DataSourceMessageItem,
    ConversationEngine,
} from 'openland-engines/messenger/ConversationEngine';
import { ServiceMessageDefault } from './service/ServiceMessageDefault';
import { ServiceMessageJoin } from './service/ServiceMessageJoin';
import { ServiceMessageKick } from './service/ServiceMessageKick';
import { ServiceMessagePhotoChanged } from './service/ServiceMessagePhotoChanged';
import { ServiceMessageTitleChanged } from './service/ServiceMessageTitleChanged';
import { ServiceMessagePost } from './service/ServiceMessagePost';

interface AsyncServiceMessageViewProps {
    message: DataSourceMessageItem;
    engine: ConversationEngine;
    onUserPress: (id: string) => void;
    onRoomPress: (id: string) => void;
}

export function AsyncServiceMessageView(props: AsyncServiceMessageViewProps) {
    let meta = props.message.serviceMetaData!;
    let myUserId = props.engine.engine.user.id;

    let res = <ServiceMessageDefault message={props.message.text} />;

    if (meta) {
        if (meta.__typename === 'PostRespondServiceMetadata') {
            res = <ServiceMessagePost
                serviceMetadata={meta}
                onUserPress={props.onUserPress}
                onRoomPress={props.onRoomPress}
                myUserId={myUserId}
            />;
        } else if (meta.__typename === 'InviteServiceMetadata') {
            res = <ServiceMessageJoin
                serviceMetadata={meta}
                onUserPress={props.onUserPress}
                myUserId={myUserId}
            />;
        } else if (meta.__typename === 'KickServiceMetadata') {
            res = <ServiceMessageKick
                serviceMetadata={meta}
                onUserPress={props.onUserPress}
                myUserId={myUserId}
            />;
        } else if (meta.__typename === 'PhotoChangeServiceMetadata') {
            res = <ServiceMessagePhotoChanged
                user={{
                    id: props.message.senderId,
                    name: props.message.senderName,
                }}
                onUserPress={props.onUserPress}
                myUserId={myUserId}
            />;
        } else if (meta.__typename === 'TitleChangeServiceMetadata') {
            if (props.message.text) {
                res = <ServiceMessageTitleChanged title={meta.title} />;
            }
        }
    }

    return res;
}