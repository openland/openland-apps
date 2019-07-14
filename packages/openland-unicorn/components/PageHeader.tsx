import * as React from 'react';
import { XView } from 'react-mental';

import BackIcon from './back_24.svg';
import { useStackRouter } from './StackRouter';

export const PageHeader = () => {
    let router = useStackRouter();
    return (
        <XView height={56} flexDirection="row" alignItems="center">
            <XView
                height={56}
                width={56}
                alignItems="center"
                justifyContent="center"
                onClick={() => router.pop()}
                cursor="pointer"
            >
                <BackIcon />
            </XView>
            <XView
                height={32}
                color="#171B1F"
                minWidth={0}
                flexBasis={0}
                flexGrow={1}
                fontSize={24}
                lineHeight="32px"
                fontWeight="600"
            >
                Header
            </XView>
        </XView>
    );
};