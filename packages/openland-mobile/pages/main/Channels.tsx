import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { ZAsyncRoutedList } from '../../components/ZAsyncRoutedList';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { DialogItemViewAsync } from '../../messenger/MobileMessenger';
import { extractDialog, extractDialogFRomRoom } from 'openland-engines/messenger/DialogListEngine';
import { getMessenger } from '../../utils/messenger';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { RoomSearchQuery } from 'openland-api';

class ChannelSearchComponent extends React.Component<PageProps & { query: string }> {
    render() {
        return this.props.query ? (
            <ZAsyncRoutedList
                key={this.props.query}
                style={{ flexGrow: 1 }}
                query={RoomSearchQuery}
                variables={{ sort: JSON.stringify([{ featured: { order: 'desc' } }, { createdAt: { order: 'desc' } }]), query: this.props.query }}
                renderItem={(item) => {
                    return (
                        <DialogItemViewAsync item={{ ...extractDialogFRomRoom(item, getMessenger().engine.user.id), message: item.description || undefined }} compact={true} onPress={() => this.props.router.push('Conversation', { flexibleId: item.id })} />
                    );
                }}
            />
        ) : null;
    }
}
class ChannelsComponent extends React.PureComponent<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Rooms" />
                <SHeaderButton icon={require('assets/ic-create-ios.png')} title="+ New" onPress={() => this.props.router.push('CreateChannel')} />
                <SSearchControler searchRender={(props) => (<ChannelSearchComponent query={props.query} router={this.props.router} />)}>
                    <ZAsyncRoutedList
                        overscrollCompensation={true}
                        style={{ flexGrow: 1 }}
                        query={RoomSearchQuery}
                        variables={{ sort: JSON.stringify([{ featured: { order: 'desc' } }, { createdAt: { order: 'desc' } }]) }}
                        renderItem={(item) => {
                            return (
                                <DialogItemViewAsync item={{ ...extractDialogFRomRoom(item, getMessenger().engine.user.id), message: item.description || undefined }} onPress={() => this.props.router.push('Conversation', { flexibleId: item.id })} />
                            );
                        }}
                    />
                </SSearchControler>
            </>
        );
    }
}

export const Channels = withApp(ChannelsComponent);