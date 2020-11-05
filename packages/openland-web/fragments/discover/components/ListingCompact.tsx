import React from 'react';
import { css } from 'linaria';
import { XView, XViewRouterContext } from 'react-mental';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { TextTitle3 } from 'openland-web/utils/TextStyles';
import ArrowRight from 'openland-icons/s/ic-arrow-right-16.svg';
import { useTabRouter } from 'openland-unicorn/components/TabLayout';
import { DiscoverRoom } from 'openland-y-utils/discover/normalizePopularItems';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { DiscoverOrganization } from 'openland-api/spacex.types';
import { DiscoverOrganizationItem } from './DiscoverOrganizationItem';

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
    margin: 0 -16px;
    width: calc(100% + 16px);
`;

interface ListingCompactInnerProps {
    title?: string;
    itemsCount: number;
    path?: string;
    content: JSX.Element[];
}

const ListingCompactInner = React.memo((props: ListingCompactInnerProps) => {
    if (props.itemsCount === 0) {
        return null;
    }

    const tabRouter = useTabRouter();
    const xRouter = React.useContext(XViewRouterContext);

    const onClick = () => {
        if (props.path) {
            if (tabRouter) {
                tabRouter.router.navigate(props.path);
            } else if (xRouter) {
                xRouter.navigate(props.path);
            }
        }
    };

    return (
        <div className={contentContainer}>
            <XView marginTop={16} paddingHorizontal={16} alignItems="flex-start">
                {props.title && (
                    <div className={titleContainer}>
                        <XView flexDirection="row" alignItems="center" onClick={onClick} color="var(--foregroundPrimary)">
                            <h2 className={TextTitle3}>{props.title}</h2>
                            <span className={iconContainer}>
                                <ArrowRight />
                            </span>
                        </XView>
                    </div>
                )}
                <div className={groupContainer}>
                    <XView width='100%'>
                        {props.content}
                    </XView>
                </div>
            </XView>
        </div>
    );
});

interface ListingCompactProps {
    title?: string;
    items: DiscoverRoom[];
    path?: string;
}

export const ListingCompact = React.memo((props: ListingCompactProps) => {
    const { items, ...other } = props;
    const userInfo = React.useContext(UserInfoContext)!;
    return (
        <ListingCompactInner
            {...other}
            itemsCount={props.items.length}
            content={(
                props.items.map(item => (
                    <UGroupView
                        key={'group-' + item.id}
                        group={item}
                        path={!userInfo.isLoggedIn ? `/${item.id}` : `/mail/${item.id}`}
                    />
                )))
            }
        />
    );
});

interface OrgsListingCompactProps {
    title?: string;
    items: DiscoverOrganization[];
    path?: string;
}

export const OrgsListingCompact = React.memo((props: OrgsListingCompactProps) => {
    const { items, ...other } = props;
    return (
        <ListingCompactInner
            {...other}
            itemsCount={props.items.length}
            content={(
                props.items.map(item => (
                    <DiscoverOrganizationItem
                        key={'group-' + item.id}
                        organization={item}
                    />
                )))
            }
        />
    );
});
