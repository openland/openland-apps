import * as React from 'react';
import { css, cx } from 'linaria';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { TextCaption } from '../utils/TextStyles';
import { UPopperController } from './unicorn/UPopper';

const captionWrapper = css`
    width: 280px;
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
    background-color: var(--overlayTotal);
    text-align: center;
    border-radius: 8px;
    color: var(--foregroundContrast);
    max-width: 280px;
    padding: 6px 12px;
    box-shadow: 0px 0px 48px rgba(0, 0, 0, 0.04), 0px 8px 24px rgba(0, 0, 0, 0.08);

    &::after {
        position: absolute;
        content: '';
        width: 10px;
        height: 10px;
        background-color: #000;
        transform: rotate(45deg);
        border-radius: 2px;
        z-index: -1;
    }
`;

const topPlacementArrow = css`
    &::after {
        bottom: -2px;
    }
`;

const bottomPlacementArrow = css`
    &::after {
        top: -2px;
    }
`;

const leftPlacementArrow = css`
    &::after {
        right: -2px;
    }
`;

const rightPlacementArrow = css`
    &::after {
        left: -2px;
    }
`;

interface CaptionPopperConfig {
    text?: string | JSX.Element;
    getText?: (ctx: UPopperController) => string | JSX.Element;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    scope?: string;
}

export const useCaptionPopper = (opts: CaptionPopperConfig) => {
    const { text, getText, placement = 'top', scope } = opts;
    const [, show] = usePopper(
        { placement, hideOnLeave: true, borderRadius: 8, scope, useWrapper: false },
        ctx => (
            <div
                className={cx(
                    captionWrapper,
                    placement === 'left' && leftAlignment,
                    placement === 'right' && rightAlignment,
                )}
            >
                <div
                    className={cx(
                        captionContent,
                        TextCaption,
                        placement === 'top' && topPlacementArrow,
                        placement === 'bottom' && bottomPlacementArrow,
                        placement === 'left' && leftPlacementArrow,
                        placement === 'right' && rightPlacementArrow,
                    )}
                >
                    {getText ? getText(ctx) : text}
                </div>
            </div>
        ),
    );

    return [show];
};
