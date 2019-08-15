import * as React from 'react';
import { XView, XViewProps } from 'react-mental';
import { css, cx } from 'linaria';
import { UIcon } from './UIcon';

type UIconButtonSize = 'medium' | 'large';

const wrapper = css`
    display: flex;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    align-items: center;
    justify-content: center;

    svg {
        width: 24px;
        height: 24px;
    }
`;

const wrapperActive = css`
    background: var(--backgroundPrimaryHover);
`;

const container = css`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;

    &:hover .${wrapper} {
        background: var(--backgroundPrimaryHover);
    }
`;

interface UIconButtonProps extends XViewProps {
    icon: JSX.Element;
    size?: UIconButtonSize;
    active?: boolean;
}

export const UIconButton = React.memo((props: UIconButtonProps) => {
    const { icon, size = 'medium', active, ...other } = props;
    const boxSize = size === 'medium' ? 40 : 48;

    return (
        <XView
            {...other}
            cursor="pointer"
            width={boxSize}
            height={boxSize}
        >
            <div className={container}>
                <div className={cx(wrapper, active && wrapperActive)}>
                    <UIcon icon={icon} />
                </div>
            </div>
        </XView>
    );
});