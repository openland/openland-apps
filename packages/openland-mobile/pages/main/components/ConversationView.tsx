import * as React from 'react';
import { ConversationEngine, ConversationStateHandler } from 'openland-engines/messenger/ConversationEngine';
import { ConversationState } from 'openland-engines/messenger/ConversationState';
import { View, Image, Text, Dimensions, Platform, FlatList, PlatformIOS } from 'react-native';
import { ZLoader } from '../../../components/ZLoader';
import { MessageFullFragment } from 'openland-api/Types';
import { ZSafeAreaContext } from '../../../components/layout/ZSafeAreaContext';
import { ZSafeAreaView } from '../../../components/layout/ZSafeAreaView';
import { ConversationMessagesView } from './ConversationMessagesView';
import FastImage from 'react-native-fast-image';
import { AggressiveImageIOS } from 'openland-xp/platform/AggressiveImageIOS';
import { ASDisplayNode } from '../../../components/asyncdisplay/ASDisplayNode';
import { ASImage, ASView } from '../../../components/asyncdisplay/Views';

export interface MessagesListProps {
    onAvatarPress: (userId: string) => void;
    onPhotoPress: (message: MessageFullFragment) => void;
    onDocumentPress: (message: MessageFullFragment) => void;
    engine: ConversationEngine;
}

class ConversationViewComponent extends React.PureComponent<MessagesListProps & { bottomInset: number, topInset: number }, { conversation: ConversationState }> implements ConversationStateHandler {
    private unmount: (() => void) | null = null;
    private unmount2: (() => void) | null = null;
    private listRef = React.createRef<ConversationMessagesView>();

    constructor(props: MessagesListProps & { bottomInset: number, topInset: number }) {
        super(props);
        let initialState = props.engine.getState();
        this.state = {
            conversation: initialState
        };
    }

    componentWillMount() {
        this.unmount2 = this.props.engine.engine.mountConversation(this.props.engine.conversationId);
        this.unmount = this.props.engine.subscribe(this);
    }

    onConversationUpdated(state: ConversationState) {
        this.setState({ conversation: state });
    }

    onMessageSend() {
        if (this.listRef.current) {
            this.listRef.current.scrollToStart();
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

    onEndReached = () => {
        this.props.engine.loadBefore();
    }

    render() {
        return (
            <View flexBasis={0} flexGrow={1}>
                {Platform.OS === 'ios' && (
                    <ASDisplayNode
                        style={{ position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                    >
                        <ASView
                            width={Dimensions.get('window').width}
                            height={Dimensions.get('window').height}
                        >
                            <ASImage
                                source={require('assets/img-chat-3.jpg')}
                                width={Dimensions.get('window').width}
                                height={Dimensions.get('window').height}
                            />
                        </ASView>
                    </ASDisplayNode>
                )}
                {Platform.OS !== 'ios' && (
                    <FastImage
                        source={require('assets/img-chat-3.jpg')}
                        style={{ position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                        resizeMode="cover"
                    />)
                }
                < ConversationMessagesView
                    ref={this.listRef}
                    messages={this.state.conversation.messagesPrepprocessed}
                    loaded={this.state.conversation.historyFullyLoaded}
                    onAvatarPress={this.props.onAvatarPress}
                    onPhotoPress={this.props.onPhotoPress}
                    onDocumentPress={this.props.onDocumentPress}
                    onEndReached={this.onEndReached}
                    engine={this.props.engine}
                />
                {!this.state.conversation.loading && this.state.conversation.messages.length === 0 && (
                    <ZSafeAreaView style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 375, height: 375, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('assets/back.png')} resizeMode="stretch" style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }} />
                            <Image source={require('assets/img-messages.png')} style={{ width: 48, height: 42, marginBottom: 13 }} />
                            <Text style={{ color: '#c8c7cc', fontSize: 13, fontWeight: '500' }}>No messages yet</Text>
                        </View>
                    </ZSafeAreaView>
                )}
                <ZSafeAreaView style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} pointerEvents="none">
                    <ZLoader transparent={true} enabled={this.state.conversation.loading} />
                </ZSafeAreaView>
            </View>
        );
    }
}

export const ConversationView = (props: MessagesListProps) => {
    return (
        <ZSafeAreaContext.Consumer>
            {area => (<ConversationViewComponent {...props} bottomInset={area.bottom} topInset={area.top} />)}
        </ZSafeAreaContext.Consumer>
    );
};