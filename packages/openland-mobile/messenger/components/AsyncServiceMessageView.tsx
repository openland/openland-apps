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

export class AsyncServiceMessageView extends React.PureComponent<{
    message: DataSourceMessageItem;
    engine: ConversationEngine;
    onUserPress: (id: string) => void;
}> {
    render() {
        let meta = this.props.message.serviceMetaData!;
        let myUserId = this.props.engine.engine.user.id;

        if (meta.__typename === 'InviteServiceMetadata') {
            return (
                <ServiceMessageJoin
                    serviceMetadata={meta}
                    onUserPress={this.props.onUserPress}
                    myUserId={myUserId}
                />
            );
        } else if (meta.__typename === 'KickServiceMetadata') {
            return (
                <ServiceMessageKick
                    serviceMetadata={meta}
                    onUserPress={this.props.onUserPress}
                    myUserId={myUserId}
                />
            );
        } else if (meta.__typename === 'PhotoChangeServiceMetadata') {
            return (
                <ServiceMessagePhotoChanged
                    user={{
                        id: this.props.message.senderId,
                        name: this.props.message.senderName,
                    }}
                    onUserPress={this.props.onUserPress}
                    myUserId={myUserId}
                />
            );
        } else if (meta.__typename === 'TitleChangeServiceMetadata') {
            if (this.props.message.text) {
                return <ServiceMessageTitleChanged title={meta.title} />;
            }
        }

        return <ServiceMessageDefault message={this.props.message.text} />;
    }
}
