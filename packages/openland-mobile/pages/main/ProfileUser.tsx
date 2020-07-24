import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZListHero } from '../../components/ZListHero';
import { ZListGroup } from '../../components/ZListGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { View, Platform, Clipboard, Linking, Share } from 'react-native';
import { User_conversation_PrivateRoom } from 'openland-api/spacex.types';
import { useLastSeen } from 'openland-y-utils/LastSeen';
import { NotificationSettings } from './components/NotificationSetting';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { SUPER_ADMIN } from '../Init';
import { Modals } from './modals/Modals';
import Alert from 'openland-mobile/components/AlertBlanket';
import { formatError } from 'openland-y-forms/errorHandling';
import { showReachInfo } from 'openland-mobile/components/ZReach';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZManageButton } from 'openland-mobile/components/ZManageButton';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import Toast from 'openland-mobile/components/Toast';
import { formatPhone } from 'openland-y-utils/auth/formatPhone';
import { useLocalContact } from 'openland-y-utils/contacts/LocalContacts';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

const ProfileUserComponent = React.memo((props: PageProps) => {
    const { user, conversation } = getClient().useUser(
        { userId: props.router.params.id },
        { fetchPolicy: 'cache-and-network' },
    );
    const { isContact } = useLocalContact(user.id, user.inContacts);
    const theme = React.useContext(ThemeContext);

    const handleAddMemberToContacts = React.useCallback(async () => {
        const loader = Toast.loader();
        loader.show();
        await getClient().mutateAddToContacts({ userId: user.id });
        loader.hide();
        Toast.success({ duration: 1000}).show();
    }, []);

    const handleRemoveMemberFromContacts = React.useCallback(async () => {
        const loader = Toast.loader();
        loader.show();
        await getClient().mutateRemoveFromContacts({ userId: user.id });
        loader.hide();
        Toast.success({ duration: 1000}).show();
    }, []);

    const handleAddMemberToGroup = React.useCallback(() => {
        Modals.showGroupMuptiplePicker(props.router, {
            title: 'Add',
            action: async (groups) => {
                if (groups.length > 0) {
                    const loader = Toast.loader();
                    loader.show();
                    try {
                        await getMessenger().engine.client.mutateRoomsInviteUser({
                            userId: user.id,
                            roomIds: groups.map((u) => u.id),
                        });
                    } catch (e) {
                        Alert.alert(formatError(e));
                    }
                    loader.hide();
                }

                props.router.back();
            },
        });
    }, [user.id]);

    const handleScorePress = React.useCallback(() => {
        showReachInfo(user.audienceSize, theme);
    }, [user.audienceSize, theme]);

    const myID = getMessenger().engine.user.id;

    const [sub, accent] = useLastSeen(user);

    const subtitle = sub as string | null;
    const subColor = accent ? theme.accentPrimary : undefined;

    const handleManagePress = React.useCallback(() => {
        let builder = new ActionSheetBuilder();

        builder.action(
            'Copy link',
            () => {
                Clipboard.setString(`https://openland.com/${user.shortname || user.id}`);
                Toast.showCopiedLink();
            },
            false,
            require('assets/ic-link-24.png'),
        );

        builder.show();
    }, [user.shortname, user.id, user.inContacts]);

    const phone = !!user.phone ? formatPhone(user.phone) : undefined;
    const handleContactPress = React.useCallback(async (link: string) => {
        if (await Linking.canOpenURL(link)) {
            await Linking.openURL(link);
        }
    }, []);

    const handleShareProfile = React.useCallback(() => {
        ReactNativeHapticFeedback.trigger('impactLight', { ignoreAndroidSystemSettings: false });

        Share.share({ url: `https://openland.com/${user.shortname || user.id}` });
    }, [user.shortname, user.id]);

    return (
        <>
            <SHeader title={Platform.OS === 'android' ? 'Info' : user.name} />
            <ZManageButton onPress={handleManagePress} />
            <SScrollView>
                <ZListHero
                    photo={user.photo}
                    id={user.id}
                    title={user.name}
                    subtitle={subtitle}
                    subtitleColor={subColor}
                    action={{
                        title: !user.isBot
                            ? myID === user.id
                                ? 'Edit profile'
                                : 'Send message'
                            : 'Open messages',
                        onPress: () => {
                            if (myID === user.id) {
                                props.router.push('SettingsProfile');
                            } else {
                                props.router.pushAndReset('Conversation', {
                                    flexibleId: props.router.params.id,
                                });
                            }
                        },
                    }}
                    score={
                        !user.isBot && user.audienceSize > 0
                            ? {
                                  value: user.audienceSize,
                                  onPress: handleScorePress,
                              }
                            : undefined
                    }
                />

                <ZListGroup header="About" headerMarginTop={0}>
                    {!!user.about && <ZListItem multiline={true} text={user.about} copy={true} />}
                    {!!user.about && <View height={10} />}
                    {!!user.shortname && (
                        <ZListItem
                            title="Username"
                            text={'@' + user.shortname}
                            tall={true}
                            onPress={handleShareProfile}
                            onLongPress={handleShareProfile}
                        />
                    )}
                    {!!user.email && (
                        <ZListItem
                            title="Email"
                            text={user.email}
                            textStyle={{ color: theme.accentPrimary }}
                            onPress={() => handleContactPress(`mailto:${user.email}`)}
                            tall={true}
                            copy={true}
                        />
                    )}
                    {!!phone && (
                        <ZListItem
                            title="Phone"
                            text={phone}
                            textStyle={{ color: theme.accentPrimary }}
                            textToCopy={phone}
                            tall={true}
                            copy={true}
                            onPress={() => handleContactPress(`tel:${phone}`)}
                        />
                    )}
                    {!!user.website && (
                        <ZListItem
                            title="Website"
                            text={user.website}
                            linkify={true}
                            tall={true}
                            copy={true}
                        />
                    )}
                    {!!user.location && (
                        <ZListItem title="Location" text={user.location} tall={true} copy={true} />
                    )}
                    {!!user.instagram && (
                        <ZListItem
                            title="Instagram"
                            text={user.instagram}
                            linkify={true}
                            tall={true}
                            copy={true}
                        />
                    )}
                    {!!user.twitter && (
                        <ZListItem
                            title="Twitter"
                            text={user.twitter}
                            linkify={true}
                            tall={true}
                            copy={true}
                        />
                    )}
                    {!!user.facebook && (
                        <ZListItem
                            title="Facebook"
                            text={user.facebook}
                            linkify={true}
                            tall={true}
                            copy={true}
                        />
                    )}
                    {!!user.linkedin && (
                        <ZListItem
                            title="LinkedIn"
                            text={user.linkedin}
                            linkify={true}
                            tall={true}
                            copy={true}
                        />
                    )}
                </ZListGroup>

                {/* {Platform.OS !== 'ios' && <ProfileDonationGroup name={user.firstName} userId={user.id} shouldHide={user.isYou} />} */}

                {!!user.primaryOrganization && (
                    <ZListGroup header="Organization">
                        <ZListItem
                            leftAvatar={{
                                photo: user.primaryOrganization.photo,
                                id: user.primaryOrganization.id,
                                title: user.primaryOrganization.name,
                            }}
                            text={user.primaryOrganization.name}
                            subTitle={user.primaryOrganization.about}
                            path="ProfileOrganization"
                            pathParams={{ id: user.primaryOrganization.id }}
                        />
                    </ZListGroup>
                )}

                {myID !== user.id && (
                    <ZListGroup header="Settings">
                        <NotificationSettings
                            id={(conversation as User_conversation_PrivateRoom).id}
                            mute={!!(conversation as User_conversation_PrivateRoom).settings.mute}
                        />
                        {conversation && conversation.__typename === 'PrivateRoom' && (
                            <ZListItem
                                leftIcon={require('assets/ic-attach-glyph-24.png')}
                                text="Media, files, links"
                                onPress={() =>
                                    props.router.push('SharedMedia', { chatId: conversation.id })
                                }
                            />
                        )}
                        {SUPER_ADMIN && !user.isBot && (
                            <ZListItem
                                leftIcon={require('assets/ic-group-glyph-24.png')}
                                text="Add to groups"
                                onPress={handleAddMemberToGroup}
                            />
                        )}
                        {!isContact && user.id !== myID && !user.isBot && (
                            <ZListItem
                                leftIcon={require('assets/ic-invite-glyph-24.png')}
                                text="Save to contacts"
                                onPress={handleAddMemberToContacts}
                            />
                        )}
                        {isContact && user.id !== myID && !user.isBot && (
                            <ZListItem
                                appearance="danger"
                                leftIcon={require('assets/ic-invite-off-glyph-24.png')}
                                text="Remove from contacts"
                                onPress={handleRemoveMemberFromContacts}
                            />
                        )}
                    </ZListGroup>
                )}

                <ZListGroup header="Featured in" counter={user.chatsWithBadge.length}>
                    {user.chatsWithBadge.map((item) => (
                        <ZListItem
                            leftAvatar={{
                                photo:
                                    item.chat.__typename === 'PrivateRoom'
                                        ? item.chat.user.photo
                                        : item.chat.photo,
                                id: item.chat.id,
                                title:
                                    item.chat.__typename === 'PrivateRoom'
                                        ? item.chat.user.name
                                        : item.chat.title,
                            }}
                            text={
                                item.chat.__typename === 'PrivateRoom'
                                    ? item.chat.user.name
                                    : item.chat.title
                            }
                            subTitle={item.badge.name}
                            path="Conversation"
                            pathParams={{ id: item.chat.id }}
                        />
                    ))}
                </ZListGroup>
            </SScrollView>
        </>
    );
});

export const ProfileUser = withApp(ProfileUserComponent, { navigationAppearance: 'small-hidden' });
