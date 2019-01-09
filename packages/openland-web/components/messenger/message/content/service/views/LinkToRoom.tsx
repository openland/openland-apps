import * as React from 'react';
import { css } from 'linaria';
import { XLink } from 'openland-x/XLink';

const roomLinkClassName = css`
    color: #1790ff;
`;

export const LinkToRoom = ({ children, roomId }: { children: any; roomId: string }) => {
    return (
        <XLink
            className={roomLinkClassName}
            path={`/mail/${roomId}`}
            onClick={(e: any) => e.stopPropagation()}
        >
            {children}
        </XLink>
    );
};
