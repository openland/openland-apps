import * as React from 'react';
import { ConversationEngine, ConversationStateHandler } from 'openland-engines/messenger/ConversationEngine';
import { ConversationState } from 'openland-engines/messenger/ConversationState';
import { View, Image, Text, Dimensions, Platform, Animated, Easing } from 'react-native';
import { ZLoader } from '../../../components/ZLoader';
import { ConversationMessagesView } from './ConversationMessagesView';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import LinearGradient from 'react-native-linear-gradient';
import { ConversationTheme } from '../themes/ConversationThemeResolver';
import { trackEvent } from 'openland-mobile/analytics';
import { SRouter } from 'react-native-s/SRouter';
import { AppTheme } from 'openland-mobile/themes/themes';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { useMessageSelected, useChatSelectionMode } from 'openland-engines/messenger/MessagesActionsState';

export interface MessagesListProps {
    engine: ConversationEngine;
    messagesPaddingBottom?: number;
    inverted: boolean;
}
export const androidMessageInputListOverlap = 50;

class ConversationViewComponent extends React.PureComponent<MessagesListProps & { bottomInset: number, topInset: number, theme: AppTheme, selectionMode: boolean }, { conversation: ConversationState }> implements ConversationStateHandler {
    private unmount: (() => void) | null = null;
    private unmount2: (() => void) | null = null;
    // private listRef = React.createRef<ConversationMessagesView>();
    private rotation = new Animated.Value(0);

    constructor(props: MessagesListProps & { bottomInset: number, topInset: number, theme: AppTheme, selectionMode: boolean }) {
        super(props);
        let initialState = props.engine.getState();

        this.state = {
            conversation: initialState,
        };

        Animated.loop(
            Animated.timing(this.rotation, {
                toValue: Math.PI * 2,
                useNativeDriver: true,
                isInteraction: false,
                easing: Easing.linear
            })
        ).start();
    }

    onChatLostAccess = () => {
        console.warn('onChatLostAccess');
    };

    componentWillMount() {
        this.unmount2 = this.props.engine.engine.mountConversation(this.props.engine.conversationId);
        this.unmount = this.props.engine.subscribe(this);
    }

    onConversationUpdated(state: ConversationState) {
        this.setState({ conversation: state });
    }

    onMessageSend() {
        trackEvent('message_sent');

        // if (this.listRef.current) {
        //     this.listRef.current.scrollToStart();
        // }
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
            <View flexBasis={0} flexGrow={1} marginBottom={Platform.select({ ios: 0, android: -androidMessageInputListOverlap })}>
                {!this.state.conversation.loading && <LinearGradient position="absolute" left={0} top={0} right={0} height="100%" colors={this.props.theme.bubbleGradientOut} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} />}

                <ConversationMessagesView
                    // ref={this.listRef}
                    inverted={this.props.inverted}
                    paddingBottom={this.props.messagesPaddingBottom}
                    loaded={this.state.conversation.historyFullyLoaded}
                    engine={this.props.engine}
                    selectionMode={this.props.selectionMode}
                />
                {
                    !this.state.conversation.loading && this.state.conversation.messages.length === 0 && (
                        <ASSafeAreaView style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: 375, height: 375, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('assets/img-messages.png')} style={{ width: 48, height: 42, marginBottom: 13 }} />
                                <Text style={{ color: '#c8c7cc', fontSize: 13, fontWeight: '500' }}>No messages yet</Text>
                            </View>
                        </ASSafeAreaView>
                    )
                }
            </View >
        );
    }
}

export const ConversationView = (props: MessagesListProps) => {
    let theme = React.useContext(ThemeContext);
    let selectionMode = useChatSelectionMode(props.engine.messagesActionsState);
    return (
        <ASSafeAreaContext.Consumer>
            {area => (<ConversationViewComponent {...props} bottomInset={area.bottom} topInset={area.top} theme={theme} selectionMode={selectionMode} />)}
        </ASSafeAreaContext.Consumer>
    );
};