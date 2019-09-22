import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { plural } from 'openland-y-utils/plural';
import LinearGradient from 'react-native-linear-gradient';
import { SlideInputLocalAttachment } from 'openland-engines/feed/types';
import { ZIconButton } from 'openland-mobile/components/ZIconButton';

const styles = StyleSheet.create({
    box: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
    buttons: {
        marginTop: 16,
        flexDirection: 'row'
    } as ViewStyle
});

interface FeedManageSlideAttachmentProps {
    attachment: SlideInputLocalAttachment;
    onEditPress: () => void;
    onDeletePress: () => void;
}

export const FeedManageSlideAttachment = React.memo((props: FeedManageSlideAttachmentProps) => {
    const { attachment, onEditPress, onDeletePress } = props;
    const theme = React.useContext(ThemeContext);
    const title = attachment.__typename === 'SharedRoom' ? attachment.title : attachment.name;
    let subTitle = undefined;

    if (attachment.__typename === 'SharedRoom' && attachment.membersCount && attachment.membersCount > 1) {
        subTitle = plural(attachment.membersCount, ['member', 'members']);
    }

    if (attachment.__typename === 'User' && attachment.primaryOrganization) {
        subTitle = attachment.primaryOrganization.name;
    }

    if (attachment.__typename === 'Organization' && attachment.about) {
        subTitle = attachment.about;
    }

    const content = (
        <>
            {attachment.__typename === 'SharedRoom' && <ZAvatar src={attachment.roomPhoto} placeholderKey={attachment.id} placeholderTitle={attachment.title} size="xx-large" />}
            {attachment.__typename === 'User' || attachment.__typename === 'Organization' && <ZAvatar src={attachment.photo} placeholderKey={attachment.id} placeholderTitle={attachment.name} size="xx-large" />}

            <Text
                style={{ ...TextStyles.Title2, marginTop: 16, color: theme.foregroundPrimary }}
                numberOfLines={1}
                ellipsizeMode="tail"
                allowFontScaling={false}
            >
                {title}
            </Text>

            {!!subTitle && (
                <Text
                    style={{ ...TextStyles.Subhead, marginTop: 4, color: theme.type === 'Light' ? theme.foregroundTertiary : theme.foregroundSecondary }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    allowFontScaling={false}
                >
                    {subTitle}
                </Text>
            )}

            <View style={styles.buttons}>
                <ZIconButton src={require('assets/ic-edit-24.png')} onPress={onEditPress} />
                <ZIconButton src={require('assets/ic-delete-24.png')} onPress={onDeletePress} />
            </View>
        </>
    );

    if (theme.type === 'Light') {
        return (
            <LinearGradient colors={['rgba(242, 243, 245, 0.56)', 'rgba(242, 243, 245, 0)']} style={styles.box}>
                {content}
            </LinearGradient>
        );
    }

    return (
        <View style={styles.box}>
            {content}
        </View>
    );
});