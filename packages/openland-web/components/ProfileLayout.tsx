import React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { XScrollValues } from 'openland-x/XScrollView3';
import { useWithWidth } from '../hooks/useWithWidth';

const profileView = css`
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    width: 272px;
    position: sticky;
    top: 0;
`;

const profileViewCompact = css`
    display: flex;
    flex-direction: row;
    flex-grow: 0;
    flex-shrink: 0;
`;

interface ProfileLayoutProps {
    leftColumn: any;
    rightColumn: any;
    title: string | undefined;
    track?: string;
}

const COMPACT_VIEW_WIDTH = 1280;
const LOAD_MORE_THRESHOLD = 200;

export const ProfileLayoutContext = React.createContext({
    bottomReached: false,
    compactView: false,
});

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

    const onScroll = React.useCallback(
        (values: XScrollValues) => {
            const result =
                values.scrollHeight - (values.clientHeight + values.scrollTop) <
                LOAD_MORE_THRESHOLD;

            if (result !== bottomReached) {
                setBottomReached(result);
            }
        },
        [bottomReached],
    );

    return (
        <Page
            appearance={compactView ? 'normal' : 'wide'}
            padded={true}
            track={track}
            onScroll={onScroll}
        >
            <UHeader documentTitle={title} />
            <ProfileLayoutContext.Provider value={{ bottomReached, compactView }}>
                <XView alignItems="center" marginLeft={24}>
                    <XView flexDirection={compactView ? 'column' : 'row'} width="100%">
                        <XView
                            width={compactView ? undefined : 272}
                            marginRight={compactView ? undefined : 16}
                        >
                            <div className={compactView ? profileViewCompact : profileView}>
                                {leftColumn}
                            </div>
                        </XView>
                        <XView maxWidth={536} width="100%" flexShrink={1}>{rightColumn}</XView>
                    </XView>
                </XView>
            </ProfileLayoutContext.Provider>
        </Page>
    );
};
