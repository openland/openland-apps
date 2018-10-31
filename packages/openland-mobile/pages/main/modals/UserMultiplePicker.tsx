import * as React from 'react';
import { PageProps } from '../../../components/PageProps';
import { withApp } from '../../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ChatSearchForComposeMobileQuery } from 'openland-api';
import { View, LayoutChangeEvent, Image } from 'react-native';
import { AppStyles } from '../../../styles/AppStyles';
import { ZQuery } from '../../../components/ZQuery';
import { UserShort } from 'openland-api/Types';
import { SScrollView } from 'react-native-s/SScrollView';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { ZBlurredView } from '../../../components/ZBlurredView';
import { UserViewAsync } from '../../../pages/compose/ComposeInitial';
import { ZTagView } from '../../../components/ZTagView';

interface UserMultiplePickerComponentState {
    query: string;
    users: { id: string, name: string }[];
    searchHeight: number;
}

export class CheckListBoxWraper extends React.PureComponent<{ checked?: boolean }> {
    render() {
        return (
            <View flexDirection="row">
                <View flexGrow={1}>
                    {this.props.children}
                </View>
                <View position="absolute" pointerEvents="none" alignSelf="center" right={16} backgroundColor={this.props.checked ? '#4747ec' : '#fff'} opacity={this.props.checked ? 1 : 0.8} borderColor={this.props.checked ? '#4747ec' : 'rgba(185,193,205,0.8)'} borderWidth={2} borderRadius={12} width={24} height={24} >
                    {this.props.checked && <Image marginLeft={3} marginTop={3} source={require('assets/ic-checkmark.png')} />}
                </View>

            </View>
        );
    }
}

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
        return (
            <>
                <SHeader title={this.props.router.params.title || 'Pick members'} />
                <SHeaderButton
                    title={this.props.router.params.action.title}
                    onPress={async () => {
                        await this.props.router.params.action.action(this.state.users);
                    }}
                />
                <View style={{ flexDirection: 'column', width: '100%', height: '100%' }}>
                    <ZQuery query={ChatSearchForComposeMobileQuery} variables={{ organizations: false, query: this.state.query }} fetchPolicy="cache-and-network">
                        {r => (
                            <SScrollView marginTop={this.state.searchHeight}>
                                {r.data.items.map((v) => (
                                    <CheckListBoxWraper checked={!!this.state.users.find(u => u.id === v.id)}>
                                        <UserViewAsync key={v.id} item={v as UserShort} disabled={(this.props.router.params.disableUsers || []).indexOf(v.id) > -1} onPress={() => this.handleAddUser(v as UserShort)} />
                                    </CheckListBoxWraper>
                                ))}
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
        );
    }
}

export const UserMultiplePicker = withApp(UserMultiplePickerComponent, { navigationAppearance: 'small' });