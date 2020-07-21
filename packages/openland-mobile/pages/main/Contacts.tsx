import * as React from 'react';
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
import { SFlatList } from 'react-native-s/SFlatList';
import { SDeferred } from 'react-native-s/SDeferred';
import Toast from 'openland-mobile/components/Toast';
import { MyContacts_myContacts_items_user } from 'openland-api/spacex.types';
import { useLocalContacts } from 'openland-y-utils/contacts/LocalContacts';
import { GlobalSearchContacts } from './components/globalSearch/GlobalSearchContacth';

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

const ContactsPage = React.memo((props: PageProps) => {
    const client = getClient();
    const { items: initialItems, cursor: initialAfter } = client.useMyContacts({ first: 20 }, { fetchPolicy: 'cache-and-network' }).myContacts;
    const [items, setItems] = React.useState<MyContacts_myContacts_items_user[]>(initialItems.map(x => x.user));
    const [after, setAfter] = React.useState<string | null>(initialAfter);
    const [loading, setLoading] = React.useState(false);
    const { listenUpdates } = useLocalContacts();

    let hasContacts = items.length > 0;

    const handleRemoveMemberFromContacts = React.useCallback(async (userId: string) => {
        const loader = Toast.loader();
        loader.show();
        await client.mutateRemoveFromContacts({ userId: userId });
        await client.refetchUser({ userId: userId });
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

    const handleLoadMore = async () => {
        if (!loading && after) {
            setLoading(true);
            const { items: newItems, cursor } = (await client.queryMyContacts({ first: 10, after }, { fetchPolicy: 'network-only' })).myContacts;
            setItems(prev => prev.concat(newItems.map(x => x.user)));
            setAfter(cursor);
            setLoading(false);
        }
    };

    React.useEffect(() => {
        return listenUpdates(({ addedUsers, removedUsers }) => {
            setItems(prev => {
                return prev.filter(x => !removedUsers.some(y => y.id === x.id)).concat(addedUsers);
            });
        });
    }, []);

    return (
        <>
            <SHeader title="Contacts" />
            {!hasContacts && (
                <ContactsStub />
            )}
            {hasContacts && (
                <SSearchControler
                    searchRender={(p) => (
                        <GlobalSearchContacts
                            query={p.query}
                            router={props.router}
                        />
                    )}
                >
                    <React.Suspense fallback={<ZLoader />}>
                        <SDeferred>
                            <SFlatList
                                data={items}
                                onEndReached={handleLoadMore}
                                refreshing={loading}
                                keyExtractor={(item, index) => index + '-' + item.id}
                                renderItem={({ item }) => (
                                    <UserView
                                        user={item}
                                        showOrganization={false}
                                        onPress={() => props.router.push('ProfileUser', { id: item.id })}
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