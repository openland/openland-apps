import * as React from 'react';
import { Text } from 'react-native';

export const PText = React.memo((props: { children?: any }) => {
    return (
        <Text
            style={{}}
        >
            {props.children}
        </Text>
    );
});