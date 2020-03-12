import React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { TextTitle3 } from 'openland-web/utils/TextStyles';
import ArrowRight from 'openland-icons/s/ic-arrow-right-16.svg';
import { useTabRouter } from 'openland-unicorn/components/TabLayout';
import { DiscoverRoom } from 'openland-y-utils/discover/normalizePopularItems';

const contentContainer = css`
    display: flex;
    user-select: none;
    align-items: flex-start;
`;

const titleContainer = css`
    margin-bottom: 12px;
    cursor: pointer;

    &:hover span {
        transform: translateX(5px);
    }

    &:hover span:after {
        transform: scale(1);
    }
`;

const iconContainer = css`
    margin-left: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    transition: transform 150ms;

    position: relative;

    &:after {
        display: block;
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        width: 24px;
        height: 24px;
        border-radius: 100%;
        background-color: var(--backgroundTertiaryTrans);

        transition: transform 150ms;
        transform: scale(0);
    }
`;

const groupContainer = css`
    margin: 0 -16px
    width: calc(100% + 16px);
`;

interface ListingCompactProps {
    title?: string;
    items: DiscoverRoom[];
    path?: string;
}

export const ListingCompact = React.memo((props: ListingCompactProps) => {
    if (props.items.length === 0) {
        return null;
    }

    const router = useTabRouter();

    const onClick = () => {
        if (props.path) {
            router.router.reset(props.path);
        }
    };

    return (
        <div className={contentContainer}>
            <XView marginTop={16} paddingHorizontal={16} alignItems="flex-start">
                {props.title && (
                    <div className={titleContainer}>
                        <XView flexDirection="row" alignItems="center" onClick={onClick}>
                            <h2 className={TextTitle3}>{props.title}</h2>
                            <span className={iconContainer}>
                                <ArrowRight />
                            </span>
                        </XView>
                    </div>
                )}
                <div className={groupContainer}>
                    <XView width='100%'>
                        {props.items.map(item => (
                            <UGroupView key={'group-' + item.id} group={item} />
                        ))}
                    </XView>
                </div>
            </XView>
        </div>
    );
});
