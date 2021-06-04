import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { View, Text } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { randomEmptyPlaceholderEmoji } from '../../utils/tolerance';
import { KeyboardSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { UserView } from './components/UserView';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SDeferred } from 'react-native-s/SDeferred';
import { LoaderSpinnerWrapped } from 'openland-mobile/components/LoaderSpinner';
import { useText } from 'openland-mobile/text/useText';

const UserSearchComponent = React.memo((props: PageProps & { query: string, useScroll: boolean }) => {
    let theme = React.useContext(ThemeContext);
    let search = getClient().useExplorePeople({ query: props.query });
    const { t } = useText();

    if (search.items.edges.length === 0) {
        return (
            <KeyboardSafeAreaView>
                <View style={{ flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 22, textAlignVertical: 'center', color: theme.foregroundPrimary }}>{t('nothingFound', 'Nothing found') + randomEmptyPlaceholderEmoji()}</Text>
                </View>
            </KeyboardSafeAreaView>
        );

    }

    if (props.useScroll) {
        return (
            <SScrollView keyboardDismissMode="on-drag">
                <View style={{ flexDirection: 'column', width: '100%' }}>
                    {search.items.edges.map((item) => (
                        <UserView key={item.node.id} user={item.node} onPress={() => props.router.pushAndRemove('Conversation', { flexibleId: item.node.id })} />
                    ))}
                </View>
            </SScrollView>
        );
    } else {
        return (
            <View style={{ flexDirection: 'column', width: '100%' }}>
                {search.items.edges.map((item) => (
                    <UserView key={item.node.id} user={item.node} onPress={() => props.router.pushAndRemove('Conversation', { flexibleId: item.node.id })} />
                ))}
            </View>
        );
    }
});

const ComposeComponent = React.memo((props: PageProps) => {
    return (
        <>
            <SHeader title="New message" hairline="hidden" />
            <SSearchControler
                searchRender={(p) => (
                    <>
                        {p.query.length > 0 && (
                            <UserSearchComponent query={p.query} router={props.router} useScroll={true} />
                        )}
                    </>
                )}
            >
                <SScrollView keyboardDismissMode="interactive">
                    <SDeferred>
                        <ZListGroup>
                            <ZListItem leftIcon={require('assets/ic-group-glyph-24.png')} text="Create group" path="CreateGroupAttrs" />
                        </ZListGroup>
                        <React.Suspense fallback={<LoaderSpinnerWrapped />}>
                            <UserSearchComponent query="" router={props.router} useScroll={false} />
                        </React.Suspense>
                    </SDeferred>
                </SScrollView>
            </SSearchControler>
        </>
    );
});

export const Compose = withApp(ComposeComponent);