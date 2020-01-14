import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { TextTitle1, TextBody } from 'openland-web/utils/TextStyles';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { UButton, UButtonProps } from 'openland-web/components/unicorn/UButton';
import { UInput, UInputProps } from 'openland-web/components/unicorn/UInput';

const textAlignClassName = css`
    text-align: center;
`;

const subtitleClassName = css`
    color: var(--foregroundSecondary);
    margin-top: 8px;
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

export const AuthActionButton = (props: UButtonProps) => {
    return (
        <UButton
            size="large"
            marginTop={28}
            shape="square"
            style="primary"
            alignSelf="center"
            {...props}
        />
    );
};

export const AuthInput = (props: UInputProps & { isMobile: boolean }) => {
    const { isMobile, ...other } = props;
    return (
        <UInput
            autofocus={true}
            width={props.isMobile ? '100%' : 320}
            marginTop={32}
            maxWidth={360}
            type="email"
            alignSelf="center"
            hasPlaceholder={true}
            {...other}
        />
    );
};

export const FormLayout = (props: { children: any }) => {
    const isMobile = useIsMobile();

    return <XView justifyContent="center" alignItems="center" flexGrow={1} paddingHorizontal={16} minWidth={320}>
        <XView alignItems={isMobile ? 'stretch' : 'center'} alignSelf={isMobile ? 'stretch' : 'center'} maxWidth={isMobile ? undefined : 320} marginBottom={77}>
            <XView flexGrow={1} alignItems="center">
                {props.children}
            </XView>
        </XView>
    </XView>;
};
