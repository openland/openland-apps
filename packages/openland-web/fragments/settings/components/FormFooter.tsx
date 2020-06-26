import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';

const stickyClass = css`
    position: sticky;
    left: 0; bottom: 0; right: 0;
    margin: 0 -16px;
    padding: 16px;
    background-color: var(--backgroundPrimary);
`;

export const FormFooter = ({ sticky, children }: { sticky?: boolean, children: any }) => {
    if (sticky) {
        return (
            <div className={stickyClass}>
                <XView>
                    {children}
                </XView>
            </div>
        );
    }

    return <XView marginTop={16}>{children}</XView>;
};
