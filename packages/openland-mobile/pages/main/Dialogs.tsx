import * as React from 'react';
import { View, LayoutAnimation } from 'react-native';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';
import { DialogListComponent } from './components/DialogListComponent';
import { ConversationShortFragment } from 'openland-api/Types';
import { ZQuery } from '../../components/ZQuery';
import { ChatListQuery } from 'openland-api';
import { ZHeaderButton } from '../../components/ZHeaderButton';
import { ZHeader } from '../../components/ZHeader';
import { ZHeaderSearch } from '../../components/ZHeaderSearch';
import { ZSafeAreaProvider } from '../../components/layout/ZSafeAreaContext';
import { FastRouterInjectedProps, withRouter } from 'react-native-fast-navigation/withRouter';
import { FastHeaderConfigRegistrator } from 'react-native-fast-navigation/FastHeaderConfigRegistrator';
import { FastHeaderConfig } from 'react-native-fast-navigation/FastHeaderConfig';

class ConversationsListener extends React.PureComponent<{ engine: MessengerEngine, onItemClick: (item: ConversationShortFragment) => void }> {

    render() {
        return (
            <ZQuery query={ChatListQuery}>
                {r => (
                    <DialogListComponent
                        dialogs={r.data.chats.conversations}
                        engine={this.props.engine}
                        onPress={this.props.onItemClick}
                        loadingMore={r.data.chats.next !== null}
                    />
                )}
            </ZQuery>
        );
    }
}

function startAnimation() {
    LayoutAnimation.configureNext({
        duration: 500,
        update: {
            type: 'easeInEaseOut',
            duration: 340
        }
    });
}

class DialogsComponent extends React.Component<FastRouterInjectedProps, { search: boolean }> {

    constructor(props: FastRouterInjectedProps) {
        super(props);
        this.state = {
            search: false
        };
    }

    handleItemClick = (item: ConversationShortFragment) => {
        this.props.router.push('Conversation', { id: item.id, title: item.title });
    }

    handleSearchStart = () => {
        startAnimation();
        this.setState({ search: true });
    }

    handleSearchStop = () => {
        startAnimation();
        this.setState({ search: false });
    }

    render() {
        console.log(this.props);
        return (
            <>
                <FastHeaderConfigRegistrator config={new FastHeaderConfig({ title: 'Messages' })} />
                {/* <ZHeader title="Messages" />
                <ZHeaderButton title="New" icon={require('assets/ic-new.png')} onPress={() => this.props.navigation.navigate('ComposeModal')} />
                <ZHeaderSearch active={this.state.search} onActivate={this.handleSearchStart} onDeactivate={this.handleSearchStop} /> */}
                <ZSafeAreaProvider top={this.state.search ? -44 : 48}>
                    <View style={{ height: '100%' }}>
                        <MessengerContext.Consumer>
                            {(messenger) => <ConversationsListener engine={messenger!!} onItemClick={this.handleItemClick} />}
                        </MessengerContext.Consumer>
                    </View>
                </ZSafeAreaProvider>
            </>
        );
    }
}

export const Dialogs = withApp(withRouter(DialogsComponent) as any);