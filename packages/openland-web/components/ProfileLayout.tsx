import React from 'react';
import { XView } from 'react-mental';

import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { XScrollValues } from 'openland-x/XScrollView3';
import { useWithWidth } from '../hooks/useWithWidth';

interface ProfileLayoutProps {
    leftColumn: any;
    rightColumn: any;
    title: string | undefined;
    track?: string;
}

const COMPACT_VIEW_WIDTH = 1280;
const LOAD_MORE_THRESHOLD = 200;

export const ProfileLayoutContext = React.createContext({ bottomReached: false, compactView: false });

export const ProfileLayout = ({ title, track, leftColumn, rightColumn }: ProfileLayoutProps) => {
    const [compactView, setCompactView] = React.useState(window.innerWidth <= COMPACT_VIEW_WIDTH);
    const [bottomReached, setBottomReached] = React.useState(false);

    const [width] = useWithWidth();

    React.useEffect(() => {
        let isCompact = width! <= COMPACT_VIEW_WIDTH;
        if (compactView !== isCompact) {
            setCompactView(isCompact);
        }
    }, [width]);

    const onScroll = React.useCallback((values: XScrollValues) => {
        const result = values.scrollHeight - (values.clientHeight + values.scrollTop) < LOAD_MORE_THRESHOLD;

        if (result !== bottomReached) {
            setBottomReached(result);
        }
    }, [bottomReached]);

    return (
        <Page appearance={compactView ? 'normal' : 'wide' } padded={true} track={track} onScroll={onScroll}>
            <UHeader documentTitle={title}/>
            <ProfileLayoutContext.Provider value={{ bottomReached, compactView }}>
                <XView alignItems="center" marginLeft={24}>
                    <XView flexDirection={compactView ? 'column' : 'row'} width="100%">
                        <XView width={272} marginRight={16}>
                            <XView
                                position={compactView ? null : 'fixed'}
                                flexDirection={compactView ? 'row' : 'column'}
                                width={272}
                            >
                                {leftColumn}
                            </XView>
                        </XView>
                        <XView maxWidth={504}>
                            {rightColumn}
                        </XView>
                    </XView>
                </XView>
            </ProfileLayoutContext.Provider>
        </Page>
    );
};