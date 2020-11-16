import * as React from 'react';
import { View, Text, LayoutChangeEvent, TouchableOpacity, Image, FlatList, AsyncStorage, Platform } from 'react-native';
import { useClient } from 'openland-api/useClient';
import { ZImage } from 'openland-mobile/components/ZImage';
import { MyStickers_stickers_packs, StickerFragment } from 'openland-api/spacex.types';
import { TextStyles, HighlightAlpha } from 'openland-mobile/styles/AppStyles';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import Alert from 'openland-mobile/components/AlertBlanket';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { StickerLayout, useStickerLayout } from './stickerLayout';
import FastImage from 'react-native-fast-image';
import { ZButton } from 'openland-mobile/components/ZButton';

const RECENT_ID = 'recent';

type SendStickerF = (sticker: StickerFragment) => void;

interface StickerRowProps {
    stickers: StickerFragment[];
    stickerSize: number;
    sendSticker: SendStickerF;
}

const getStickerUrl = (sticker: StickerFragment) => `https://ucarecdn.com/${sticker.image.uuid}/-/format/png/-/preview/128x128/`;

const StickerRow = React.memo((props: StickerRowProps) => {
    const { stickers, stickerSize, sendSticker } = props;

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {stickers.map(e => (
                <TouchableOpacity onPress={() => sendSticker(e)} activeOpacity={HighlightAlpha} style={{ padding: 8 }}>
                    <ZImage
                        resize='none'
                        source={getStickerUrl(e)}
                        width={stickerSize}
                        height={stickerSize}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
});

interface StickerPackFragment {
    id: string;
    title: string;
    stickers: StickerFragment[];
    isRecent?: boolean;
}

interface StickerPackProps {
    pack: StickerPackFragment;
    theme: ThemeGlobal;
    stickersPerRow: number;
    stickerSize: number;
    sendSticker: SendStickerF;
    isRecent: boolean;
    deleteStickerPack: (stickerPack: StickerPackFragment | 'recent') => void;
}

const StickerPack = React.memo((props: StickerPackProps) => {
    const { pack, theme, stickerSize, stickersPerRow, sendSticker, deleteStickerPack, isRecent } = props;

    let rows: StickerFragment[][] = [];
    const rowCount = Math.ceil(pack.stickers.length / stickersPerRow);
    for (let i = 0; i < rowCount; ++i) {
        rows.push(pack.stickers.slice(i * stickersPerRow, (i + 1) * stickersPerRow));
    }

    return (
        <View style={{ marginTop: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 8 }}>
                <Text style={{ ...TextStyles.Label1, color: theme.foregroundPrimary }}>{pack.title}</Text>
                <TouchableOpacity activeOpacity={HighlightAlpha} onPress={() => deleteStickerPack(isRecent ? 'recent' : pack)}>
                    <Image source={require('assets/ic-close-16.png')} style={{ tintColor: theme.foregroundSecondary }} />
                </TouchableOpacity>
            </View>
            {rows.map((e, i) => (
                <StickerRow sendSticker={sendSticker} stickers={e} stickerSize={stickerSize} key={`sticker-row-${pack.id}-${i}`} />
            ))}
        </View>
    );
});

interface StickerPackButtonProps {
    cover?: StickerFragment;
    source?: NodeRequire;
    theme: ThemeGlobal;
    selected?: boolean;
    onPress: () => void;
}

const StickerPackButton = React.memo((props: StickerPackButtonProps) => {
    const { cover, theme, onPress, source, selected } = props;

    return (
        <TouchableOpacity activeOpacity={HighlightAlpha} style={{ paddingHorizontal: 6 }} onPress={onPress}>
            <View style={{ width: 36, height: 36, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: selected ? theme.backgroundTertiaryTrans : theme.backgroundPrimary }}>
                {source && (
                    <Image source={source} style={{ width: 24, height: 24, tintColor: theme.foregroundSecondary }} />
                )}
                {cover && (
                    <ZImage
                        resize='none'
                        source={`https://ucarecdn.com/${cover.image.uuid}/-/format/png/-/preview/48x48/`}
                        width={24}
                        height={24}
                    />
                )}
            </View>
        </TouchableOpacity>
    );
});

interface StickerPickerComponentProps {
    onStickerSent: SendStickerF;
    theme: ThemeGlobal;
}

const StickerPickerComponent = React.memo((props: StickerPickerComponentProps & { stickerLayout: StickerLayout, height: number }) => {
    const { onStickerSent, theme, stickerLayout, height } = props;

    const { stickerSize, stickersPerRow } = stickerLayout;

    const [recentStickers, setRecentStickers] = React.useState<StickerFragment[]>([]);
    const [selected, setSelected] = React.useState(RECENT_ID);

    const stickerPackListRef = React.createRef<FlatList<StickerPackFragment>>();
    const stickerPackButtonListRef = React.createRef<FlatList<StickerPackFragment>>();

    const lastCheckedOffsetRef = React.useRef(-1000);

    const router = React.useContext(SRouterContext);
    const client = useClient();
    const clientStickers = client.useMyStickers({ fetchPolicy: 'cache-and-network' }).stickers.packs;
    const stickers: StickerPackFragment[] = recentStickers.length > 0 && stickersPerRow > 0 ? [
        { id: RECENT_ID, title: 'Recent', stickers: recentStickers.slice(0, stickersPerRow * 2), isRecent: true },
        ...clientStickers
    ] : clientStickers;

    React.useEffect(() => {
        (async () => {
            setRecentStickers(JSON.parse(await AsyncStorage.getItem('recentStickers') || '[]'));
        })();
    }, []);

    React.useEffect(() => {
        if (Platform.OS === 'ios' && clientStickers) {
            FastImage.preload(clientStickers.flatMap(pack => pack.stickers.map(s => ({ uri: getStickerUrl(s) }))));
        }
    }, [clientStickers]);

    const handleDeletePackPressed = React.useCallback((pack: MyStickers_stickers_packs | 'recent') => {
        Alert.builder()
            .title(pack === 'recent' ? 'Clear recent stickers?' : `Delete ${pack.title} stickers?`)
            .button('Cancel', 'cancel')
            .action('Delete', 'destructive', async () => {
                if (pack === 'recent') {
                    setRecentStickers([]);
                    await AsyncStorage.setItem('recentStickers', '[]');
                } else {
                    await client.mutateStickerPackRemoveFromCollection({ id: pack.id });
                    await client.refetchStickerPack({ id: pack.id });
                    await client.refetchMyStickers();
                }
                let selectedIndex = stickers.findIndex(x => x.id === selected);
                if (selectedIndex === stickers.length - 1) {
                    stickerPackListRef.current?.scrollToIndex({ index: stickers.length - 2 });
                }
                lastCheckedOffsetRef.current = -1000;
            })
            .show();
    }, [selected]);

    const handleStickerPressed = React.useCallback(async (sticker: StickerFragment) => {
        onStickerSent(sticker);
        const newRecents = [sticker, ...(recentStickers.length < 14 ? recentStickers : recentStickers.slice(0, 13)).filter(e => e.id !== sticker.id)];
        setRecentStickers(newRecents);
        await AsyncStorage.setItem('recentStickers', JSON.stringify(newRecents));
    }, [onStickerSent, recentStickers]);
    const hasStickers = stickers.length > 0;

    return (
        <>
            {hasStickers ? (
                <FlatList
                    ref={stickerPackListRef}
                    contentContainerStyle={{ paddingBottom: 8, paddingHorizontal: 8 }}
                    data={stickers}
                    renderItem={({ item }) => (
                        <StickerPack
                            deleteStickerPack={handleDeletePackPressed}
                            sendSticker={handleStickerPressed}
                            pack={item}
                            key={`sticker-pack-${item.id}`}
                            theme={theme}
                            stickerSize={stickerSize}
                            stickersPerRow={stickersPerRow}
                            isRecent={!!item.isRecent}
                        />
                    )}
                    scrollEventThrottle={1}
                    onScroll={e => {
                        if (e) {
                            const effectiveCenter = e.nativeEvent.contentOffset.y + (height - 52) / 2;
                            if (Math.abs(lastCheckedOffsetRef.current - effectiveCenter) < 30) {
                                return;
                            }
                            let offset = 0;
                            for (let i = 0; i < stickers.length; ++i) {
                                const pack = stickers[i];
                                const packHeight = 48 + Math.ceil(pack.stickers.length / stickersPerRow) * (16 + stickerSize);
                                if (effectiveCenter < packHeight + offset) {
                                    if (stickerPackButtonListRef.current) {
                                        stickerPackButtonListRef.current.scrollToIndex({ index: i, viewPosition: 0.5 });
                                    }
                                    lastCheckedOffsetRef.current = effectiveCenter;
                                    if (selected !== pack.id) {
                                        setSelected(pack.id);
                                    }
                                    break;
                                } else {
                                    offset += packHeight;
                                }
                            }
                        }
                    }}
                />
            ) : (
                    <View justifyContent="center" alignItems="center" flexGrow={1} flexDirection="column">
                        <Text style={{ ...TextStyles.Body, color: theme.foregroundSecondary, marginBottom: 16 }}>Your stickers will be displayed here</Text>
                        <ZButton title="Discover stickers" style="secondary" onPress={() => router?.push('StickersCatalog')} />

                    </View>
                )}
            <FlatList
                ref={stickerPackButtonListRef}
                horizontal={true}
                style={{ backgroundColor: theme.backgroundPrimary, flexGrow: 0, flexShrink: 0, height: 52 }}
                contentContainerStyle={{ alignItems: 'center' }}
                data={stickers}
                renderItem={({ item, index }) => (
                    <StickerPackButton
                        onPress={() => {
                            if (stickerPackListRef.current) {
                                stickerPackListRef.current.scrollToIndex({ index });
                            }
                        }}
                        cover={item.isRecent ? undefined : item.stickers[0]}
                        source={item.isRecent ? require('assets/ic-recent-24.png') : undefined}
                        key={`sticker-pack-button-${item.id}`}
                        theme={theme}
                        selected={selected === item.id}
                    />
                )}
                ListHeaderComponent={
                    <StickerPackButton
                        onPress={() => {
                            if (router) {
                                router.push('StickersCatalog');
                            }
                        }}
                        source={require('assets/ic-new-24.png')}
                        key={`sticker-pack-button-catalog`}
                        theme={theme}
                    />
                }
                extraData={selected}
            />
        </>
    );
});

export const StickerPicker = React.memo((props: StickerPickerComponentProps & { height?: number }) => {
    const { height, theme } = props;

    const [stickerLayout, handleWidthChange] = useStickerLayout();

    const handleLayoutChange = React.useCallback((e: LayoutChangeEvent) => handleWidthChange(e.nativeEvent.layout.width), []);

    const effectiveHeight = height && height > 0 ? height : 220;

    return (
        <View style={{ height: effectiveHeight, backgroundColor: theme.backgroundTertiary, alignItems: 'stretch' }} onLayout={handleLayoutChange}>
            <React.Suspense fallback={<View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}><LoaderSpinner /></View>}>
                {stickerLayout.stickerSize > 0 && stickerLayout.stickersPerRow > 0 && (
                    <StickerPickerComponent {...props} stickerLayout={stickerLayout} height={effectiveHeight} />
                )}
            </React.Suspense>
        </View>
    );
});
