import * as React from 'react';
import { XView } from 'react-mental';

export const FormWrapper = ({ children }: { children: any }) => {
    return (
        <XView
            marginTop={12}
            justifyContent="center"
            alignSelf="center"
            flexDirection="row"
            paddingBottom={56}
            paddingHorizontal={16}
            width="100%"
        >
            <XView flexDirection="column" flexGrow={1} maxWidth="100%">
                {children}
            </XView>
        </XView>
    );
};
