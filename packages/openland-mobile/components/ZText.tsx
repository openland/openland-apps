import * as React from 'react';
import { preprocessText } from 'openland-y-utils/TextProcessor';
import { Text, Linking, StyleProp, TextStyle, Clipboard } from 'react-native';
import { resolveInternalLink } from '../utils/internalLnksResolver';
import { ActionSheet } from './ActionSheet';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';

interface ZTextProps {
    text?: string | null;
    numberOfLines?: number;
    style?: StyleProp<TextStyle>;
    linkify?: boolean;
    onPress?: (link: string) => void;
    onLongPress?: (link: string) => void;
}

export const ZText = (props: ZTextProps) => {

    let theme = useThemeGlobal();

    let openContextMenu = React.useCallback(async (link: string) => {
        ActionSheet.builder().action('Copy', () => Clipboard.setString(link)).show();
    }, []);

    let linkifyPressFallback = React.useCallback((link: string) => {
        return (async () => {
            if (await Linking.canOpenURL(link)) {
                await Linking.openURL(link)
            } else {
                await openContextMenu(link)
            }
        });
    }, []);

    if (props.text) {
        let preprocessed = preprocessText(props.text);
        let parts = preprocessed.map((v, i) => {
            if (v.type === 'new_line') {
                return <Text key={'br-' + i} style={props.style} >{'\n'}</Text>;
            } else if (v.type === 'link') {
                return (
                    <Text
                        key={'link-' + i}
                        style={[props.style, props.linkify && { color: theme.linkColor }]}
                        onLongPress={() => props.onLongPress ? props.onLongPress(v.link!) : openContextMenu(v.link!)}
                        onPress={props.onPress ? () => { props.onPress!(v.link!) } : props.linkify !== false ? resolveInternalLink(v.link!, linkifyPressFallback(v.link!)) : undefined}
                    >
                        {v.text}
                    </Text>
                );
            } else {
                return <Text key={'text-' + i} style={props.style}>{v.text}</Text>;
            }
        });
        return <Text style={props.style} numberOfLines={props.numberOfLines}>{parts}</Text>;
    } else {
        return <Text style={props.style} numberOfLines={props.numberOfLines} />;
    }
}