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
import { MyContacts_myContacts_items_user } from 'openland-api/spacex.types';

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
    const initialContacts = client.useMyContacts({ first: 20 }, { fetchPolicy: 'network-only' }).myContacts;
    const [contacts, setContacts] = React.useState(initialContacts.items);
    const [loading, setLoading] = React.useState(false);
    const [loadedFull, setLoadedFull] = React.useState(false);

    const handleContactLongPress = React.useCallback(
        (user: MyContacts_myContacts_items_user) => {
            const builder = ActionSheet.builder();
            builder.cancelable(false);
            builder.action(
                'Send message',
                () => props.router.push('Conversation', { id: user.id }),
                false,
                require('assets/ic-message-24.png'),
            );

            builder.show(true);
        },
        [],
    );

    const handleLoadMore = React.useCallback(async () => {
        if (contacts.length && !loading && !loadedFull) {
            setLoading(true);
            const loaded = (
                await client.queryMyContacts(
                    {
                        first: 10,
                        after: initialContacts.cursor,
                    },
                    { fetchPolicy: 'network-only' },
                )
            ).myContacts;

            setContacts((current) => [
                ...current,
                ...loaded.items.filter(c => !current.find(c2 => c2.user.id === c.user.id)),
            ]);
            if (!loaded.cursor) {
                setLoadedFull(true);
            }
            setLoading(false);
        }
    }, [contacts, loading, loadedFull]);

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
    const isEmpty = contacts.length === 0;
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