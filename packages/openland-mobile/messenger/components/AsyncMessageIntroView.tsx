import * as React from 'react';
import { Platform, Linking, Alert } from 'react-native';
import { DataSourceMessageItem } from 'openland-engines/messenger/ConversationEngine';
import { preprocessText } from '../../utils/TextProcessor';
import { ASText } from 'react-native-async-view/ASText';
import { AsyncBubbleView } from './AsyncBubbleView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { formatTime } from '../../utils/formatTime';
import { ASImage } from 'react-native-async-view/ASImage';
import { getMessenger } from '../../utils/messenger';
import { formatBytes } from '../../utils/formatBytes';
import { YMutation } from 'openland-y-graphql/YMutation';
import { MessageSetReactionMutation } from 'openland-api';
import { startLoader, stopLoader } from '../../components/ZGlobalLoader';
import { NavigationManager } from 'react-native-s/navigation/NavigationManager';

const paddedText = ' ' + '\u00A0'.repeat(Platform.select({ default: 12, ios: 10 }));
const paddedTextOut = ' ' + '\u00A0'.repeat(Platform.select({ default: 16, ios: 13 }));

let buttonStyles = {
    'accent': {
        text: '#fff',
        background: '#4747ec',
    },
    'disabled': {
        text: '#666666',
        background: '#e5e8ec',
    },
    'positive_disabled': {
        text: '#65b969',
        background: '#e6f7e6',
    }
};

export class MessageButton extends React.PureComponent<{ icon?: any, text: string, style: 'accent' | 'positive_disabled' | 'disabled', onPress?: () => void }> {
    render() {
        return (
            <ASFlex
                flexDirection="row"
                height={26}
                alignItems="center"
                backgroundColor={buttonStyles[this.props.style].background}
                borderRadius={13}
                marginTop={10}
                marginLeft={5}
                marginRight={10}
            >
                {this.props.icon && <ASImage source={this.props} width={12} height={12} />}
                <ASText
                    marginLeft={12}
                    marginRight={12}
                    fontSize={13}
                    lineHeight={14}
                    textAlign="center"
                    color={buttonStyles[this.props.style].text}

                    onPress={this.props.onPress}
                >
                    {this.props.text}
                </ASText>
            </ASFlex>
        );
    }
}

let renderButtons = (message: DataSourceMessageItem, navigationManager: NavigationManager) => {
    let buttons: any[] = [];

    let reactions = message.reactions || [];
    let accepted = reactions.filter(r => r.reaction === 'accept');
    let passed = reactions.filter(r => r.reaction === 'pass');
    if (message.isOut) {
        if (accepted.length > 0) {
            buttons.push(<MessageButton text={(accepted.length > 1 ? accepted.length : '') + 'ACCEPTED'} style="positive_disabled" />);
        }
        if (passed.length > 0) {
            buttons.push(<MessageButton text={(passed.length > 1 ? passed.length : '') + 'PASSED'} style="positive_disabled" />);
        }
    } else {
        let iAccepted = accepted.filter(r => r.user.id === getMessenger().engine.user.id).length > 0;
        let iPassed = passed.filter(r => r.user.id === getMessenger().engine.user.id).length > 0;
        if (!iAccepted && !iPassed) {
            buttons.push(
                // <YMutation mutation={MessageSetReactionMutation}>
                //     {setReaction =>
                //         <MessageButton
                //             text={(accepted.length > 1 ? accepted.length : '') + 'ACCEPT INTRO'}
                //             style="accent"
                //             onPress={async () => {
                //                 startLoader();
                //                 try {
                //                     await setReaction({ variables: { messageId: message.key, reaction: 'accept' } });
                //                     navigationManager.push('Conversation', { flexibleId: (message.urlAugmentation!.user! as any).id });
                //                 } catch (e) {
                //                     Alert.alert(e.message);
                //                 }
                //                 stopLoader();
                //             }}
                //         />
                //     }
                // </YMutation>
                <MessageButton
                    text={(accepted.length > 1 ? accepted.length : '') + 'ACCEPT INTRO'}
                    style="accent"
                    onPress={async () => {
                        startLoader();
                        try {
                            navigationManager.push('Conversation', { flexibleId: (message.urlAugmentation!.user! as any).id });
                        } catch (e) {
                            Alert.alert(e.message);
                        }
                        stopLoader();
                    }}
                />
            );
        }
        if (accepted.length > 0) {
            let count = accepted.length - (iAccepted ? 1 : 0);
            let str = (iAccepted ? 'YOU' : '') + (count < 2 ? '' : ' +' + count) + ' ACCEPTED';
            buttons.push(<MessageButton text={str} style="positive_disabled" />);
        }
        if (passed.length > 0) {
            let count = passed.length - (iPassed ? 1 : 0);
            let str = (iPassed ? 'YOU' : '') + (count < 2 ? '' : ' +' + count) + ' PASSED';
            buttons.push(<MessageButton text={str} style="disabled" />);
        }
    }

    return buttons.length ? (
        <ASFlex flexDirection="column">
            {buttons}
        </ASFlex>
    ) : null;
};

export class AsyncMessageIntroView extends React.PureComponent<{ message: DataSourceMessageItem, navigationManager: NavigationManager }> {
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
            <>
                <AsyncBubbleView isOut={this.props.message.isOut} compact={this.props.message.attachBottom}>
                    <ASFlex
                        marginLeft={marginHorizontal}
                        marginRight={marginHorizontal}
                        marginTop={7}
                        marginBottom={8}
                        flexDirection="column"
                    >
                        <ASFlex flexDirection="row" marginLeft={7} marginTop={5} marginBottom={10}>
                            <ASImage source={this.props.message.isOut ? require('assets/ic-attach-intro-out.png') : require('assets/ic-attach-intro.png')} width={14} height={17} />
                            <ASText
                                marginLeft={10}
                                fontSize={14}
                                lineHeight={16}
                                fontWeight="600"
                                color={this.props.message.isOut ? '#fff' : '#8a8a8f'}
                            >
                                {'Intro: ' + this.props.message.urlAugmentation!.title}
                            </ASText>
                        </ASFlex>
                        <ASText
                            color={this.props.message.isOut ? '#fff' : '#000'}
                            lineHeight={big ? 60 : 20}
                            letterSpacing={-0.3}
                            fontSize={big ? 52 : 16}
                            marginLeft={7}
                            fontWeight="400"
                        >
                            {parts}
                            {this.props.message.isOut ? paddedTextOut : paddedText}
                        </ASText>

                        {this.props.message.file && <ASFlex flexDirection="row">
                            <ASFlex marginLeft={7} flexDirection="column" width={40} height={40} backgroundColor={this.props.message.isOut ? '#5555ea' : 'rgba(224,227,231,0.5)'} borderRadius={20} alignItems="center" justifyContent="center">
                                <ASImage source={this.props.message.isOut ? require('assets/ic-file-download-my.png') : require('assets/ic-file-download-ios.png')} width={16} height={19} />
                            </ASFlex>

                            <ASFlex flexDirection="column">
                                <ASText
                                    color={this.props.message.isOut ? '#fff' : '#000'}
                                    letterSpacing={-0.3}
                                    fontSize={15}
                                    marginLeft={7}
                                    marginBottom={3}
                                    fontWeight="400"
                                >
                                    {this.props.message.file.fileName}
                                </ASText>
                                <ASText
                                    color={this.props.message.isOut ? '#fff' : '#8a8a8f'}
                                    opacity={0.7}
                                    letterSpacing={-0.3}
                                    fontSize={13}
                                    marginLeft={7}
                                    fontWeight="400"
                                >
                                    {formatBytes(this.props.message.file.fileSize)}
                                </ASText>
                            </ASFlex>
                        </ASFlex>}
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
                {renderButtons(this.props.message, this.props.navigationManager)}
            </>
        );
    }
}