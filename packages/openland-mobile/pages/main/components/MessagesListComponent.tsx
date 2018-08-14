import * as React from 'react';
import { ConversationEngine, ConversationStateHandler } from 'openland-engines/messenger/ConversationEngine';
import { ConversationState, Day, MessageGroup } from 'openland-engines/messenger/ConversationState';
import { View, Image, Text, Dimensions, Platform, FlatList } from 'react-native';
import { ZLoader } from '../../../components/ZLoader';
import { ZAppConfig } from '../../../components/ZAppConfig';
import { MessageView } from 'openland-shared/MessageView';
import { MessageFullFragment } from 'openland-api/Types';
import { ZSafeAreaContext } from '../../../components/layout/ZSafeAreaContext';

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

function convertMessagesFlat(days: Day[]) {
    let res = [];
    res.push({ key: 'footer' });
    for (let d of days) {
        let msgs = [...d.messages];
        msgs.reverse();
        for (let g of d.messages) {
            res.push(g);
        }
    }
    res.push({ key: 'header' });
    res.reverse();
    return res;
}

function convertMessages(days: Day[]) {
    // let res: MessageGroup[] = [];
    // for (let d of days) {
    //     let msgs = [...d.messages];
    //     msgs.reverse();
    //     for (let g of d.messages) {
    //         res.push(g);
    //     }
    // }
    // res.reverse();
    // return res;
    let res: MessagesSection[] = [];
    res.push({ key: 'footer', data: [] });
    for (let d of days) {
        let msgs = [...d.messages];
        msgs.reverse();
        res.push({
            day: d,
            key: d.key,
            data: msgs
        });
    }
    res.push({ key: 'header', data: [] });
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

function dateFormat(date: Day) {
    let now = new Date();
    let prefix = '';
    if (now.getFullYear() !== date.year) {
        prefix = date.year.toString() + ', ';
    }
    if (now.getFullYear() === date.year && now.getMonth() === date.month && now.getDate() === date.day) {
        return 'Today';
    }
    return (prefix + months[date.month] + ' ' + date.day + 'th');
}
class DateSeparator extends React.PureComponent<{ day: Day }> {
    render() {
        return (
            <View flexDirection={'row'}>
                <View height={1} flexGrow={1} backgroundColor="#b9c1cd" opacity={0.6} marginRight={8} marginTop={10} />
                <Text style={{ fontSize: 12, height: 19, lineHeight: 19, textAlignVertical: 'center', color: '#99a2b0' }}>{dateFormat(this.props.day)}</Text>
                <View height={1} flexGrow={1} backgroundColor="#b9c1cd" opacity={0.6} marginLeft={8} marginTop={10} />
            </View>
        );
    }
}

class MessagesList extends React.PureComponent<MessagesListProps & { bottomInset: number, topInset: number }, { loading: boolean, messages: MessagesSection[], messages2: any[], loadingHistoty?: boolean, historyFullyLoaded?: boolean }> implements ConversationStateHandler {
    private unmount: (() => void) | null = null;
    private unmount2: (() => void) | null = null;
    private listRef = React.createRef<FlatList<any>>();

    constructor(props: MessagesListProps & { bottomInset: number, topInset: number }) {
        super(props);
        let initialState = props.engine.getState();
        this.state = {
            loading: initialState.loading,
            messages: convertMessages(initialState.messagesPrepprocessed),
            messages2: convertMessagesFlat(initialState.messagesPrepprocessed)
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
            messages2: convertMessagesFlat(state.messagesPrepprocessed),
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

    renderHeader = (section: any) => {
        if (section.section.key === 'footer') {
            return (<View height={this.props.topInset} />);
        }
        if (section.section.key === 'header') {
            return (<View height={62 + this.props.bottomInset} />);
        }
        return (<DateSeparator day={section.section.day} key={section.section.key} />);
    }

    renderItem = (itm: any) => {
        if (itm.item.key === 'footer') {
            return (
                this.state.loadingHistoty && !this.state.historyFullyLoaded ?
                    (
                        <View height={this.props.topInset + 48}>
                            <ZLoader appearance="small" transparent={true} />
                        </View>
                    )
                    : <View height={this.props.topInset + 48} />
            );
        }
        if (itm.item.key === 'header') {
            return (<View height={62 + this.props.bottomInset} />);
        }
        return (<MessageView key={itm.item.key} onPhotoPress={this.props.onPhotoPress} onAvatarPress={this.props.onAvatarPress} message={itm.item} engine={this.props.engine} />);
    }

    onEndReached = (info: { distanceFromEnd: number }) => {
        this.props.engine.loadBefore();
    }

    render() {
        return (
            <View flexBasis={0} flexGrow={1}>
                <Image source={require('assets/img_chat.png')} style={{ position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height }} resizeMode="repeat" />

                <FlatList
                    data={this.state.messages2}
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
                        top: 54 + this.props.bottomInset
                    }}
                    keyboardDismissMode="interactive"
                    removeClippedSubviews={true}
                    keyExtractor={(item) => item.key}
                    extraData={this.props.bottomInset * 10000 + this.props.topInset}
                    maxToRenderPerBatch={Platform.OS === 'android' ? 3 : undefined}
                />
                {!this.state.loading && this.state.messages2.length <= 2 && (
                    <View style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: 375, height: 375, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('assets/back.png')} resizeMode="stretch" style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }} />
                            <Image source={require('assets/img-messages.png')} style={{ width: 48, height: 42, marginBottom: 13 }} />
                            <Text style={{ color: '#c8c7cc', fontSize: 13, fontWeight: '500' }}>No messages yet</Text>
                        </View>
                    </View>
                )}
                <View position="absolute" left={0} right={0} bottom={ZAppConfig.bottomNavigationBarInset + 54 + this.props.bottomInset} top={ZAppConfig.navigationBarContentInsetSmall} pointerEvents="none">
                    <ZLoader transparent={true} enabled={this.state.loading} />
                </View>
            </View>
        );
    }
}

export const MessagesListComponent = (props: MessagesListProps) => {
    return (
        <ZSafeAreaContext.Consumer>
            {area => (<MessagesList {...props} bottomInset={area.bottom} topInset={area.top} />)}
        </ZSafeAreaContext.Consumer>
    );
};