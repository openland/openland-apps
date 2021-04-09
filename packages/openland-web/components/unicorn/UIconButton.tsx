import * as React from 'react';
import { XView, XViewProps } from 'react-mental';
import { css, cx } from 'linaria';
import { UIcon } from './UIcon';
import { XLoader } from 'openland-x/XLoader';

export type UIconButtonSize = 'xsmall' | 'small' | 'small-densed' | 'medium' | 'medium-densed' | 'large' | 'large-densed';
export type UIconButtonShape = 'round' | 'square';

const wrapper = css`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transform: translateZ(0);
    svg {
        width: var(--icon-size);
        height: var(--icon-size);
        z-index: 2;
        position: relative;
        transform: translateZ(0);
    }
    &::before {
        content: '';
        transition: all 0.1s ease;
        transform: scale3d(0, 0, 0);
        width: var(--ripple-size);
        height: var(--ripple-size);
        border-radius: calc(var(--ripple-size) / 2);
        position: absolute;
        z-index: 1;
    }
`;

const roundStyle = css`
    border-radius: 100px !important;
`;

const squareStyle = css`
    border-radius: 8px !important;
    &::before {
        content: '';
        transition: all 0.1s ease;
        transform: scale3d(0, 0, 0);
        width: var(--ripple-size);
        height: var(--ripple-size);
        border-radius: 8px !important;
        position: absolute;
        z-index: 1;
    }
`;

const wrapperRipple = css`
    &::before {
        background: var(--default-ripple-color);
    }
`;

const wrapperRippleTransform = css`
    &::before {
        transform: scale3d(1, 1, 1);
    }
`;

const wrapperActive = css`
    &::before {
        background: var(--ripple-color);
        transform: scale3d(1, 1, 1);
    }
`;

const container = css`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    user-select: none;
`;

const filledContainer = css`
    background-color: var(--backgroundTertiary);
`;

const containerHover = css`
    &:hover .${wrapper}::before {
        background: var(--hover-ripple-color);
        transform: scale3d(1, 1, 1);
    }
`;

interface UIconButtonProps extends XViewProps {
    icon: JSX.Element;
    size?: UIconButtonSize;
    active?: boolean;
    shape?: UIconButtonShape;
    filled?: boolean;
    loading?: boolean;
    rippleColor?: string;
    defaultRippleColor?: string;
    hoverRippleColor?: string;
    hoverActiveRippleColor?: string;
    disableHover?: boolean;
}

const widthBySize: { [key in UIconButtonSize]: number } = {
    xsmall: 32,
    small: 32,
    'small-densed': 24,
    medium: 40,
    'medium-densed': 36,
    large: 48,
    'large-densed': 40,
};

const heightBySize: { [key in UIconButtonSize]: number } = {
    xsmall: 32,
    small: 32,
    'small-densed': 32,
    medium: 40,
    'medium-densed': 36,
    large: 48,
    'large-densed': 48,
};

const rippleBySize: { [key in UIconButtonSize]: string } = {
    xsmall: '32px',
    small: '32px',
    'small-densed': '32px',
    medium: '40px',
    'medium-densed': '36px',
    large: '40px',
    'large-densed': '40px',
};

const iconBySize: { [key in UIconButtonSize]: string } = {
    xsmall: '16px',
    small: '20px',
    'small-densed': '20px',
    medium: '24px',
    'medium-densed': '20px',
    large: '24px',
    'large-densed': '24px',
};

const loaderStyle = css`
    z-index: 1;
`;

const shapeResolver: { [key in UIconButtonShape]: string } = {
    round: roundStyle,
    square: squareStyle,
};

export const UIconButton = React.memo((props: UIconButtonProps) => {
    const {
        icon,
        size = 'medium',
        active,
        color,
        shape,
        filled,
        loading,
        rippleColor,
        defaultRippleColor,
        hoverRippleColor,
        hoverActiveRippleColor,
        ...other
    } = props;
    const width = widthBySize[size];
    const height = heightBySize[size];
    const ripple = rippleBySize[size];
    const iconSize = iconBySize[size];
    const hasHover = (!props.disableHover && !active) || hoverActiveRippleColor;

    const containerClassNames = cx(
        container,
        hasHover && containerHover,
        shape && shapeResolver[shape],
        filled && filledContainer,
    );

    return (
        <XView cursor="pointer" width={width} height={height} {...other}>
            <div className={containerClassNames}>
                {!loading && (
                    <div
                        className={cx(
                            wrapper,
                            wrapperRipple,
                            active && wrapperActive,
                            shape && shapeResolver[shape],
                            defaultRippleColor && wrapperRippleTransform,
                        )}
                        style={
                            {
                                '--ripple-size': ripple,
                                '--icon-size': iconSize,
                                '--ripple-color': rippleColor || 'var(--backgroundTertiaryTrans)',
                                '--hover-ripple-color':
                                    (active ? hoverActiveRippleColor : hoverRippleColor) ||
                                    rippleColor ||
                                    'var(--backgroundTertiaryTrans)',
                                '--default-ripple-color': defaultRippleColor || 'none',
                            } as React.CSSProperties
                        }
                    >
                        <UIcon icon={icon} color={color || 'var(--foregroundSecondary)'} />
                    </div>
                )}
                {loading && (
                    <XLoader
                        loading={true}
                        size="medium"
                        transparentBackground={true}
                        className={loaderStyle}
                    />
                )}
            </div>
        </XView>
    );
});
