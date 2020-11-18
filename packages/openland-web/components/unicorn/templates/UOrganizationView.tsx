import * as React from 'react';
import { css, cx } from 'linaria';
import { UListItem, UListItemProps } from 'openland-web/components/unicorn/UListItem';
import { OrganizationShort } from 'openland-api/spacex.types';
import IcFeatured from 'openland-icons/s/ic-verified-3-16.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';

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

interface UOrganizationViewProps {
    organization: OrganizationShort;
    usePath?: boolean;
    hovered?: boolean;
    description?: string;
}

export const UOrganizationView = React.memo(
    (props: UOrganizationViewProps & Partial<UListItemProps>) => {
        const { id, photo, name, about, shortname, featured } = props.organization;

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
                description={props.description || about}
                avatar={{ photo, id, title: name }}
                useRadius={true}
                path={props.usePath !== false ? `/${shortname || id}` : undefined}
                hovered={props.hovered}
                {...props}
            />
        );
    },
);
