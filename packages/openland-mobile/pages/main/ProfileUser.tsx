import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZListGroup } from '../../components/ZListGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { View, Linking, Share, Platform } from 'react-native';
import { User_conversation_PrivateRoom } from 'openland-api/spacex.types';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { SUPER_ADMIN } from '../Init';
import { Modals } from './modals/Modals';
import Alert from 'openland-mobile/components/AlertBlanket';
import { formatError } from 'openland-y-forms/errorHandling';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import Toast from 'openland-mobile/components/Toast';
import { formatPhone } from 'openland-y-utils/auth/formatPhone';
import { useLocalContact } from 'openland-y-utils/contacts/LocalContacts';
import { ZHero } from 'openland-mobile/components/ZHero';
import { ZHeroAction } from 'openland-mobile/components/ZHeroAction';
import { plural } from 'openland-y-utils/plural';
import { SHeader } from 'react-native-s/SHeader';
import { UserPhotoUploader } from './components/UserPhotoUploader';
import { findSocialShortname } from 'openland-y-utils/findSocialShortname';
import { useLastSeenShort } from 'openland-y-utils/LastSeen';
import { ProfileDeleted } from './components/ProfileDeleted';
import { formatAbsoluteDate, formatBirthDay } from 'openland-mobile/utils/formatDate';
import { openMapsApp } from 'openland-mobile/utils/openMapsApp';
import { openCalendar } from 'openland-mobile/utils/openCalendar';

const ProfileUserComponent = React.memo((props: PageProps) => {
    const client = getClient();
    const { router } = props;
    const userId = router.params.id;
    const data = client.useUser({ userId }, { fetchPolicy: 'cache-and-network' });
    const user = data.user;
    const conversation = data.conversation as User_conversation_PrivateRoom;

    const mutualGroups = client.useCommonChatsWithUser({ uid: userId, first: 3 }, { fetchPolicy: 'cache-and-network' }).commonChatsWithUser;

    const localContact = useLocalContact(user.id, user.inContacts);
    const phone = !!user.phone ? formatPhone(user.phone) : undefined;
    const [inContacts, setInContacts] = React.useState(localContact.isContact);
    const [muted, setMuted] = React.useState(conversation.settings.mute);

    const profileType: 'user' | 'bot' | 'my' = !user.isBot ? (getMessenger().engine.user.id === user.id ? 'my' : 'user') : 'bot';

    const handleContactPress = React.useCallback(async () => {
        setInContacts(!inContacts);
        if (inContacts) {
            await client.mutateRemoveFromContacts({ userId: user.id });
        } else {
            await client.mutateAddToContacts({ userId: user.id });
        }
    }, [inContacts, user.id]);

    const handleSharePress = React.useCallback(() => {
        let link = `https://openland.com/${user.shortname || user.id}`;
        Share.share(
            Platform.select({
                ios: { url: link },
                android: { message: link }
            })
        );
    }, [user.shortname, user.id]);

    const handleManagePress = React.useCallback(() => {
        const builder = new ActionSheetBuilder();

        builder.action(
            'Add to groups',
            () => {
                Modals.showGroupMuptiplePicker(router, {
                    title: 'Add',
                    action: async (groups) => {
                        if (groups.length > 0) {
                            const loader = Toast.loader();
                            loader.show();
                            try {
                                await client.mutateRoomsInviteUser({
                                    userId: user.id,
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

        if (SUPER_ADMIN) {
            builder.action(
                'Report spam',
                () => Modals.showReportSpam({ router, userId }),
                false,
                require('assets/ic-flag-24.png'),
            );
        }

        builder.show();
    }, [user.id]);

    const handleLinkPress = React.useCallback(async (link: string) => {
        if (await Linking.canOpenURL(link)) {
            await Linking.openURL(link);
        }
    }, []);

    const website = React.useMemo(() => findSocialShortname.site(user.website), [user.website]);
    const instagram = React.useMemo(() => findSocialShortname.instagram(user.instagram), [user.instagram]);
    const twitter = React.useMemo(() => findSocialShortname.twitter(user.twitter), [user.twitter]);
    const facebook = React.useMemo(() => findSocialShortname.facebook(user.facebook), [user.facebook]);
    const linkedin = React.useMemo(() => findSocialShortname.linkedin(user.linkedin), [user.linkedin]);

    const [lastseen] = useLastSeenShort(user);

    if (user.isDeleted) {
        return <ProfileDeleted photo={user.photo} id={user.id} title={user.name} />;
    }

    return (
        <>
            <SHeader title={Platform.OS === 'android' ? 'Info' : user.name} />

            <SScrollView>
                <ZHero
                    photo={user.photo}
                    id={user.id}
                    online={user.online}
                    title={user.name}
                    badge={lastseen}
                    subtitle={profileType === 'bot' ? 'Bot' : user.primaryOrganization?.name}
                    actionPrimary={{
                        title: profileType === 'my' ? 'Edit profile' : (profileType === 'bot' ? 'View messages' : 'Message'),
                        style: profileType === 'my' ? 'secondary' : 'primary',
                        onPress: () => {
                            if (profileType === 'my') {
                                router.push('SettingsProfile');
                            } else {
                                router.pushAndReset('Conversation', { id: conversation.id });
                            }
                        }
                    }}
                >
                    {(profileType === 'user' || profileType === 'bot') && (
                        <ZHeroAction
                            icon={muted ? require('assets/ic-notifications-24.png') : require('assets/ic-notifications-off-24.png')}
                            title={muted ? 'Unmute' : 'Mute'}
                            onPress={() => {
                                setMuted(!muted);
                                client.mutateRoomSettingsUpdate({ roomId: conversation.id, settings: { mute: !muted } });
                            }}
                        />
                    )}
                    {profileType === 'user' && (
                        <ZHeroAction
                            icon={inContacts ? require('assets/ic-user-remove-24.png') : require('assets/ic-user-add-24.png')}
                            title={inContacts ? 'Remove' : 'Save'}
                            onPress={handleContactPress}
                        />
                    )}
                    {profileType === 'my' && <UserPhotoUploader />}
                    {profileType === 'my' && (
                        <ZHeroAction
                            icon={require('assets/ic-bookmark-24.png')}
                            title="Saved"
                            onPress={() => router.push('Conversation', { id: conversation.id })}
                        />
                    )}
                    <ZHeroAction
                        icon={require('assets/ic-share-24.png')}
                        title="Share"
                        onPress={handleSharePress}
                    />
                    {SUPER_ADMIN && profileType === 'user' && (
                        <ZHeroAction
                            icon={require('assets/ic-more-h-24.png')}
                            title="More"
                            onPress={handleManagePress}
                        />
                    )}
                </ZHero>

                <ZListGroup header="About" useSpacer={true}>
                    {!!user.about && <ZListItem multiline={true} text={user.about} copy={true} />}
                    {!!user.about && <View height={8} />}
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
                        header="Mutual groups"
                        counter={mutualGroups.count}
                        actionRight={mutualGroups.count > 3 ? {
                            title: 'See all',
                            onPress: () => router.push('UserMutualGroups', { userId })
                        } : undefined}
                        useSpacer={true}
                    >
                        {mutualGroups.items.map((item) => (
                            <ZListItem
                                key={`group-${item.id}`}
                                leftAvatar={{ photo: item.photo, id: item.id, title: item.title }}
                                text={item.title}
                                subTitle={plural(item.membersCount, ['member', 'members'])}
                                path="Conversation"
                                pathParams={{ id: item.id }}
                            />
                        ))}
                    </ZListGroup>
                )}

                {profileType === 'user' && (
                    <ZListGroup useSpacer={true}>
                        <ZListItem
                            leftIcon={require('assets/ic-attach-glyph-24.png')}
                            text="Media, files, links"
                            path="SharedMedia"
                            pathParams={{ chatId: conversation.id }}
                        />
                    </ZListGroup>
                )}
            </SScrollView>
        </>
    );
});

export const ProfileUser = withApp(ProfileUserComponent, { navigationAppearance: 'small-hidden' });
