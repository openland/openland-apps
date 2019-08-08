import * as React from 'react';
import { css, cx } from 'linaria';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { TextCaption } from '../utils/TextStyles';

const senderBadgeContentStyle = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #000;
    text-align: center;
    border-radius: 8px;
    color: #fff;
    min-width: 80px;
    max-width: 280px;
    padding: 6px 12px;

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

export const useCaptionPopper = (text: string | JSX.Element, placement?: 'top' | 'bottom') => {
    const [, show] = usePopper(
        { placement: placement || 'top', hideOnLeave: true, borderRadius: 8 },
        () => (
            <div
                className={cx(
                    senderBadgeContentStyle,
                    (placement === 'bottom') ? bottomPlacementArrow : topPlacementArrow,
                )}
            >
                <span className={TextCaption}>{text}</span>
            </div>
        ),
    );

    return [show];
};
