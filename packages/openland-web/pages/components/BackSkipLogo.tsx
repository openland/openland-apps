import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import IcBack from 'openland-icons/s/ic-back-24.svg';
import { XModalBoxContext } from 'openland-x/XModalBoxContext';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { TextLabel1 } from 'openland-web/utils/TextStyles';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';

const wrapper = css`
    position: fixed;
    background-color: transparent;
    width: 100%;
    height: 72px;
    z-index: 1001;
`;
const mobileWrapper = css`
    height: 56px;
    background-color: var(--backgroundPrimary);
`;

const skipClassName = css`
    color: var(--foregroundSecondary);
    cursor: pointer;
    padding: 12px 16px;
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
    const isMobile = useIsMobile();
    const modalBox = React.useContext(XModalBoxContext);
    return (
        <div className={cx(wrapper, isMobile && mobileWrapper)}>
            {onBack && !modalBox ? (
                <UIconButton position="absolute" top={isMobile ? 4 : 12} left={isMobile ? 4 : 12} size="large" cursor="pointer" onClick={onBack} icon={<IcBack />} />
            ) : (
                    <div />
                )}

            {onSkip && !modalBox ? (
                <XView position="absolute" top={isMobile ? 4 : 12} right={isMobile ? 4 : 12}>
                    <Skip onClick={onSkip} />
                </XView>
            ) : (
                    <div />
                )}
        </div>
    );
};
