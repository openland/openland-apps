import * as React from 'react';
import { PageProps } from '../../../components/PageProps';
import { withApp } from '../../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { View, LayoutChangeEvent, Image, Platform } from 'react-native';
import { AppStyles } from '../../../styles/AppStyles';
import { UserShort } from 'openland-api/Types';
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

export const CheckListBoxWraper = XMemo<{ checked?: boolean, children: any }>((props) => {
    let theme = React.useContext(ThemeContext);
    return (
        <View flexDirection="row">
            <View flexGrow={1}>
                {props.children}
            </View>
            <View position="absolute" pointerEvents="none" alignSelf="center" right={16} backgroundColor={props.checked ? theme.accentColor : theme.backgroundColor} opacity={props.checked ? 1 : 0.8} borderColor={props.checked ? theme.accentColor : theme.accentDisabledColor} borderWidth={2} borderRadius={12} width={24} height={24} >
                {props.checked && <Image marginLeft={3} marginTop={3} source={require('assets/ic-checkmark.png')} style={{ tintColor: theme.textInverseColor }} />}
            </View>
        </View>
    );
})

const UsersList = XMemo<PageProps & { searchHeight: number, query: string, users: any, onAdd: (user: UserShort) => void }>((props) => {
    let users = getClient().useExplorePeople({ query: props.query });
    return (
        <SScrollView marginTop={props.searchHeight}>
            {props.router.params.inviteLinkButton &&
                <View marginBottom={6} marginTop={18}>
                    <ZListItem
                        leftIcon={Platform.OS === 'android' ? require('assets/ic-link-24.png') : require('assets/ic-link-fill-24.png')}
                        text="Invite with a link"
                        onPress={props.router.params.inviteLinkButton.onPress ? props.router.params.inviteLinkButton.onPress : () => {
                            props.router.pushAndRemove(props.router.params.inviteLinkButton.path, props.router.params.inviteLinkButton.pathParams);
                        }}
                    />
                </View>
            }
            {users.items.edges.map((v) => (
                <CheckListBoxWraper checked={!!props.users.find((u: any) => u.id === v.node.id)}>
                    <UserView
                        key={v.node.id}
                        user={v.node}
                        enabled={!((props.router.params.disableUsers || []).indexOf(v.node.id) > -1)}
                        onPress={() => props.onAdd(v.node)}
                        paddingRight={56}
                    />
                </CheckListBoxWraper>
            ))}
        </SScrollView >
    );
});

const UserMultiplePickerComponent = XMemo<PageProps>((props) => {

    let theme = React.useContext(ThemeContext);

    let [users, setUsers] = React.useState([] as { id: string, name: string }[]);
    let [query, setQuery] = React.useState('');
    let [searchHeight, serSearchHeight] = React.useState(0);

    let handleRemoveUser = React.useCallback((id: string) => {
        setUsers(users.filter((v) => v.id !== id));
    }, [users])

    let handleAddUser = React.useCallback((user: UserShort) => {
        if (!users.find((v) => v.id === user.id)) {
            setUsers([...users, user]);
        } else {
            handleRemoveUser(user.id);
        }
    }, [users])

    let handleSearchLayout = React.useCallback((event: LayoutChangeEvent) => {
        serSearchHeight(event.nativeEvent.layout.height);
    }, []);

    let paramsAction = props.router.params.action;
    let isEmpty = paramsAction.titleEmpty && (users.length <= 0);
    let buttonTitle = isEmpty ? paramsAction.titleEmpty : paramsAction.title + ' (' + users.length + ')';
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
                <React.Suspense fallback={<ZLoader />}>
                    <UsersList {...props} users={users} searchHeight={searchHeight} query={query} onAdd={handleAddUser} />
                </React.Suspense>
            </View>
            <ASSafeAreaContext.Consumer>
                {area => (
                    <ZBlurredView onLayout={handleSearchLayout} style={{ position: 'absolute', top: area.top, left: 0, right: 0, flexDirection: 'column', maxHeight: 44 * 4 }}>
                        <ZTagView
                            items={users.map((v) => ({ id: v.id, text: v.name }))}
                            onChange={setQuery}
                            onRemoved={handleRemoveUser}
                            title="Members:"
                            theme={theme}
                        />
                        <View style={{ height: 1, backgroundColor: theme.separatorColor }} />
                    </ZBlurredView>
                )}
            </ASSafeAreaContext.Consumer>
        </>
    );
})

export const UserMultiplePicker = withApp(UserMultiplePickerComponent, { navigationAppearance: 'small' });