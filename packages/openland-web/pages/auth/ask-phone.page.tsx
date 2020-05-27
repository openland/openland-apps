import * as React from 'react';
import { css, cx } from 'linaria';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TextBody, TextDensed } from 'openland-web/utils/TextStyles';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { Wrapper } from '../onboarding/components/wrapper';
import {
    Title,
    Subtitle,
    FormLayout,
    AuthActionButton,
    AuthInput,
    AuthInputWrapper,
    AuthToastWrapper,
    useShake,
} from './components/authComponents';
import { USelect, OptionType } from 'openland-web/components/unicorn/USelect';
import { countriesCode } from 'openland-y-utils/countriesCodes';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { AuthHeaderConfig } from './root.page';

type CreateWithPhoneProps = {
    firePhone: (phone: string) => Promise<void>;
    phoneError: string;
    phoneCodeValue: { value: string; label: string };
    phoneValue: string;
    phoneSending: boolean;
    setPhoneError: Function;
    setPhoneSending: Function;
    setPhoneCodeValue: Function;
    setPhoneValue: Function;
};

const optionContainer = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    padding-left: 16px;
`;

const optionLabelStyle = css`
    font-weight: normal;
    color: var(--foregroundPrimary);
    text-align: start;
`;

const optionSubtitleStyle = css`
    color: var(--foregroundSecondary);
`;

const OptionRender = (option: OptionType) => (
    <div className={optionContainer}>
        <div className={cx(optionLabelStyle, TextBody)}>{option.label}</div>
        <div className={cx(optionSubtitleStyle, TextDensed)}>{option.value}</div>
    </div>
);

const WebSignUpCreateWithPhone = (
    props: CreateWithPhoneProps & {
        loginPhoneStart: (a: string) => void;
    },
) => {
    const {
        setPhoneValue,
        setPhoneCodeValue,
        phoneError,
        phoneCodeValue,
        phoneValue,
        phoneSending,
        loginPhoneStart,
    } = props;

    const form = useForm();

    const phoneField = useField('input.phone', phoneValue, form);
    const codeField = useField('input.code', phoneCodeValue, form);

    const errorText = (phoneField.input.invalid && phoneField.input.errorText) || phoneError;
    const isInvalid = !!errorText;

    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            setPhoneValue(phoneField.value);
            setPhoneCodeValue(codeField.value);
            setTimeout(() => {
                const code = codeField.value.value.split(' ').join('');
                const fullPhone = code + phoneField.value;
                loginPhoneStart(fullPhone);
            }, 100);
        });
    }, [phoneField.value]);

    const [shakeClassName, shake] = useShake();

    const handleNext = React.useCallback(() => {
        doConfirm();
        if (phoneField.input.value.trim() === '') {
            shake();
        }
    }, [shakeClassName, doConfirm]);

    useShortcuts({ keys: ['Enter'], callback: handleNext });

    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [errorText, shakeClassName]);

    return (
        <>
            <AuthToastWrapper isVisible={!!errorText} text={errorText} />
            <FormLayout>
                <Title text="What’s your phone?" />
                <Subtitle text="We’ll send you a login code" />
                <AuthInputWrapper>
                    <USelect
                        label="Code"
                        width="100%"
                        size="small"
                        searchable={true}
                        options={countriesCode}
                        optionRender={OptionRender}
                        onChange={codeField.input.onChange}
                        value={codeField.input.value}
                        marginTop={32}
                    />
                </AuthInputWrapper>
                <AuthInputWrapper className={shakeClassName}>
                    <AuthInput
                        label={InitTexts.auth.phonePlaceholder}
                        invalid={isInvalid}
                        ref={inputRef}
                        value={phoneField.input.value}
                        onChange={phoneField.input.onChange}
                        marginTop={16}
                    />
                </AuthInputWrapper>
                <AuthActionButton
                    text={InitTexts.auth.next}
                    loading={phoneSending}
                    onClick={handleNext}
                />
            </FormLayout>
        </>
    );
};

export const AskPhonePage = (props: CreateWithPhoneProps) => {
    const { firePhone, setPhoneSending, setPhoneError } = props;
    let router = React.useContext(XRouterContext)!;

    const loginPhoneStart = async (phone: string) => {
        if (phone === '') {
            return;
        } else {
            setPhoneSending(true);
            setPhoneError('');
            try {
                await firePhone(phone);
                setTimeout(() => {
                    router.push('/authorization/ask-activation-phone-code');
                }, 0);
            } catch (e) {
                setPhoneSending(false);
                if (!navigator.onLine) {
                    setPhoneError('Check your connection and try again');
                } else {
                    setPhoneError(e.message);
                }
            }
        }
    };

    return (
        <Wrapper>
            <XDocumentHead title="What’s your phone?" />
            <AuthHeaderConfig
                onBack={() => {
                    router.replace('/signin');
                }}
            />
            <WebSignUpCreateWithPhone {...props} loginPhoneStart={loginPhoneStart} />
        </Wrapper>
    );
};
