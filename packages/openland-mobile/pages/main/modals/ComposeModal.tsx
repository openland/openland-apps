import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../../components/withApp';
import { ZScrollView } from '../../../components/ZScrollView';
import { View, Text, ScrollView, LayoutChangeEvent } from 'react-native';
import { ZListItemEdit } from '../../../components/ZListItemEdit';
import { ZHeader } from '../../../components/ZHeader';
import { ZSafeAreaContext, ZSafeAreaProvider } from '../../../components/layout/ZSafeAreaContext';
import { ZBlurredView } from '../../../components/ZBlurredView';
import { AppStyles } from '../../../styles/AppStyles';
import { MessageInputBar } from '../components/MessageInputBar';
import { ZQuery } from '../../../components/ZQuery';
import { ZHeaderButton } from '../../../components/ZHeaderButton';
import { ChatSearchForComposeMobileQuery } from 'openland-api/ChatSearchForComposeMobileQuery';
import { ZUserListItem } from '../components/ZUserListItem';
import { UserShortFragment } from 'openland-api/Types';
import { ZTagView } from '../../../components/ZTagView';

class ComposeModalComponent extends React.PureComponent<NavigationInjectedProps, { query: string, users: UserShortFragment[], searchHeight: number }> {

    constructor(props: NavigationInjectedProps) {
        super(props);
        this.state = {
            query: '',
            users: [],
            searchHeight: 44
        };
    }

    handleAttach = () => {
        //
    }

    handleSubmit = () => {
        //
    }

    handleChange = (query: string) => {
        this.setState({ query });
        //
    }

    handleAddUser = (user: UserShortFragment) => {
        this.setState({ users: [...this.state.users, user] });
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
                <ZHeader title="New message" hairline="always" />
                <View style={{ height: '100%', flexDirection: 'column', alignItems: 'stretch' }}>
                    <ZSafeAreaContext.Consumer>
                        {area => (
                            <ZBlurredView onLayout={this.handleSearchLayout} style={{ position: 'absolute', top: area.top, left: 0, right: 0, flexDirection: 'column', zIndex: 100, maxHeight: 44 * 4 }}>
                                <ZTagView items={this.state.users.map((v) => ({ id: v.id, text: v.name }))} onChange={this.handleChange} onRemoved={this.handleRemoveUser} />
                                <View style={{ height: 1, backgroundColor: AppStyles.separatorColor }} />
                            </ZBlurredView>
                        )}
                    </ZSafeAreaContext.Consumer>
                    {/* <ZListItemEdit title="Search" /> */}
                    <ZSafeAreaProvider top={this.state.searchHeight}>
                        <ZQuery query={ChatSearchForComposeMobileQuery} variables={{ organizations: false, query: this.state.query }}>
                            {r => (
                                <ZScrollView keyboardShouldPersistTaps={true} style={{ flexGrow: 1, flexBasis: 0 }} keyboardDismissMode="on-drag">
                                    {r.data.items.map((v) => (<ZUserListItem key={v.id} id={v.id} name={v.name} photo={(v as any).picture} onPress={() => this.handleAddUser(v as UserShortFragment)} />))}
                                </ZScrollView>
                            )}
                        </ZQuery>
                    </ZSafeAreaProvider>
                    <MessageInputBar
                        onAttachPress={this.handleAttach}
                        onSubmitPress={this.handleSubmit}
                        onChangeText={this.handleChange}
                        text={this.state.query}
                    />
                </View>
            </>
        );
    }
}

export const ComposeModal = withApp(ComposeModalComponent, { navigationAppearance: 'small' });