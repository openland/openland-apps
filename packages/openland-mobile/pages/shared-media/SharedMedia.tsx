import * as React from 'react';
import { View, Text, LayoutChangeEvent } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { useClient } from 'openland-api/useClient';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { withApp } from 'openland-mobile/components/withApp';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { AsyncSharedMediaList } from 'openland-mobile/pages/shared-media/AsyncSharedMediaList';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SharedMediaItemType } from 'openland-engines/messenger/SharedMediaEngine';
import { ZTab } from 'openland-mobile/components/ZTab';

interface Tab {
    name: string;
    count: number;
    type: SharedMediaItemType;
    onPress: () => void;
}

interface TabsProps {
    activeTab: SharedMediaItemType;
    tabs: Tab[];
}

const Tabs = ({ activeTab, tabs }: TabsProps) => {
    const theme = useThemeGlobal();
    const safeArea = React.useContext(ASSafeAreaContext);

    return (
        <View
            marginTop={safeArea.top}
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal={16}
            paddingBottom={16}
            position="relative"
            backgroundColor={theme.backgroundPrimary}
            zIndex={1}
        >
            {tabs.map(({ name, count, type, onPress }) => {
                const isActive = type === activeTab;

                return (
                    <View width="33.3%" key={name}>
                        <ZTab selected={isActive} onPress={onPress}>
                            {name}
                            {count !== 0 && (
                                <Text style={{ ...TextStyles.Label1, color: theme.foregroundTertiary }}> {count}</Text>
                            )}
                        </ZTab>
                    </View>
                );
            })}
        </View>
    );
};

const SharedMediaInner = React.memo(({ chatId }: { chatId: string }) => {
    const client = useClient();
    const { counters } = client.useSharedMediaCounters({ chatId }, { fetchPolicy: 'network-only' });
    const [activeTab, setActiveTab] = React.useState<SharedMediaItemType>(SharedMediaItemType.MEDIA);
    const tabs = React.useMemo(() => [
        { type: SharedMediaItemType.MEDIA, name: 'Media', count: counters.images, onPress: () => setActiveTab(SharedMediaItemType.MEDIA) },
        { type: SharedMediaItemType.DOCUMENT, name: 'Files', count: counters.documents + counters.videos, onPress: () => setActiveTab(SharedMediaItemType.DOCUMENT) },
        { type: SharedMediaItemType.LINK, name: 'Links', count: counters.links, onPress: () => setActiveTab(SharedMediaItemType.LINK) },
    ], [counters.images, counters.videos, counters.documents, counters.links]);
    const currentCount = tabs.find(({ type }) => type === activeTab)!!.count;
    const [wrapperWidth, setWrapperWidth] = React.useState(0);
    const handleLayout = React.useCallback((e: LayoutChangeEvent) => {
        setWrapperWidth(e.nativeEvent.layout.width);
    }, []);

    return (
        <>
            <Tabs tabs={tabs} activeTab={activeTab} />
            <View flexGrow={1} onLayout={handleLayout}>
                <React.Suspense fallback={<ZLoader />}>
                    <AsyncSharedMediaList currentCount={currentCount} mediaType={activeTab} chatId={chatId} wrapperWidth={wrapperWidth} />
                </React.Suspense>
            </View>
        </>
    );
});

export const SharedMedia = withApp(({ router }: PageProps) => {
    return (
        <>
            <SHeader title="Shared" />
            <React.Suspense fallback={<ZLoader />}>
                <SharedMediaInner chatId={router.params.chatId} />
            </React.Suspense>

        </>
    );
});
