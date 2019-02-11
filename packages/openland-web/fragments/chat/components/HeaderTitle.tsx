import * as React from 'react';
import { XView } from 'react-mental';
import { Room_room_PrivateRoom_user_primaryOrganization } from 'openland-api/Types';
import { css } from 'linaria';
import { emoji } from 'openland-y-utils/emoji';

export const HeaderTitle = (props: {
    value: string;
    path?: string;
    organization?: Room_room_PrivateRoom_user_primaryOrganization | null;
}) => (
    <XView marginTop={-2} minWidth={0} flexShrink={1} flexDirection="row">
        <XView
            as="a"
            fontSize={14}
            fontWeight="600"
            lineHeight="18px"
            color="#000000"
            path={props.path}
            minWidth={0}
            flexShrink={1}
            hoverTextDecoration="none"
            height={18}
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
        >
            <span>
                {emoji({
                    src: props.value,
                    size: 16,
                })}
            </span>
        </XView>
        {props.organization && (
            <XView
                as="a"
                marginLeft={6}
                fontSize={13}
                fontWeight="600"
                color="rgba(0, 0, 0, 0.4)"
                lineHeight="18px"
                path={'/mail/o/' + props.organization.id}
                hoverTextDecoration="none"
            >
                {emoji({
                    src: props.organization.name,
                    size: 16,
                })}
            </XView>
        )}
    </XView>
);
