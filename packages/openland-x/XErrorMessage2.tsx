import * as React from 'react';
import { css } from 'linaria';
import { UToast } from 'openland-web/components/unicorn/UToast';

const wrapper = css`
    position: absolute;
    top: 56px;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0 16px;
    

    @media (min-width: 750px) {
        top: 77px;
    }
`;

export const XErrorMessage2 = ({ message }: { message: string }) => {
    return (
        <div className={wrapper}>
            <UToast isVisible={!!message} text={message} />
        </div>
    );
};
