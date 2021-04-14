import * as React from 'react';
import { preprocessText } from 'openland-y-utils/TextProcessor';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { Text, Linking, StyleProp, TextStyle, Clipboard } from 'react-native';
import { resolveInternalLink } from '../utils/resolveInternalLink';
import ActionSheet from './ActionSheet';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

interface ZTextProps {
    text?: string | null;
    numberOfLines?: number;
    style?: StyleProp<TextStyle>;
    linkify?: boolean;
    onPress?: (link: string) => void;
    onLongPress?: (link: string) => void;
    onHashTagClick?: (hst: string) => void;
}

export const ZText = (props: ZTextProps) => {
    const router = React.useContext(SRouterContext)!;
    const theme = React.useContext(ThemeContext);

    const openContextMenu = React.useCallback(async (link: string) => {
        ActionSheet.builder().action('Copy', () => Clipboard.setString(link), false, require('assets/ic-copy-24.png')).show();
    }, []);

    const linkifyPressFallback = React.useCallback((link: string) => {
        return (async () => {
            if (await Linking.canOpenURL(link)) {
                await Linking.openURL(link);
            } else {
                await openContextMenu(link);
            }
        });
    }, []);

    const onHashTagPress = React.useCallback((hashtag: string) => {
        if (props.onHashTagClick) {
            return props.onHashTagClick(hashtag);
        }
        router.push('HomeDialogs', { searchValue: hashtag, title: hashtag });
    }, []);

    if (props.text) {
        let preprocessed = preprocessText(props.text);
        let parts = preprocessed.map((v, i) => {
            if (v.type === 'new_line') {
                return <Text key={'br-' + i} style={props.style} allowFontScaling={false}>{'\n'}</Text>;
            } else if (v.type === 'link') {
                const textDecorationLine = theme.accentPrimary === theme.foregroundPrimary ? 'underline' : 'none';
                return (
                    <Text
                        key={'link-' + i}
                        style={[props.style, props.linkify && { color: theme.accentPrimary, textDecorationLine }]}
                        onLongPress={props.linkify !== false ? () => props.onLongPress ? props.onLongPress(v.link!) : openContextMenu(v.link!) : undefined}
                        onPress={props.onPress ? () => { props.onPress!(v.link!); } : props.linkify !== false ? resolveInternalLink(v.link!, linkifyPressFallback(v.link!)) : undefined}
                        allowFontScaling={false}
                    >
                        {v.text}
                    </Text>
                );
            } else if (v.type === 'hashtag') {
                const textDecorationLine = theme.accentPrimary === theme.foregroundPrimary ? 'underline' : 'none';
                return (
                    <Text
                        key={'hashtag-' + i}
                        style={[props.style, props.linkify && { color: theme.accentPrimary, textDecorationLine }]}
                        onPress={props.onPress ? () => { props.onPress!(v.hashtag!); } : () => onHashTagPress(v.hashtag!)}
                        allowFontScaling={false}
                    >
                        {v.text}
                    </Text>
                );
            } else {
                return <Text key={'text-' + i} style={props.style} allowFontScaling={false}>{v.text}</Text>;
            }
        });
        return <Text style={props.style} numberOfLines={props.numberOfLines} allowFontScaling={false}>{parts}</Text>;
    } else {
        return <Text style={props.style} numberOfLines={props.numberOfLines} allowFontScaling={false} />;
    }
};
