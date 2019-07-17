import * as React from 'react';
import { XView } from 'react-mental';
import { XScrollView3 } from '../openland-x/XScrollView3';

interface PageProps {
    style?: 'wide' | 'normal';
    scroll?: 'disable' | 'enable';
    padded?: boolean;
    children?: any;
}

export const Page = React.memo((props: PageProps) => {
    const { style = 'normal', scroll = 'enable', padded, children } = props;
    const width = style === 'normal' ? 600 : 950;
    const marginHorizontal = padded ? 16 : 0;

    if (scroll !== 'enable') {
        return (
            <XView
                flexDirection="row"
                flexGrow={1}
                minHeight={0}
                flexBasis={0}
                alignSelf="stretch"
                justifyContent="center"
            >
                <XView
                    maxWidth={width}
                    flexDirection="column"
                    flexGrow={1}
                    minWidth={0}
                    flexBasis={0}
                    alignItems="stretch"
                    marginHorizontal={marginHorizontal}
                >
                    {children}
                </XView>
            </XView>
        );
    } else {
        return (
            <XView
                flexDirection="column"
                flexGrow={1}
                minHeight={0}
                flexBasis={0}
                alignSelf="stretch"
                alignItems="stretch"
            >
                <XScrollView3
                    flexGrow={1}
                    flexBasis={0}
                    minHeight={0}
                >
                    <XView flexDirection="row" justifyContent="center">
                        <XView
                            maxWidth={width}
                            flexDirection="column"
                            flexGrow={1}
                            minWidth={0}
                            flexBasis={0}
                            alignItems="stretch"
                            marginHorizontal={marginHorizontal}
                        >
                            {children}
                        </XView>
                    </XView>
                </XScrollView3>
            </XView>
        );
    }
});