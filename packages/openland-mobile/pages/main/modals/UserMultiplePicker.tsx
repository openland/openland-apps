import * as React from 'react';
import { PageProps } from '../../../components/PageProps';
import { withApp } from '../../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { View, LayoutChangeEvent, Image, Dimensions, ScrollView } from 'react-native';
import { UserShort } from 'openland-api/spacex.types';
import { SScrollView } from 'react-native-s/SScrollView';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { ZBlurredView } from '../../../components/ZBlurredView';
import { ZTagView } from '../../../components/ZTagView';
import { UserView } from '../components/UserView';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';

export const CheckListBoxWraper = XMemo<{ checked?: boolean, isRadio?: boolean, children: any }>((props) => {
    const theme = React.useContext(ThemeContext);

    return (
        <View flexDirection="row">
            <View flexGrow={1}>
                {props.children}
            </View>
            {props.isRadio ? (
                <View
                    pointerEvents="none"
                    style={{
                        position: 'absolute',
                        right: 16,
                        alignSelf: 'center',
                        width: 22,
                        height: 22,
                        borderRadius: 11,
                        borderWidth: props.checked ? 7 : 2,
                        borderColor: props.checked ? theme.accentPrimary : theme.foregroundQuaternary,
                    }}
                />
            ) : (
                    <View position="absolute" pointerEvents="none" alignSelf="center" right={16} backgroundColor={props.checked ? theme.accentPrimary : theme.backgroundPrimary} opacity={props.checked ? 1 : 0.8} borderColor={props.checked ? theme.accentPrimary : theme.foregroundTertiary} borderWidth={2} borderRadius={RadiusStyles.Medium} width={24} height={24} >
                        {props.checked && <Image marginLeft={3} marginTop={3} source={require('assets/ic-checkmark.png')} style={{ tintColor: theme.foregroundInverted }} />}
                    </View>
                )}

        </View>
    );
});

const UsersList = XMemo<PageProps & { query: string, users: any, onAdd: (user: UserShort) => void }>((props) => {
    const users = getClient().useExplorePeople({ query: props.query });
    const disableUsers = props.router.params.disableUsers || [];
    const excludeUsers = props.router.params.excludeUsers || [];

    return (
        <>
            {props.router.params.inviteLinkButton &&
                <View marginBottom={6} marginTop={18}>
                    <ZListItem
                        leftIcon={require('assets/ic-link-glyph-24.png')}
                        text="Invite with link"
                        onPress={props.router.params.inviteLinkButton.onPress ? props.router.params.inviteLinkButton.onPress : () => {
                            props.router.pushAndRemove(props.router.params.inviteLinkButton.path, props.router.params.inviteLinkButton.pathParams);
                        }}
                    />
                </View>
            }
            {users.items.edges.filter(v => excludeUsers.indexOf(v.node.id) === -1).map((v) => (
                <CheckListBoxWraper checked={!!props.users.find((u: any) => u.id === v.node.id)}>
                    <UserView
                        key={v.node.id}
                        user={v.node}
                        enabled={!(disableUsers.indexOf(v.node.id) > -1)}
                        onPress={() => props.onAdd(v.node)}
                        paddingRight={56}
                    />
                </CheckListBoxWraper>
            ))}
        </>
    );
});

const UserMultiplePickerComponent = XMemo<PageProps>((props) => {

    let theme = React.useContext(ThemeContext);

    let [users, setUsers] = React.useState([] as { id: string, name: string }[]);
    let [query, setQuery] = React.useState('');
    let [searchHeight, serSearchHeight] = React.useState(0);

    let handleRemoveUser = React.useCallback((id: string) => {
        setUsers(users.filter((v) => v.id !== id));
    }, [users]);

    let handleAddUser = React.useCallback((user: UserShort) => {
        if (!users.find((v) => v.id === user.id)) {
            setUsers([...users, user]);
        } else {
            handleRemoveUser(user.id);
        }
    }, [users]);

    let handleSearchLayout = React.useCallback((event: LayoutChangeEvent) => {
        serSearchHeight(event.nativeEvent.layout.height);
    }, []);

    let paramsAction = props.router.params.action;
    let isEmpty = paramsAction.titleEmpty && (users.length <= 0);
    let buttonTitle = isEmpty
        ? paramsAction.titleEmpty
        : users.length > 0
            ? paramsAction.title + ' (' + users.length + ')'
            : paramsAction.title;

    const scrollRef = React.createRef<ScrollView>();

    const handleChange = (value: string) => {
        if (scrollRef && scrollRef.current) {
            (scrollRef.current as any).getNode().scrollTo(0);
        }
        setQuery(value);
    };

    return (
        <>
            <SHeader title={props.router.params.title || 'Pick members'} />
            <SHeaderButton
                key={'bk-' + users.length}
                title={buttonTitle}
                onPress={isEmpty ? () => props.router.params.action.actionEmpty() : async () => {
                    await props.router.params.action.action(users);
                }}
            />
            <View style={{ flexDirection: 'column', width: '100%', height: '100%' }}>
                <SScrollView scrollRef={scrollRef}>
                    <View paddingTop={searchHeight - 16} minHeight={Dimensions.get('screen').height - searchHeight}>
                        <React.Suspense fallback={<ZLoader />}>
                            <UsersList {...props} users={users} query={query} onAdd={handleAddUser} />
                        </React.Suspense>
                    </View>
                </SScrollView>
            </View>
            <ASSafeAreaContext.Consumer>
                {area => (
                    <ZBlurredView onLayout={handleSearchLayout} style={{ position: 'absolute', top: area.top, left: 0, right: 0, flexDirection: 'column', maxHeight: 44 * 4 }}>
                        <ZTagView
                            items={users.map((v) => ({ id: v.id, text: v.name }))}
                            onChange={handleChange}
                            onRemoved={handleRemoveUser}
                            title="Members:"
                            theme={theme}
                        />
                    </ZBlurredView>
                )}
            </ASSafeAreaContext.Consumer>
        </>
    );
});

export const UserMultiplePicker = withApp(UserMultiplePickerComponent, { navigationAppearance: 'small' });