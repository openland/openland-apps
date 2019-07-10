import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemeGlobal } from 'openland-y-utils/themes/types';

export const SuggestionsWrapper = (props: { children: any }) => (
    <ScrollView alwaysBounceVertical={false} keyboardShouldPersistTaps="always" maxHeight={186}>
        <View height={6} />

        {props.children}

        <View height={6} />
    </ScrollView>
);

export const SuggestionsItemName = (props: { theme: ThemeGlobal, name: string; description?: string }) => (
    <Text
        style={{
            fontSize: 14,
            width: Dimensions.get('window').width - 63,
            fontWeight: TextStyles.weight.medium,
            color: props.theme.foregroundPrimary
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
        allowFontScaling={false}
    >
        {props.name}{'   '}
        {!!props.description && (
            <Text
                style={{
                    color: props.theme.foregroundSecondary,
                    fontWeight: TextStyles.weight.regular
                }}
                allowFontScaling={false}
            >
                {props.description}
            </Text>
        )}
    </Text>
);