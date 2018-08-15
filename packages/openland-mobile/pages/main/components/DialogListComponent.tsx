import * as React from 'react';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { ConversationShortFragment } from 'openland-api/Types';
import { ListRenderItemInfo, FlatList, View } from 'react-native';
import { ZFlatList } from '../../../components/ZFlatList';
import { DialogItemView } from 'openland-shared/DialogItemView';
import { AppStyles } from '../../../styles/AppStyles';
import { ZLoader } from '../../../components/ZLoader';

class DialogListSeparator extends React.PureComponent {
    render() {
        return <View marginLeft={80} backgroundColor={AppStyles.separatorColor} height={1} />; 
    }
}

export class DialogListComponent extends React.PureComponent<{ engine: MessengerEngine, dialogs: ConversationShortFragment[], loadingMore?: boolean, onPress?: (id: ConversationShortFragment) => void }> {

    handleItemClick = (id: ConversationShortFragment) => {
        if (this.props.onPress) {
            this.props.onPress(id);
        }
    }

    renderItem = (item: ListRenderItemInfo<ConversationShortFragment>) => {
        return (<DialogItemView item={item.item} onPress={this.handleItemClick} engine={this.props.engine} />);
    }

    keyExtractor = (item: ConversationShortFragment) => {
        return item.id;
    }

    renderHeader = () => {
        return (
            <View height={4} />
        );
    }

    renderFooter = () => {
        return (
            this.props.loadingMore ?
                (
                    <View height={48} >
                        <ZLoader appearance="small" />
                    </View>
                )
                : <View height={48} />
        );
    }

    loadMore = () => {
        this.props.engine.dialogList.loadNext();
    }

    render() {
        return (
            <ZFlatList
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
                data={this.props.dialogs}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
                onEndReached={this.loadMore}
                onEndReachedThreshold={1}
                ItemSeparatorComponent={DialogListSeparator}
                fixedHeight={80}
            />
        );
    }
}