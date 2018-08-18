import * as React from 'react';
import { Day, MessageGroup } from 'openland-engines/messenger/ConversationState';
import { MessageFullFragment } from 'openland-api/Types';
import { View, Text, ListRenderItemInfo, Platform, FlatList, LayoutAnimation } from 'react-native';
import { ZLoader } from '../../../components/ZLoader';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { ZSafeAreaContext } from '../../../components/layout/ZSafeAreaContext';
import { ModelMessage, extractKey } from 'openland-engines/messenger/types';
import { MessageViewSingle } from 'openland-shared/MessageViewSingle';
import { DownloadManagerInstance } from '../../../files/DownloadManager';

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
    message: ModelMessage,
    attach?: 'top' | 'bottom' | 'both'
};

function convertMessages(days: Day[]) {
    let res: MessageListItem[] = [];
    res.unshift({ type: 'header' });
    for (let d of days) {
        res.unshift({ 'type': 'date', day: d.day, month: d.month, year: d.year });
        for (let g of d.messages) {
            let index = 0;
            for (let m of g.messages) {
                let attach: 'top' | 'bottom' | 'both' | undefined;
                if (g.messages.length > 1) {
                    if (index === 0) {
                        attach = 'bottom';
                    } else if (index === g.messages.length - 1) {
                        attach = 'top';
                    } else {
                        attach = 'both';
                    }
                }
                res.unshift({ 'type': 'message', message: m, attach });
                index++;
            }
        }
    }
    res.unshift({ type: 'footer' });
    return res;
}

export interface ConversationMessagesViewProps {
    onEndReached: () => void;
    loaded: boolean;
    messages: Day[];
    engine: ConversationEngine;
    onAvatarPress?: (userId: string) => void;
    onPhotoPress?: (message: MessageFullFragment, view?: View) => void;
}

class ConversationMessagesViewComponent extends React.PureComponent<ConversationMessagesViewProps & { topInset: number, bottomInset: number }> {
    private listRef = React.createRef<FlatList<any>>();

    private renderItem = (src: ListRenderItemInfo<MessageListItem>) => {
        const itm = src.item;
        if (itm.type === 'header') {
            return (
                <View height={this.props.topInset + 48}>
                    <ZLoader appearance="small" transparent={true} enabled={!this.props.loaded && this.props.messages.length !== 0} />
                </View>
            );
        } else if (itm.type === 'footer') {
            return (<View height={this.props.bottomInset} />);
        } else if (itm.type === 'date') {
            return (<DateSeparator day={itm.day} month={itm.month} year={itm.year} />);
        } else if (itm.type === 'message') {
            return (
                <MessageViewSingle
                    onPhotoPress={this.props.onPhotoPress}
                    onAvatarPress={this.props.onAvatarPress}
                    message={itm.message}
                    engine={this.props.engine}
                    attach={itm.attach}
                    downloadManager={DownloadManagerInstance}
                />
            );
        } else {
            throw Error('Unexpected item');
        }
    }

    private extractKey = (itm: MessageListItem) => {
        if (itm.type === 'header') {
            return 'header';
        } else if (itm.type === 'footer') {
            return 'footer';
        } else if (itm.type === 'date') {
            return 'date-' + itm.day + '-' + itm.month + '-' + itm.year;
        } else if (itm.type === 'message') {
            return extractKey(itm.message);
        } else {
            throw Error('Unexpected item');
        }
    }

    private handleEndReached = () => {
        this.props.onEndReached();
    }

    scrollToStart = () => {
        if (this.listRef.current) {
            console.log(LayoutAnimation.Presets.spring);
            LayoutAnimation.configureNext({
                duration: 700,
                update: {
                    type: 'spring',
                    springDamping: 0.4
                },
                create: {
                    type: 'easeInEaseOut',
                    property: 'opacity',
                    duration: 300
                }
            });

            this.listRef.current.scrollToIndex({ index: 0, animated: false });
        }
    }

    render() {
        const messages = convertMessages(this.props.messages);
        return (
            <FlatList
                data={messages}
                renderItem={this.renderItem}
                inverted={true}
                flexBasis={0}
                flexGrow={1}
                onEndReachedThreshold={1}
                onEndReached={this.handleEndReached}
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
        );
    }
}

export class ConversationMessagesView extends React.PureComponent<ConversationMessagesViewProps> {
    ref = React.createRef<ConversationMessagesViewComponent>();

    scrollToStart = () => {
        if (this.ref.current) {
            this.ref.current.scrollToStart();
        }
    }

    render() {
        return (
            <ZSafeAreaContext.Consumer>
                {area => (<ConversationMessagesViewComponent ref={this.ref} {...this.props} bottomInset={area.bottom} topInset={area.top} />)}
            </ZSafeAreaContext.Consumer>
        );
    }
}