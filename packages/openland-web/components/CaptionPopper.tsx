import * as React from 'react';
import { css, cx } from 'linaria';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { TextSubhead } from '../utils/TextStyles';
import { UPopperController } from './unicorn/UPopper';
import { useTheme } from 'openland-x-utils/useTheme';

const captionWrapper = css`
    display: flex;
    justify-content: center;
`;

const leftAlignment = css`
    justify-content: flex-end;
`;

const rightAlignment = css`
    justify-content: flex-start;
`;

const captionContent = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--foregroundInverted);
    max-width: 280px;
    padding: 6px 12px;
    background-color: var(--foregroundPrimary);
    border-radius: 8px;
`;

const boxShadowClass = css`
    box-shadow: var(--boxShadowPopper);
`;

interface CaptionPopperConfig {
    text?: string | JSX.Element;
    getText?: (ctx: UPopperController) => string | JSX.Element;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    scope?: string;
    width?: number;
    marginRight?: number;
    marginLeft?: number;
    marginTop?: number;
    marginBottom?: number;
    showTimeout?: number;
}

export const useCaptionPopper = (
    opts: CaptionPopperConfig,
): [(element: HTMLElement | React.MouseEvent<unknown>) => void, () => void] => {
    const { text, getText, placement = 'top', scope, width } = opts;
    const theme = useTheme();
    const [, show, instantHide] = usePopper(
        {
            placement,
            hideOnLeave: true,
            borderRadius: 8,
            scope,
            useWrapper: false,
            useArrow: true,
            darkStyle: true,
            marginRight: opts.marginRight,
            marginLeft: opts.marginLeft,
            marginTop: opts.marginTop,
            marginBottom: opts.marginBottom,
            updatedDeps: [text, theme.theme],
            showTimeout: opts.showTimeout,
        },
        (ctx) => (
            <div
                className={cx(
                    captionWrapper,
                    placement === 'left' && leftAlignment,
                    placement === 'right' && rightAlignment,
                )}
                style={{
                    width: width,
                }}
            >
                <div
                    className={cx(
                        captionContent,
                        TextSubhead,
                        theme.theme !== 'dark' && boxShadowClass,
                    )}
                >
                    {getText ? getText(ctx) : text}
                </div>
            </div>
        ),
    );

    return [show, instantHide];
};
