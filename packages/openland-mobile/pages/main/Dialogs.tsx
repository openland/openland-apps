import * as React from 'react';
import { View, LayoutAnimation } from 'react-native';
import { withApp } from '../../components/withApp';
import { MessengerContext, MessengerEngine } from 'openland-engines/MessengerEngine';
import { DialogListComponent } from './components/DialogListComponent';
import { ConversationShortFragment } from 'openland-api/Types';
import { ZQuery } from '../../components/ZQuery';
import { ChatListQuery } from 'openland-api';
import { FastHeader } from 'react-native-fast-navigation/FastHeader';
import { FastHeaderButton } from 'react-native-fast-navigation/FastHeaderButton';
import { PageProps } from '../../components/PageProps';

class ConversationsListener extends React.PureComponent<{ engine: MessengerEngine, onItemClick: (item: ConversationShortFragment) => void }> {
    render() {
        return (
            <ZQuery query={ChatListQuery}>
                {r => (
                    <DialogListComponent
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

class DialogsComponent extends React.Component<PageProps, { search: boolean }> {

    constructor(props: PageProps) {
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
                <FastHeader title="Messages" />
                <FastHeaderButton title="New" icon={require('assets/ic-new.png')} onPress={() => this.props.router.push('ComposeModal')} />
                <View style={{ height: '100%' }}>
                    <MessengerContext.Consumer>
                        {(messenger) => <ConversationsListener engine={messenger!!} onItemClick={this.handleItemClick} />}
                    </MessengerContext.Consumer>
                </View>
            </>
        );
    }
}

export const Dialogs = withApp(DialogsComponent);