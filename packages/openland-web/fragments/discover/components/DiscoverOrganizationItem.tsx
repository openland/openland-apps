import * as React from 'react';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { DiscoverOrganization } from 'openland-api/spacex.types';
import { plural } from 'openland-y-utils/plural';
import IcFeatured from 'openland-icons/s/ic-verified-3-16.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { css, cx } from 'linaria';

const titleStyle = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
`;

const titleFeaturedStyle = css`
    width: calc(100% - 20px);
`;

const featuredIcon = css`
    display: var(--featured-icon-display);
    align-self: center;
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    margin-left: 4px;
`;

export const DiscoverOrganizationItem = React.memo(
    (props: {
        organization: DiscoverOrganization;
        disableHover?: boolean;
        rightElement?: JSX.Element;
        path?: string;
    }) => {
        const { id, photo, name, membersCount, shortname, featured } = props.organization;
        const description = membersCount ? plural(membersCount, ['member', 'members']) : undefined;

        return (
            <UListItem
                title={(
                    <>
                        <div className={cx(titleStyle, featured && titleFeaturedStyle)}>
                            {name}
                        </div>
                        {featured && (
                            <div className={featuredIcon}>
                                <UIcon icon={<IcFeatured />} color={'#3DA7F2'} />
                            </div>
                        )}
                    </>
                )}
                titleStyle={{ flexDirection: 'row' }}
                description={description}
                avatar={{ photo, id, title: name }}
                useRadius={true}
                path={props.path || '/' + (shortname || id)}
                disableHover={props.disableHover}
                rightElement={props.rightElement}
            />
        );
    },
);
