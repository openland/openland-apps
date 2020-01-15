import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { TextTitle1, TextBody } from 'openland-web/utils/TextStyles';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { UButton, UButtonProps } from 'openland-web/components/unicorn/UButton';
import { UInput, UInputProps } from 'openland-web/components/unicorn/UInput';
import { useWithWidth } from 'openland-web/hooks/useWithWidth';

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
    const [width] = useWithWidth();

    return (
        <UInput
            autofocus={true}
            width={width && width < 400 ? '100%' : 320}
            marginTop={32}
            type="email"
            alignSelf="center"
            hasPlaceholder={true}
            {...other}
        />
    );
};

export const FormLayout = (props: { children: any }) => {
    const isMobile = useIsMobile();

    return <XView justifyContent="center" alignItems="center" flexGrow={1} minWidth={320}>
        <XView alignItems={isMobile ? 'stretch' : 'center'} width="100%" maxWidth={400} paddingHorizontal={16} marginBottom={isMobile ? 56 : 77}>
            {props.children}
        </XView>
    </XView>;
};
