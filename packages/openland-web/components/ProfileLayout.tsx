import React from 'react';
import { XView } from 'react-mental';

import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { XScrollValues } from 'openland-x/XScrollView3';

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

    React.useEffect(() => {
        let prev = window.innerWidth <= COMPACT_VIEW_WIDTH;
        const handleResize = () => {
            let isCompact = window.innerWidth <= COMPACT_VIEW_WIDTH;
            if (prev !== isCompact) {
                prev = isCompact;
                setCompactView(isCompact);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
                    <XView flexDirection={compactView ? 'column' : 'row'}>
                        <XView width={compactView ? 488 : 272} marginRight={16}>
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