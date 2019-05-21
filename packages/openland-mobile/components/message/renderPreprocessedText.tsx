import * as React from 'react';
import { Text, Linking, Clipboard, Share, TextStyle, Platform } from 'react-native';
import { resolveInternalLink } from 'openland-mobile/utils/internalLnksResolver';
import { useNonBreakingSpaces } from 'openland-y-utils/TextProcessor';
import { OthersUsersWrapper } from 'openland-mobile/messenger/components/service/views/OthersUsersWrapper';
import { ActionSheetBuilder } from '../ActionSheet';
import { AppTheme } from 'openland-mobile/themes/themes';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { openCalendar, openCalendarContextMenu } from 'openland-mobile/utils/openCalendar';
import { renderSpans } from 'openland-y-utils/spans/renderSpans';
import { Span } from 'openland-y-utils/spans/Span';

let openContextMenu = (link: string) => {
    let builder = new ActionSheetBuilder();

    builder.action('Copy', () => Clipboard.setString(link));
    builder.action('Share', () => Share.share({ message: link }));
    builder.action('Open', resolveInternalLink(link, async () => await Linking.openURL(link)));

    builder.show();
}

export const renderPreprocessedText = (spans: Span[], onUserPress: (id: string) => void, onGroupPress: (id: string) => void, theme: AppTheme) => {
    const SpanView = (props: { span: Span, children?: any }) => {
        const { span, children } = props;

        if (span.type === 'link') {
            return (
                <Text
                    key={'link'}
                    style={{ color: theme.accentColor }}
                    onPress={resolveInternalLink(span.link, async () => await Linking.openURL(span.link))}
                    onLongPress={() => openContextMenu(span.link)}
                    allowFontScaling={false}
                >
                    {children}
                </Text>
            );
        } else if (span.type === 'mention_user') {
            return (
                <Text
                    key={'mention-user'}
                    style={{ color: theme.accentColor }}
                    onPress={() => onUserPress(span.user.id)}
                    allowFontScaling={false}
                >
                    {children}
                </Text>
            );
        } else if (span.type === 'mention_room') {
            return (
                <Text
                    key={'mention-room'}
                    style={{ color: theme.accentColor }}
                    onPress={() => onGroupPress(span.id)}
                    allowFontScaling={false}
                >
                    {children}
                </Text>
            );
        } else if (span.type === 'mention_users') {
            return (
                <OthersUsersWrapper
                    key={'mentions'}
                    theme={theme}
                    onUserPress={uid => onUserPress(uid)}
                    users={span.users}
                    useAsync={false}
                >
                    {children}
                </OthersUsersWrapper>
            );
        } else if (span.type === 'bold') {
            return (
                <Text
                    key={'text-bold'}
                    allowFontScaling={false}
                    style={{ fontWeight: TextStyles.weight.bold } as TextStyle}
                >
                    {children}
                </Text>
            );
        } else if (span.type === 'date') {
            return (
                <Text
                    key={'date'}
                    style={{ color: theme.accentColor }}
                    onPress={openCalendar(span.date)}
                    onLongPress={() => openCalendarContextMenu(span.date, span.textRaw!)}
                    allowFontScaling={false}
                >
                    {children}
                </Text>
            );
        } else if (span.type === 'code_block') {
            return <Text key={'code-block'} style={{ fontFamily: TextStyles.family.monospace }} allowFontScaling={false}>{children}</Text>;
        } else if (span.type === 'code_inline') {
            return <Text key={'code-inline'} style={{ fontSize: 14, fontFamily: TextStyles.family.monospace, backgroundColor: theme.codeSpan.background }} allowFontScaling={false}>{theme.codeSpan.paddedText}{children}{theme.codeSpan.paddedText}</Text>;
        } else if (span.type === 'insane') {
            return <Text key={'insane'} allowFontScaling={false}>{children}</Text>;
        } else if (span.type === 'irony') {
            return <Text key={'irony'} style={{ fontStyle: 'italic', backgroundColor: theme.ironySpan.background, color: theme.ironySpan.color }} allowFontScaling={false}>{theme.ironySpan.paddedText}{children}{theme.ironySpan.paddedText}</Text>;
        } else if (span.type === 'italic') {
            return <Text key={'italic'} allowFontScaling={false} style={{ fontStyle: 'italic' }}>{children}</Text>;
        } else if (span.type === 'loud') {
            return <Text key={'loud'} allowFontScaling={false} style={{ fontWeight: TextStyles.weight.medium, fontSize: 20, lineHeight: 24 }}>{children}</Text>;
        } else if (span.type === 'rotating') {
            return <Text key={'rotating'} allowFontScaling={false}>{children}</Text>;
        } else if (span.type === 'new_line') {
            return <Text key={'br'}>{'\n'}</Text>;
        } else if (span.type === 'text') {
            return <Text key={'text'}>{span.text}</Text>;
        }
    
        return props.children ? <span>{props.children}</span> : null;
    }
    
    return renderSpans(SpanView, spans)
}