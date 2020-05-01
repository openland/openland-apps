import * as React from 'react';
import { XView } from 'react-mental';
import { XScrollView3, XScrollValues } from '../openland-x/XScrollView3';
import { trackEvent } from 'openland-x-analytics';
import { useVisibleTab } from 'openland-unicorn/components/utils/VisibleTabContext';

interface PageProps {
    track: string;
    style?: 'wide' | 'normal';
    scroll?: 'disable' | 'enable';
    onScroll?: (values: XScrollValues) => void;
    padded?: boolean;
    children?: any;
    flexGrow?: number;
    maxWidth?: number | string;
}

export const Page = React.memo((props: PageProps) => {
    const isTabVisible = useVisibleTab();
    React.useEffect(() => {
        if (isTabVisible) {
            trackEvent('navigate_' + props.track);
        }
    }, [isTabVisible]);
    const { style = 'normal', scroll = 'enable', padded, onScroll, children } = props;
    const width = props.maxWidth
        ? props.maxWidth
        : style === 'normal' ? 600 : 856;
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
                <XScrollView3 flexGrow={1} flexBasis={0} minHeight={0} onScroll={onScroll}>
                    <XView
                        flexDirection="row"
                        justifyContent="center"
                        flexGrow={props.flexGrow}
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
                </XScrollView3>
            </XView>
        );
    }
});
