import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import ActionSheet from 'openland-mobile/components/ActionSheet';
import { withApp } from 'openland-mobile/components/withApp';
import { GlobalSearch } from './components/globalSearch/GlobalSearch';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { Text, Image } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { UserView } from './components/UserView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { SFlatList } from 'react-native-s/SFlatList';
import { SDeferred } from 'react-native-s/SDeferred';
import Toast from 'openland-mobile/components/Toast';
import { MyContacts_myContacts_items_user } from 'openland-api/spacex.types';

// class ContactsManagerImpl {
//     private contacts: Map<string, MyContacts_myContacts_items_user> = new Map;
//     private cursor: string | null = null;
//
//     removeFromContacts(uId: string) {
//         this.contacts.delete(uId);
//     }
//     addToContacts(uId: string, user: MyContacts_myContacts_items_user) {
//         this.contacts.set(uId, user);
//     }
//     getContacts() {
//         return Array.from(this.contacts.values());
//     }
//     setCursor(cursor: string | null) {
//         this.cursor = cursor;
//     }
//     getCursor() {
//         return this.cursor;
//     }
// }
//
// let contactsManager = new ContactsManagerImpl();
//
// export const useContactsManager = () => {
//     return contactsManager;
// };

const ContactsStub = React.memo(() => {
    let theme = React.useContext(ThemeContext);
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
                style={{
                    ...TextStyles.Title2,
                    color: theme.foregroundPrimary,
                    textAlign: 'center',
                    marginBottom: 4,
                }}
                allowFontScaling={false}
            >
                No contacts yet
            </Text>
            <Text
                style={{
                    ...TextStyles.Body,
                    color: theme.foregroundSecondary,
                    textAlign: 'center',
                }}
                allowFontScaling={false}
            >
                Invite your contacts to Openland or add people manually from their profiles, and
                they will appear here
            </Text>
        </ASSafeAreaView>
    );
});

const ContactsList = React.memo((props: PageProps) => {
    const client = getClient();
    const initialContacts = client.useMyContacts({ first: 10 }, { fetchPolicy: 'network-only' }).myContacts;
    const [contacts, setContacts] = React.useState(initialContacts.items);
    const [cursor, setCursor] = React.useState(initialContacts.cursor);
    const [loading, setLoading] = React.useState(false);

    // React.useLayoutEffect(() => {
    //     const filtered = initialContacts.items.filter((i) => i.user.inContacts);
    //     setContacts(filtered);
    //     setCursor(initialContacts.cursor);
    // }, [initialContacts]);

    const handleRemoveMemberFromContacts = React.useCallback(async (userId: string) => {
        const loader = Toast.loader();
        loader.show();
        await client.mutateRemoveFromContacts({ userId: userId });
        await Promise.all([
            client.refetchMyContacts({ first: 10 }),
            client.refetchUser({ userId: userId }),
        ]);
        loader.hide();
    }, []);

    const handleContactLongPress = React.useCallback((user: MyContacts_myContacts_items_user) => {
        const builder = ActionSheet.builder();
        builder.cancelable(false);
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

    const handleLoadMore = React.useCallback(async () => {
        if (cursor && !loading) {
            setLoading(true);
            const loaded = (
                await client.queryMyContacts({
                    first: 20,
                    after: cursor,
                })
            ).myContacts;

            const filtered = loaded.items.filter((i) => i.user.inContacts);

            const newContacts = [
                ...contacts,
                ...filtered,
            ];
            setContacts(newContacts);
            setCursor(loaded.cursor);
            setLoading(false);
        }
    }, [cursor, loading]);

    return (
        <SFlatList
            data={contacts}
            onEndReached={handleLoadMore}
            refreshing={loading}
            keyExtractor={(item, index) => index + '-' + item.user.id}
            renderItem={({ item }) => (
                <UserView
                    user={item.user}
                    showOrganization={false}
                    onPress={() => props.router.push('ProfileUser', { id: item.user.id })}
                    onLongPress={() => handleContactLongPress(item.user)}
                />
            )}
        />
    );
});

const ContactsPage = React.memo((props: PageProps) => {
    const client = getClient();
    const contacts = client.useMyContacts({ first: 1 }, { fetchPolicy: 'network-only' }).myContacts.items;

    const [isEmpty, setIsEmpty] = React.useState(contacts.length === 0);

    React.useLayoutEffect(() => {
        const filter = contacts.filter((i) => i.user.inContacts);
        if (!filter.length) {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
    }, [contacts]);

    const content = isEmpty ? <ContactsStub /> : <ContactsList {...props} />;

    return (
        <>
            <SHeader title="Contacts" />
            <SSearchControler
                searchRender={(p) => (
                    <GlobalSearch
                        query={p.query}
                        router={props.router}
                        onUserPress={(id: string) => props.router.push('ProfileUser', { id: id })}
                    />
                )}
            >
                <React.Suspense fallback={<ZLoader />}>
                    <SDeferred>{content}</SDeferred>
                </React.Suspense>
            </SSearchControler>
        </>
    );
});

export const Contacts = withApp(ContactsPage, { navigationAppearance: 'large' });