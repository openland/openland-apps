import * as React from 'react';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { ConversationShortFragment } from 'openland-api/Types';
import { ListRenderItemInfo, View, Platform, FlatList, PixelRatio, Dimensions, Animated } from 'react-native';
import { ZFlatList } from '../../../components/ZFlatList';
import { DialogItemView } from 'openland-shared/DialogItemView';
import { AppStyles } from '../../../styles/AppStyles';
import { ZLoader } from '../../../components/ZLoader';
import { formatDate } from 'openland-shared/utils/formatDate';
import { doSimpleHash } from 'openland-y-utils/hash';
import { XPStyles } from 'openland-xp/XPStyles';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { XPListItem } from 'openland-xp/XPListItem';
import { ASView } from 'react-native-async-view/ASView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { ASImage } from 'react-native-async-view/ASImage';
import { ASListView } from 'react-native-async-view/ASListView';

class DialogListSeparator extends React.PureComponent {
    render() {
        return <View marginLeft={80} backgroundColor={AppStyles.separatorColor} height={1} />;
    }
}

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

class DialogItemViewAsync extends React.PureComponent<{ item: ConversationShortFragment, engine: MessengerEngine, onPress: (id: ConversationShortFragment) => void; }> {

    handlePress = () => {
        this.props.onPress(this.props.item);
    }

    render() {
        let messageText: string | undefined = undefined;
        let messageDate: string | undefined = undefined;
        let messageSender: string | undefined = undefined;
        if (this.props.item.topMessage) {
            messageSender = this.props.item.topMessage!!.sender.id === this.props.engine.user.id ? 'You' : this.props.item.topMessage!!.sender.name;
            let date = parseInt(this.props.item.topMessage.date, 10);
            messageDate = formatDate(date);
            if (this.props.item.topMessage.message) {
                messageText = this.props.item.topMessage.message;
            } else if (this.props.item.topMessage.file) {
                if (this.props.item.topMessage.fileMetadata) {
                    if (this.props.item.topMessage.fileMetadata.isImage) {
                        if (this.props.item.topMessage.fileMetadata.imageFormat === 'GIF') {
                            messageText = 'GIF';
                        } else {
                            messageText = 'Photo';
                        }
                    } else {
                        messageText = this.props.item.topMessage.fileMetadata!!.name;
                    }
                } else {
                    messageText = 'Document';
                }
            }
        }
        let showSenderName = this.props.item.topMessage && (!(this.props.item.topMessage.sender.id === this.props.engine.user.id && this.props.item.__typename === 'PrivateConversation'));
        return (
            <ASFlex height={80} flexDirection="row" onPress={this.handlePress} highlightColor={XPStyles.colors.selectedListItem}>
                <ASFlex width={80} height={80} alignItems="center" justifyContent="center">
                    <ASAvatar
                        src={this.props.item.photos.length > 0 ? this.props.item.photos[0] : undefined}
                        size={60}
                        placeholderKey={this.props.item.flexibleId}
                        placeholderTitle={this.props.item.title}
                    />
                </ASFlex>
                <ASFlex marginRight={10} marginTop={12} marginBottom={12} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch">
                    <ASFlex height={18}>
                        <ASText fontSize={15} height={18} fontWeight={'600'} color="#181818" flexGrow={1} flexBasis={0}>{this.props.item.title}</ASText>
                        <ASText fontSize={13} height={18} color="#aaaaaa">{messageDate}</ASText>
                    </ASFlex>
                    <ASFlex flexDirection="row" alignItems="stretch" marginTop={2} marginBottom={2} height={38}>
                        <ASFlex flexDirection="column" alignItems="stretch" flexGrow={1} flexBasis={0}>
                            {showSenderName && (<ASText fontSize={14} lineHeight={18} height={18} color="#181818" numberOfLines={1}>{messageSender}</ASText>)}
                            <ASText fontSize={14} height={showSenderName ? 18 : 36} lineHeight={18} color="#7b7b7b" numberOfLines={showSenderName ? 1 : 2}>{messageText}</ASText>
                        </ASFlex>
                        {this.props.item.unreadCount > 0 && (
                            <ASFlex marginTop={18} flexShrink={0}>
                                <ASCounter value={this.props.item.unreadCount} />
                            </ASFlex>
                        )}
                    </ASFlex>
                </ASFlex>
            </ASFlex>
            // </ASView>
            // </XPListItem>
        );
    }
}

export class DialogListComponent extends React.PureComponent<{ engine: MessengerEngine, dialogs: ConversationShortFragment[], loadingMore?: boolean, onPress?: (id: ConversationShortFragment) => void }> {
    handleItemClick = (id: ConversationShortFragment) => {
        if (this.props.onPress) {
            this.props.onPress(id);
        }
    }
    renderItem = (item: ListRenderItemInfo<ConversationShortFragment>) => {
        // if (Platform.OS === 'ios') {
        // return (<DialogItemViewAsync engine={this.props.engine} item={item.item} onPress={this.handleItemClick} />);
        // }
        // return (<DialogItemView item={item.item} onPress={this.handleItemClick} engine={this.props.engine} />);
        return (<DialogItemViewAsync engine={this.props.engine} item={item.item} onPress={this.handleItemClick} />);
    }

    keyExtractor = (item: ConversationShortFragment) => {
        return item.id;
    }

    renderHeader = () => {
        return (
            <View height={4} />
        );
    }

    renderFooter = () => {
        return (
            this.props.loadingMore ?
                (
                    <View height={48} >
                        <ZLoader appearance="small" />
                    </View>
                )
                : <View height={48} />
        );
    }

    loadMore = () => {
        this.props.engine.dialogList.loadNext();
    }

    render() {
        // return (
        //     <ZFlatList
        //         ListHeaderComponent={this.renderHeader}
        //         ListFooterComponent={this.renderFooter}
        //         data={this.props.dialogs}
        //         keyExtractor={this.keyExtractor}
        //         renderItem={this.renderItem}
        //         onEndReached={this.loadMore}
        //         onEndReachedThreshold={1}
        //         ItemSeparatorComponent={DialogListSeparator}
        //         fixedHeight={80}
        //         initialScrollIndex={0}
        //         removeClippedSubviews={true}
        //     />
        // );
        return (
            <ASView style={{ width: '100%', flexGrow: 1, flexBasis: 0 }}>
                <ASFlex flexDirection="column" alignItems="stretch">
                    <ASListView flexGrow={1} contentPaddingTop={100} contentPaddingBottom={100} onScroll={new Animated.Value(10)}>
                        {this.props.dialogs.map((v) => (
                            <DialogItemViewAsync key={v.id} item={v} onPress={this.handleItemClick} engine={this.props.engine} />
                        ))}
                    </ASListView>
                </ASFlex>
            </ASView>
        );
    }
}