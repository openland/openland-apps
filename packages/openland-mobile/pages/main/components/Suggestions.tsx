import * as React from 'react';
import { View, Text, Dimensions, TextStyle } from 'react-native';
import { AppStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { isAndroid } from 'openland-mobile/utils/isAndroid';
import { AppTheme } from 'openland-mobile/themes/themes';

export const SuggestionsWrapper = (props: { children: any }) => (
    <>
        {isAndroid && <View height={0.5} backgroundColor={AppStyles.separatorColor} />}

        <ScrollView alwaysBounceVertical={false} keyboardShouldPersistTaps="always" maxHeight={186}>
            <View height={6} />

            {props.children}

            <View height={6} />
        </ScrollView>

        {isAndroid && <View height={0.5} backgroundColor={AppStyles.separatorColor} />}
    </>
);

export const SuggestionsItemName = (props: { theme: AppTheme, name: string; description?: string }) => (
    <Text
        style={{
            fontSize: 14,
            width: Dimensions.get('window').width - 63,
            fontWeight: TextStyles.weight.medium,
            color: props.theme.textColor
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
    >
        {props.name}{'   '}
        {!!props.description && (
            <Text
                style={{
                    color: props.theme.textLabelColor,
                    fontWeight: TextStyles.weight.regular
                } as TextStyle}
            >
                {props.description}
            </Text>
        )}
    </Text>
);