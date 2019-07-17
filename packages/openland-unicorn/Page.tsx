import * as React from 'react';
import { XView } from 'react-mental';
import { XScrollView3 } from '../openland-x/XScrollView3';

export const Page = React.memo((props: { children?: any, style?: 'wide' | 'normal', scroll?: 'disable' | 'enable' }) => {
    let style = props.style || 'normal';
    let scroll = props.scroll || 'enable';
    let width = style === 'normal' ? 600 : 950;

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
                    marginHorizontal={32}
                >
                    {props.children}
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
                            marginHorizontal={32}
                        >
                            {props.children}
                        </XView>
                    </XView>
                </XScrollView3>
            </XView>
        );
    }
});