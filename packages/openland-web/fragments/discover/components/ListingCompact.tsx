import React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { TextTitle3 } from 'openland-web/utils/TextStyles';
import ArrowRight from 'openland-icons/s/ic-arrow-right-16.svg';

const contentContainer = css`
    display: flex;
    user-select: none;
    align-items: flex-start;
`;

const titleContainer = css`
    margin-bottom: 12px;
    cursor: pointer;
`;

interface ListingCompactProps {
    title?: string;
    items: DiscoverSharedRoom[];
    path?: string;
}

export const ListingCompact = React.memo((props: ListingCompactProps) => {
    if (props.items.length === 0) {
        return null;
    }

    return (
        <div className={contentContainer}>
            <XView marginTop={16} paddingHorizontal={16} alignItems="flex-start">
                {props.title && (
                    <div className={titleContainer}>
                        <XView path={props.path} flexDirection="row" alignItems="center">
                            <h2 className={TextTitle3}>{props.title}</h2>
                            <XView marginLeft={8}>
                                <ArrowRight />
                            </XView>
                        </XView>
                    </div>
                )}
                <XView marginLeft={-16} marginRight={-16}>
                    {props.items.map(item => (
                        <UGroupView key={'group-' + item.id} group={item as DiscoverSharedRoom} />
                    ))}
                </XView>
            </XView>
        </div>
    );
});
