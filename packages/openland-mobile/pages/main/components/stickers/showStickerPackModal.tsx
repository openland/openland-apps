import * as React from 'react';
import { View, Text, TouchableOpacity, Image, LayoutChangeEvent, FlatList } from 'react-native';
import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import { useClient } from 'openland-api/useClient';
import { TextStyles, HighlightAlpha } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { useStickerLayout, StickerLayout } from './stickerLayout';
import { ZButton } from 'openland-mobile/components/ZButton';
import { StickerFragment } from 'openland-api/spacex.types';
import { ZImage } from 'openland-mobile/components/ZImage';
import Toast from 'openland-mobile/components/Toast';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';

const StickerRows = React.memo((props: { stickers: StickerFragment[], stickerLayout: StickerLayout }) => {
    const { stickers, stickerLayout } = props;
    const { stickerSize, stickersPerRow } = stickerLayout;

    let rows: StickerFragment[][] = [];
    const rowCount = Math.ceil(stickers.length / stickersPerRow);
    for (let i = 0; i < rowCount; ++i) {
        rows.push(stickers.slice(i * stickersPerRow, (i + 1) * stickersPerRow));
    }

    return (
        <FlatList
            data={rows}
            renderItem={({ item }) => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {item.map(e => (
                        <View style={{ padding: 8 }}>
                            <ZImage
                                resize='none'
                                width={stickerSize}
                                height={stickerSize}
                                source={`https://ucarecdn.com/${e.image.uuid}/-/format/png/-/preview/128x128/`}
                            />
                        </View>
                    ))}
                </View>
            )}
            style={{ maxHeight: 200, marginBottom: 16 }}
        />
    );
});

const StickerPackModalContent = React.memo((props: { id: string, hide: () => void }) => {
    const { id, hide } = props;

    const client = useClient();
    const stickerPack = client.useStickerPack({ id }).stickerPack;

    const theme = React.useContext(ThemeContext);
    const [stickerLayout, handleWidthChange] = useStickerLayout();
    const [loading, setLoading] = React.useState(false);

    const handleLayoutChange = React.useCallback((e: LayoutChangeEvent) => handleWidthChange(e.nativeEvent.layout.width), []);

    const haveIt = stickerPack && stickerPack.added;

    const handleButtonPressed = React.useCallback(async () => {
        setLoading(true);
        try {
            if (haveIt) {
                await client.mutateStickerPackRemoveFromCollection({ id });
            } else {
                await client.mutateStickerPackAddToCollection({ id });    
            }
            await client.refetchStickerPack({ id });
            await client.refetchMyStickers();
            Toast.success({ duration: 1000, text: `Stickers ${haveIt ? 'deleted' : 'added'}` }).show();
        } catch (e) {
            Toast.failure({ duration: 1000 }).show();
        }
        setLoading(false);
    }, [haveIt, id]);

    if (!stickerPack) {
        hide();
        return null;
    }

    return (
        <View onLayout={handleLayoutChange} style={{ paddingHorizontal: 8 }}>
            <View style={{ paddingHorizontal: 8, paddingVertical: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }}>{stickerPack.title}</Text>
                <TouchableOpacity
                    activeOpacity={HighlightAlpha}
                    style={{
                        backgroundColor: theme.backgroundTertiaryTrans,
                        borderRadius: 100,
                        width: 28,
                        height: 28,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    onPress={hide}
                >
                    <Image style={{ width: 16, height: 16, tintColor: theme.foregroundTertiary }} source={require('assets/ic-close-16.png')} />
                </TouchableOpacity>
            </View>
            {stickerLayout.stickerSize > 0 && stickerLayout.stickersPerRow > 0 && (
                <StickerRows stickers={stickerPack.stickers} stickerLayout={stickerLayout} />
            )}
            {(stickerLayout.stickerSize === 0 || stickerLayout.stickersPerRow === 0) && (
                <LoaderSpinner />
            )}
            <View style={{ paddingHorizontal: 8 }}>
                <ZButton
                    size='large'
                    title={`${haveIt ? 'Delete' : 'Add'} ${stickerPack.stickers.length} stickers`} 
                    onPress={handleButtonPressed}
                    style={haveIt ? 'secondary' : 'primary'}
                    loading={loading}
                />
            </View>
        </View>
    );
});

export const showStickerPackModal = (id: string) => {
    showBottomSheet({
        view: (ctx) => (
            <StickerPackModalContent id={id} hide={ctx.hide} />
        ),
        containerStyle: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderTopLeftRadius: 18, borderTopRightRadius: 18 },
        disableMargins: true
    });
};