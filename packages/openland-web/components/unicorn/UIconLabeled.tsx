import * as React from 'react';
import { XView, XViewProps } from 'react-mental';
import { css, cx } from 'linaria';
import { UIcon } from './UIcon';
import { TextLabel2 } from 'openland-web/utils/TextStyles';
import { defaultHover } from 'openland-web/utils/Styles';

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
    const color = style === 'danger' ? 'var(--accentNegative)' : 'var(--foregroundSecondary)';

    return (
        <XView {...other}>
            <div className={cx(containerClass, defaultHover)}>
                <UIcon icon={icon} color={color} />
                <span className={cx(TextLabel2, labelClass)} style={{ color }}>{label}</span>
            </div>
        </XView>
    );
});