import * as React from 'react';
import { XView, XViewProps } from 'react-mental';
import { css, cx } from 'linaria';
import { UIcon } from './UIcon';

export type UIconButtonSize = 'medium' | 'large' | 'large-wide';

const wrapper = css`
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;
    position: relative;
    svg {
        width: 24px;
        height: 24px;
        z-index: 2;
        position: relative;
    }
    &::before {
        content: '';
        transition: all .1s ease;
        transform: scale3d(0, 0, 0);
        width: 100%;
        height: 100%;
        border-radius: 100%;
        position: absolute;
        z-index: 1;
    }
`;

const wrapperActive = css`
    &::before {
        background: var(--backgroundPrimaryHover);
        transform: scale3d(1, 1, 1);
    }
`;

const container = css`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;

    &:hover .${wrapper}::before {
        background: var(--backgroundPrimaryHover);
        transform: scale3d(1, 1, 1);
    }
`;

interface UIconButtonProps extends XViewProps {
    icon: JSX.Element;
    size?: UIconButtonSize;
    active?: boolean;
}

export const UIconButton = React.memo((props: UIconButtonProps) => {
    const { icon, size = 'medium', active, ...other } = props;
    const width = (size === 'medium' || size === 'large-wide') ? 40 : 48;
    const height = size === 'medium' ? 40 : 48;

    return (
        <XView
            {...other}
            cursor="pointer"
            width={width}
            height={height}
        >
            <div className={container}>
                <div className={cx(wrapper, active && wrapperActive)}>
                    <UIcon icon={icon} />
                </div>
            </div>
        </XView>
    );
});