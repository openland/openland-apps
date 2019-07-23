import * as React from 'react';
import { css } from 'linaria';
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
}

export const UIcon = React.memo((props: UIconProps) => {
    const { icon, color } = props;

    return (
        <div
            className={wrapper}
            style={{ '--icon-color': color || ThemeDefault.foregroundSecondary } as any}
        >
            {icon}
        </div>
    );
});