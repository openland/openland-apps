import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

export const SuggestionsWrapper = (props: { children: any }) => (
    <ScrollView alwaysBounceVertical={false} keyboardShouldPersistTaps="always" maxHeight={188}>
        <View height={8} />

        {props.children}

        <View height={8} />
    </ScrollView>
);

export const SuggestionsItemName = (props: { theme: ThemeGlobal, name: string; description?: string }) => (
    <Text
        style={{
            ...TextStyles.Label2,
            width: Dimensions.get('window').width - 72,
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
);