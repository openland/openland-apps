import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { TextDensed, TextLabel1, TextBody } from 'openland-web/utils/TextStyles';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UInput, UInputField } from 'openland-web/components/unicorn/UInput';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { FormSection } from './components/FormSection';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { XModalContent } from 'openland-web/components/XModalContent';
import { useClient } from 'openland-api/useClient';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { countriesMeta } from 'openland-y-utils/auth/countriesMeta';
import { CountryPicker } from 'openland-web/pages/auth/components/CountryPicker';
import { useResendTimer } from 'openland-y-utils/auth/useResendTimer';
import {
    AsYouType,
    CountryCode,
    formatIncompletePhoneNumber,
    parsePhoneNumberFromString,
} from 'libphonenumber-js';
import {
    findCode,
    INVALID_CODE_LABEL,
    removeSpace,
} from 'openland-web/pages/auth/ask-auth-data.page';

const modalSubtitle = css`
    color: var(--foregroundPrimary);
    margin-bottom: 20px;
    white-space: pre-wrap;
    word-wrap: break-word;
`;

const ResendSubtitle = React.memo((props: { sendTo: string; onResend: () => void }) => {
    const [seconds, handleResend] = useResendTimer({ onResend: props.onResend });

    return (
        <div className={cx(modalSubtitle, TextBody)}>
            We sent a code to {props.sendTo}.<br />
            Haven’t received?{' '}
            {seconds > 0 ? `Wait for ${seconds} sec` : <ULink onClick={handleResend}>Resend</ULink>}
        </div>
    );
});

interface EnterCodeModalContentProps {
    isPhone: boolean;
    value: string;
    parseValue: string;
    sessionState: string;
    hide: () => void;
}

const EnterCodeModalContent = React.memo((props: EnterCodeModalContentProps) => {
    const client = useClient();
    const form = useForm();
    const confirmField = useField('input.confirm', '', form);

    const [sessionState, setSessionState] = React.useState(props.sessionState);
    const [loading, setLoading] = React.useState(false);

    const handleResend = async () => {
        if (props.isPhone) {
            const data = await client.mutateSendPhonePairCode({ phone: props.value });
            setSessionState(data.sendPhonePairCode);
        } else {
            const data = await client.mutateSendEmailPairCode({ email: props.value });
            setSessionState(data.sendEmailPairCode);
        }
    };

    const handleSave = async () => {
        const code = confirmField.value.trim();
        if (sessionState) {
            setLoading(true);
            if (props.isPhone) {
                await client.mutatePairPhone({
                    sessionId: sessionState,
                    confirmationCode: code,
                });
            } else {
                await client.mutatePairEmail({
                    sessionId: sessionState,
                    confirmationCode: code,
                });
            }
            await client.refetchProfile();
            await client.refetchAuthPoints();
            setLoading(false);
            props.hide();
        }
    };
    return (
        <>
            <XModalContent>
                <ResendSubtitle sendTo={props.parseValue} onResend={handleResend} />
                <UInputField label="Code" hasPlaceholder={true} field={confirmField} />
            </XModalContent>
            <XModalFooter>
                <UButton text="Cancel" style="tertiary" size="large" onClick={() => props.hide()} />
                <UButton
                    text="Done"
                    style="primary"
                    size="large"
                    onClick={handleSave}
                    loading={loading}
                />
            </XModalFooter>
        </>
    );
});

const showEnterCodeModal = (
    isPhone: boolean,
    value: string,
    parseValue: string,
    sessionState: string,
) => {
    showModalBox(
        {
            width: 400,
            title: 'Enter code',
        },
        (ctx) => (
            <EnterCodeModalContent
                isPhone={isPhone}
                value={value}
                parseValue={parseValue}
                sessionState={sessionState}
                hide={ctx.hide}
            />
        ),
    );
};

const ConfirmPhoneModalContent = React.memo(
    (props: { value: string; hide: () => void; onConfirm: () => void }) => {
        const handleConfirm = () => {
            props.hide();
            props.onConfirm();
        };
        return (
            <>
                <XView paddingHorizontal={24}>
                    <div className={cx(modalSubtitle, TextBody)}>Is this phone number correct?</div>
                </XView>
                <XModalFooter>
                    <UButton
                        text="Change"
                        style="tertiary"
                        size="large"
                        onClick={() => props.hide()}
                    />
                    <UButton text="Confirm" style="primary" size="large" onClick={handleConfirm} />
                </XModalFooter>
            </>
        );
    },
);

const showConfirmPhoneModal = (phone: string, value: string, onConfirm: () => void) => {
    showModalBox(
        {
            width: 400,
            title: phone,
        },
        (ctx) => <ConfirmPhoneModalContent value={value} hide={ctx.hide} onConfirm={onConfirm} />,
    );
};

const PairPhoneModalContent = React.memo((props: { hide: () => void }) => {
    const client = useClient();
    const countryCode = client.useIpLocation().ipLocation?.countryCode;
    const initialCountry = countriesMeta.find((x) => x.shortname === countryCode) || {
        label: 'United States',
        value: '+1',
        shortname: 'US',
    };

    const countryMenuOpen = React.useRef(false);
    const codeRef = React.useRef<HTMLInputElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const form = useForm();
    const codeField = useField('input.code', initialCountry, form);
    const dataField = useField('input.data', '', form);

    const [codeWidth, setCodeWidth] = React.useState<string>(
        `calc(${codeField.input.value.value.length}ch + 32px)`,
    );

    function getVal() {
        const code = codeField.value.value.split(' ').join('');
        let value = dataField.value.trim();
        const phonePrs = code + ' ' + value;
        let phone = new AsYouType(codeField.value.shortname as CountryCode);
        phone.input(code + value);
        let phoneNumber = phone.getNumber();

        if (phoneNumber) {
            value = phoneNumber.number as string;
        }
        return [value, phonePrs];
    }

    const handleConfirm = async () => {
        const [val, prs] = getVal();
        try {
            const data = await client.mutateSendPhonePairCode({ phone: val });
            showEnterCodeModal(true, val, prs, data.sendPhonePairCode);
            props.hide();
        } catch (e) {
            throw new Error(e);
        }
    };

    const handleNext = () => {
        const [val, prs] = getVal();
        showConfirmPhoneModal(prs, val, handleConfirm);
    };

    const handleCountryCodeChange = React.useCallback(
        (str: string) => {
            let v = '+' + removeSpace(str).replace(/\+/g, '');
            if (!/^\+(\d|-|\(|\))*$/.test(v)) {
                return true;
            }
            let existing;
            if (v.length >= 5) {
                let parsed = parsePhoneNumberFromString(v);
                if (parsed) {
                    existing = findCode('+' + parsed.countryCallingCode);
                }
            } else {
                existing = findCode(v);
            }
            if (existing) {
                codeField.input.onChange(existing);
                let parsed =
                    parsePhoneNumberFromString(v) ||
                    parsePhoneNumberFromString(v + dataField.value);
                if (parsed) {
                    let formatted = formatIncompletePhoneNumber(
                        existing.value + parsed.nationalNumber,
                        codeField.value.shortname as CountryCode,
                    );
                    dataField.input.onChange(formatted.replace(existing.value, '').trim());
                    if (inputRef.current) {
                        inputRef.current.focus();
                    }
                }
            } else {
                codeField.input.onChange({ value: v, label: INVALID_CODE_LABEL, shortname: '' });
            }
            setCodeWidth(`calc(${existing?.value.length || v.length}ch + 34px)`);
            return true;
        },
        [countriesMeta, dataField.value],
    );

    const handlePhoneKeyDown = React.useCallback(
        (e: React.KeyboardEvent) => {
            if (e.keyCode === 8 && inputRef.current?.value === '') {
                if (codeRef.current) {
                    e.preventDefault();
                    codeRef.current.focus();
                }
            }
        },
        [dataField.input.value],
    );

    const handlePhoneChange = React.useCallback(
        (value: string) => {
            let code = codeField.value.value.split(' ').join('');
            if (value === '') {
                dataField.input.onChange('');
                return true;
            }
            let parsed = parsePhoneNumberFromString(value);
            if (parsed && parsed.isPossible()) {
                let codeString = `+${parsed.countryCallingCode}`;
                let codeValue = findCode(codeString);
                if (codeValue) {
                    codeField.input.onChange(codeValue);
                    code = codeString;
                    value = parsed.nationalNumber as string;
                }
            }

            let formatted = formatIncompletePhoneNumber(
                code + value,
                codeField.value.shortname as CountryCode,
            );
            dataField.input.onChange(formatted.replace(code, '').trim());
            return true;
        },
        [codeField.value, dataField.value],
    );

    const handleMenuOpen = React.useCallback(() => {
        countryMenuOpen.current = true;
    }, []);

    const handleMenuClose = React.useCallback(() => {
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
            countryMenuOpen.current = false;
        }, 200);
    }, []);

    let parsedPhone = parsePhoneNumberFromString(codeField.value.value + dataField.value);
    let isPhoneValid = !!(parsedPhone && parsedPhone.isPossible());

    return (
        <>
            <XModalContent>
                <div className={cx(modalSubtitle, TextBody)}>
                    You can pair your account to any phone number and use it for login
                </div>
                <XView marginTop={-32}>
                    <CountryPicker
                        value={codeField.input.value}
                        onOpen={handleMenuOpen}
                        onClose={handleMenuClose}
                        onChange={(s) => {
                            codeField.input.onChange(s);
                            dataField.input.onChange('');
                        }}
                    />
                    <XView flexDirection="row">
                        <UInput
                            ref={codeRef}
                            marginRight={8}
                            flexShrink={1}
                            marginTop={16}
                            minWidth={72}
                            type="tel"
                            value={codeField.input.value.value}
                            hasPlaceholder={true}
                            width={codeWidth}
                            onChange={handleCountryCodeChange}
                        />
                        <UInput
                            label="Phone number"
                            type="tel"
                            ref={inputRef}
                            hasPlaceholder={true}
                            flexGrow={1}
                            flexShrink={1}
                            marginTop={16}
                            value={dataField.value}
                            onChange={handlePhoneChange}
                            onKeyDown={handlePhoneKeyDown}
                        />
                    </XView>
                </XView>
            </XModalContent>
            <XModalFooter>
                <UButton text="Cancel" style="tertiary" size="large" onClick={() => props.hide()} />
                <UButton
                    disable={!isPhoneValid}
                    text="Next"
                    style="primary"
                    size="large"
                    onClick={handleNext}
                />
            </XModalFooter>
        </>
    );
});

const showPairPhoneModal = () => {
    showModalBox(
        {
            width: 400,
            title: 'Phone',
            overflowVisible: true,
        },
        (ctx) => <PairPhoneModalContent hide={ctx.hide} />,
    );
};

const PairMailModalContent = React.memo((props: { hide: () => void }) => {
    const client = useClient();
    const form = useForm();
    const dataField = useField('input.data', '', form);

    const handleNext = async () => {
        const val = dataField.value.trim();
        if (!val) {
            return;
        }
        try {
            const data = await client.mutateSendEmailPairCode({ email: val });
            showEnterCodeModal(false, val, val, data.sendEmailPairCode);
            props.hide();
        } catch (e) {
            throw new Error(e);
        }
    };

    return (
        <>
            <XModalContent>
                <div className={cx(modalSubtitle, TextBody)}>
                    You can pair your account to any email address and use it for login
                </div>
                <UInputField label="Email address" hasPlaceholder={true} field={dataField} />
            </XModalContent>
            <XModalFooter>
                <UButton text="Cancel" style="tertiary" size="large" onClick={() => props.hide()} />
                <UButton text="Next" style="primary" size="large" onClick={handleNext} />
            </XModalFooter>
        </>
    );
});

const showPairMailModal = () => {
    showModalBox(
        {
            width: 400,
            title: 'Email',
        },
        (ctx) => <PairMailModalContent hide={ctx.hide} />,
    );
};

const entityItemContainer = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    height: 64px;
    border-radius: 8px;
    background: linear-gradient(180deg, rgba(242, 243, 245, 0.56) 0%, #f2f3f5 100%);
`;

const ellipsesText = css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const entityItemTitle = css`
    color: var(--foregroundSecondary);
`;

const entityItemSubtitle = css`
    color: var(--foregroundPrimary);
`;

interface EntityItemProps {
    title: string;
    subtitle: string;
    button?: JSX.Element | boolean;
}

const EntityItem = React.memo((props: EntityItemProps) => {
    return (
        <div className={entityItemContainer}>
            <XView flexGrow={1} flexShrink={1}>
                <div className={cx(ellipsesText, entityItemTitle, TextDensed)}>{props.title}</div>
                <div className={cx(ellipsesText, entityItemSubtitle, TextLabel1)}>
                    {props.subtitle}
                </div>
            </XView>
            {!!props.button && props.button}
        </div>
    );
});

export const SettingsPrivacyFragment = React.memo(() => {
    const client = useClient();
    const { phone, email } = client.useAuthPoints().authPoints;
    return (
        <Page track="account_privacy">
            <UHeader title="Account and privacy" />
            <XView marginTop={12}>
                <FormSection title="Login methods">
                    <XView
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        marginTop={8}
                    >
                        <XView flexGrow={1} flexShrink={0} flexBasis={0} marginRight={8}>
                            <EntityItem
                                title="Phone"
                                subtitle={phone || 'Not paired'}
                                button={
                                    !phone && <UButton text="Add" onClick={showPairPhoneModal} />
                                }
                            />
                        </XView>
                        <XView flexGrow={1} flexShrink={0} flexBasis={0} marginLeft={8}>
                            <EntityItem
                                title="Email"
                                subtitle={email || 'Not paired'}
                                button={
                                    !!email ? (
                                        <UButton
                                            text="Edit"
                                            style="secondary"
                                            onClick={showPairMailModal}
                                        />
                                    ) : (
                                            <UButton text="Add" onClick={showPairMailModal} />
                                        )
                                }
                            />
                        </XView>
                    </XView>
                </FormSection>
            </XView>
        </Page>
    );
});