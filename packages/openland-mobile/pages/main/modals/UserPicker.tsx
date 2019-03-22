import * as React from 'react';
import { PageProps } from '../../../components/PageProps';
import { withApp } from '../../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { View } from 'react-native';
import { UserShort } from 'openland-api/Types';
import { SScrollView } from 'react-native-s/SScrollView';
import { UserView } from '../components/UserView';
import { XMemo } from 'openland-y-utils/XMemo';
import { CheckListBoxWraper } from './UserMultiplePicker';

const UserPickerComponent = XMemo<PageProps>((props) => {
    let action = props.router.params.action;
    let users: UserShort[] = props.router.params.users;
    let title = props.router.params.title;
    let selectedUser = props.router.params.selectedUser;
    let disableUsers = props.router.params.disableUsers;

    return (
        <>
            <SHeader title={title || 'Pick member'} />
            <View style={{ flexDirection: 'column', width: '100%', height: '100%' }}>
                <SScrollView>
                    {users.map((user) => (
                        <CheckListBoxWraper checked={user.id === selectedUser}>
                            <UserView
                                key={user.id}
                                user={user}
                                enabled={!((disableUsers || []).indexOf(user.id) > -1)}
                                onPress={() => action(user)}
                                paddingRight={56}
                            />
                        </CheckListBoxWraper>
                    ))}
                </SScrollView>
            </View>
        </>
    );
});

export const UserPicker = withApp(UserPickerComponent, { navigationAppearance: 'small' });