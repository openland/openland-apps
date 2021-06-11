import * as React from 'react';
import { View, Linking, Share, Platform, Text } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';

import { withApp } from 'openland-mobile/components/withApp';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { PageProps } from 'openland-mobile/components/PageProps';
import { User_conversation_PrivateRoom } from 'openland-api/spacex.types';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { getMessenger } from 'openland-mobile/utils/messenger';
import Alert from 'openland-mobile/components/AlertBlanket';
import { SUPER_ADMIN } from 'openland-mobile/pages/Init';
import { formatPhone } from 'openland-y-utils/auth/formatPhone';
import { PremiumBadge } from 'openland-mobile/components/PremiumBadge';
import { ZHero } from 'openland-mobile/components/ZHero';
import { SHeader } from 'react-native-s/SHeader';
import { findSocialShortname } from 'openland-y-utils/findSocialShortname';
import { useLastSeenShort } from 'openland-y-utils/LastSeen';
import { ProfileDeleted } from './components/ProfileDeleted';
import { formatAbsoluteDate, formatBirthDay } from 'openland-y-utils/wallet/dateTime';
import { openMapsApp } from 'openland-mobile/utils/openMapsApp';
import { openCalendar } from 'openland-mobile/utils/openCalendar';
import { useUserBanInfo } from 'openland-y-utils/blacklist/LocalBlackList';
import { ZShowMoreText } from 'openland-mobile/components/ZShowMoreText';
import { ZButton } from 'openland-mobile/components/ZButton';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

import { Tabs } from './UserFollowers';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { Modals } from './modals/Modals';
import Toast from 'openland-mobile/components/Toast';
import { formatError } from 'openland-y-forms/errorHandling';
import { UserPhotoUploaderNew } from './components/UserPhotoUploaderNew';
import { useLocalContact } from 'openland-y-utils/contacts/LocalContacts';
import { CurrentVoiceChat } from './components/CurrentVoiceChat';
import { capitalize, useText } from 'openland-mobile/text/useText';

const ProfileUserComponent = React.memo((props: PageProps) => {
    const client = getClient();
    const theme = React.useContext(ThemeContext);
    const { t } = useText();
    const { router } = props;
    const userId = router.params.id;
    const data = client.useUser({ userId }, { fetchPolicy: 'cache-and-network' });
    const user = data.user;
    const conversation = data.conversation as User_conversation_PrivateRoom;
    const { currentVoiceChat } = user;

    const { isBanned } = useUserBanInfo(user.id, user.isBanned, user.isMeBanned);

    const mutualGroups = client.useCommonChatsWithUser(
        { uid: userId, first: 3 },
        { fetchPolicy: 'cache-and-network' },
    ).commonChatsWithUser;

    const localContact = useLocalContact(user.id, user.inContacts);
    const phone = !!user.phone ? formatPhone(user.phone) : undefined;
    const [inContacts, setInContacts] = React.useState(localContact.isContact);
    const [muted, setMuted] = React.useState(conversation.settings.mute);

    const profileType: 'user' | 'bot' | 'my' = !user.isBot
        ? getMessenger().engine.user.id === user.id
            ? 'my'
            : 'user'
        : 'bot';

    const handleSharePress = React.useCallback(() => {
        let link = `https://openland.com/${user.shortname || user.id}`;
        Share.share(
            Platform.select({
                ios: { url: link },
                android: { message: link },
                default: { message: link },
            }),
        );
    }, [user.shortname, user.id]);

    const handleLinkPress = React.useCallback(async (link: string) => {
        if (await Linking.canOpenURL(link)) {
            await Linking.openURL(link);
        }
    }, []);

    const handleContactPress = React.useCallback(async () => {
        setInContacts(!inContacts);
        if (inContacts) {
            await client.mutateRemoveFromContacts({ userId });
        } else {
            await client.mutateAddToContacts({ userId });
        }
    }, [inContacts, userId]);

    const website = React.useMemo(() => findSocialShortname.site(user.website), [user.website]);
    const instagram = React.useMemo(() => findSocialShortname.instagram(user.instagram), [
        user.instagram,
    ]);
    const twitter = React.useMemo(() => findSocialShortname.twitter(user.twitter), [user.twitter]);
    const facebook = React.useMemo(() => findSocialShortname.facebook(user.facebook), [
        user.facebook,
    ]);
    const linkedin = React.useMemo(() => findSocialShortname.linkedin(user.linkedin), [
        user.linkedin,
    ]);

    const [lastseen] = useLastSeenShort(user);

    if (user.isDeleted) {
        return <ProfileDeleted photo={user.photo} id={user.id} title={user.name} />;
    }

    let messageButtonTitle = capitalize(t('message', 'Message'));
    if (profileType === 'my') {
        messageButtonTitle = t('editProfile', 'Edit profile');
    } else if (profileType === 'bot') {
        messageButtonTitle = t('viewMessages', 'View messages');
    }

    const onMessageButtonPress = React.useCallback(() => {
        if (profileType === 'my') {
            router.push('SettingsProfile');
        } else {
            router.pushAndReset('Conversation', { id: conversation.id });
        }
    }, [router, conversation.id, profileType]);

    const onFollowingPress = React.useCallback(() => {
        router.push('UserFollowers', { uid: userId, initialTab: Tabs.FOLLOWING });
    }, [router, userId]);

    const onFollowersPress = React.useCallback(() => {
        router.push('UserFollowers', { uid: userId, initialTab: Tabs.FOLLOWERS });
    }, [router, userId]);

    const onFollowButtonPress = React.useCallback(async () => {
        if (user.followedByMe) {
            Alert.builder()
                .title(t('unfollow', 'Unfollow') + ` ${user.name}`)
                .button(t('cancel', 'Cancel'), 'cancel')
                .action(t('unfollow', 'Unfollow'), 'destructive', async () => {
                    await client.mutateSocialUnfollow({ uid: userId });
                    await client.refetchUser({ userId });
                })
                .show();
        } else {
            await client.mutateSocialFollow({ uid: userId });
            await client.refetchUser({ userId });
        }
    }, [user.followedByMe, userId, t]);

    const onBannedClick = React.useCallback(async () => {
        if (isBanned) {
            await client.mutateUnBanUser({ id: user.id });
        } else {
            await client.mutateBanUser({ id: user.id });
        }
    }, [user.id, isBanned]);

    const onMutePress = React.useCallback(() => {
        setMuted(!muted);
        client.mutateRoomSettingsUpdate({
            roomId: conversation.id,
            settings: { mute: !muted },
        });
    }, [muted]);

    const onMorePress = React.useCallback(() => {
        const builder = new ActionSheetBuilder();

        if (profileType === 'my') {
            builder.view(() => <UserPhotoUploaderNew />);
            builder.action(
                t('savedMessages', 'Saved messages'),
                () => router.push('Conversation', { id: conversation.id }),
                false,
                require('assets/ic-bookmark-24.png'),
            );
        } else {
            if (SUPER_ADMIN) {
                builder.action(
                    t('addToGroups', 'Add to groups'),
                    () => {
                        Modals.showGroupMuptiplePicker(router, {
                            title: t('add', 'Add'),
                            action: async (groups) => {
                                if (groups.length > 0) {
                                    const loader = Toast.loader();
                                    loader.show();
                                    try {
                                        await client.mutateRoomsInviteUser({
                                            userId,
                                            roomIds: groups.map((u) => u.id),
                                        });
                                    } catch (e) {
                                        Alert.alert(formatError(e));
                                    }
                                    loader.hide();
                                }

                                router.back();
                            },
                        });
                    },
                    false,
                    require('assets/ic-group-24.png'),
                );
            }
            if (profileType === 'user') {
                builder.action(
                    inContacts ? t('contactsRemove', 'Remove from contacts') : t('contactsSave', 'Save to contacts'),
                    handleContactPress,
                    false,
                    inContacts ? require('assets/ic-user-remove-24.png') : require('assets/ic-user-add-24.png'),
                );
            }
            builder.action(
                isBanned ? t('unblockPerson', 'Unblock person') : t('blockPerson', 'Block person'),
                onBannedClick,
                false,
                isBanned ? require('assets/ic-unblock-24.png') : require('assets/ic-block-24.png'),
            );
            builder.action(
                t('reportSpam', 'Report spam'),
                () => Modals.showReportSpam({ router, userId }),
                false,
                require('assets/ic-flag-24.png'),
            );
            if (SUPER_ADMIN) {
                builder.action(
                    t('deletePerson', 'Delete person'),
                    () => {
                        Alert.builder()
                            .title(t('deleteUser', 'Delete user') + `?`)
                            .message(t('noUndoneOperation', 'This cannot be undone'))
                            .button(t('cancel', 'Cancel'), 'cancel')
                            .action(t('delete', 'Delete'), 'destructive', async () => {
                                await client.mutateDeleteUser({ id: userId });
                                await client.refetchUser({ userId });
                                setTimeout(() => {
                                    props.router.pushAndReset('Home');
                                }, 200);
                            })
                            .show();
                    },
                    false,
                    require('assets/ic-delete-24.png'),
                );
            }
        }
        builder.action(
            t('share', 'Share'),
            handleSharePress,
            false,
            require('assets/ic-share-24.png'),
        );

        builder.title(t('more', 'More'));
        builder.show(true, { disableBottomSafeArea: true, disableMargins: true });
    }, [userId]);

    const userFollowers = (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
            <Text style={{ ...TextStyles.Body, color: theme.foregroundSecondary, marginRight: 20 }} onPress={onFollowingPress} allowFontScaling={false}>
                <Text style={{ ...TextStyles.Label1, color: theme.foregroundPrimary }}>
                    {user.followingCount}
                </Text>
                <Text> {t('following', 'following').toLowerCase()}</Text>
            </Text>
            <Text style={{ ...TextStyles.Body, color: theme.foregroundSecondary }} onPress={onFollowersPress} allowFontScaling={false}>
                <Text style={{ ...TextStyles.Label1, color: theme.foregroundPrimary }}>
                    {user.followersCount}
                </Text>
                <Text> {t('follower', { count: user.followersCount, defaultValue: 'followers' })}</Text>
            </Text>
        </View>
    );

    return (
        <>
            <SHeader title={Platform.OS === 'android' ? 'Info' : user.name} />
            {profileType !== 'my' && (
                <SHeaderButton
                    title="Mute"
                    priority={2}
                    key={`mute-${muted}`}
                    icon={
                        muted
                            ? require('assets/ic-notifications-24.png')
                            : require('assets/ic-notifications-off-24.png')
                    }
                    onPress={onMutePress}
                />
            )}
            <SHeaderButton
                title={t('more', 'More')}
                priority={1}
                icon={require('assets/ic-more-h-24.png')}
                onPress={onMorePress}
            />
            <SScrollView>
                <ZHero
                    photo={user.photo}
                    id={user.id}
                    online={user.online}
                    title={user.name}
                    userFollowers={userFollowers}
                    badge={lastseen}
                    subtitle={profileType === 'bot' ? t('bot', 'Bot') : undefined}
                    titleIconRightElement={
                        !!user.systemBadge ? (
                            <View
                                style={{
                                    marginLeft: 8,
                                    marginTop: Platform.OS === 'ios' ? 2 : 4,
                                    alignSelf: 'center',
                                }}
                            >
                                <PremiumBadge />
                            </View>
                        ) : undefined
                    }
                >
                    <ZButton
                        title={messageButtonTitle}
                        size="xlarge"
                        style={profileType === 'my' || !user.followedByMe ? 'secondary' : 'primary'}
                        onPress={onMessageButtonPress}
                    />
                    {profileType === 'user' && (
                        <ZButton
                            title={user.followedByMe ? t('following', 'Following') : t('follow', 'Follow')}
                            size="xlarge"
                            marginLeft={16}
                            style={user.followedByMe ? 'secondary' : 'primary'}
                            onPress={onFollowButtonPress}
                        />
                    )}
                </ZHero>

                {currentVoiceChat && currentVoiceChat.speakers.length > 0 && (
                    <CurrentVoiceChat currentVoiceChat={currentVoiceChat} />
                )}

                <ZListGroup header="About" useSpacer={true}>
                    {!!user.about && <ZShowMoreText text={user.about} />}
                    {!!user.shortname && (
                        <ZListItem
                            text={user.shortname}
                            leftIcon={require('assets/ic-at-24.png')}
                            small={true}
                            onPress={handleSharePress}
                            onLongPress={handleSharePress}
                        />
                    )}
                    {!!user.location && (
                        <ZListItem
                            text={user.location}
                            leftIcon={require('assets/ic-geo-24.png')}
                            small={true}
                            copy={true}
                            onPress={() => openMapsApp(user.location)}
                        />
                    )}
                    {!!user.birthDay && (
                        <ZListItem
                            text={formatBirthDay(user.birthDay)}
                            leftIcon={require('assets/ic-birthday-24.png')}
                            small={true}
                            onPress={openCalendar(user.birthDay)}
                        />
                    )}
                    {!!user.joinDate && (
                        <ZListItem
                            text={`Joined ${formatAbsoluteDate(parseInt(user.joinDate, 10), true)}`}
                            leftIcon={require('assets/ic-flag-24.png')}
                            small={true}
                        />
                    )}
                    {!!phone && (
                        <ZListItem
                            text={phone}
                            leftIcon={require('assets/ic-call-24.png')}
                            small={true}
                            copy={true}
                            onPress={() => handleLinkPress(`tel:${phone}`)}
                        />
                    )}
                    {!!user.email && (
                        <ZListItem
                            text={user.email}
                            leftIcon={require('assets/ic-mail-24.png')}
                            small={true}
                            copy={true}
                            onPress={() => handleLinkPress(`mailto:${user.email}`)}
                        />
                    )}
                    {!!website && (
                        <ZListItem
                            text={website.name}
                            textToCopy={website.url}
                            leftIcon={require('assets/ic-link-24.png')}
                            small={true}
                            copy={true}
                            onPress={() => handleLinkPress(website.url)}
                        />
                    )}
                    {!!instagram && (
                        <ZListItem
                            text={instagram.name}
                            textToCopy={instagram.url}
                            leftIcon={require('assets/ic-instagram-24.png')}
                            small={true}
                            copy={true}
                            onPress={() => handleLinkPress(instagram.url)}
                        />
                    )}
                    {!!twitter && (
                        <ZListItem
                            text={twitter.name}
                            textToCopy={twitter.url}
                            leftIcon={require('assets/ic-twitter-24.png')}
                            small={true}
                            copy={true}
                            onPress={() => handleLinkPress(twitter.url)}
                        />
                    )}
                    {!!facebook && (
                        <ZListItem
                            text={facebook.name}
                            textToCopy={facebook.url}
                            leftIcon={require('assets/ic-facebook-24.png')}
                            small={true}
                            copy={true}
                            onPress={() => handleLinkPress(facebook.url)}
                        />
                    )}
                    {!!linkedin && (
                        <ZListItem
                            text={linkedin.name}
                            textToCopy={linkedin.url}
                            leftIcon={require('assets/ic-linkedin-24.png')}
                            small={true}
                            copy={true}
                            onPress={() => handleLinkPress(linkedin.url)}
                        />
                    )}
                </ZListGroup>

                {profileType === 'user' && (
                    <ZListGroup
                        header={t('mutualGroups', 'Mutual groups')}
                        counter={mutualGroups.count}
                        actionRight={
                            mutualGroups.count > 3
                                ? {
                                    title: t('seeAll', 'See all'),
                                    onPress: () => router.push('UserMutualGroups', { userId }),
                                }
                                : undefined
                        }
                        useSpacer={true}
                    >
                        {mutualGroups.items.map((item) => (
                            <ZListItem
                                key={`group-${item.id}`}
                                leftAvatar={{ photo: item.photo, id: item.id, title: item.title }}
                                text={item.title}
                                subTitle={t('member', { count: item.membersCount, defaultValue: 'member' })}
                                path="Conversation"
                                pathParams={{ id: item.id }}
                            />
                        ))}
                    </ZListGroup>
                )}

                {profileType === 'user' && !isBanned && (
                    <>
                        <View style={{ backgroundColor: theme.backgroundTertiary, height: 16 }} />
                        <View style={{ paddingVertical: 4 }}>
                            <ZListItem
                                leftIcon={require('assets/ic-attach-glyph-24.png')}
                                text={t('sharedMediaTitle', 'Media, files, links')}
                                path="SharedMedia"
                                pathParams={{ chatId: conversation.id }}
                            />
                        </View>
                    </>
                )}
            </SScrollView>
        </>
    );
});

export const ProfileUser = withApp(ProfileUserComponent, { navigationAppearance: 'small-hidden' });
