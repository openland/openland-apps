import * as React from 'react';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { View, Text } from 'react-native';

export const CenteredHeader = (props: { title: string, padding?: number }) => {
    return (
        <SHeaderView>
            <View flexGrow={1} alignSelf="stretch" alignItems="center" justifyContent="center" height={56} paddingLeft={props.padding}>
                <Text style={{color: '#000', height: 56, fontSize: 22, fontWeight: '600', includeFontPadding: true, textAlignVertical: 'center'}}>{props.title}</Text>
            </View>
        </SHeaderView>
    )
}