import * as React from 'react';
import { XView } from 'react-mental';

export const XErrorMessage2 = ({ message }: { message: string }) => {
    return (
        <XView marginTop={6} paddingLeft={15} fontSize={12} color={'#d75454'}>
            {message}
        </XView>
    );
};
