import * as React from 'react';
import { XView, XImage } from 'react-mental';
import { css } from 'linaria';
import BackButton from 'openland-icons/arrow-left.svg';

const skipClassName = css`
    letter-spacing: -0.078px;
    font-size: 15px;
    color: rgba(41, 41, 41, 0.5);
`;

// TODO make it link
const Skip = () => {
    return <div className={skipClassName}>Skip</div>;
};

export const BackSkipLogo = ({ noLogo, noSkip }: { noLogo?: boolean; noSkip?: boolean }) => {
    return (
        <XView
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            paddingLeft={50}
            paddingRight={50}
        >
            <XView>
                <BackButton />
            </XView>

            {!noLogo && (
                <XView>
                    <XImage src="/static/landing/logotype.svg" width={145} height={42} />
                </XView>
            )}
            {!noSkip ? (
                <XView>
                    <Skip />
                </XView>
            ) : (
                <div />
            )}
        </XView>
    );
};
