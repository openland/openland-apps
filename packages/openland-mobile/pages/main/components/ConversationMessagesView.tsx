import * as React from 'react';
import { Day } from 'openland-engines/messenger/ConversationState';
import { View, Text } from 'react-native';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { ZSafeAreaContext } from '../../../components/layout/ZSafeAreaContext';
import { ModelMessage } from 'openland-engines/messenger/types';
import { ASView } from 'react-native-async-view/ASView';
import { ASListView } from 'react-native-async-view/ASListView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { MobileMessengerContext } from '../../../messenger/MobileMessenger';

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
    loaded: boolean;
    engine: ConversationEngine;
}

export class ConversationMessagesView extends React.PureComponent<ConversationMessagesViewProps> {

    scrollToStart = () => {
        // TODO: Implement
        // if (this.ref.current) {
        //     this.ref.current.scrollToStart();
        // }
    }

    render() {
        return (
            <ZSafeAreaContext.Consumer>
                {area => (<MobileMessengerContext.Consumer>
                    {engine => (
                        <ASView style={{ flexGrow: 1 }}>
                            <ASFlex flexDirection="column" alignItems="stretch">
                                <ASListView
                                    dataView={engine.getConversation(this.props.engine.conversationId)}
                                    inverted={true}
                                    flexGrow={1}
                                    contentPaddingTop={area.top}
                                    contentPaddingBottom={area.bottom}
                                />
                            </ASFlex>
                        </ASView>
                    )}
                </MobileMessengerContext.Consumer>)
                }
            </ZSafeAreaContext.Consumer>
        );
    }
}