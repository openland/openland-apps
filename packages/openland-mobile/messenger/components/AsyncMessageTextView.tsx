import * as React from 'react';
import { Platform, Linking } from 'react-native';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { preprocessText } from '../../utils/TextProcessor';
import { ASText } from 'react-native-async-view/ASText';
import { AsyncBubbleView } from './AsyncBubbleView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { formatTime } from '../../utils/formatTime';
import { ASImage } from 'react-native-async-view/ASImage';

const paddedText = ' ' + '\u00A0'.repeat(Platform.select({ default: 12, ios: 10 }));
const paddedTextOut = ' ' + '\u00A0'.repeat(Platform.select({ default: 16, ios: 13 }));

export class AsyncMessageTextView extends React.PureComponent<{ message: DataSourceMessageItem }> {
    render() {
        let preprocessed = preprocessText(this.props.message.text!);
        let parts = preprocessed.map((v, i) => {
            if (v.type === 'new_line') {
                return <ASText key={'br-' + i} >{'\n'}</ASText>;
            } else if (v.type === 'link') {
                return <ASText key={'link-' + i} color={this.props.message.isOut ? '#fff' : '#654bfa'} onPress={() => Linking.openURL(v.link!)} textDecorationLine="underline">{v.text}</ASText>;
            } else {
                return <ASText key={'text-' + i}>{v.text}</ASText>;
            }
        });
        let marginHorizontal = Platform.select({
            default: 8,
            ios: 10
        });
        return (
            <AsyncBubbleView isOut={this.props.message.isOut} compact={this.props.message.attachBottom}>
                <ASFlex
                    marginLeft={marginHorizontal}
                    marginRight={marginHorizontal}
                    marginTop={7}
                    marginBottom={8}
                    flexDirection="column"
                >
                    <ASText
                        color={this.props.message.isOut ? '#fff' : '#000'}
                        lineHeight={20}
                        letterSpacing={-0.3}
                        fontSize={16}
                        fontWeight="400"
                    >
                        {parts}
                        {this.props.message.isOut ? paddedTextOut : paddedText}
                    </ASText>
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