import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../../components/withApp';
import { ZScrollView } from '../../../components/ZScrollView';
import { View } from 'react-native';
import { MessageInputBar } from '../components/MessageInputBar';
import { ZListItemEdit } from '../../../components/ZListItemEdit';
import { ZListItem } from '../../../components/ZListItem';

class ComposeModalComponent extends React.PureComponent<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'New message'
    };

    handleAttach = () => {
        //
    }

    handleSubmit = () => {
        //
    }

    handleChange = () => {
        //
    }

    render() {
        return (
            <View style={{ height: '100%', flexDirection: 'column' }}>
                <ZScrollView style={{ flexGrow: 1, flexBasis: 0 }}>
                    <ZListItemEdit title="Search" />
                    <ZListItem appearance="action" text="Create channel" />
                </ZScrollView>
                <MessageInputBar
                    onAttachPress={this.handleAttach}
                    onSubmitPress={this.handleSubmit}
                    onChangeText={this.handleChange}
                    text=""
                />
            </View>
        );
    }
}

export const ComposeModal = withApp(ComposeModalComponent);