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
import { ZLoader } from 'openland-mobile/components/ZLoader';

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

const ChatSearchDataList = React.memo(({ engine, chatId }: { engine: ChatSearchEngine, chatId: string }) => {
    const theme = React.useContext(ThemeContext);
    let safeArea = React.useContext(ASSafeAreaContext);
    const [dataView] = React.useState(() => getMessenger().getSearchView(engine.dataSource, chatId));

    return (
        <View
            marginTop={Platform.OS === 'ios' ? -1000 : 0}
            justifyContent="flex-start"
            alignItems="stretch"
            flexGrow={1}
        >
            <ASListView
                dataView={dataView}
                inverted={false}
                contentPaddingTop={safeArea.top + (Platform.OS === 'ios' ? 1000 : 0)}
                style={{ flexGrow: 1 }}
                headerPadding={
                    Platform.select({ ios: 0, android: androidMessageInputListOverlap }) + 6
                }
                overflowColor={theme.backgroundPrimary}
            />
        </View>
    );
});

export const ChatSearchView = React.memo((props: ChatMessagesSearchProps) => {
    const theme = React.useContext(ThemeContext);

    if (props.query.length < 3) {
        return <EmptyView theme={theme}>Start typing message text you’re looking for</EmptyView>;
    }

    const { chatId } = props.router.params;
    const [engine] = React.useState(() => new ChatSearchEngine(getMessenger().engine, chatId, false));
    const [queryInProgress, setQueryInProgress] = React.useState(true);

    const loadQuery = React.useCallback(debounce(async (query: string) => {
        if (props.query.length > 2) {
            await engine.loadQuery(query);

            setQueryInProgress(false);
        }
    }, 500, true, true), []);

    React.useEffect(() => {
        setQueryInProgress(true);

        (async () => await loadQuery(props.query))();
    }, [props.query]);

    if (queryInProgress) {
        return <ZLoader />;
    }

    if (!queryInProgress && engine.dataSource.getSize() === 0) {
        return <EmptyView theme={theme}>Nothing found</EmptyView>;
    }

    return <ChatSearchDataList engine={engine} chatId={chatId} />;
});
