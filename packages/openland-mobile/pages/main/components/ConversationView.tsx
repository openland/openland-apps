import * as React from 'react';
import { ConversationEngine, ConversationStateHandler } from 'openland-engines/messenger/ConversationEngine';
import { ConversationState } from 'openland-engines/messenger/ConversationState';
import { View, Text, Platform, Animated, Easing, Image, StyleSheet, ImageStyle, TextStyle, NativeSyntheticEvent } from 'react-native';
import { ConversationMessagesView } from './ConversationMessagesView';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { trackEvent } from 'openland-mobile/analytics';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { ZButton } from 'openland-mobile/components/ZButton';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { useChatMessagesSelectionMode } from 'openland-y-utils/MessagesActionsState';

export interface MessagesListProps {
    engine: ConversationEngine;
    messagesPaddingBottom?: number;
    inverted: boolean;
    onScroll?: (event?: NativeSyntheticEvent<any>) => void;
    isBanned: boolean;
}
export const androidMessageInputListOverlap = 52;

const styles = StyleSheet.create({
    image: {
        width: 240,
        height: 150,
        resizeMode: 'cover'
    } as ImageStyle,
    title: {
        ...TextStyles.Title2,
        marginTop: 16,
        textAlign: 'center'
    } as TextStyle,
    subtitle: {
        ...TextStyles.Body,
        marginTop: 8,
        marginBottom: 24,
        textAlign: 'center'
    } as TextStyle
});

class ConversationViewComponent extends React.PureComponent<MessagesListProps & { theme: ThemeGlobal, selectionMode: boolean, isBanned: boolean }, { conversation: ConversationState }> implements ConversationStateHandler {
    private unmount: (() => void) | null = null;
    private unmount2: (() => void) | null = null;
    // private listRef = React.createRef<ConversationMessagesView>();
    private rotation = new Animated.Value(0);

    constructor(props: MessagesListProps & { theme: ThemeGlobal, selectionMode: boolean, isBanned: boolean }) {
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
        this.props.engine.sendMessage('👋', [], undefined);
        trackEvent('message_wave_sent');
    }

    sendMessage = (message: string) => {
        this.props.engine.sendMessage(message, [], undefined);
        trackEvent('message_sent');
    }

    render() {
        const userName = this.props.engine.user ? this.props.engine.user.firstName : '';
        const canSendMessage = this.props.engine.canSendMessage;
        const isSavedMessages = this.props.engine.user && getMessenger().engine.user.id === this.props.engine.user.id;
        const imgSrc = this.props.theme.type === 'Light' ? require('assets/art-no-messages.png') : require('assets/art-no-messages-dark.png');

        return (
            <View style={{ flexBasis: 0, flexGrow: 1, marginBottom: Platform.select({ default: 0, android: -androidMessageInputListOverlap }) }}>
                <ConversationMessagesView
                    inverted={this.props.inverted}
                    paddingBottom={this.props.messagesPaddingBottom}
                    loaded={this.state.conversation.historyFullyLoaded}
                    engine={this.props.engine}
                    selectionMode={this.props.selectionMode}
                    isBanned={this.props.isBanned}
                    onScroll={this.props.onScroll}
                />
                {
                    !this.state.conversation.loading && this.state.conversation.messages.length === 0 && (
                        <ASSafeAreaView style={{ position: 'absolute', top: 0, right: 32, left: 32, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                            {canSendMessage && (
                                <>
                                    <Image source={imgSrc} style={styles.image} />

                                    <Text style={[styles.title, { color: this.props.theme.foregroundPrimary }]} allowFontScaling={false}>
                                        No messages yet
                                    </Text>

                                    {!isSavedMessages && (
                                        <>
                                            <Text style={[styles.subtitle, { color: this.props.theme.foregroundSecondary }]} allowFontScaling={false}>
                                                Start a conversation with&nbsp;{userName}
                                            </Text>

                                            <View style={{ marginBottom: 15, flexDirection: 'row' }}>
                                                <ZButton style="secondary" title="👋" onPress={() => this.sendMessage('👋')} />
                                                <View style={{ marginLeft: 16 }}>
                                                    <ZButton
                                                        style="secondary"
                                                        title={`Hello, ${userName}!`}
                                                        onPress={() => this.sendMessage(`Hello, ${userName}!`)}
                                                    />
                                                </View>
                                            </View>
                                            <ZButton style="secondary" title="Happy to connect!" onPress={() => this.sendMessage('Happy to connect!')} />
                                        </>
                                    )}
                                </>
                            )}

                            {!canSendMessage && (
                                <Text style={[styles.subtitle, { color: this.props.theme.foregroundSecondary }]} allowFontScaling={false}>
                                    No messages yet
                                </Text>
                            )}
                        </ASSafeAreaView>
                    )
                }
            </View >
        );
    }
}

export const ConversationView = (props: MessagesListProps) => {
    let theme = React.useContext(ThemeContext);
    let selectionMode = useChatMessagesSelectionMode(props.engine.conversationId);
    return (
        <ConversationViewComponent {...props} theme={theme} selectionMode={selectionMode} isBanned={props.isBanned} />
    );
};