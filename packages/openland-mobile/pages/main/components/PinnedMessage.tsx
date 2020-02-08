import * as React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { FullMessage } from 'openland-api/spacex.types';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { ZBlurredView } from 'openland-mobile/components/ZBlurredView';
import { useClient } from 'openland-api/useClient';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';

interface PinnedMessageProps {
    message: FullMessage;
    onPress: (id: string) => void;
    theme: ThemeGlobal;
    showAuthor?: boolean;
    canUnpin: boolean;
    chatId: string;
}

export const PinnedMessage = XMemo<PinnedMessageProps>((props) => {
    const client = useClient();
    const { message, onPress, theme, showAuthor, chatId, canUnpin } = props;

    const handleUnpinPress = React.useCallback(async () => {
        startLoader();

        try {
            await client.mutateUnpinMessage({ chatId });
        } finally {
            stopLoader();
        }
    }, [chatId]);

    return (
        <ASSafeAreaContext.Consumer>
            {area => (
                <ZBlurredView position="absolute" top={area.top} left={0} right={0} zIndex={2} flexDirection="row">
                    <TouchableWithoutFeedback onPress={() => onPress(message.id)}>
                        <View flexGrow={1} flexShrink={1} height={56} flexDirection="row" paddingLeft={16} paddingRight={canUnpin ? 0 : 16} alignItems="center">
                            <View width={24} height={24} marginRight={16} >
                                <Image style={{ width: 24, height: 24, tintColor: theme.foregroundSecondary }} source={require('assets/ic-pin-24.png')} />
                            </View>

                            <View flexGrow={1} flexShrink={1}>
                                {showAuthor && (
                                    <Text style={{ ...TextStyles.Label2, color: theme.foregroundPrimary }} numberOfLines={1} allowFontScaling={false}>
                                        {message.sender.name}
                                    </Text>
                                )}

                                <Text style={{ ...TextStyles.Subhead, color: theme.foregroundSecondary }} numberOfLines={1} allowFontScaling={false}>
                                    {message.fallback}
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    {canUnpin && (
                        <TouchableWithoutFeedback onPress={handleUnpinPress}>
                            <View width={50} height={56} paddingRight={6} alignItems="center" justifyContent="center">
                                <View width={24} height={24} borderRadius={RadiusStyles.Medium} backgroundColor={theme.backgroundTertiaryTrans} alignItems="center" justifyContent="center">
                                    <Image source={require('assets/ic-close-16.png')} style={{ tintColor: theme.foregroundSecondary, width: 16, height: 16 }} />
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </ZBlurredView>
            )}
        </ASSafeAreaContext.Consumer>
    );
});