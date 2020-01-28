import * as React from 'react';
import { XView, XViewProps } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { emoji } from 'openland-y-utils/emoji';
import { css } from 'linaria';
import { UText } from 'openland-web/components/unicorn/UText';

const wrapper = css`
    span {
        display: inline;
    }
`;

interface UListTextProps extends XViewProps {
    value?: string | JSX.Element | JSX.Element[];
}

export const UListText = (props: UListTextProps) => {
    const { value, ...other } = props;

    return (
        <XView
            {...other}
            {...TextStyles.Body}
            paddingHorizontal={16}
            color="var(--foregroundPrimary)"
            flexGrow={1}
            flexShrink={1}
        >
            <div className={wrapper}>
                {typeof value === 'string' && <UText text={value} proccessText={emoji} />}
                {typeof value !== 'string' && value}
            </div>
        </XView>
    );
};