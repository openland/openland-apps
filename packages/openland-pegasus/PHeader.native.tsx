import * as React from 'react';
import { SHeader } from 'react-native-s/SHeader';

export const PHeader = React.memo((props: { title?: string }) => {
    return (<SHeader title={props.title} />);
});