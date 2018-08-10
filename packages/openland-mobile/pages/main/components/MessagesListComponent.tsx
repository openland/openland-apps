import * as React from 'react';
import { ConversationEngine, ConversationStateHandler } from 'openland-engines/messenger/ConversationEngine';
import { ConversationState, Day, MessageGroup } from 'openland-engines/messenger/ConversationState';
import { View, Image, SectionList, Text, Dimensions, Platform, FlatList } from 'react-native';
import { ZLoader } from '../../../components/ZLoader';
import { ZAppConfig } from '../../../components/ZAppConfig';
import { ZKeyboardListener } from '../../../components/ZKeyboardListener';
import { MessageView } from 'openland-shared/MessageView';
import { MessageFullFragment } from 'openland-api/Types';

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

export class MessagesList extends React.PureComponent<MessagesListProps & { keyboardHeight: number }, { loading: boolean, messages: MessagesSection[], messages2: any[], loadingHistoty?: boolean, historyFullyLoaded?: boolean }> implements ConversationStateHandler {
    private unmount: (() => void) | null = null;
    private unmount2: (() => void) | null = null;
    private listRef = React.createRef<FlatList<any>>();

    constructor(props: MessagesListProps & { keyboardHeight: number }) {
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

    renderHeader = (section: any) => {
        if (section.section.key === 'footer') {
            return (<View height={ZAppConfig.navigationBarContentInsetSmall} />);
        }
        if (section.section.key === 'header') {
            return (<View height={ZAppConfig.bottomNavigationBarInset + 62 + this.props.keyboardHeight} />);
        }
        return (<DateSeparator day={section.section.day} key={section.section.key} />);
    }

    renderItem = (itm: any) => {
        if (itm.item.key === 'footer') {
            return (
                this.state.loadingHistoty && !this.state.historyFullyLoaded ?
                    (
                        <View height={48}>
                            <ZLoader appearance="small" transparent={true} />
                        </View>
                    )
                    : <View height={48} />
            );
        }
        if (itm.item.key === 'header') {
            return (<View height={ZAppConfig.bottomNavigationBarInset + 62 + this.props.keyboardHeight} />);
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
                        bottom: ZAppConfig.navigationBarContentInsetSmall,
                        top: ZAppConfig.bottomNavigationBarInset + 54 + this.props.keyboardHeight
                    }}
                    keyboardDismissMode="interactive"
                    removeClippedSubviews={true}
                    keyExtractor={(item) => item.key}
                    extraData={this.props.keyboardHeight}
                    maxToRenderPerBatch={Platform.OS === 'android' ? 3 : undefined}
                />
                <View position="absolute" left={0} right={0} bottom={ZAppConfig.bottomNavigationBarInset + 54 + this.props.keyboardHeight} top={ZAppConfig.navigationBarContentInsetSmall} pointerEvents="none">
                    <ZLoader transparent={true} enabled={this.state.loading} />
                </View>
            </View>
        );
    }
}

export const MessagesListComponent = (props: MessagesListProps) => {
    return (
        <ZKeyboardListener>
            {height => (<MessagesList {...props} keyboardHeight={height} />)}
        </ZKeyboardListener>
    );
};