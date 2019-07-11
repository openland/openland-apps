import * as React from 'react';
import { XView } from 'react-mental';

export const UListHeader = (props: { text: string }) => {
    return (
        <XView marginTop={16} height={48} fontSize={17} lineHeight="48px" paddingHorizontal={16} fontWeight="600">
            {props.text}
        </XView>
    );
};