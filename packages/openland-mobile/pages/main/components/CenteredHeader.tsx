import * as React from 'react';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { View, Text } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

export const CenteredHeader = (props: { title: string, padding?: number }) => {
    let theme = React.useContext(ThemeContext);
    return (
        <SHeaderView>
            <View style={{ flexGrow: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', height: 56, paddingLeft: props.padding }}>
                <Text style={{ color: theme.foregroundPrimary, height: 56, fontSize: 22, fontWeight: '600', includeFontPadding: true, textAlignVertical: 'center' }}>{props.title}</Text>
            </View>
        </SHeaderView>
    );
};