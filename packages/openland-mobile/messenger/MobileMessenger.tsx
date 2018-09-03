import * as React from 'react';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { XPStyles } from 'openland-xp/XPStyles';
import { formatDate } from '../utils/formatDate';
import { doSimpleHash } from 'openland-y-utils/hash';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { ASImage } from 'react-native-async-view/ASImage';
import { FastHistoryManager } from 'react-native-fast-navigation/FastHistory';
import { DataSourceMessageItem, DataSourceDateItem } from 'openland-engines/messenger/ConversationEngine';
import { AsyncMessageView } from '../pages/main/components/async/AsyncMessageView';
import { AsyncDateSeparator } from './components/AsyncDateSeparator';

interface ASAvatarProps {
    size: number;
    src?: string | null;
    placeholderKey?: string | null;
    placeholderTitle?: string | null;
}

class ASAvatar extends React.PureComponent<ASAvatarProps> {
    render() {
        if (this.props.src) {
            let url = this.props.src;
            url += '-/scale_crop/' + 256 + 'x' + 256 + '/';
            return (
                <ASImage
                    width={this.props.size}
                    height={this.props.size}
                    source={{ uri: url }}
                    borderRadius={this.props.size / 2}
                />
            );
        }

        let placeholderIndex = 0;
        if (this.props.placeholderKey) {
            placeholderIndex = doSimpleHash(this.props.placeholderKey);
        }
        let placeholderStyle = XPStyles.avatars[placeholderIndex % XPStyles.avatars.length];
        let placeholderText = '?';
        if (this.props.placeholderTitle) {
            placeholderText = extractPlaceholder(this.props.placeholderTitle);
        }
        let textSize = 28;
        if (this.props.size === 40) {
            textSize = 16;
        }
        if (this.props.size === 32) {
            textSize = 14;
        }
        if (this.props.size === 28) {
            textSize = 12;
        }
        if (this.props.size === 30) {
            textSize = 13;
        }
        if (this.props.size === 56) {
            textSize = 26;
        }
        if (this.props.size === 96) {
            textSize = 28;
        }
        if (this.props.size === 36) {
            textSize = 14;
        }

        return (
            <ASFlex
                width={this.props.size}
                height={this.props.size}
                alignItems="center"
                justifyContent="center"
                backgroundColor={placeholderStyle.placeholderColor}
                backgroundGradient={{ start: placeholderStyle.placeholderColorStart, end: placeholderStyle.placeholderColorEnd }}
                borderRadius={this.props.size / 2}
            >
                <ASText fontSize={textSize} color="#fff">{placeholderText}</ASText>
            </ASFlex>
        );
    }
}

class ASCounter extends React.PureComponent<{ value: number | string, muted?: boolean }> {
    render() {
        return (
            <ASFlex borderRadius={8} backgroundColor={XPStyles.colors.brand} height={16}>
                <ASText marginLeft={4} marginRight={4} marginTop={3} color="#fff" lineHeight={12} fontSize={12}>{this.props.value + ''}</ASText>
            </ASFlex>
        );
    }
}

class DialogItemViewAsync extends React.PureComponent<{ item: DialogDataSourceItem, onPress: (id: string) => void }> {

    handlePress = () => {
        this.props.onPress(this.props.item.key);
    }

    render() {
        let item = this.props.item;
        let showSenderName = item.message && (!(item.isOut && item.type === 'PrivateConversation'));
        return (
            <ASFlex height={80} flexDirection="row" highlightColor={XPStyles.colors.selectedListItem} onPress={this.handlePress}>
                <ASFlex width={80} height={80} alignItems="center" justifyContent="center">
                    <ASAvatar
                        src={item.photo}
                        size={60}
                        placeholderKey={item.key}
                        placeholderTitle={item.title}
                    />
                </ASFlex>
                <ASFlex marginRight={10} marginTop={12} marginBottom={12} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch">
                    <ASFlex height={18}>
                        <ASText fontSize={15} height={18} fontWeight={'600'} color="#181818" flexGrow={1} flexBasis={0}>{item.title}</ASText>
                        <ASText fontSize={13} height={18} color="#aaaaaa">{formatDate(item.date)}</ASText>
                    </ASFlex>
                    <ASFlex flexDirection="row" alignItems="stretch" marginTop={2} marginBottom={2} height={38}>
                        <ASFlex flexDirection="column" alignItems="stretch" flexGrow={1} flexBasis={0}>
                            {showSenderName && (<ASText fontSize={14} lineHeight={18} height={18} color="#181818" numberOfLines={1}>{item.sender}</ASText>)}
                            <ASText fontSize={14} height={showSenderName ? 18 : 36} lineHeight={18} color="#7b7b7b" numberOfLines={showSenderName ? 1 : 2}>{item.message}</ASText>
                        </ASFlex>
                        {item.unread > 0 && (
                            <ASFlex marginTop={18} flexShrink={0}>
                                <ASCounter value={item.unread} />
                            </ASFlex>
                        )}
                    </ASFlex>
                </ASFlex>
                <ASFlex overlay={true} flexDirection="row" justifyContent="flex-end" alignItems="flex-end">
                    <ASFlex height={0.5} flexGrow={1} marginLeft={80} backgroundColor={XPStyles.colors.selectedListItem} />
                </ASFlex>
            </ASFlex>
        );
    }
}

export const MobileMessengerContext = React.createContext<MobileMessenger>(undefined as any);

export class MobileMessenger {
    readonly engine: MessengerEngine;
    readonly history: FastHistoryManager;
    readonly dialogs: ASDataView<DialogDataSourceItem>;
    private readonly conversations = new Map<string, ASDataView<DataSourceMessageItem | DataSourceDateItem>>();

    constructor(engine: MessengerEngine, history: FastHistoryManager) {
        this.engine = engine;
        this.history = history;
        this.dialogs = new ASDataView(engine.dialogList.dataSource, (item) => {
            return (
                <DialogItemViewAsync item={item} onPress={this.handleDialogClick} />
            );
        });
    }

    getConversation(id: string) {
        if (!this.conversations.has(id)) {
            let eng = this.engine.getConversation(id);
            this.conversations.set(id, new ASDataView(eng.dataSource, (item) => {
                if (item.type === 'message') {
                    return (<AsyncMessageView message={item} engine={eng} onAvatarPress={this.handleAvatarClick} />);
                } else {
                    return (<AsyncDateSeparator year={item.year} month={item.month} date={item.date} />);
                }
            }));
        }
        return this.conversations.get(id)!!;
    }

    private handleDialogClick = (id: string) => {
        this.history.push('Conversation', { id });
    }
    private handleAvatarClick = (id: string) => {
        this.history.push('ProfileUser', { id });
    }
}