import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { TextTitle1, TextBody } from 'openland-web/utils/TextStyles';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { UButton, UButtonProps } from 'openland-web/components/unicorn/UButton';
import { UInput, UInputProps } from 'openland-web/components/unicorn/UInput';
import { useWithWidth } from 'openland-web/hooks/useWithWidth';
import { UToast } from 'openland-web/components/unicorn/UToast';

export const textClassName = css`
    text-align: center;

    @media (min-width: 400px) {
        align-self: center;
        max-width: 320px;
    }
`;

const subtitleClassName = css`
    color: var(--foregroundSecondary);
    margin-top: 8px;
`;

export const Title = (props: { text: string }) => (
    <div className={cx(TextTitle1, textClassName)}>
        {props.text}
    </div>
);

export const Subtitle = (props: { text?: string; maxWidth?: number | string, children?: any }) => (
    <div className={cx(TextBody, textClassName, subtitleClassName)}>
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

const inputWrapper = css`
    align-self: center;
    text-align: center;
`;

const shake = css`
    animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
  
  @keyframes shake {
        10%, 90% {
            transform: translate3d(-2px, 0, 0);
        }
        
        20%, 80% {
            transform: translate3d(4px, 0, 0);
        }
    
        30%, 50%, 70% {
            transform: translate3d(-8px, 0, 0);
        }
    
        40%, 60% {
            transform: translate3d(8px, 0, 0);
        }
    }
`;

export const AuthInputWrapper = (props: { errorsCount?: number, children: any }) => {
    const [screnWidth] = useWithWidth();
    const width = screnWidth && screnWidth < 400 ? '100%' : 320;

    const [hasNewError, setHasNewError] = React.useState(false);
    React.useEffect(() => {
        let timeoutId: any;
        if (props.errorsCount && props.errorsCount > 0) {
            setHasNewError(true);
            timeoutId = setTimeout(() => {
                setHasNewError(false);
            }, 600);
        }
        return () => { clearTimeout(timeoutId); };
    }, [props.errorsCount]);

    return <div className={cx(inputWrapper, hasNewError && shake)} style={{ width }}>{props.children}</div>;
};

export const AuthInput = (props: UInputProps) => {
    return (
        <UInput
            autofocus={true}
            width="100%"
            marginTop={32}
            type="email"
            alignSelf="center"
            hasPlaceholder={true}
            {...props}
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

const toastWrapper = css`
    position: absolute;
    top: 56px;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0 16px;
    

    @media (min-width: 750px) {
        top: 77px;
    }
`;

export const AuthToastWrapper = ({ message, isVisible, autoclose }: { message: string, isVisible: boolean, autoclose?: boolean }) => {
    return (
        <div className={toastWrapper}>
            <UToast isVisible={isVisible} text={message} autoclose={autoclose} />
        </div>
    );
};
