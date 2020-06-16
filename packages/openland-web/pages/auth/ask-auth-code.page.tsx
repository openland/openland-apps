import * as React from 'react';
import { useForm } from 'openland-form/useForm';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { useField } from 'openland-form/useField';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { Wrapper } from '../onboarding/components/wrapper';
import {
    Title,
    Subtitle,
    FormLayout,
    AuthActionButton,
    AuthInputWrapper,
    AuthToastWrapper,
    useShake,
} from './components/authComponents';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { completeAuth } from './complete.page';
import { XImage } from 'react-mental';
import { AuthHeaderConfig } from './root.page';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { checkCode, AuthError, trackError } from './utils/checkCode';
import { TextTitle1 } from 'openland-web/utils/TextStyles';
import { usePreviousState } from 'openland-y-utils/usePreviousState';
import { css, cx } from 'linaria';
import { useResendTimer } from 'openland-y-utils/auth/useResendTimer';

const codeWrapperStyle = css`
    margin-top: 32px;
`;

const codeInputStyle = cx(TextTitle1, css`
    width: 47px;
    height: 56px;
    border-radius: 8px;
    background-color: var(--backgroundTertiaryTrans);
    color: var(--foregroundPrimary);
    display: flex;
    align-items: center;
    text-align: center;

    &:hover {
        background-color: var(--backgroundTertiaryHoverTrans);
    }

    &:focus {
        background-color: var(--backgroundTertiaryActiveTrans);
    }
    
    &:not(:last-child) {
        margin-right: 8px;
    }
`);

const ResendSubtitle = React.memo((props: { onResend: () => void }) => {
    const [seconds, handleResend] = useResendTimer({ onResend: props.onResend });

    return (
        <>
            {InitTexts.auth.haveNotReceiveCode} {seconds > 0 ? `Wait for ${seconds} sec` : <ULink onClick={handleResend}>Resend</ULink>}
        </>
    );
});

type ActivationCodeProps = {
    authValue: string;
    phoneCodeValue: { value: string; label: string };
    authWasResend: boolean;
    authSending: boolean;
    backButtonClick: (event?: React.MouseEvent<any>) => void;
    resendCodeClick: (event?: React.MouseEvent<any>) => void;
    setAuthWasResend: (flag: boolean) => void;
    isExistingUser: boolean;
    avatarId: string | null;
};

const WebSignUpActivationCode = (
    props: ActivationCodeProps & {
        codeSending: boolean;
        codeError: string;
        setCodeError: Function;
        loginCodeStart: (codeValue: string) => void;
        isPhoneAuth: boolean;
    },
) => {
    const {
        authValue,
        resendCodeClick,
        authSending,
        authWasResend,
        phoneCodeValue,
        setAuthWasResend,
        codeSending,
        codeError,
        isPhoneAuth,
        setCodeError,
        loginCodeStart,
        isExistingUser,
        avatarId,
    } = props;

    const form = useForm();
    const codeRefs = React.useRef<React.RefObject<HTMLInputElement>[]>(
        new Array(6).fill(undefined).map(() => React.createRef())
    );

    let codeField = useField('input.code', new Array(6).fill(''), form);

    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            setCodeError('');
            setAuthWasResend(false);
            setTimeout(() => {
                loginCodeStart(codeField.value.join(''));
            }, 100);
        });
    }, [codeField.value, authValue]);

    const [shakeClassName, shake] = useShake();

    const handleNext = React.useCallback(() => {
        const codeCompleted = codeField.input.value.every(value => !!value);
        if (!codeCompleted) {
            shake();
            return;
        }

        doConfirm();
    }, [shakeClassName, doConfirm]);

    useShortcuts({ keys: ['Enter'], callback: handleNext });

    const handleResend = React.useCallback(() => {
        resendCodeClick();
        setCodeError('');
        setAuthWasResend(false);
    }, []);

    const errorText = (codeField.input.invalid && codeField.input.errorText) || codeError;
    const isInvalid = !!errorText;
    const ops = '-/format/auto/-/scale_crop/72x72/center/-/quality/best/-/progressive/yes/';
    const opsRetina =
        '-/format/auto/-/scale_crop/144x144/center/-/quality/best/-/progressive/yes/ 2x';

    React.useEffect(() => {
        let indexToFocus = codeField.input.value.findIndex(value => !value);
        if (indexToFocus !== -1) {
            setTimeout(() => {
                codeRefs.current[indexToFocus]?.current?.focus();
            }, 200);
        }
    }, [errorText, shakeClassName, authWasResend]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.value.length === 6) {
            codeField.input.onChange([...e.target.value]);
            return;
        }

        let value = e.target.value ? e.target.value[e.target.value.length - 1] : '';
        let newValue = codeField.input.value.slice();
        newValue[index] = value;
        codeField.input.onChange(newValue);

        if (value.length > 0) {
            codeRefs.current[index + 1]?.current?.focus();
        } else {
            codeRefs.current[index - 1]?.current?.focus();
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        const BACKSPACE_CODE = 8;
        if (e.keyCode === BACKSPACE_CODE && e.currentTarget.value.length === 0) {
            e.preventDefault();
            codeRefs.current[index - 1]?.current?.focus();
        }
    };

    const sendToText = isPhoneAuth
        ? phoneCodeValue.value.split(' ').join('') + ' ' + authValue
        : authValue;

    React.useEffect(() => {
        if (codeField.input.value.length === 6 && codeField.input.value.every(x => x.length === 1)) {
            handleNext();
        }
    }, [codeField.input.value, handleNext]);

    const prevIsInvalid = usePreviousState(isInvalid);
    React.useEffect(() => {
        if (!prevIsInvalid && isInvalid) {
            codeField.input.onChange(new Array(6).fill(''));
            codeRefs.current[0]?.current?.focus();
        }
    }, [isInvalid, prevIsInvalid]);

    return (
        <>
            <AuthToastWrapper
                isVisible={!authSending && !codeSending && !!errorText}
                text={errorText}
            />
            <AuthToastWrapper isVisible={authSending} text="Sending code" type="loading" />
            <AuthToastWrapper
                isVisible={authWasResend && !errorText}
                text="Code successfully sent"
                type="success"
            />
            <FormLayout>
                <Title text={InitTexts.auth.enterActivationCode} />
                <Subtitle>
                    We just sent it to {sendToText}.<br />
                    {<ResendSubtitle onResend={handleResend} />}
                </Subtitle>
                {!!avatarId && (
                    <XImage
                        alignSelf="center"
                        marginTop={16}
                        width={72}
                        height={72}
                        borderRadius="100%"
                        src={`https://ucarecdn.com/${avatarId}/${ops}`}
                        srcSet={`https://ucarecdn.com/${avatarId}/${opsRetina}`}
                    />
                )}
                <AuthInputWrapper className={cx(codeWrapperStyle, shakeClassName)}>
                    {codeField.input.value.map((value, i) => (
                        <input
                            ref={codeRefs.current[i]}
                            key={i}
                            inputMode="numeric"
                            pattern="[0-9]"
                            value={value}
                            autoFocus={i === 0}
                            className={codeInputStyle}
                            onChange={(e) => handleChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                        />
                    ))}
                </AuthInputWrapper>
                <AuthActionButton
                    text={isExistingUser ? InitTexts.auth.done : InitTexts.auth.next}
                    loading={codeSending}
                    onClick={handleNext}
                    marginTop={32}
                />
            </FormLayout>
        </>
    );
};

export const AskAuthCodePage = (props: ActivationCodeProps) => {
    let router = React.useContext(XRouterContext)!;
    const isPhoneAuth = !!router.query.phone;

    const [codeError, setCodeError] = React.useState('');
    const [codeSending, setCodeSending] = React.useState(false);

    const onBackClick = () => {
        const path = isPhoneAuth
            ? '/signin'
            : '/authorization/ask-auth-data';

        router.replace(path);
        props.backButtonClick();
    };

    const loginCodeStart = async (codeValue: string) => {
        if (codeValue === '') {
            trackError('no_code');
            return;
        } else if (codeValue.length !== 6) {
            trackError('wrong_code_length');
            setCodeError(InitTexts.auth.wrongCodeLength);
            return;
        } else {
            setCodeSending(true);
            try {
                let token = await checkCode(codeValue, isPhoneAuth);
                await completeAuth(token);
            } catch (e) {
                let message = 'Something went wrong';
                if (!navigator.onLine) {
                    message = 'Check your connection and try again';
                } else if (e instanceof AuthError) {
                    message = e.message;
                }
                setCodeSending(false);
                setTimeout(() => {
                    setCodeError(message);
                }, 100);
            }
        }
    };

    return (
        <Wrapper>
            <XDocumentHead title="Enter login code" />
            <AuthHeaderConfig onBack={onBackClick} />

            <WebSignUpActivationCode
                {...props}
                codeError={codeError}
                codeSending={codeSending}
                loginCodeStart={loginCodeStart}
                setCodeError={setCodeError}
                backButtonClick={onBackClick}
                isPhoneAuth={isPhoneAuth}
            />
        </Wrapper>
    );
};
