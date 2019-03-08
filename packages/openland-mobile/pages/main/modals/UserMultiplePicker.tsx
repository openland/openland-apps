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
import { getClient } from 'openland-mobile/utils/apolloClient';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { XMemo } from 'openland-y-utils/XMemo';

interface UserMultiplePickerComponentState {
    query: string;
    users: { id: string, name: string }[];
    searchHeight: number;
}

class CheckListBoxWraper extends React.PureComponent<{ checked?: boolean }> {
    render() {
        return (
            <View flexDirection="row">
                <View flexGrow={1}>
                    {this.props.children}
                </View>
                <View position="absolute" pointerEvents="none" alignSelf="center" right={16} backgroundColor={this.props.checked ? '#0084fe' : '#fff'} opacity={this.props.checked ? 1 : 0.8} borderColor={this.props.checked ? '#0084fe' : 'rgba(185,193,205,0.8)'} borderWidth={2} borderRadius={12} width={24} height={24} >
                    {this.props.checked && <Image marginLeft={3} marginTop={3} source={require('assets/ic-checkmark.png')} />}
                </View>
            </View>
        );
    }
}

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

class UserMultiplePickerComponent extends React.PureComponent<PageProps, UserMultiplePickerComponentState> {
    constructor(props: any) {
        super(props);
        this.state = { users: [], query: '', searchHeight: 0 };
    }

    handleChange = (query: string) => {
        this.setState({ query });
    }

    handleAddUser = (user: UserShort) => {
        if (!this.state.users.find((v) => v.id === user.id)) {
            this.setState({ users: [...this.state.users, user] });
        } else {
            this.handleRemoveUser(user.id);
        }
    }

    handleRemoveUser = (id: string) => {
        this.setState({ users: this.state.users.filter((v) => v.id !== id) });
    }

    handleSearchLayout = (event: LayoutChangeEvent) => {
        this.setState({ searchHeight: event.nativeEvent.layout.height });
    }

    render() {
        let paramsAction = this.props.router.params.action;
        let isEmpty = paramsAction.titleEmpty && (this.state.users.length <= 0);
        let buttonTitle = isEmpty ? paramsAction.titleEmpty : paramsAction.title + ' (' + this.state.users.length + ')';
        return (
            <>
                <SHeader title={this.props.router.params.title || 'Pick members'} />
                <SHeaderButton
                    key={'bk-' + this.state.users.length}
                    title={buttonTitle}
                    onPress={isEmpty ? () => this.props.router.params.action.actionEmpty() : async () => {
                        await this.props.router.params.action.action(this.state.users);
                    }}
                />
                <View style={{ flexDirection: 'column', width: '100%', height: '100%' }}>
                    <React.Suspense fallback={<ZLoader />}>
                        <UsersList {...this.props} users={this.state.users} searchHeight={this.state.searchHeight} query={this.state.query} onAdd={this.handleAddUser} />
                    </React.Suspense>
                </View>
                <ASSafeAreaContext.Consumer>
                    {area => (
                        <ZBlurredView onLayout={this.handleSearchLayout} style={{ position: 'absolute', top: area.top, left: 0, right: 0, flexDirection: 'column', maxHeight: 44 * 4 }}>
                            <ZTagView
                                items={this.state.users.map((v) => ({ id: v.id, text: v.name }))}
                                onChange={this.handleChange}
                                onRemoved={this.handleRemoveUser}
                                title="Members:"
                            />
                            <View style={{ height: 1, backgroundColor: AppStyles.separatorColor }} />
                        </ZBlurredView>
                    )}
                </ASSafeAreaContext.Consumer>
            </>
        );
    }
}

export const UserMultiplePicker = withApp(UserMultiplePickerComponent, { navigationAppearance: 'small' });