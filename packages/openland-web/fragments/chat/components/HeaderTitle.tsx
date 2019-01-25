import * as React from 'react';
import { XView } from 'react-mental';
import { Room_room_PrivateRoom_user_primaryOrganization } from 'openland-api/Types';
import { css } from 'linaria';
import { emoji } from 'openland-y-utils/emoji';

const titleInnerClass = css`
    height: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

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
        >
            <div className={titleInnerClass}>{emoji(props.value, 14)}</div>
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
                {emoji(props.organization.name, 14)}
            </XView>
        )}
    </XView>
);
