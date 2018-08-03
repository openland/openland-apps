import * as React from 'react';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { ConversationShortFragment } from 'openland-api/Types';
import { ListRenderItemInfo, FlatList, View } from 'react-native';
import { DialogComponent } from './DialogComponent';
import { ZFlatList } from '../../../components/ZFlatList';
import { isAndroid } from '../../../utils/isAndroid';

export class DialogListComponent extends React.PureComponent<{ engine: MessengerEngine, dialogs: ConversationShortFragment[], onPress?: (id: ConversationShortFragment) => void }> {

    handleItemClick = (id: ConversationShortFragment) => {
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

    renderHeader = () => {
        return (
            <View height={4}/>
        );
    }

    render() {
        return (
            <ZFlatList
                ListHeaderComponent={this.renderHeader}
                data={this.props.dialogs}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                fixedHeight={80}
            />
        );
    }
}