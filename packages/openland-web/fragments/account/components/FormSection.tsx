import * as React from 'react';
import { XView } from 'react-mental';
import { TextStyles, TextCaption } from 'openland-web/utils/TextStyles';
import { css, cx } from 'linaria';

const footerWrapper = css`
    margin-top: 16px;
    color: var(--foregroundSecondary);
`;

interface FormSectionProps {
    title: string;
    children: any;
    footer?: string | JSX.Element;
}

export const FormSection = (props: FormSectionProps) => {
    const { title, children, footer } = props;

    return (
        <XView marginBottom={16}>
            <XView {...TextStyles.Title2} height={48} justifyContent="center">
                {title}
            </XView>
            {children}
            {!!footer && (
                <div className={cx(footerWrapper, TextCaption)}>
                    {footer}
                </div>
            )}
        </XView>
    );
};
