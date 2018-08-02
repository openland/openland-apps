import * as React from 'react';
import { ConversationEngine, ConversationStateHandler } from 'openland-engines/messenger/ConversationEngine';
import { ConversationState, Day, MessageGroup } from 'openland-engines/messenger/ConversationState';
import { View, Image, SectionList, Text } from 'react-native';
import { MessageComponent } from './MessageComponent';
import { ZLoader } from '../../../components/ZLoader';

export interface MessagesListProps {
    onAvatarPress: (userId: string) => void;
    engine: ConversationEngine;
}

interface MessagesSection {
    day: Day;
    key: string;
    data: MessageGroup[];
}

function convertMessages(days: Day[]): MessagesSection[] {
    let res: MessagesSection[] = [];
    for (let d of days) {
        let msgs = [...d.messages];
        msgs.reverse();
        res.push({
            day: d,
            key: d.key,
            data: msgs
        });
    }
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
                <View height={1} flexGrow={1} backgroundColor="#b9c1cd" opacity={0.6} marginLeft={8} marginTop={10}/>
            </View>
        );
    }
}

export class MessagesListComponent extends React.PureComponent<MessagesListProps, { loading: boolean, messages: MessagesSection[] }> implements ConversationStateHandler {
    private unmount: (() => void) | null = null;
    private unmount2: (() => void) | null = null;
    private listRef = React.createRef<any>();

    constructor(props: MessagesListProps) {
        super(props);
        let initialState = props.engine.getState();
        this.state = { loading: initialState.loading, messages: convertMessages(initialState.messagesPrepprocessed) };
    }

    componentDidMount() {
        this.unmount2 = this.props.engine.engine.mountConversation(this.props.engine.conversationId);
        this.unmount = this.props.engine.subscribe(this);
    }

    onConversationUpdated(state: ConversationState) {
        this.setState({ loading: state.loading, messages: convertMessages(state.messagesPrepprocessed) });
    }

    onMessageSend() {
        if (this.listRef.current) {
            this.listRef.current.scrollToLocation({ sectionIndex: 0, itemIndex: 0, animated: false });
            // this.listRef.current.scrollToIndex({ index: 0, animated: false });
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
                <SectionList
                    sections={this.state.messages}
                    renderSectionFooter={(section) => (<DateSeparator day={section.section.day} key={section.section.key} />)}
                    // stickySectionHeadersEnabled={true}
                    renderItem={(itm) => <MessageComponent key={itm.item.key} onAvatarPress={this.props.onAvatarPress} message={itm.item} engine={this.props.engine} />}
                    inverted={true}
                    flexBasis={0}
                    flexGrow={1}
                    ref={this.listRef}
                    initialNumToRender={0}
                />
                {this.state.loading && <ZLoader />}
            </View>
        );
    }
}