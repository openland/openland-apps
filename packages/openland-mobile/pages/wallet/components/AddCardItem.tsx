import * as React from 'react';
import { View, Image } from 'react-native';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { useTheme } from 'openland-mobile/themes/ThemeContext';

export const AddCardItem = (props: {onPress: () => void}) => {
    const theme = useTheme();
    const addCardView = (
        <View justifyContent="center" alignItems="center" backgroundColor={theme.backgroundTertiaryTrans} borderRadius={4} width={40} height={28}>
            <Image source={require('assets/ic-add-16.png')} style={{tintColor: theme.foregroundSecondary}} />
        </View>
    );

    return (
        <ZListItem
            leftIconView={addCardView}
            text="Add card"
            onPress={props.onPress}
        />
    );
};
