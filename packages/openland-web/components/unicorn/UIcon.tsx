import * as React from 'react';
import { css, cx } from 'linaria';
import { ThemeDefault } from 'openland-y-utils/themes';

const wrapper = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;

    svg {
        path {
            fill: var(--icon-color);
        }
    }
`;

interface UIconProps {
    icon: JSX.Element;
    color?: string;
    className?: string;
}

export const UIcon = React.memo((props: UIconProps) => {
    const { icon, color } = props;

    return (
        <div
            className={cx(wrapper, props.className)}
            style={{ '--icon-color': color || ThemeDefault.foregroundSecondary } as React.CSSProperties}
        >
            {icon}
        </div>
    );
});