import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { TextTitle1, TextBody } from 'openland-web/utils/TextStyles';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';

const textAlignClassName = css`
    text-align: center;
`;

const subtitleClassName = css`
    color: var(--foregroundSecondary);
    margin-top: 8px;
    margin-bottom: 32px;
`;

const titleClassName = css`
    margin-top: 12px;
`;

export const Title = (props: { text: string }) => (
    <div className={cx(TextTitle1, textAlignClassName, titleClassName)}>
        {props.text}
    </div>
);

export const Subtitle = (props: { text?: string; maxWidth?: number | string, children?: any }) => (
    <div className={cx(TextBody, textAlignClassName, subtitleClassName)}>
        {props.text}
        {props.children}
    </div>
);

export const FormLayout = (props: { top: any, bottom: any }) => {
    const isMobile = useIsMobile();
    return <XView justifyContent="center" alignItems="center" flexGrow={1} paddingHorizontal={20} minWidth={320}>
        <XView flexGrow={isMobile ? 1 : undefined} alignItems={isMobile ? 'stretch' : 'center'} alignSelf={isMobile ? 'stretch' : 'center'}>
            <XView flexGrow={1} alignItems="center" >
                {props.top}
            </XView>
            <XView marginBottom={60} marginTop={32} alignItems="center">
                {props.bottom}
            </XView>
        </XView>
    </XView>;
};
