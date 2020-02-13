import * as React from 'react';
import { css, cx } from 'linaria';

const wrapper = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    flex-shrink: 0;

    svg {
        path {
            fill: var(--icon-color);
        }
    }
`;

const wrapperSized = css`
    svg {
        width: var(--icon-size);
        height: var(--icon-size);
    }
`;

interface UIconProps {
    icon: JSX.Element;
    color?: string;
    className?: string;
    size?: number;
}

export const UIcon = React.memo((props: UIconProps) => {
    const { icon, color, size } = props;

    return (
        <div
            className={cx(wrapper, size && wrapperSized, props.className)}
            style={{
                '--icon-color': color || 'var(--foregroundSecondary)',
                ...size ? { '--icon-size': size + 'px' } as React.CSSProperties : {}
            } as React.CSSProperties}
        >
            {icon}
        </div>
    );
});