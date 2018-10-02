import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { ZAsyncRoutedList } from '../../components/ZAsyncRoutedList';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { DialogItemViewAsync } from '../../messenger/MobileMessenger';
import { extractDialog } from 'openland-engines/messenger/DialogListEngine';
import { ChatSearchChannelQuery } from 'openland-api';
import { getMessenger } from '../../utils/messenger';

class ChannelSearchComponent extends React.Component<PageProps & { query: string }> {
    render() {
        return this.props.query ? (
            <ZAsyncRoutedList
                key={this.props.query}
                style={{ flexGrow: 1 }}
                query={ChatSearchChannelQuery}
                variables={{ sort: JSON.stringify([{ featured: { order: 'desc' } }, { createdAt: { order: 'desc' } }]), query: this.props.query }}
                renderItem={(item) => {
                    return (
                        <DialogItemViewAsync item={extractDialog(item, getMessenger().engine.user.id)} onPress={() => this.props.router.push('Conversation', { flexibleId: item.id })} />
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
                <SHeader title="Channels" />
                <SSearchControler searchRender={<ChannelSearchComponent query="" router={this.props.router} />}>
                    <ZAsyncRoutedList
                        style={{ flexGrow: 1 }}
                        query={ChatSearchChannelQuery}
                        variables={{ sort: JSON.stringify([{ featured: { order: 'desc' } }, { createdAt: { order: 'desc' } }]) }}
                        renderItem={(item) => {
                            return (
                                <DialogItemViewAsync item={extractDialog(item, getMessenger().engine.user.id)} onPress={() => this.props.router.push('Conversation', { flexibleId: item.id })} />
                            );
                        }}
                    />
                </SSearchControler>

            </>
        );
    }
}

export const Channels = withApp(ChannelsComponent);