import * as React from 'react';
import { ConversationEngine, ConversationStateHandler } from 'openland-engines/messenger/ConversationEngine';
import { ConversationState } from 'openland-engines/messenger/ConversationState';
import { View, Text, Platform, Animated, Easing } from 'react-native';
import { ConversationMessagesView } from './ConversationMessagesView';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { trackEvent } from 'openland-mobile/analytics';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { useChatSelectionMode } from 'openland-engines/messenger/MessagesActionsState';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { ReloadFromBottomButton } from './ReloadFromBottomButton';

export interface MessagesListProps {
    engine: ConversationEngine;
    messagesPaddingBottom?: number;
    inverted: boolean;
}
export const androidMessageInputListOverlap = 52;

class ConversationViewComponent extends React.PureComponent<MessagesListProps & { bottomInset: number, topInset: number, theme: ThemeGlobal, selectionMode: boolean }, { conversation: ConversationState }> implements ConversationStateHandler {
    private unmount: (() => void) | null = null;
    private unmount2: (() => void) | null = null;
    // private listRef = React.createRef<ConversationMessagesView>();
    private rotation = new Animated.Value(0);

    constructor(props: MessagesListProps & { bottomInset: number, topInset: number, theme: ThemeGlobal, selectionMode: boolean }) {
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
    }

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

    sendWave = () => {
        this.props.engine.sendMessage('👋', []);
        trackEvent('message_wave_sent');
    }

    render() {
        const isBot = !!(this.props.engine.user && this.props.engine.user.isBot);
        return (
            <View flexBasis={0} flexGrow={1} marginBottom={Platform.select({ ios: 0, android: -androidMessageInputListOverlap })}>
                <ConversationMessagesView
                    inverted={this.props.inverted}
                    paddingBottom={this.props.messagesPaddingBottom}
                    loaded={this.state.conversation.historyFullyLoaded}
                    engine={this.props.engine}
                    selectionMode={this.props.selectionMode}
                />
                {
                    !this.state.conversation.loading && this.state.conversation.messages.length === 0 && (
                        <ASSafeAreaView style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                            {isBot && <Text style={{ fontSize: 72, lineHeight: 120, color: this.props.theme.foregroundPrimary }} allowFontScaling={false}>🤖</Text>}
                            {!isBot && (
                                <>
                                    <Text style={{ fontSize: 72, lineHeight: 120, color: this.props.theme.foregroundPrimary }} allowFontScaling={false} onPress={this.sendWave}>👋</Text>
                                    <ZRoundedButton title="Wave" style="secondary" onPress={this.sendWave} />
                                </>
                            )}
                        </ASSafeAreaView>
                    )
                }

                <ReloadFromBottomButton conversation={this.props.engine} paddingBottom={Platform.OS === 'android' ? androidMessageInputListOverlap : 86} />
            </View >
        );
    }
}

export const ConversationView = (props: MessagesListProps) => {
    let theme = React.useContext(ThemeContext);
    let selectionMode = useChatSelectionMode(props.engine.messagesActionsStateEngine);
    return (
        <ASSafeAreaContext.Consumer>
            {area => (<ConversationViewComponent {...props} bottomInset={area.bottom} topInset={area.top} theme={theme} selectionMode={selectionMode} />)}
        </ASSafeAreaContext.Consumer>
    );
};