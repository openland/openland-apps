import * as React from 'react';
import { Text, Linking, Clipboard, Share, TextStyle } from 'react-native';
import { Span } from 'openland-mobile/utils/TextProcessor';
import { resolveInternalLink } from 'openland-mobile/utils/internalLnksResolver';
import { useNonBreakingSpaces } from 'openland-y-utils/TextProcessor';
import { OthersUsersWrapper } from 'openland-mobile/messenger/components/service/views/OthersUsersWrapper';
import { ActionSheetBuilder } from '../ActionSheet';
import { AppTheme } from 'openland-mobile/themes/themes';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { openCalendar, openCalendarContextMenu } from 'openland-mobile/utils/openCalendar';

let openContextMenu = (link: string) => {
    let builder = new ActionSheetBuilder();

    builder.action('Copy', () => Clipboard.setString(link));
    builder.action('Share', () => Share.share({ message: link }));
    builder.action('Open', resolveInternalLink(link, async () => await Linking.openURL(link)));

    builder.show();
}

export const renderPreprocessedText = (v: Span, i: number, onUserPress: (id: string) => void, onGroupPress: (id: string) => void, theme: AppTheme) => {
    if (v.type === 'new_line') {
        return <Text key={'br-' + i}>{'\n'}</Text>;
    } else if (v.type === 'link') {
        return (
            <Text
                key={'link-' + i}
                style={{ color: theme.accentColor }}
                onPress={resolveInternalLink(v.link, async () => await Linking.openURL(v.link))}
                onLongPress={() => openContextMenu(v.link)}
                allowFontScaling={false}
            >
                {v.text}
            </Text>
        );
    } else if (v.type === 'mention_user') {
        return (
            <Text
                key={'mention-user-' + i}
                style={{ color: theme.accentColor }}
                onPress={() => onUserPress(v.id)}
                allowFontScaling={false}
            >
                {useNonBreakingSpaces(v.text)}
            </Text>
        );
    } else if (v.type === 'mention_room') {
        return (
            <Text
                key={'mention-room-' + i}
                style={{ color: theme.accentColor }}
                onPress={() => onGroupPress(v.id)}
                allowFontScaling={false}
            >
                {useNonBreakingSpaces(v.text)}
            </Text>
        );
    } else if (v.type === 'mention_users') {
        return (
            <OthersUsersWrapper
                key={'mentions-' + i}
                theme={theme}
                onUserPress={uid => onUserPress(uid)}
                users={v.users}
                text={v.text!}
                useAsync={false}
            />
        );
    } else if (v.type === 'bold') {
        return (
            <Text
                key={'text-bold-' + i}
                allowFontScaling={false}
                style={{ fontWeight: TextStyles.weight.bold } as TextStyle}
            >
                {v.text}
            </Text>
        );
    } else if (v.type === 'date') {
        return (
            <Text
                key={'date-' + i}
                style={{ color: theme.accentColor }}
                onPress={openCalendar(v.date)}
                onLongPress={() => openCalendarContextMenu(v.date, v.text!)}
                allowFontScaling={false}
            >
                {v.text}
            </Text>
        );
    } else if (v.type === 'code_block') {
        return <Text key={'code-block-' + i} allowFontScaling={false}>{v.text}</Text>;
    } else if (v.type === 'code_inline') {
        return <Text key={'code-inline-' + i} allowFontScaling={false}>{v.text}</Text>;
    } else if (v.type === 'insane') {
        return <Text key={'insane-' + i} allowFontScaling={false}>{v.text}</Text>;
    } else if (v.type === 'irony') {
        return <Text key={'irony-' + i} allowFontScaling={false}>{v.text}</Text>;
    } else if (v.type === 'italic') {
        return <Text key={'italic-' + i} allowFontScaling={false}>{v.text}</Text>;
    } else if (v.type === 'loud') {
        return <Text key={'loud-' + i} allowFontScaling={false}>{v.text}</Text>;
    } else if (v.type === 'rotating') {
        return <Text key={'rotating-' + i} allowFontScaling={false}>{v.text}</Text>;
    } else {
        return <Text key={'text-' + i} allowFontScaling={false}>{v.text}</Text>;
    }
}