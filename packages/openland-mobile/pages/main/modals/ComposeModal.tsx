import * as React from 'react';
import { NavigationInjectedProps } from 'react-navigation';
import { withApp } from '../../../components/withApp';
import { ZScrollView } from '../../../components/ZScrollView';
import { View } from 'react-native';
import { MessageInputBar } from '../components/MessageInputBar';
import { ZListItemEdit } from '../../../components/ZListItemEdit';
import { ZListItem } from '../../../components/ZListItem';
import { ZHeader } from '../../../components/ZHeader';

class ComposeModalComponent extends React.PureComponent<NavigationInjectedProps> {

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
            <>
                <ZHeader title="New message" />
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
            </>
        );
    }
}

export const ComposeModal = withApp(ComposeModalComponent);