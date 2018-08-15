import * as React from 'react';
import { ConversationEngine, ConversationStateHandler } from 'openland-engines/messenger/ConversationEngine';
import { ConversationState, Day, MessageGroup } from 'openland-engines/messenger/ConversationState';
import { View, Image, Text, Dimensions, Platform, FlatList, ListRenderItemInfo } from 'react-native';
import { ZLoader } from '../../../components/ZLoader';
import { ZAppConfig } from '../../../components/ZAppConfig';
import { MessageView } from 'openland-shared/MessageView';
import { MessageFullFragment } from 'openland-api/Types';
import { ZSafeAreaContext } from '../../../components/layout/ZSafeAreaContext';
import { ZSafeAreaView } from '../../../components/layout/ZSafeAreaView';

export interface MessagesListProps {
    onAvatarPress: (userId: string) => void;
    onPhotoPress: (message: MessageFullFragment) => void;
    engine: ConversationEngine;
}

interface MessagesSection {
    day?: Day;
    key: string;
    data: MessageGroup[];
}

type MessageListItem = {
    type: 'footer'
} | {
    type: 'header'
} | {
    type: 'date',
    day: number;
    month: number;
    year: number;
} | {
    type: 'message',
    message: MessageGroup
};

function convertMessages(days: Day[]) {
    let res: MessageListItem[] = [];
    res.push({ type: 'header' });
    for (let d of days) {
        let msgs = [...d.messages];
        msgs.reverse();
        res.push({ 'type': 'date', day: d.day, month: d.month, year: d.year });
        for (let g of d.messages) {
            res.push({ 'type': 'message', message: g });
        }
    }
    res.push({ type: 'footer' });
    res.reverse();
    return res;
}

let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

function dateFormat(day: number, month: number, year: number) {
    let now = new Date();
    let prefix = '';
    if (now.getFullYear() !== year) {
        prefix = year.toString() + ', ';
    }
    if (now.getFullYear() === year && now.getMonth() === month && now.getDate() === day) {
        return 'Today';
    }
    return (prefix + months[month] + ' ' + day + 'th');
}
class DateSeparator extends React.PureComponent<{ day: number, month: number, year: number }> {
    render() {
        return (
            <View flexDirection={'row'}>
                <View height={1} flexGrow={1} backgroundColor="#b9c1cd" opacity={0.6} marginRight={8} marginTop={10} />
                <Text style={{ fontSize: 12, height: 19, lineHeight: 19, textAlignVertical: 'center', color: '#99a2b0' }}>{dateFormat(this.props.day, this.props.month, this.props.year)}</Text>
                <View height={1} flexGrow={1} backgroundColor="#b9c1cd" opacity={0.6} marginLeft={8} marginTop={10} />
            </View>
        );
    }
}

class ConversationViewComponent extends React.PureComponent<MessagesListProps & { bottomInset: number, topInset: number }, { loading: boolean, empty: boolean, messages: MessageListItem[], loadingHistoty?: boolean, historyFullyLoaded?: boolean }> implements ConversationStateHandler {
    private unmount: (() => void) | null = null;
    private unmount2: (() => void) | null = null;
    private listRef = React.createRef<FlatList<any>>();

    constructor(props: MessagesListProps & { bottomInset: number, topInset: number }) {
        super(props);
        let initialState = props.engine.getState();
        this.state = {
            loading: initialState.loading,
            messages: convertMessages(initialState.messagesPrepprocessed),
            empty: initialState.messagesPrepprocessed.length === 0
        };
    }

    componentDidMount() {
        this.unmount2 = this.props.engine.engine.mountConversation(this.props.engine.conversationId);
        this.unmount = this.props.engine.subscribe(this);
    }

    onConversationUpdated(state: ConversationState) {
        this.setState({
            loading: state.loading,
            messages: convertMessages(state.messagesPrepprocessed),
            empty: state.messagesPrepprocessed.length === 0,
            loadingHistoty: state.loadingHistory,
            historyFullyLoaded: state.historyFullyLoaded
        });
    }

    onMessageSend() {
        if (this.listRef.current) {
            // this.listRef.current.scrollToLocation({ sectionIndex: 0, itemIndex: 0, animated: false });
            this.listRef.current.scrollToIndex({ index: 0, animated: true });
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

    renderItem = (src: ListRenderItemInfo<MessageListItem>) => {
        const itm = src.item;
        if (itm.type === 'header') {
            return (
                this.state.loadingHistoty && !this.state.historyFullyLoaded ?
                    (
                        <View height={this.props.topInset + 48}>
                            <ZLoader appearance="small" transparent={true} />
                        </View>
                    )
                    : <View height={this.props.topInset + 48} />
            );
        } else if (itm.type === 'footer') {
            return (<View height={this.props.bottomInset} />);
        } else if (itm.type === 'date') {
            return (<DateSeparator day={itm.day} month={itm.month} year={itm.year} />);
        } else if (itm.type === 'message') {
            return (
                <MessageView
                    key={itm.message.key}
                    onPhotoPress={this.props.onPhotoPress}
                    onAvatarPress={this.props.onAvatarPress}
                    message={itm.message}
                    engine={this.props.engine}
                />
            );
        } else {
            throw Error('Unexpected item');
        }
    }

    extractKey = (itm: MessageListItem) => {
        if (itm.type === 'header') {
            return 'header';
        } else if (itm.type === 'footer') {
            return 'footer';
        } else if (itm.type === 'date') {
            return 'date-' + itm.day + '-' + itm.month + '-' + itm.year;
        } else if (itm.type === 'message') {
            return itm.message.key;
        } else {
            throw Error('Unexpected item');
        }
    }

    onEndReached = (info: { distanceFromEnd: number }) => {
        this.props.engine.loadBefore();
    }

    render() {
        console.log(this.props.bottomInset);
        return (
            <View flexBasis={0} flexGrow={1}>
                <Image source={require('assets/img_chat.png')} style={{ position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height }} resizeMode="repeat" />

                <FlatList
                    data={this.state.messages}
                    renderItem={this.renderItem}
                    inverted={true}
                    flexBasis={0}
                    flexGrow={1}
                    onEndReachedThreshold={1}
                    onEndReached={this.onEndReached}
                    ref={this.listRef}
                    initialNumToRender={Platform.OS === 'android' ? 0 : undefined}
                    scrollIndicatorInsets={{
                        bottom: this.props.topInset,
                        top: this.props.bottomInset
                    }}
                    keyboardDismissMode="interactive"
                    removeClippedSubviews={true}
                    keyExtractor={this.extractKey}
                    extraData={this.props.bottomInset * 10000 + this.props.topInset}
                    maxToRenderPerBatch={Platform.OS === 'android' ? 3 : undefined}
                />
                {!this.state.loading && this.state.messages.length <= 2 && (
                    <ZSafeAreaView style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 375, height: 375, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('assets/back.png')} resizeMode="stretch" style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }} />
                            <Image source={require('assets/img-messages.png')} style={{ width: 48, height: 42, marginBottom: 13 }} />
                            <Text style={{ color: '#c8c7cc', fontSize: 13, fontWeight: '500' }}>No messages yet</Text>
                        </View>
                    </ZSafeAreaView>
                )}
                <ZSafeAreaView style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} pointerEvents="none">
                    <ZLoader transparent={true} enabled={this.state.loading} />
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