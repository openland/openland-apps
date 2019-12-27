import React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { TextLabel1 } from 'openland-web/utils/TextStyles';

const button = css`
    &:hover,
    &:focus {
        .stackLayoutPlaceholderIconBackground {
            /* scale to 64px */
            transform: scale(1.14);

            background-color: var(--backgroundTertiaryHover);

            transition: transform 50ms cubic-bezier(0.29, 0.09, 0.24, 0.99),
                background-color 50ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
        }
    }
`;

const icon = css`
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    & svg {
        fill: var(--foregroundSecondary);
    }
`;

const iconBackround = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 100%;
    background-color: var(--backgroundTertiary);

    will-change: transform, background-color;
    transition: transform 200ms cubic-bezier(0.29, 0.09, 0.24, 0.99),
        background-color 200ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
`;

interface ButtonProps {
    icon: React.ReactNode;
    text: string;
    path?: string;
    onClick?: () => void;
}

export const Button = React.memo((props: ButtonProps) => (
    <div className={button}>
        <XView
            paddingLeft={8}
            paddingRight={8}
            path={props.path}
            flexDirection="column"
            alignItems="center"
            minWidth={128}
            cursor="pointer"
            onClick={props.onClick}
        >
            <XView position="relative" width={56} height={56}>
                <div className={cx(iconBackround, 'stackLayoutPlaceholderIconBackground')} />
                <div className={cx(icon, 'stackLayoutPlaceholderIcon')}>{props.icon}</div>
            </XView>
            <XView marginTop={16}>
                <span className={TextLabel1}>{props.text}</span>
            </XView>
        </XView>
    </div>
));
