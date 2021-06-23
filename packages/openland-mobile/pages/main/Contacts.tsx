import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import Alert from 'openland-mobile/components/AlertBlanket';
import ActionSheet from 'openland-mobile/components/ActionSheet';
import { withApp } from 'openland-mobile/components/withApp';
import { useClient } from 'openland-api/useClient';
import { Image, Linking, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { UserView } from './components/UserView';
import { ThemeContext, useTheme } from 'openland-mobile/themes/ThemeContext';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { SFlatList } from 'react-native-s/SFlatList';
import { SDeferred } from 'react-native-s/SDeferred';
import { ZButton } from 'openland-mobile/components/ZButton';
import Toast from 'openland-mobile/components/Toast';
import { MyContacts_myContacts_items_user } from 'openland-api/spacex.types';
import { useLocalContacts } from 'openland-y-utils/contacts/LocalContacts';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { GlobalSearchContacts } from './components/globalSearch/GlobalSearchContacth';
import { ComponentRefContext } from './Home';
import { getContactsExporter } from '../../components/PhonebookExporter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useText } from 'openland-mobile/text/useText';

const ContactsWasImportStub = React.memo(() => {
    const theme = React.useContext(ThemeContext);
    const { t } = useText();
    const imgSrc = theme.type === 'Light' ? require('assets/art-empty.png') : require('assets/art-empty-dark.png');
    return (
        <ASSafeAreaView
            style={{
                flexGrow: 1,
                paddingHorizontal: 32,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Image
                source={imgSrc}
                style={{ width: 240, height: 140, marginBottom: 12 }}
            />
            <Text
                allowFontScaling={false}
                style={{
                    ...TextStyles.Title2,
                    color: theme.foregroundPrimary,
                    textAlign: 'center',
                    marginBottom: 4,
                }}
            >
                {t('noContacts', 'No contacts yet')}
            </Text>
            <Text
                allowFontScaling={false}
                style={{
                    ...TextStyles.Body,
                    color: theme.foregroundSecondary,
                    textAlign: 'center',
                }}
            >
                {t('inviteContacts', 'Invite your contacts to Openland or add people manually from their profiles,and they will appear here')}
            </Text>
        </ASSafeAreaView>
    );
});

const PrivacyLink = React.memo(({ children }: { children?: any }) => {
    const theme = useTheme();
    const onPress = React.useCallback(() => {
        Linking.openURL('https://openland.com/privacy');
    }, []);
    const textDecorationLine = theme.accentPrimary === theme.foregroundPrimary ? 'underline' : 'none';
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Text style={{ color: theme.accentPrimary, textDecorationLine }}>{children}</Text>
        </TouchableWithoutFeedback>
    );
});

const useAllowContactsAlert = (cb: () => void) => {
    const theme = useTheme();
    const { t, Trans } = useText();
    const handleContactsAllow = async () => {
        const contactsExporter = getContactsExporter();
        await contactsExporter.init(cb);
    };
    return () => {

        const builder = Alert.builder();
        builder.title(t('allowContacts', 'Allow Openland access to your contacts'));
        builder.view(
            <View>
                <Text
                    style={{ ...TextStyles.Body, marginBottom: 16, color: theme.foregroundPrimary }}
                    allowFontScaling={false}
                >
                    <Trans
                        i18nKey="allowContactsDescription"
                        defaults="Find people you already know by allowing Openland to upload and store a copy of your contacts. <PrivacyLink>Privacy policy</PrivacyLink>"
                        components={{ PrivacyLink: <PrivacyLink /> }}
                    />
                </Text>
            </View>,
        );
        builder.cancelable(true);
        builder.button(t('allow', 'Allow'), 'default', () => handleContactsAllow());
        builder.show();
    };
};

const ContactsNoImportStub = React.memo((props: { cb: () => void }) => {
    const theme = React.useContext(ThemeContext);
    const { t } = useText();
    const imgSrc = theme.type === 'Light' ? require('assets/art-crowd.png') : require('assets/art-crowd-dark.png');
    const showAlert = useAllowContactsAlert(props.cb);
    return (
        <ASSafeAreaView
            style={{
                flexGrow: 1,
                paddingHorizontal: 32,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Image
                source={imgSrc}
                style={{ width: 240, height: 140, marginBottom: 12 }}
            />
            <Text
                style={{
                    ...TextStyles.Title2,
                    color: theme.foregroundPrimary,
                    textAlign: 'center',
                    marginBottom: 4,
                }}
                allowFontScaling={false}
            >
                {t('findFriends', 'Find your friends')}
            </Text>
            <Text
                style={{
                    ...TextStyles.Body,
                    color: theme.foregroundSecondary,
                    textAlign: 'center',
                    marginBottom: 16,
                }}
                allowFontScaling={false}
            >
                {t('contactsImportDescription', 'Import contacts from your device to find people you know on Openland')}
            </Text>
            <ZButton title={t('contactsImport', 'Import contacts')} onPress={() => showAlert()} />
        </ASSafeAreaView>
    );
});

const ContactsPage = React.memo((props: PageProps) => {
    const contactsExporter = getContactsExporter();
    const client = useClient();
    const { t } = useText();
    const onlines = getMessenger().engine.getOnlines();
    const scrollRef = React.useContext(ComponentRefContext);
    const { items: initialItems, cursor: initialAfter } = client.useMyContacts(
        { first: 20 },
        { fetchPolicy: 'network-only' },
    ).myContacts;
    const contactsWasExported = client.usePhonebookWasExported({ fetchPolicy: 'network-only' })
        .phonebookWasExported;
    const [items, setItems] = React.useState<MyContacts_myContacts_items_user[]>(
        initialItems.map((x) => x.user),
    );
    const [after, setAfter] = React.useState<string | null>(initialAfter);
    const [loading, setLoading] = React.useState(false);
    const [haveContactsPermission, setHaveContactsPermission] = React.useState(false);
    const { listenUpdates } = useLocalContacts();
    const showAlert = useAllowContactsAlert(() => setHaveContactsPermission(true));

    let hasContacts = items.length > 0;

    React.useEffect(() => {
        (async () => {
            const permissions = await AsyncStorage.getItem('haveContactsPermission');
            if (permissions === 'true') {
                await contactsExporter.init(() => setHaveContactsPermission(true));
            }
        })();
    }, [contactsWasExported]);

    const handleRemoveMemberFromContacts = React.useCallback(async (userId: string) => {
        const loader = Toast.loader();
        loader.show();
        await client.mutateRemoveFromContacts({ userId: userId });
        await client.refetchUser({ userId: userId });
        loader.hide();
        Toast.success({ duration: 1000 }).show();
    }, []);

    const handleContactLongPress = React.useCallback((user: MyContacts_myContacts_items_user) => {
        const builder = ActionSheet.builder();
        builder.title(user.name, 'left');
        builder.action(
            t('sendMessage', 'Send message'),
            () => props.router.push('Conversation', { id: user.id }),
            false,
            require('assets/ic-message-24.png'),
        );

        builder.action(
            t('contactsRemove', 'Remove from contacts'),
            () => handleRemoveMemberFromContacts(user.id),
            false,
            require('assets/ic-invite-off-24.png'),
        );

        builder.show(true);
    }, [t]);

    const handleLoadMore = async () => {
        if (!loading && after) {
            setLoading(true);
            const { items: newItems, cursor } = (
                await client.queryMyContacts({ first: 10, after }, { fetchPolicy: 'network-only' })
            ).myContacts;
            setItems((prev) =>
                prev
                    .concat(
                        newItems.map((x) => x.user).filter((x) => !prev.some((y) => x.id === y.id)),
                    )
                    .sort((a, b) => a.name.localeCompare(b.name, 'en')),
            );
            setAfter(cursor);
            setLoading(false);
        }
    };

    React.useEffect(() => {
        return listenUpdates(({ addedUsers, removedUsers }) => {
            setItems((prev) => {
                const newItems = addedUsers.concat(
                    prev.filter((x) => !removedUsers.some((y) => y.id === x.id)),
                );
                return newItems.sort((a, b) => a.name.localeCompare(b.name, 'en'));
            });
        });
    }, []);

    React.useEffect(() => {
        return onlines.onSingleChange((user: string, online: boolean) => {
            setItems((current) =>
                current.map((item) =>
                    item.id === user && online !== item.online
                        ? { ...item, online, lastSeen: Date.now().toString() }
                        : item,
                ),
            );
        });
    }, [items]);

    return (
        <>
            <SHeader title={t('contacts', 'Contacts')} searchPlaceholder={t('search', 'Search')} />
            {!hasContacts && haveContactsPermission && <ContactsWasImportStub />}
            {!hasContacts && !haveContactsPermission && (
                <ContactsNoImportStub cb={() => setHaveContactsPermission(true)} />
            )}
            {hasContacts && (
                <SSearchControler
                    searchRender={(p) => (
                        <GlobalSearchContacts query={p.query} router={props.router} />
                    )}
                >
                    <React.Suspense fallback={<ZLoader />}>
                        <SDeferred>
                            <SFlatList
                                scrollRef={scrollRef}
                                data={items}
                                onEndReached={handleLoadMore}
                                refreshing={loading}
                                ListHeaderComponent={
                                    !haveContactsPermission
                                        ? () => (
                                            <ZListItem
                                                text={t('contactsImport', 'Import contacts')}
                                                leftIcon={require('assets/ic-cycle-glyph-24.png')}
                                                small={false}
                                                onPress={() => showAlert()}
                                            />
                                        )
                                        : undefined
                                }
                                keyExtractor={(item, index) => index + '-' + item.id}
                                ListFooterComponent={<View style={{ height: 32 }} />}
                                renderItem={({ item }) => (
                                    <UserView
                                        user={item}
                                        onPress={() =>
                                            props.router.push('ProfileUser', { id: item.id })
                                        }
                                        onLongPress={() => handleContactLongPress(item)}
                                    />
                                )}
                            />
                        </SDeferred>
                    </React.Suspense>
                </SSearchControler>
            )}
        </>
    );
});

export const Contacts = withApp(ContactsPage, { navigationAppearance: 'large' });
