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

export interface MessagesListProps {
    engine: ConversationEngine;
    theme: ConversationTheme;
    messagesPaddingBottom?: number;
}
export const androidMessageInputListOverlap = 50;

class ConversationViewComponent extends React.PureComponent<MessagesListProps & { bottomInset: number, topInset: number }, { conversation: ConversationState }> implements ConversationStateHandler {
    private unmount: (() => void) | null = null;
    private unmount2: (() => void) | null = null;
    // private listRef = React.createRef<ConversationMessagesView>();
    private rotation = new Animated.Value(0);

    constructor(props: MessagesListProps & { bottomInset: number, topInset: number, }) {
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
        let screenHeight = Dimensions.get('screen').height;
        let screenWidth = Dimensions.get('screen').width;

        return (
            <View flexBasis={0} flexGrow={1} marginBottom={Platform.select({ ios: 0, android: -androidMessageInputListOverlap })}>
                {!this.state.conversation.loading && <LinearGradient position="absolute" left={0} top={0} right={0} height="100%" colors={this.props.theme.bubbleColorOut} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} />}

                {this.props.theme.spiral && !this.state.conversation.loading && <Animated.View style={{ left: (screenWidth - screenHeight), position: 'absolute', transform: [{ rotate: this.rotation, scale: 1.3 }] }}>
                    <View
                        style={{ opacity: 0.1, left: 0, top: 0, width: screenHeight, height: screenHeight }}
                    >
                        <Image
                            source={require('assets/h_1.png')}
                            style={{
                                width: screenHeight,
                                height: screenHeight,
                            }}
                        />
                    </View>
                </Animated.View>}
                <ConversationMessagesView
                    // ref={this.listRef}
                    paddingBottom={this.props.messagesPaddingBottom}
                    loaded={this.state.conversation.historyFullyLoaded}
                    engine={this.props.engine}
                />
                {
                    !this.state.conversation.loading && this.state.conversation.messages.length === 0 && (
                        <ASSafeAreaView style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: 375, height: 375, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('assets/back.png')} resizeMode="stretch" style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }} />
                                <Image source={require('assets/img-messages.png')} style={{ width: 48, height: 42, marginBottom: 13 }} />
                                <Text style={{ color: '#c8c7cc', fontSize: 13, fontWeight: '500' }}>No messages yet</Text>
                            </View>
                        </ASSafeAreaView>
                    )
                }
                <ASSafeAreaView style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} pointerEvents="none">
                    <ZLoader transparent={true} enabled={this.state.conversation.loading} />
                </ASSafeAreaView>
            </View >
        );
    }
}

export const ConversationView = (props: MessagesListProps) => {
    return (
        <ASSafeAreaContext.Consumer>
            {area => (<ConversationViewComponent {...props} bottomInset={area.bottom} topInset={area.top} />)}
        </ASSafeAreaContext.Consumer>
    );
};