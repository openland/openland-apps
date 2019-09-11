import * as React from 'react';
import { DataSourceFeedPostItem } from 'openland-engines/feed/FeedEngine';
import { css } from 'linaria';
import { TextTitle1 } from 'openland-web/utils/TextStyles';

const wrapperClass = css`
    background-color: var(--backgroundSecondary);
    overflow: hidden;
    border-radius: 18px;
    margin: 16px 0 32px;
    padding: calc((4 / 3) * 100%) 0 0;
    box-shadow: 0px 8px 24px rgba(23, 26, 31, 0.08), 0px 2px 8px rgba(23, 26, 31, 0.02);
    position: relative;
`;

const contentClass = css`
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    text-align: center;
`;

interface FeedPostViewProps {
    item: DataSourceFeedPostItem;
}

export const FeedPostView = React.memo<FeedPostViewProps>(props => {
    const { id, text } = props.item;

    return (
        <div className={wrapperClass}>
            <div className={contentClass}>
                <div className={TextTitle1}>{text || id}</div>
            </div>
        </div>
    );
});
