import * as React from 'react';
import { XView, XViewProps } from 'react-mental';
import { css, cx } from 'linaria';
import { UIcon } from './UIcon';
import { ThemeDefault } from 'openland-y-utils/themes';
import { TextLabel2 } from 'openland-web/utils/TextStyles';

type UIconLabeledStyle = 'default' | 'danger';

const containerClass = css`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    height: 28px;
    padding: 0 8px;

    svg {
        width: 16px;
        height: 16px;
    }

    &:hover {
        opacity: 0.64;
    }
`;

const labelClass = css`
    margin-left: 8px;
`;

interface UIconLabeledProps extends XViewProps {
    icon: JSX.Element;
    label: string;
    style?: UIconLabeledStyle;
}

export const UIconLabeled = React.memo((props: UIconLabeledProps) => {
    const { icon, label, style = 'default', ...other } = props;
    const color = style === 'danger' ? ThemeDefault.accentNegative : ThemeDefault.foregroundSecondary;

    return (
        <XView
            {...other}
            cursor="pointer"
        >
            <div className={containerClass}>
                <UIcon icon={icon} color={color} />
                <span className={cx(TextLabel2, labelClass)} style={{ color }}>{label}</span>
            </div>
        </XView>
    );
});