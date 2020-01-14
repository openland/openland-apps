import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import IcBack from 'openland-icons/s/ic-back-24.svg';
import { XModalBoxContext } from 'openland-x/XModalBoxContext';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { TextLabel1 } from 'openland-web/utils/TextStyles';

const skipClassName = css`
    color: var(--foregroundSecondary);
    cursor: pointer;
    margin: 16px;
`;

const Skip = ({ onClick }: { onClick: (event: React.MouseEvent) => void }) => {
    return (
        <div className={cx(TextLabel1, skipClassName)} onClick={onClick}>
            Skip
        </div>
    );
};

export const BackSkipLogo = ({
    onBack,
    onSkip,
}: {
    onSkip: ((event: React.MouseEvent) => void) | null;
    onBack: ((event: React.MouseEvent) => void) | null;
}) => {
    const modalBox = React.useContext(XModalBoxContext);
    const isMobile = useIsMobile();
    return (
        <XView
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            marginHorizontal={isMobile ? 0 : 21}
            marginTop={isMobile ? 0 : 21}
            padding={4}
            position="relative"
            height={56}
            zIndex={900}
        >
            {onBack && !modalBox ? (
                <UIconButton size="large" cursor="pointer" zIndex={1001} onClick={onBack} icon={<IcBack />} />
            ) : (
                    <div />
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
