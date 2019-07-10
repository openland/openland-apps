import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { RoomHeader_room_PrivateRoom_user_primaryOrganization } from 'openland-api/Types';
import { emoji } from 'openland-y-utils/emoji';

const titleClassName = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    & span {
        letter-spacing: 0;
    }
`;

const orgClassName = css`
    & span {
        letter-spacing: 0.3px;
    }
`;

export const HeaderTitle = React.memo(
    (props: {
        value: string;
        path?: string;
        organization?: RoomHeader_room_PrivateRoom_user_primaryOrganization | null;
    }) => (
        <XView marginTop={-2} minWidth={0} flexShrink={1} flexDirection="row">
            <XView
                as="a"
                fontWeight="600"
                lineHeight="20px"
                fontSize={15}
                color="#292929"
                path={props.path}
                minWidth={0}
                flexShrink={1}
                hoverTextDecoration="none"
                height={24}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
            >
                <span className={titleClassName}>
                    {emoji({
                        src: props.value,
                        size: 16,
                        cache: true,
                    })}
                </span>
            </XView>
            {props.organization && (
                <XView
                    as="a"
                    marginLeft={6}
                    marginTop={1}
                    fontSize={13}
                    color="#7A7A7A"
                    path={'/mail/o/' + props.organization.id}
                    hoverTextDecoration="none"
                >
                    <span className={orgClassName}>
                        {emoji({
                            src: props.organization.name,
                            size: 16,
                            cache: true,
                        })}
                    </span>
                </XView>
            )}
        </XView>
    ),
);
