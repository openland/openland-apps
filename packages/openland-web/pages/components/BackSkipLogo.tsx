import * as React from 'react';
import { XView, XImage } from 'react-mental';
import { css } from 'linaria';
import BackButton from 'openland-icons/arrow-left.svg';

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
    return (
        <XView
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            paddingLeft={50}
            paddingRight={50}
            position="relative"
        >
            {onBack ? (
                <XView cursor="pointer">
                    <BackButton onClick={onBack} />
                </XView>
            ) : (
                <div />
            )}

            {!noLogo && (
                <>
                    <div
                        style={{
                            height: 42,
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            margin: 'auto',
                            width: 'fit-content',
                        }}
                    >
                        <XImage src="/static/landing/logotype.svg" width={145} height={42} />
                    </div>
                </>
            )}
            {onSkip ? (
                <XView>
                    <Skip onClick={onSkip} />
                </XView>
            ) : (
                <div />
            )}
        </XView>
    );
};
