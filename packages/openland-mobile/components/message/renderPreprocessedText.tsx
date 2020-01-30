import * as React from 'react';
import { Text, Linking, Clipboard, Share } from 'react-native';
import { resolveInternalLink } from 'openland-mobile/utils/resolveInternalLink';
import { ActionSheetBuilder } from '../ActionSheet';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { openCalendar, openCalendarContextMenu } from 'openland-mobile/utils/openCalendar';
import { renderSpans } from 'openland-y-utils/spans/renderSpans';
import { Span } from 'openland-y-utils/spans/Span';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { OthersUsersWrapper } from 'openland-mobile/messenger/components/content/OthersUsersWrapper';

const openLinkContextMenu = (link: string) => {
    let builder = new ActionSheetBuilder();

    builder.action('Copy', () => Clipboard.setString(link), false, require('assets/ic-copy-24.png'));
    builder.action('Share', () => Share.share({ message: link }), false, require('assets/ic-share-24.png'));
    builder.action('Open', resolveInternalLink(link, async () => await Linking.openURL(link)), false, require('assets/ic-discover-24.png'));

    builder.show(true);
};

export const renderPreprocessedText = (spans: Span[], onUserPress: (id: string) => void, onGroupPress: (id: string) => void, onOrganizationPress: (id: string) => void, theme: ThemeGlobal) => {
    const SpanView = (props: { span: Span, children?: any }) => {
        const { span, children } = props;

        if (span.type === 'link') {
            return (
                <Text
                    key={'link'}
                    style={{ color: theme.accentPrimary, textDecorationLine: 'underline' }}
                    onPress={resolveInternalLink(span.link, async () => await Linking.openURL(span.link))}
                    onLongPress={() => openLinkContextMenu(span.link)}
                    allowFontScaling={false}
                >
                    {children}
                </Text>
            );
        } else if (span.type === 'mention_user') {
            return (
                <Text
                    key={'mention-user'}
                    style={{ color: theme.accentPrimary }}
                    onPress={() => onUserPress(span.user.id)}
                    allowFontScaling={false}
                >
                    {children}
                </Text>
            );
        } else if (span.type === 'mention_all') {
            return (
                <Text
                    key={'mention-user'}
                    style={{ color: theme.accentPrimary }}
                    allowFontScaling={false}
                >
                    {children}
                </Text>
            );
        } else if (span.type === 'mention_room') {
            return (
                <Text
                    key={'mention-room'}
                    style={{ color: theme.accentPrimary }}
                    onPress={() => onGroupPress(span.room.id)}
                    allowFontScaling={false}
                >
                    {children}
                </Text>
            );
        } else if (span.type === 'mention_organization') {
            return (
                <Text
                    key={'mention-organization'}
                    style={{ color: theme.accentPrimary }}
                    onPress={() => onOrganizationPress(span.organization.id)}
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
                    style={{ fontWeight: FontStyles.Weight.Bold }}
                >
                    {children}
                </Text>
            );
        } else if (span.type === 'date') {
            return (
                <Text
                    key={'date'}
                    style={{ color: theme.accentPrimary }}
                    onPress={openCalendar(span.date)}
                    onLongPress={() => openCalendarContextMenu(span.date, span.textRaw!)}
                    allowFontScaling={false}
                >
                    {children}
                </Text>
            );
        } else if (span.type === 'code_block') {
            return <Text key={'code-block'} style={{ fontFamily: FontStyles.Family.Monospace }} allowFontScaling={false}>{children}</Text>;
        } else if (span.type === 'code_inline') {
            return <Text key={'code-inline'} style={{ fontSize: 14, fontFamily: FontStyles.Family.Monospace, backgroundColor: theme.incomingBackgroundSecondary }} allowFontScaling={false}>{'\u202F'}{children}{'\u202F'}</Text>;
        } else if (span.type === 'insane') {
            return <Text key={'insane'} allowFontScaling={false}>{children}</Text>;
        } else if (span.type === 'irony') {
            return <Text key={'irony'} style={{ fontStyle: 'italic', backgroundColor: theme.incomingBackgroundSecondary, color: theme.incomingForegroundPrimary }} allowFontScaling={false}>{'\u2009'}{children}{'\u2009'}</Text>;
        } else if (span.type === 'italic') {
            return <Text key={'italic'} allowFontScaling={false} style={{ fontStyle: 'italic' }}>{children}</Text>;
        } else if (span.type === 'loud') {
            return <Text key={'loud'} allowFontScaling={false} style={{ fontWeight: FontStyles.Weight.Medium }}>{children}</Text>;
        } else if (span.type === 'rotating') {
            return <Text key={'rotating'} allowFontScaling={false}>{children}</Text>;
        } else if (span.type === 'new_line') {
            return <Text key={'br'}>{'\n'}</Text>;
        } else if (span.type === 'emoji') {
            return <Text key={'emoji'}>{children}</Text>;
        } if (span.type === 'text') {
            return <Text key={'text'}>{span.text}</Text>;
        }

        return props.children ? <Text key={'unknown'}>{props.children}</Text> : null;
    };

    return renderSpans(SpanView, spans);
};