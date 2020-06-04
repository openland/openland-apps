import * as React from 'react';
import { XView } from 'react-mental';
import { XScrollView3, XScrollValues } from '../openland-x/XScrollView3';
import { trackEvent } from 'openland-x-analytics';
import { useVisibleTab } from 'openland-unicorn/components/utils/VisibleTabContext';

interface PageProps {
    track: string;
    appearance?: 'normal' | 'wide' | 'fullwidth';
    scroll?: 'disable' | 'enable';
    onScroll?: (values: XScrollValues) => void;
    padded?: boolean;
    children?: any;
    flexGrow?: number;
}

export const Page = React.memo((props: PageProps) => {
    const isTabVisible = useVisibleTab();
    React.useEffect(() => {
        if (isTabVisible) {
            trackEvent('navigate_' + props.track);
        }
    }, [isTabVisible]);
    const { appearance = 'normal', scroll = 'enable', onScroll, children, padded = true } = props;
    const margin = padded ? 16 : undefined;
    let maxWidth = appearance === 'normal' ? 600 : appearance === 'fullwidth' ? '100%' : 824;
    if (!margin) {
        maxWidth = appearance === 'normal' ? 632 : appearance === 'fullwidth' ? '100%' : 856;
    }

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
                    maxWidth={maxWidth}
                    flexDirection="column"
                    flexGrow={1}
                    minWidth={0}
                    flexBasis={0}
                    alignItems="stretch"
                    marginHorizontal={margin}
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
                <XScrollView3 flexGrow={1} flexBasis={0} minHeight={0} onScroll={onScroll}>
                    <XView flexDirection="row" justifyContent="center" flexGrow={props.flexGrow}>
                        <XView
                            maxWidth={maxWidth}
                            flexDirection="column"
                            flexGrow={1}
                            minWidth={0}
                            flexBasis={0}
                            alignItems="stretch"
                            marginHorizontal={margin}
                        >
                            {children}
                        </XView>
                    </XView>
                </XScrollView3>
            </XView>
        );
    }
});
