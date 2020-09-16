import * as React from 'react';
import { View, Text, LayoutChangeEvent, TouchableOpacity, Image, FlatList, AsyncStorage } from 'react-native';
import { useClient } from 'openland-api/useClient';
import { ZImage } from 'openland-mobile/components/ZImage';
import { MyStickers_stickers_packs, StickerFragment } from 'openland-api/spacex.types';
import { TextStyles, HighlightAlpha } from 'openland-mobile/styles/AppStyles';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import Alert from 'openland-mobile/components/AlertBlanket';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { useStickerLayout } from './stickerLayout';

type SendStickerF = (sticker: StickerFragment) => void;

interface StickerRowProps {
    stickers: StickerFragment[];
    stickerSize: number;
    sendSticker: SendStickerF;
}

const StickerRow = React.memo((props: StickerRowProps) => {
    const { stickers, stickerSize, sendSticker } = props;

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {stickers.map(e => (
                <TouchableOpacity onPress={() => sendSticker(e)} activeOpacity={HighlightAlpha} style={{ padding: 8 }}>
                    <ZImage
                        resize='none'
                        source={`https://ucarecdn.com/${e.image.uuid}/-/format/png/-/preview/128x128/`}
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
    onPress: () => void;
}

const StickerPackButton = React.memo((props: StickerPackButtonProps) => {
    const { cover, theme, onPress, source } = props;

    return (
        <TouchableOpacity activeOpacity={HighlightAlpha} style={{ paddingHorizontal: 12 }} onPress={onPress}>
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
        </TouchableOpacity>
    );
});

interface StickerPickerProps {
    onStickerSent: SendStickerF;
    theme: ThemeGlobal;
    height?: number;
}

export const StickerPicker = React.memo((props: StickerPickerProps) => {
    const { onStickerSent, theme, height } = props;

    const [{ stickerSize, stickersPerRow }, handleWidthChange] = useStickerLayout();

    const [recentStickers, setRecentStickers] = React.useState<StickerFragment[]>([]);

    const stickerPackListRef = React.createRef<FlatList<StickerPackFragment>>();
    const stickerPackButtonListRef = React.createRef<FlatList<StickerPackFragment>>();

    const lastCheckedOffsetRef = React.useRef(-1000);

    const router = React.useContext(SRouterContext);
    const client = useClient();
    const clientStickers = client.useMyStickers({ fetchPolicy: 'cache-and-network' }).stickers.packs;
    const stickers: StickerPackFragment[] = recentStickers.length > 0 && stickersPerRow > 0 ? [
        { id: 'recent', title: 'Recent', stickers: recentStickers.slice(0, stickersPerRow * 2), isRecent: true },
        ...clientStickers
    ] : clientStickers;

    const handleLayoutChange = React.useCallback(async (e: LayoutChangeEvent) => {
        handleWidthChange(e.nativeEvent.layout.width);
        setRecentStickers(JSON.parse(await AsyncStorage.getItem('recentStickers') || '[]'));
    }, []);

    const handleDeletePackPressed = React.useCallback((pack: MyStickers_stickers_packs | 'recent') => {
        Alert.builder()
            .title(pack === 'recent' ? 'Clear recent stickers?' : `Delete ${pack.title} stickers?`)
            .button('Cancel', 'cancel')
            .button('Delete', 'destructive', async () => {
                if (pack === 'recent') {
                    setRecentStickers([]);
                    await AsyncStorage.setItem('recentStickers', '[]');
                } else {
                    await client.mutateStickerPackRemoveFromCollection({ id: pack.id });
                    await client.refetchMyStickers();
                }
                lastCheckedOffsetRef.current = -1000;
            })
            .show();
    }, []);

    const handleStickerPressed = React.useCallback(async (sticker: StickerFragment) => {
        onStickerSent(sticker);
        const newRecents = [sticker, ...(recentStickers.length < 14 ? recentStickers : recentStickers.slice(0, 13)).filter(e => e.id !== sticker.id)];
        setRecentStickers(newRecents);
        await AsyncStorage.setItem('recentStickers', JSON.stringify(newRecents));
    }, [onStickerSent, recentStickers]);

    return (
        <View style={{ height: height && height > 0 ? height : 220, backgroundColor: theme.backgroundTertiary, justifyContent: 'center', alignItems: 'center' }} onLayout={handleLayoutChange}>
            {stickersPerRow > 0 && stickerSize > 0 && (
                <>
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
                                const effectiveCenter = e.nativeEvent.contentOffset.y + 150;
                                if (Math.abs(lastCheckedOffsetRef.current - effectiveCenter) < 100) {
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
                                        break;
                                    } else {
                                        offset += packHeight;
                                    }
                                }
                            }
                        }}
                        directionalLockEnabled={true}
                    />
                    <FlatList
                        ref={stickerPackButtonListRef}
                        horizontal={true}
                        style={{ height: 52, backgroundColor: theme.backgroundPrimary }}
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
                    />
                </>
            )}
            {(stickersPerRow === 0 || stickerSize === 0) && (
                <LoaderSpinner />
            )}
        </View>
    );
});
