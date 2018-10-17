import * as React from 'react';
import { preprocessText } from 'openland-y-utils/TextProcessor';
import { Text, Linking, StyleProp, TextStyle, Alert } from 'react-native';
import { ChannelInviteInfoQuery } from 'openland-api';
import { getMessenger } from '../utils/messenger';
import { startLoader, stopLoader } from './ZGlobalLoader';

export let resolveInternalLink = (link: string, fallback?: () => void) => {
    if (link.includes('openland.com/joinChannel/')) {
        return async () => {
            startLoader();
            try {
                let uuid = link.split('/')[link.split('/').length - 1];
                let info: any = await getMessenger().engine.client.client.query({ query: ChannelInviteInfoQuery.document, variables: { uuid: uuid } });
                if (info.data && info.data.invite) {
                    let channelId = info.data.invite.channel.id;
                    getMessenger().history.navigationManager.pushAndReset('Conversation', { flexibleId: channelId });
                } else {
                    Alert.alert('Invite not found');
                }
            } catch (e) {
                Alert.alert(e.message);
            }
            stopLoader();
        };
    }
    return fallback;
};
export class ZText extends React.PureComponent<{ text?: string | null | undefined, numberOfLines?: number, style?: StyleProp<TextStyle>, linkify?: boolean }> {
    render() {
        if (this.props.text) {
            let preprocessed = preprocessText(this.props.text);
            let parts = preprocessed.map((v, i) => {
                if (v.type === 'new_line') {
                    return <Text key={'br-' + i} >{'\n'}</Text>;
                } else if (v.type === 'link') {
                    return <Text key={'link-' + i} style={{ color: '#654bfa' }} onPress={this.props.linkify !== false ? resolveInternalLink(v.link!, () => Linking.openURL(v.link!!)) : undefined}>{v.text}</Text>;
                } else {
                    return <Text key={'text-' + i}>{v.text}</Text>;
                }
            });
            return <Text style={this.props.style} numberOfLines={this.props.numberOfLines}>{parts}</Text>;
        } else {
            return <Text style={this.props.style} numberOfLines={this.props.numberOfLines} />;
        }
    }
}