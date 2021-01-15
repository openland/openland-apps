import * as React from 'react';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { ASListView } from 'react-native-async-view/ASListView';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { NativeSyntheticEvent, Platform, View } from 'react-native';
import { androidMessageInputListOverlap } from './ConversationView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

export interface ConversationMessagesViewProps {
    loaded: boolean;
    engine: ConversationEngine;
    paddingBottom?: number;
    inverted: boolean;
    selectionMode: boolean;
    isBanned: boolean;
    onScroll?: (event?: NativeSyntheticEvent<any>) => void;
}

export const ConversationMessagesView = React.memo<ConversationMessagesViewProps>((props) => {
    let safeArea = React.useContext(ASSafeAreaContext);
    let theme = React.useContext(ThemeContext);
    const applyModes = [];
    if (props.isBanned) {
        applyModes.push('banned');
    }
    if (props.selectionMode) {
        applyModes.push('selection');
    }
    return (
        <View style={{ marginTop: Platform.OS === 'ios' ? -1000 : 0, justifyContent: 'flex-start', alignItems: 'stretch', flexGrow: 1 }}>
            <ASListView
                onScroll={props.onScroll}
                dataView={getMessenger().getConversation(props.engine.conversationId)}
                inverted={props.inverted}
                contentPaddingTop={safeArea.top + (Platform.OS === 'ios' ? 1000 : 0)}
                contentPaddingBottom={props.paddingBottom || 0}
                style={{ flexGrow: 1 }}
                headerPadding={Platform.select({ default: 0, android: androidMessageInputListOverlap }) + 6}
                overflowColor={theme.backgroundPrimary}
                applyModes={applyModes}
            />
        </View>
    );
});