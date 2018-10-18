import * as React from 'react';
import { Platform, Linking, Image, Dimensions } from 'react-native';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { preprocessText } from '../../utils/TextProcessor';
import { ASText } from 'react-native-async-view/ASText';
import { AsyncBubbleView } from './AsyncBubbleView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { formatTime } from '../../utils/formatTime';
import { ASImage } from 'react-native-async-view/ASImage';
import { doSimpleHash } from 'openland-y-utils/hash';
import { XPStyles } from 'openland-xp/XPStyles';
import { layoutMedia } from 'openland-shared/utils/layoutMedia';
import { resolveInternalLink } from '../../components/ZText';

const paddedText = ' ' + '\u00A0'.repeat(Platform.select({ default: 12, ios: 10 }));
const paddedTextOut = ' ' + '\u00A0'.repeat(Platform.select({ default: 16, ios: 13 }));

export class AsyncMessageTextView extends React.PureComponent<{ message: DataSourceMessageItem }> {
    render() {
        let preprocessed = preprocessText(this.props.message.text!);
        let big = false;
        if (this.props.message.text) {
            big = this.props.message.text.length <= 3 && this.props.message.text.search(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g) !== -1;
            big = big || (this.props.message.text.length <= 32 && this.props.message.text.startsWith(':') && this.props.message.text.endsWith(':'));
        }

        let parts = preprocessed.map((v, i) => {
            if (v.type === 'new_line') {
                return <ASText key={'br-' + i} >{'\n'}</ASText>;
            } else if (v.type === 'link') {
                return <ASText key={'link-' + i} color={this.props.message.isOut ? '#fff' : '#654bfa'} onPress={resolveInternalLink(v.link!, () => Linking.openURL(v.link!))} textDecorationLine="underline">{v.text}</ASText>;
            } else {
                return <ASText key={'text-' + i}>{v.text}</ASText>;
            }
        });
        let marginHorizontal = Platform.select({
            default: 8,
            ios: 10
        });
        let placeholderIndex = 0;
        if (this.props.message.senderId) {
            placeholderIndex = doSimpleHash(this.props.message.senderId);
        }
        let placeholderStyle = XPStyles.avatars[placeholderIndex % XPStyles.avatars.length];
        let layout: { width: number, height: number };
        let resolved: any;
        let capInsets = { left: 2, right: 0, top: 1, bottom: 1 };
        if (this.props.message.urlAugmentation) {
            let maxSize = Platform.select({
                default: 400,
                ios: Math.min(Dimensions.get('window').width - 120, 400),
                android: Math.min(Dimensions.get('window').width - 120, 400)
            });
            if (this.props.message.urlAugmentation.photo && this.props.message.urlAugmentation.imageInfo) {
                layout = layoutMedia(this.props.message.urlAugmentation.imageInfo!.imageWidth!, this.props.message.urlAugmentation.imageInfo!.imageHeight!, maxSize, maxSize);
            }

            // for left accent line
            let image = this.props.message.isOut ? require('assets/chat-link-line-my.png') : require('assets/chat-link-line-foreign.png');
            resolved = Image.resolveAssetSource(image);

        }
        return (
            <AsyncBubbleView isOut={this.props.message.isOut} compact={this.props.message.attachBottom}>
                <ASFlex
                    marginLeft={marginHorizontal}
                    marginRight={marginHorizontal}
                    marginTop={7}
                    marginBottom={8}
                    flexDirection="column"
                >
                    {!this.props.message.isOut && !this.props.message.attachTop && <ASText color={placeholderStyle.placeholderColorEnd}>{this.props.message.senderName}</ASText>}
                    <ASText
                        color={this.props.message.isOut ? '#fff' : '#000'}
                        lineHeight={big ? 60 : 20}
                        letterSpacing={-0.3}
                        fontSize={big ? 52 : 16}
                        fontWeight="400"
                    >
                        {parts}
                        {this.props.message.isOut ? paddedTextOut : paddedText}
                    </ASText>

                    {this.props.message.urlAugmentation && (
                        <ASFlex onPress={() => Linking.openURL(this.props.message.urlAugmentation!.url)} flexDirection="column" marginTop={15} marginBottom={15} backgroundPatch={{ source: resolved.uri, scale: resolved.scale, ...capInsets }}>
                            {this.props.message.urlAugmentation.photo && (
                                <ASImage
                                    marginLeft={10}
                                    source={{ uri: this.props.message.urlAugmentation.imageURL }}
                                    width={layout!.width}
                                    height={layout!.height}
                                    borderRadius={10}
                                />
                            )}
                            {!!this.props.message.urlAugmentation.title && <ASText
                                marginLeft={10}
                                color={this.props.message.isOut ? '#fff' : '#000'}
                                lineHeight={big ? 60 : 20}
                                letterSpacing={-0.3}
                                fontSize={18}
                                marginTop={10}
                                fontWeight="500"
                            >
                                {this.props.message.urlAugmentation.title}
                                {this.props.message.isOut ? paddedTextOut : paddedText}
                            </ASText>
                            }
                            {!!this.props.message.urlAugmentation.description && <ASText
                                marginLeft={10}
                                color={this.props.message.isOut ? '#fff' : '#000'}
                                lineHeight={big ? 60 : 20}
                                letterSpacing={-0.3}
                                fontSize={big ? 52 : 16}
                                fontWeight="400"
                            >
                                {this.props.message.urlAugmentation.description}
                            </ASText>}

                        </ASFlex>
                    )}
                </ASFlex>
                <ASFlex
                    overlay={true}
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    marginRight={this.props.message.isOut ? 4 : 8}
                    marginBottom={6}
                >
                    <ASFlex
                        flexDirection="row"
                        height={14}
                    >
                        <ASText
                            fontSize={11}
                            lineHeight={13}
                            color={this.props.message.isOut ? '#fff' : '#8a8a8f'}
                            opacity={this.props.message.isOut ? 0.7 : 0.6}
                        >
                            {formatTime(this.props.message.date)}
                        </ASText>
                        {this.props.message.isOut && (
                            <ASFlex width={18} height={13} marginLeft={2} marginTop={1} justifyContent="flex-start" alignItems="center">
                                {this.props.message.isSending && <ASImage source={require('assets/ic-sending.png')} width={13} height={13} />}
                                {!this.props.message.isSending && <ASImage source={require('assets/ic-sent.png')} width={9} height={8} />}
                            </ASFlex>
                        )}
                    </ASFlex>
                </ASFlex>
            </AsyncBubbleView>
        );
    }
}