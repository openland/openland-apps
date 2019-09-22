import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SlideFragment_attachments, SlideFragment_attachments_SharedRoom, SlideFragment_attachments_User } from 'openland-api/Types';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { plural } from 'openland-y-utils/plural';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { useClient } from 'openland-mobile/utils/useClient';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
    box: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
});

interface InnerProps {
    id: string;
    photo?: string | null;
    title: string;
    subtitle?: string;
    action?: () => void;
    actionTitle?: string;
}

const Inner = React.memo((props: InnerProps) => {
    const theme = React.useContext(ThemeContext);
    const { id, photo, title, subtitle, action, actionTitle } = props;

    return (
        <>
            <ZAvatar src={photo} placeholderKey={id} placeholderTitle={title} size="xx-large" />
            <Text
                style={{ ...TextStyles.Title2, marginTop: 16, color: theme.foregroundPrimary }}
                numberOfLines={1}
                ellipsizeMode="tail"
                allowFontScaling={false}
            >
                {title}
            </Text>
            {!!subtitle && (
                <Text
                    style={{ ...TextStyles.Subhead, marginTop: 4, color: theme.type === 'Light' ? theme.foregroundTertiary : theme.foregroundSecondary }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    allowFontScaling={false}
                >
                    {subtitle}
                </Text>
            )}
            {action && !!actionTitle && (
                <View marginTop={16}>
                    <ZRoundedButton title={actionTitle} onPress={action} />
                </View>
            )}
        </>
    );
});

const InnerSharedRoom = React.memo((props: { item: SlideFragment_attachments_SharedRoom }) => {
    const client = useClient();
    const router = getMessenger().history.navigationManager;
    const { id, roomPhoto, title, membersCount, membership, kind } = props.item;

    let action = undefined;
    let actionTitle = undefined;

    if (membership !== 'MEMBER') {
        if (kind === 'PUBLIC') {
            actionTitle = 'Join chat';
            action = async () => {
                startLoader();
                try {
                    await client.mutateRoomJoin({ roomId: id });
                } catch (e) {
                    AlertBlanket.alert(e.message);
                } finally {
                    stopLoader();
                }
            };
        }
    } else {
        actionTitle = 'View chat';
        action = () => router.push('Conversation', { flexibleId: id });
    }

    return (
        <Inner
            id={id}
            photo={roomPhoto}
            title={title}
            subtitle={membersCount && membersCount > 1 ? plural(membersCount, ['member', 'members']) : undefined}
            action={action}
            actionTitle={actionTitle}
        />
    );
});

const InnerUser = React.memo((props: { item: SlideFragment_attachments_User }) => {
    const router = getMessenger().history.navigationManager;
    const { id, photo, name, primaryOrganization } = props.item;

    return (
        <Inner
            id={id}
            photo={photo}
            title={name}
            subtitle={primaryOrganization ? primaryOrganization.name : undefined}
            action={() => router.push('Conversation', { flexibleId: id })}
            actionTitle="Message"
        />
    );
});

interface FeedSlideAttachmentProps {
    attachment: SlideFragment_attachments;
    withText: boolean;
}

export const FeedSlideAttachment = React.memo((props: FeedSlideAttachmentProps) => {
    const { attachment, withText } = props;
    const theme = React.useContext(ThemeContext);

    const content = (
        <>
            {attachment.__typename === 'SharedRoom' && <InnerSharedRoom item={attachment} />}
            {attachment.__typename === 'User' && <InnerUser item={attachment} />}
        </>
    );

    if (withText && theme.type === 'Light') {
        return (
            <LinearGradient colors={['rgba(242, 243, 245, 0.56)', 'rgba(242, 243, 245, 0)']} style={styles.box}>
                {content}
            </LinearGradient>
        );
    }

    return (
        <View style={styles.box} paddingTop={!withText ? 48 : undefined}>
            {content}
        </View>
    );
});