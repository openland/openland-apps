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
import { ConversationTheme, ConversationThemeResolver, DefaultConversationTheme } from 'openland-mobile/pages/main/themes/ConversationThemeResolver';

interface AsyncServiceMessageViewProps {
    message: DataSourceMessageItem;
    engine: ConversationEngine;
    onUserPress: (id: string) => void;
    onRoomPress: (id: string) => void;
}

export const ThemeContext = React.createContext({ theme: new DefaultConversationTheme() });

export class AsyncServiceMessageView extends React.PureComponent<AsyncServiceMessageViewProps, { theme: ConversationTheme }> {
    sub?: () => void;
    constructor(props: AsyncServiceMessageViewProps) {
        super(props);
        this.state = { theme: ConversationThemeResolver.getCachedOrDefault(props.engine.conversationId) }

    }

    componentWillMount() {
        ConversationThemeResolver.subscribe(this.props.engine.conversationId, t => this.setState({ theme: t })).then(sub => this.sub = sub);
    }

    componentWillUnmount() {
        if (this.sub) {
            this.sub();
        }
    }

    render() {
        let meta = this.props.message.serviceMetaData!;
        let myUserId = this.props.engine.engine.user.id;

        let res = <ServiceMessageDefault message={this.props.message.text} />;

        if (meta) {
            if (meta.__typename === 'PostRespondServiceMetadata') {
                res = <ServiceMessagePost
                    serviceMetadata={meta}
                    onUserPress={this.props.onUserPress}
                    onRoomPress={this.props.onRoomPress}
                    myUserId={myUserId}
                />;
            } else if (meta.__typename === 'InviteServiceMetadata') {
                res = <ServiceMessageJoin
                    serviceMetadata={meta}
                    onUserPress={this.props.onUserPress}
                    myUserId={myUserId}
                />;
            } else if (meta.__typename === 'KickServiceMetadata') {
                res = <ServiceMessageKick
                    serviceMetadata={meta}
                    onUserPress={this.props.onUserPress}
                    myUserId={myUserId}
                />;
            } else if (meta.__typename === 'PhotoChangeServiceMetadata') {
                res = <ServiceMessagePhotoChanged
                    user={{
                        id: this.props.message.senderId,
                        name: this.props.message.senderName,
                    }}
                    onUserPress={this.props.onUserPress}
                    myUserId={myUserId}
                />;
            } else if (meta.__typename === 'TitleChangeServiceMetadata') {
                if (this.props.message.text) {
                    res = <ServiceMessageTitleChanged title={meta.title} />;
                }
            }
        }

        return <ThemeContext.Provider value={{ theme: this.state.theme }}>{res}</ThemeContext.Provider>;
    }
}
