import * as React from 'react';
import { css, cx } from 'linaria';
import { TextLabel1 } from 'openland-web/utils/TextStyles';
import { XLoader } from 'openland-x/XLoader';
import DoneIcon from 'openland-icons/s/ic-done-new-16.svg';
import WarningIcon from 'openland-icons/s/ic-warning-16.svg';

const toastWrapper = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 8px;
    background-color: var(--foregroundPrimary);
    padding: 7px 16px 9px;
    opacity: 0;
    transform: scale(0.84) translateY(-8px);
    transition: transform 150ms cubic-bezier(0.29, 0.09, 0.24, 0.99),
        opacity 150ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
    box-shadow: var(--boxShadowPopper);
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
    flex-shrink: 0;
    svg,
    path {
        fill: var(--foregroundInverted);
    }
`;

const textClass = css`
    color: var(--foregroundInverted);
    text-align: center;
`;

export interface UToastProps {
    isVisible: boolean;
    type?: 'text' | 'loading' | 'success' | 'failure';
    text?: string;
    backgroundColor?: string;
    textColor?: string;
    autoclose?: boolean;
    closeCb?: () => void;
    className?: string;
}

export const UToast = React.memo((props: UToastProps) => {
    const { isVisible, className, text, backgroundColor, textColor, closeCb, type = 'text', autoclose = true } = props;
    const [isRealVisible, setVisible] = React.useState(false);

    React.useEffect(() => {
        if (isVisible) {
            setVisible(true);
        } else {
            setVisible(false);
            if (closeCb) {
                closeCb();
            }
        }
    }, [isVisible]);

    React.useEffect(() => {
        let timeoutId: any;
        if (autoclose && isRealVisible) {
            timeoutId = setTimeout(() => {
                setVisible(false);
                if (closeCb) {
                    closeCb();
                }
            }, 2000);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [isRealVisible]);

    const iconByType = {
        loading: () => (
            <XLoader contrast={true} transparentBackground={true} loading={true} size="small" />
        ),
        success: () => <DoneIcon />,
        failure: () => <WarningIcon />,
    };

    const Icon = iconByType[type];

    return !!text ? (
        <div
            className={cx(toastWrapper, className, isRealVisible && toastVisible)}
            style={{ backgroundColor }}
        >
            {!!Icon && (
                <div className={iconClass}>
                    <Icon />
                </div>
            )}
            <h5 className={cx(TextLabel1, textClass)} style={{ color: textColor }}>{text}</h5>
        </div>
    ) : null;
});

export interface UToastConfig {
    hash?: string | number;
    type?: 'text' | 'loading' | 'success' | 'failure';
    text?: string;
    backgroundColor?: string;
    textColor?: string;
    autoclose?: boolean;
    duration?: number;
}

export interface UToastHandlers {
    show: (config: UToastConfig) => void;
    hide: () => void;
}

export type UToastContextProps = UToastHandlers & {
    visible: boolean;
    config: UToastConfig;
};

export const UToastContext = React.createContext<UToastContextProps>({
    show: () => null,
    hide: () => null,
    visible: false,
    config: {},
});

export const UToastProvider = React.memo((props: { children: any }) => {
    const [visible, setVisible] = React.useState(false);
    const [config, setConfig] = React.useState<UToastConfig>({});
    const handlers = React.useRef({
        show: (newConfig: UToastConfig) => {
            let timeoutId: any;
            setVisible(true);
            setConfig(newConfig);
            if (newConfig.autoclose === false) {
                return;
            }
            timeoutId = setTimeout(() => setVisible(false), config.duration || 2000);
            return () => clearTimeout(timeoutId);
        },
        hide: () => setVisible(false),
    }).current;

    return (
        <UToastContext.Provider
            value={{ show: handlers.show, hide: handlers.hide, visible, config }}
        >
            {props.children}
        </UToastContext.Provider>
    );
});

export const useToast = () => {
    return React.useContext(UToastContext);
};
