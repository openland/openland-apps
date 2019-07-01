import * as React from 'react';
import { XView, XImage } from 'react-mental';
import { css } from 'linaria';
import BackButton from 'openland-icons/arrow-left.svg';
import { XModalBoxContext } from 'openland-x/XModalBoxContext';

const skipClassName = css`
    letter-spacing: -0.078px;
    font-size: 15px;
    color: rgba(41, 41, 41, 0.5);
    cursor: pointer;
`;

const Skip = ({ onClick }: { onClick: (event: React.MouseEvent) => void }) => {
    return (
        <div className={skipClassName} onClick={onClick}>
            Skip
        </div>
    );
};

export const BackSkipLogo = ({
    noLogo,
    onBack,
    onSkip,
}: {
    noLogo?: boolean;
    onSkip: ((event: React.MouseEvent) => void) | null;
    onBack: ((event: React.MouseEvent) => void) | null;
}) => {
    const modalBox = React.useContext(XModalBoxContext);

    return (
        <XView
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            paddingLeft={50}
            paddingRight={50}
            position="relative"
            height={42}
            zIndex={900}
        >
            {onBack && !modalBox ? (
                <XView cursor="pointer" zIndex={1001}>
                    <BackButton onClick={onBack} />
                </XView>
            ) : (
                <div />
            )}

            {!noLogo && (
                <div
                    style={{
                        position: 'absolute',
                        left: modalBox ? 32 : 'calc(50% - 73px)',
                        margin: 'auto',
                    }}
                >
                    <XImage src="/static/landing/logotype.svg" width={146} height={42} />
                </div>
            )}
            {onSkip && !modalBox ? (
                <XView zIndex={1001}>
                    <Skip onClick={onSkip} />
                </XView>
            ) : (
                <div />
            )}
        </XView>
    );
};
