import * as React from 'react';
import { View, Text, Image, LayoutChangeEvent, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { useClient } from 'openland-api/useClient';
import { useStickerLayout } from './components/stickers/stickerLayout';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SFlatList } from 'react-native-s/SFlatList';
import { StickerPackCatalog_stickers } from 'openland-api/spacex.types';
import { ZImage } from 'openland-mobile/components/ZImage';
import { TextStyles, HighlightAlpha } from 'openland-mobile/styles/AppStyles';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import Alert from 'openland-mobile/components/AlertBlanket';
import { SHeader } from 'react-native-s/SHeader';
import Toast from 'openland-mobile/components/Toast';
import { showStickerPackModal } from './components/stickers/showStickerPackModal';

interface StickerCatalogProps {
    pack: StickerPackCatalog_stickers;
    stickersPerRow: number;
    stickerSize: number;
    theme: ThemeGlobal;
}

const StickerCatalog = React.memo((props: StickerCatalogProps) => {
    const { pack, stickersPerRow, stickerSize, theme } = props;

    const haveIt = pack.added;

    const client = useClient();

    const [buttonLoading, setButtonLoading] = React.useState(false);

    const handleButtonPress = async () => {
        if (haveIt) {
            Alert.builder()
                .title(`Delete ${pack.title} stickers?`)
                .button('Cancel', 'cancel')
                .button('Delete', 'destructive', () => {
                    (async () => {
                        setButtonLoading(true);
                        try {
                            await client.mutateStickerPackRemoveFromCollection({ id: pack.id });
                            await client.refetchStickerPackCatalog();
                            await client.refetchMyStickers();
                        } catch (e) {
                            Toast.failure({ duration: 1000 }).show();
                        }
                        setButtonLoading(false);
                    })();
                })
                .show();
        } else {
            setButtonLoading(true);
            try {
                await client.mutateStickerPackAddToCollection({ id: pack.id });
                await client.refetchStickerPackCatalog();
                await client.refetchMyStickers();
            } catch (e) {
                Toast.failure({ duration: 1000 }).show();
            }
            setButtonLoading(false);
        }
    };

    const handleStickerPress = React.useCallback(() => showStickerPackModal(pack.id), [pack.id]);

    return (
        <View style={{ padding: 8 }}>
            <View style={{ paddingHorizontal: 8, paddingVertical: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 56 }}>
                <View style={{ justifyContent: 'space-between' }}>
                    <Text style={{ ...TextStyles.Label1, color: theme.foregroundPrimary }}>{pack.title}</Text>
                    <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}>{pack.stickers.length} {pack.stickers.length === 1 ? 'sticker' : 'stickers'}</Text>
                </View>
                <TouchableOpacity
                    style={{
                        width: 56,
                        height: 36,
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: haveIt || buttonLoading ? theme.backgroundTertiaryTrans : theme.accentPrimary
                    }}
                    activeOpacity={HighlightAlpha}
                    disabled={buttonLoading}
                    onPress={handleButtonPress}
                >
                    {buttonLoading ? (
                        <LoaderSpinner color={theme.foregroundTertiary} />
                    ) : (
                        <Image
                            source={haveIt ? require('assets/ic-done-24.png') : require('assets/ic-add-24.png')}
                            style={{ tintColor: haveIt ? theme.foregroundTertiary : theme.foregroundContrast, width: 24, height: 24 }}
                        />
                    )}
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {pack.stickers.slice(0, stickersPerRow).map(e => (
                    <TouchableWithoutFeedback onPress={handleStickerPress}>
                        <View style={{ padding: 8 }}>
                            <ZImage
                                resize='none'
                                source={`https://ucarecdn.com/${e.image.uuid}/-/format/png/-/preview/128x128/`}
                                width={stickerSize}
                                height={stickerSize}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>
        </View>
    );
});

const StickersCatalogContent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const client = useClient();
    const stickersCatalog = client.useStickerPackCatalog({ fetchPolicy: 'network-only' }).stickers;

    const [{ stickerSize, stickersPerRow }, handleWidthChange] = useStickerLayout();

    const handleLayoutChange = React.useCallback((e: LayoutChangeEvent) => handleWidthChange(e.nativeEvent.layout.width), []);

    return (
        <>
            <SHeader title="Stickers" />
            <View style={{ backgroundColor: theme.backgroundPrimary, justifyContent: 'center' }} onLayout={handleLayoutChange}>
                {stickersPerRow > 0 && stickerSize > 0 && (
                    <SFlatList
                        data={stickersCatalog}
                        renderItem={({ item }) => (
                            <StickerCatalog
                                pack={item}
                                stickersPerRow={stickersPerRow}
                                stickerSize={stickerSize}
                                theme={theme}
                            />
                        )}
                        style={{ padding: 8 }}
                    />
                )}
                {(stickersPerRow === 0 || stickerSize === 0) && (
                    <LoaderSpinner />
                )}
            </View>
        </>
    );
});

export const StickersCatalog = withApp(StickersCatalogContent);