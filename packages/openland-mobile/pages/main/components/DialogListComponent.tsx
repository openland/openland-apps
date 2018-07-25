import * as React from 'react';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { ConversationShortFragment } from 'openland-api/Types';
import { ListRenderItemInfo, FlatList } from 'react-native';
import { DialogComponent } from './DialogComponent';

export class DialogListComponent extends React.PureComponent<{ engine: MessengerEngine, dialogs: ConversationShortFragment[], onPress?: (id: string) => void }> {

    handleItemClick = (id: string) => {
        if (this.props.onPress) {
            this.props.onPress(id);
        }
    }

    renderItem = (item: ListRenderItemInfo<ConversationShortFragment>) => {
        return (<DialogComponent item={item.item} onPress={this.handleItemClick} engine={this.props.engine} />);
    }

    keyExtractor = (item: ConversationShortFragment) => {
        return item.id;
    }

    render() {
        return (
            <FlatList
                data={this.props.dialogs}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
            />
        );
    }
}