import * as React from 'react';
import { XView } from 'react-mental';

import BackIcon from './back_24.svg';
import { useStackRouter } from './StackRouter';
import { HeaderConfig } from './HeaderConfig';

export const PageHeader = React.memo((props: { config: HeaderConfig }) => {
    let router = useStackRouter();
    let appearance = props.config.appearance || 'normal';
    return (
        <XView height={56} flexDirection="row" alignItems="center" zIndex={2}>
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
                minWidth={0}
                flexBasis={0}
                flexGrow={1}
                fontSize={24}
                flexDirection="row"
                justifyContent="center"
                marginRight={56}
            >
                <XView
                    height={32}
                    color="#171B1F"
                    minWidth={0}
                    flexBasis={0}
                    flexGrow={1}
                    fontSize={24}
                    maxWidth={appearance === 'normal' ? 600 : 900}
                    lineHeight="32px"
                    fontWeight="600"
                    flexDirection="row"
                    paddingHorizontal={16}
                >
                    {props.config.title}
                </XView>
            </XView>
        </XView>
    );
});