import * as React from 'react';
import { Platform, PermissionsAndroid, AsyncStorage } from 'react-native';
import * as ContactsPermission from 'react-native-contacts';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import ActionSheet from 'openland-mobile/components/ActionSheet';
import { withApp } from 'openland-mobile/components/withApp';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { Image, Text } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { UserView } from './components/UserView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { SFlatList } from 'react-native-s/SFlatList';
import { SDeferred } from 'react-native-s/SDeferred';
import { ZButton } from 'openland-mobile/components/ZButton';
import Toast from 'openland-mobile/components/Toast';
import { MyContacts_myContacts_items_user } from 'openland-api/spacex.types';
import { useLocalContacts } from 'openland-y-utils/contacts/LocalContacts';
import { handlePermissionDismiss } from 'openland-mobile/utils/permissions/handlePermissionDismiss';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { GlobalSearchContacts } from './components/globalSearch/GlobalSearchContacth';
import { ComponentRefContext } from './Home';

const ContactsWasImportStub = React.memo(() => {
    const theme = React.useContext(ThemeContext);
    return (
        <ASSafeAreaView
            flexGrow={1}
            paddingHorizontal={32}
            alignItems="center"
            justifyContent="center"
        >
            <Image
                source={require('assets/img-contacts-empty.png')}
                style={{ width: 270, height: 180, marginBottom: 1 }}
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
                No contacts yet
            </Text>
            <Text
                allowFontScaling={false}
                style={{
                    ...TextStyles.Body,
                    color: theme.foregroundSecondary,
                    textAlign: 'center',
                }}
            >
                Invite your contacts to Openland or add people manually from their profiles, and
                they will appear here
            </Text>
        </ASSafeAreaView>
    );
});

const handleImportPress = async (setPermissions: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (Platform.OS === 'ios') {
        ContactsPermission.checkPermission((errorCheck, permissionCheck) => {
            if (permissionCheck === 'denied') {
                handlePermissionDismiss('contacts');
                return;
            } else {
                setPermissions(true);
            }
        });
    } else if (Platform.OS === 'android') {
        const permission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );
        if (permission === 'never_ask_again') {
            handlePermissionDismiss('contacts');
            return;
        }
        if (permission === 'denied') {
            return;
        } else {
            setPermissions(true);
        }
    }
};

const ContactsNoImportStub = React.memo(
    (props: { setPermissions: React.Dispatch<React.SetStateAction<boolean>> }) => {
        const theme = React.useContext(ThemeContext);
        return (
            <ASSafeAreaView
                flexGrow={1}
                paddingHorizontal={32}
                alignItems="center"
                justifyContent="center"
            >
                <Image
                    source={require('assets/img-contacts-import.png')}
                    style={{ width: 270, height: 180, marginBottom: 12 }}
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
                    Find your friends
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
                    Import contacts from your device to find people you know on Openland
                </Text>
                <ZButton
                    title="Import contacts"
                    onPress={() => handleImportPress(props.setPermissions)}
                />
            </ASSafeAreaView>
        );
    },
);

const ContactsPage = React.memo((props: PageProps) => {
    const client = getClient();
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

    let hasContacts = items.length > 0;

    React.useEffect(() => {
        (async () => {
            const permissions = await AsyncStorage.getItem('haveContactsPermission');
            if (permissions === 'true') {
                setHaveContactsPermission(true);
            }
        })();
    }, []);

    const handleRemoveMemberFromContacts = React.useCallback(async (userId: string) => {
        const loader = Toast.loader();
        loader.show();
        await client.mutateRemoveFromContacts({ userId: userId });
        await client.refetchUser({ userId: userId });
        loader.hide();
    }, []);

    const handleContactLongPress = React.useCallback((user: MyContacts_myContacts_items_user) => {
        const builder = ActionSheet.builder();
        builder.title(user.name, 'left');
        builder.action(
            'Send message',
            () => props.router.push('Conversation', { id: user.id }),
            false,
            require('assets/ic-message-24.png'),
        );

        builder.action(
            'Remove from contacts',
            () => handleRemoveMemberFromContacts(user.id),
            false,
            require('assets/ic-invite-off-24.png'),
        );

        builder.show(true);
    }, []);

    const handleLoadMore = async () => {
        if (!loading && after) {
            setLoading(true);
            const { items: newItems, cursor } = (
                await client.queryMyContacts({ first: 10, after }, { fetchPolicy: 'network-only' })
            ).myContacts;
            setItems((prev) =>
                prev.concat(
                    newItems.map((x) => x.user).filter((x) => !prev.some((y) => x.id === y.id)),
                ),
            );
            setAfter(cursor);
            setLoading(false);
        }
    };

    React.useEffect(() => {
        return listenUpdates(({ addedUsers, removedUsers }) => {
            setItems((prev) => {
                return addedUsers.concat(
                    prev.filter((x) => !removedUsers.some((y) => y.id === x.id)),
                );
            });
        });
    }, []);

    React.useEffect(() => {
        return onlines.onSingleChangeChange((user: string, online: boolean) => {
            setItems((current) =>
                current.map((item) =>
                    item.id === user && online !== item.online
                        ? { ...item, online, lastSeen: Date.now().toString() }
                        : item,
                ),
            );
        });
    }, [items]);

    const ImportItem = () => (
        <ZListItem
            text="Import contacts"
            leftIcon={require('assets/ic-cycle-glyph-24.png')}
            small={false}
            onPress={() => handleImportPress(setHaveContactsPermission)}
        />
    );

    return (
        <>
            <SHeader title="Contacts" searchPlaceholder="Search" />
            {!hasContacts && haveContactsPermission && <ContactsWasImportStub />}
            {!hasContacts && !haveContactsPermission && (
                <ContactsNoImportStub setPermissions={setHaveContactsPermission} />
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
                                    !haveContactsPermission && !contactsWasExported
                                        ? ImportItem
                                        : undefined
                                }
                                keyExtractor={(item, index) => index + '-' + item.id}
                                renderItem={({ item }) => (
                                    <UserView
                                        user={item}
                                        showOrganization={false}
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
