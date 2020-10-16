import * as React from 'react';
import { View, Text, Platform } from 'react-native';
import { SRouter } from 'react-native-s/SRouter';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { ASListView } from 'react-native-async-view/ASListView';

import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { androidMessageInputListOverlap } from './ConversationView';
import { ChatSearchEngine } from 'openland-engines/messenger/ChatSearchEngine';
import { debounce } from 'openland-y-utils/timer';

interface ChatMessagesSearchProps {
    query: string;
    router: SRouter;
}

const EmptyView = React.memo((props: { theme: ThemeGlobal, children: string }) => (
    <View
        style={{
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            flexGrow: 1,
            justifyContent: 'center',
            padding: 32,
        }}
    >
        <Text
            style={{
                ...TextStyles.Body,
                textAlign: 'center',
                color: props.theme.foregroundSecondary,
                marginBottom: 16,
                paddingHorizontal: 40,
            }}
            allowFontScaling={false}
        >
            {props.children}
        </Text>
    </View>
));

export const ChatSearchView = React.memo((props: ChatMessagesSearchProps) => {
    const theme = React.useContext(ThemeContext);

    if (props.query.length < 3) {
        return <EmptyView theme={theme}>Start typing message text you’re looking for</EmptyView>;
    }

    const { chatId } = props.router.params;
    let safeArea = React.useContext(ASSafeAreaContext);

    const [engine] = React.useState(() => new ChatSearchEngine(getMessenger().engine, chatId));
    const [state, setState] = React.useState(() => engine.getState());
    const { dataSource, loadQuery } = engine;

    engine.subscribe(setState);

    React.useEffect(debounce(() => {
        if (props.query.length > 2) {
            (async () => {
                await loadQuery(props.query);
            })();
        }
    }, 500), [props.query]);

    if (!state.loading && dataSource.getSize() === 0) {
        return <EmptyView theme={theme}>Nothing found</EmptyView>;
    }

    return (
        <React.Suspense fallback={null}>
            <View
                marginTop={Platform.OS === 'ios' ? -1000 : 0}
                justifyContent="flex-start"
                alignItems="stretch"
                flexGrow={1}
            >
                <ASListView
                    dataView={getMessenger().getSearchView(engine.dataSource, chatId)}
                    inverted={true}
                    contentPaddingTop={safeArea.top + (Platform.OS === 'ios' ? 1000 : 0)}
                    style={{ flexGrow: 1 }}
                    headerPadding={
                        Platform.select({ ios: 0, android: androidMessageInputListOverlap }) + 6
                    }
                    overflowColor={theme.backgroundPrimary}
                />
            </View>
        </React.Suspense>
    );
});
