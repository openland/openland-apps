import * as React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { SBlurView } from 'react-native-s/SBlurView';
import { FullMessage } from 'openland-api/Types';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

interface PinnedMessageProps {
    message: FullMessage;
    onPress: (id: string) => void;
    theme: ThemeGlobal;
    showAuthor?: boolean;
}

export const PinnedMessage = XMemo<PinnedMessageProps>((props) => {
    const { message, onPress, theme, showAuthor } = props;

    return (
        <ASSafeAreaContext.Consumer>
            {area => (
                <SBlurView blurType={theme.blurType} color={theme.backgroundPrimary} position="absolute" top={area.top} left={0} right={0} zIndex={2}>
                    <TouchableWithoutFeedback onPress={() => onPress(message.id)}>
                        <View flexDirection="row" paddingRight={16} alignItems="center">
                            <View width={50} height={showAuthor ? 52 : 44} alignItems="center" justifyContent="center">
                                <Image style={{ width: 16, height: 16, tintColor: theme.accentPrimary }} source={require('assets/ic-pinned.png')} />
                            </View>

                            <View height={showAuthor ? 52 : 44} flexGrow={1} flexShrink={1} paddingTop={9} >
                                {showAuthor && <View flexDirection="row">
                                    <Text numberOfLines={1} style={{ fontSize: 13, color: theme.foregroundPrimary, fontWeight: FontStyles.Weight.Medium }}>
                                        {message.sender.name}
                                    </Text>

                                    {message.sender.primaryOrganization &&
                                        <Text numberOfLines={1} style={{ fontSize: 13, color: theme.foregroundPrimary, marginLeft: 8, fontWeight: FontStyles.Weight.Medium }}>
                                            {message.sender.primaryOrganization!.name}
                                        </Text>
                                    }
                                </View>}
                                <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: FontStyles.Weight.Regular, marginTop: showAuthor ? 1 : 3, opacity: 0.8, lineHeight: 21, color: theme.foregroundPrimary }}>
                                    {message.fallback}
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </SBlurView>
            )}
        </ASSafeAreaContext.Consumer>
    );
});