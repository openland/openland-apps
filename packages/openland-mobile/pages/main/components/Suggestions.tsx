import * as React from 'react';
import { View, Text, Dimensions, Image, Platform } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { useTheme } from 'openland-mobile/themes/ThemeContext';

export const SuggestionsWrapper = (props: { children: any }) => (
    <ScrollView alwaysBounceVertical={false} keyboardShouldPersistTaps="always" style={{ maxHeight: 188 }}>
        <View style={{ height: 8 }} />

        {props.children}

        <View style={{ height: 8 }} />
    </ScrollView>
);

export const SuggestionsItemName = (props: { theme: ThemeGlobal, name: string; description?: string, featured?: boolean }) => {
    const theme = useTheme();
    const hasFeaturedIcon = props.featured && theme.displayFeaturedIcon;
    return (
        <View style={{ flexDirection: 'row', width: Dimensions.get('window').width - (hasFeaturedIcon ? 78 : 72) }}>
            <Text
                style={{
                    ...TextStyles.Label2,
                    color: props.theme.foregroundPrimary
                }}
                numberOfLines={1}
                ellipsizeMode="tail"
                allowFontScaling={false}
            >
                {props.name}{'  '}
                {!!props.description && (
                    <Text
                        style={{
                            ...TextStyles.Caption,
                            color: props.theme.foregroundSecondary,
                        }}
                        allowFontScaling={false}
                    >
                        {props.description}
                    </Text>
                )}
            </Text>
            {hasFeaturedIcon && (
                <Image
                    source={require('assets/ic-verified-16.png')}
                    style={{ tintColor: '#3DA7F2', width: 16, height: 16, flexShrink: 0, marginHorizontal: 4, marginTop: Platform.select({ ios: 2, android: 0 }), alignSelf: 'center' }}
                />
            )}
        </View>
    );
};