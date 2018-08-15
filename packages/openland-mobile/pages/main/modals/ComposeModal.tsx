import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../../components/withApp';
import { ZScrollView } from '../../../components/ZScrollView';
import { View, LayoutChangeEvent } from 'react-native';
import { ZHeader } from '../../../components/ZHeader';
import { ZSafeAreaContext, ZSafeAreaProvider } from '../../../components/layout/ZSafeAreaContext';
import { ZBlurredView } from '../../../components/ZBlurredView';
import { AppStyles } from '../../../styles/AppStyles';
import { MessageInputBar } from '../components/MessageInputBar';
import { ZQuery } from '../../../components/ZQuery';
import { ChatSearchForComposeMobileQuery } from 'openland-api/ChatSearchForComposeMobileQuery';
import { ZUserListItem } from '../components/ZUserListItem';
import { UserShortFragment, MessageFullFragment } from 'openland-api/Types';
import { ZTagView } from '../../../components/ZTagView';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';
import { ZLoader } from '../../../components/ZLoader';
import { startLoader, stopLoader } from '../../../components/ZGlobalLoader';
import { ChatCreateGroupMutation } from 'openland-api/ChatCreateGroupMutation';
import { ZSafeAreaView } from '../../../components/layout/ZSafeAreaView';
import { ConversationView } from '../components/ConversationView';

interface ComposeModalState {
    message: string;
    query: string;
    users: UserShortFragment[];
    searchHeight: number;
    conversationId?: string;
    resolving: boolean;
}

class ComposeModalComponent extends React.PureComponent<NavigationInjectedProps & { messenger: MessengerEngine }, ComposeModalState> {

    private generation = 0;

    constructor(props: NavigationInjectedProps & { messenger: MessengerEngine }) {
        super(props);
        this.state = {
            query: '',
            message: '',
            users: [],
            searchHeight: 44,
            conversationId: undefined,
            resolving: false
        };
    }

    handleSubmit = () => {
        let ids = this.state.users.map((v) => v.id);
        if (ids.length > 0 && this.state.message.trim().length > 0) {
            let msg = this.state.message.trim();
            (async () => {
                startLoader();
                try {
                    if (ids.length === 1) {
                        let id = await this.props.messenger.global.resolvePrivateConversation(ids[0]);
                        await this.props.messenger.sender.sendMessageAsync(id.id, msg);
                        this.props.navigation.replace('Conversation', { id: id.id });
                    } else {
                        let id = await this.props.messenger.global.resolveGroup(ids);
                        if (id) {
                            await this.props.messenger.sender.sendMessageAsync(id.id, msg);
                            this.props.navigation.replace('Conversation', { id: id.id });
                        } else {
                            let res = await this.props.messenger.client.client.mutate({
                                mutation: ChatCreateGroupMutation.document,
                                variables: {
                                    message: msg,
                                    members: ids
                                }
                            });
                            this.props.navigation.replace('Conversation', { id: (res.data as any).group.id });
                        }
                    }
                } finally {
                    stopLoader();
                }
            })();
        }
    }

    handleChange = (query: string) => {
        this.setState({ query });
    }

    handleMessageChange = (message: string) => {
        this.setState({ message });
    }

    handleAddUser = (user: UserShortFragment) => {
        if (!this.state.users.find((v) => v.id === user.id)) {
            let ids = [...this.state.users, user].map((v) => v.id);
            this.setState({ users: [...this.state.users, user], resolving: ids.length > 0, conversationId: undefined });
            (async () => {
                let gen = ++this.generation;
                if (ids.length === 1) {
                    let id = (await this.props.messenger.global.resolvePrivateConversation(ids[0])).id;
                    if (gen === this.generation) {
                        this.setState({ conversationId: id, resolving: false });
                    }
                } else {
                    let id = (await this.props.messenger.global.resolveGroup(ids));
                    if (gen === this.generation) {
                        if (id) {
                            this.setState({ conversationId: id.id, resolving: false });
                        } else {
                            this.setState({ conversationId: undefined, resolving: false });
                        }
                    }
                }
            })();
        }
    }

    handleRemoveUser = (id: string) => {
        this.setState({ users: this.state.users.filter((v) => v.id !== id) });
    }

    handleSearchLayout = (event: LayoutChangeEvent) => {
        this.setState({ searchHeight: event.nativeEvent.layout.height });
    }

    handleAvatarPress = (userId: string) => {
        // this.props.navigator.navigate('ProfileUser', { 'id': userId });
    }

    handlePhotoPress = (message: MessageFullFragment) => {
        // this.props.navigator.navigate('PicturePreview', { 'uuid': message.file!! });
    }

    render() {
        return (
            <>
                <ZHeader title="New message" hairline="always" />
                <View style={{ height: '100%', flexDirection: 'column', alignItems: 'stretch', backgroundColor: '#fff' }}>
                    {/* <ZListItemEdit title="Search" /> */}
                    <View style={{ flexGrow: 1, flexBasis: 0, flexDirection: 'column' }}>
                        <ZSafeAreaProvider top={this.state.searchHeight}>
                            {(this.state.users.length === 0 || this.state.query !== '') && (
                                <ZQuery query={ChatSearchForComposeMobileQuery} variables={{ organizations: false, query: this.state.query }}>
                                    {r => (
                                        <ZScrollView keyboardShouldPersistTaps={true} style={{ flexGrow: 1, flexBasis: 0 }} keyboardDismissMode="on-drag">
                                            {r.data.items.map((v) => (<ZUserListItem key={v.id} id={v.id} name={v.name} photo={(v as any).picture} onPress={() => this.handleAddUser(v as UserShortFragment)} />))}
                                        </ZScrollView>
                                    )}
                                </ZQuery>
                            )}
                            {(this.state.users.length !== 0 && this.state.query === '' && this.state.conversationId) && (
                                <ConversationView key={this.state.conversationId} onAvatarPress={this.handleAvatarPress} onPhotoPress={this.handlePhotoPress} engine={this.props.messenger.getConversation(this.state.conversationId!!)} />
                            )}
                            {(this.state.users.length !== 0 && this.state.query === '' && this.state.resolving) && (
                                <ZSafeAreaView style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                                    <ZLoader />
                                </ZSafeAreaView>
                            )}
                        </ZSafeAreaProvider>
                    </View>
                    <MessageInputBar
                        onSubmitPress={this.handleSubmit}
                        onChangeText={this.handleMessageChange}
                        text={this.state.message}
                        enabled={!this.state.resolving}
                        attachesEnabled={false}
                    />
                    <ZSafeAreaContext.Consumer>
                        {area => (
                            <ZBlurredView onLayout={this.handleSearchLayout} style={{ position: 'absolute', top: area.top, left: 0, right: 0, flexDirection: 'column', maxHeight: 44 * 4 }}>
                                <ZTagView
                                    items={this.state.users.map((v) => ({ id: v.id, text: v.name }))}
                                    onChange={this.handleChange}
                                    onRemoved={this.handleRemoveUser}
                                    title="To:"
                                    autoFocus={true}
                                />
                                <View style={{ height: 1, backgroundColor: AppStyles.separatorColor }} />
                            </ZBlurredView>
                        )}
                    </ZSafeAreaContext.Consumer>
                </View>
            </>
        );
    }
}

export const ComposeModal = withApp(
    (props: NavigationInjectedProps) => (
        <MessengerContext.Consumer>
            {engine => <ComposeModalComponent {...props} messenger={engine!!} />}
        </MessengerContext.Consumer>
    ),
    { navigationAppearance: 'small' });