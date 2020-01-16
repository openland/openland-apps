import * as React from 'react';
import { css, cx } from 'linaria';
import { TextLabel1 } from 'openland-web/utils/TextStyles';

const toastWrapper = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 8px;
    background-color: var(--overlayHeavy);
    padding: 7px 16px 9px;
    opacity: 0;
    transform: scale(0.84) translateY(-8px);
    transition: transform 150ms cubic-bezier(0.29, 0.09, 0.24, 0.99),
        opacity 150ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
    box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08);
`;

const toastVisible = css`
    opacity: 1;
    transform: scale(1) translateY(0);
`;

const iconClass = css`
    position: relative;
    width: 16px;
    height: 16px;
    margin-right: 8px;

`;

const textClass = css`
    color: var(--foregroundContrast);
    text-align: center;
`;

interface UToastProps {
    isVisible: boolean;
    text?: string;
    backgroundColor?: string;
    icon?: any;
    autoclose?: boolean;
    className?: string;
}

export const UToast = React.memo((props: UToastProps) => {
    const { isVisible, className, icon, text, backgroundColor, autoclose = true } = props;
    const [isRealVisible, setVisible] = React.useState(isVisible);

    React.useEffect(() => {
        if (isVisible) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [isVisible]);

    React.useEffect(() => {
        let timeoutId: any;
        if (autoclose && isRealVisible) {
            timeoutId = setTimeout(() => setVisible(false), 2000);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [isRealVisible]);

    return !!text ? (
        <div className={cx(toastWrapper, className, isRealVisible && toastVisible)} style={{ backgroundColor }}>
            {!!icon && (
                <div className={iconClass}>
                    {icon}
                </div>
            )}
            <h5 className={cx(TextLabel1, textClass)}>
                {text}
            </h5>
        </div>
    ) : null;
});