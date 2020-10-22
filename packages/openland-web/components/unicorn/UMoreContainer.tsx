import React from 'react';
import { XView } from 'react-mental';

import MoreHorizontalIcon from 'openland-icons/s/ic-more-h-24.svg';

import { UListItem } from './UListItem';

interface UMoreContainerProps {
    children: any;
}

export const UMoreContainer = React.memo(({ children }: UMoreContainerProps) => {
    const [fullSize, setFullSize] = React.useState(false);
    const onMoreClick = React.useCallback(() => setFullSize(true), [setFullSize]);

    if (!fullSize) {
        return <UListItem title="More" useRadius={true} icon={<MoreHorizontalIcon />} onClick={onMoreClick} />;
    }

    return (
        <XView>
            {children}
        </XView>
    );
});