import * as React from 'react';
import { ConversationEngine, ConversationStateHandler } from 'openland-engines/messenger/ConversationEngine';
import { ModelMessage, isServerMessage } from 'openland-engines/messenger/types';
import { ConversationState } from 'openland-engines/messenger/ConversationState';
import { View, FlatList, Image } from 'react-native';
import { MessageComponent } from './MessageComponent';
import { ZLoader } from '../../../components/ZLoader';

export interface MessagesListProps {
    onAvatarPress: (userId: string) => void;
    engine: ConversationEngine;
}

export class MessagesListComponent extends React.PureComponent<MessagesListProps, { loading: boolean, messages: ModelMessage[] }> implements ConversationStateHandler {
    private unmount: (() => void) | null = null;
    private unmount2: (() => void) | null = null;
    private listRef = React.createRef<FlatList<any>>();

    constructor(props: MessagesListProps) {
        super(props);
        let initialState = props.engine.getState();
        let msg = [...initialState.messages];
        msg.reverse();
        this.state = { loading: true, messages: msg };
    }

    componentDidMount() {
        this.unmount2 = this.props.engine.engine.mountConversation(this.props.engine.conversationId);
        this.unmount = this.props.engine.subscribe(this);
    }

    onConversationUpdated(state: ConversationState) {
        let msg = [...state.messages];
        msg.reverse();
        this.setState({ loading: state.loading, messages: msg });
    }

    onMessageSend() {
        if (this.listRef.current) {
            this.listRef.current.scrollToIndex({ index: 0, animated: false });
        }
    }

    componentWillUnmount() {
        if (this.unmount) {
            this.unmount();
            this.unmount = null;
        }
        if (this.unmount2) {
            this.unmount2();
            this.unmount2 = null;
        }
    }

    render() {
        return (
            <View
                style={{ backgroundColor: '#fff', width: '100%' }}
                flexBasis={0}
                flexGrow={1}
            >
                <Image source={require('assets/img_chat.png')} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} />
                <FlatList
                    data={this.state.messages}
                    renderItem={(itm) => <MessageComponent onAvatarPress={this.props.onAvatarPress} message={itm.item} engine={this.props.engine} />}
                    keyExtractor={(itm) => isServerMessage(itm) ? itm.id : itm.key}
                    inverted={true}
                    flexBasis={0}
                    flexGrow={1}
                    ref={this.listRef}
                    keyboardDismissMode="interactive"
                />
                {this.state.loading && <ZLoader />}
            </View>
        );
    }
}