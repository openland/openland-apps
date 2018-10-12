import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { YMutation } from 'openland-y-graphql/YMutation';
import { ChatCreateGroupMutation, ChatSearchForComposeMobileQuery } from 'openland-api';
import { View, LayoutChangeEvent } from 'react-native';
import { AppStyles } from '../../styles/AppStyles';
import { ZTagView } from '../../components/ZTagView';
import { ZQuery } from '../../components/ZQuery';
import { UserShort } from 'openland-api/Types';
import { SScrollView } from 'react-native-s/SScrollView';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { ZBlurredView } from '../../components/ZBlurredView';
import { UserViewAsync } from './ComposeInitial';

interface CreateGroupComponentState {
    query: string;
    users: { id: string, name: string }[];
    searchHeight: number;
}

class CreateGroupComponent extends React.PureComponent<PageProps, CreateGroupComponentState> {
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
        return (
            <YMutation mutation={ChatCreateGroupMutation}>
                {create => (
                    <>
                        <SHeader title={this.props.router.params.variables.title} />
                        <SHeaderButton
                            title="Create"
                            onPress={async () => {
                                let res = await create({
                                    variables: {
                                        ... this.props.router.params.variables,
                                        members: this.state.users.map(u => u.id)
                                    }
                                });
                                this.props.router.pushAndReset('Conversation', { id: (res as any).data.group.id });
                            }}
                        />
                        <View style={{ flexDirection: 'column', width: '100%', height: '100%' }}>
                            <ZQuery query={ChatSearchForComposeMobileQuery} variables={{ organizations: false, query: this.state.query }} fetchPolicy="cache-and-network">
                                {r => (
                                    <SScrollView paddingTop={this.state.searchHeight}>
                                        {r.data.items.map((v) => (<UserViewAsync key={v.id} item={v as UserShort} onPress={() => this.handleAddUser(v as UserShort)} />))}
                                    </SScrollView>
                                )}
                            </ZQuery>
                        </View>
                        <ASSafeAreaContext.Consumer>
                            {area => (
                                <ZBlurredView onLayout={this.handleSearchLayout} style={{ position: 'absolute', top: area.top, left: 0, right: 0, flexDirection: 'column', maxHeight: 44 * 4 }}>
                                    <ZTagView
                                        items={this.state.users.map((v) => ({ id: v.id, text: v.name }))}
                                        onChange={this.handleChange}
                                        onRemoved={this.handleRemoveUser}
                                        title="Members:"
                                        autoFocus={true}
                                    />
                                    <View style={{ height: 1, backgroundColor: AppStyles.separatorColor }} />
                                </ZBlurredView>
                            )}
                        </ASSafeAreaContext.Consumer>
                    </>
                )}
            </YMutation>
        );
    }
}

export const CreateGroupUsers = withApp(CreateGroupComponent, { navigationAppearance: 'small' });