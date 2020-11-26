import * as React from 'react';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { SharedRoomView } from 'openland-api/spacex.types';
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

export const UGroupView = React.memo((props: { group: SharedRoomView & { newMessages?: number }, disableHover?: boolean, rightElement?: JSX.Element, path?: string | null }) => {
    const { id, photo, title, membersCount, newMessages, featured } = props.group;
    const description = newMessages
        ? plural(newMessages, ['new message', 'new messages'])
        : membersCount ? plural(membersCount, ['member', 'members'])
            : undefined;

    return (
        <UListItem
            title={(
                <>
                    <div className={cx(titleStyle, featured && titleFeaturedStyle)}>
                        {title}
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
            avatar={{ photo, id, title }}
            useRadius={true}
            path={props.path === null ? undefined : props.path || ('/mail/' + id)}
            disableHover={props.disableHover}
            rightElement={props.rightElement}
        />
    );
});