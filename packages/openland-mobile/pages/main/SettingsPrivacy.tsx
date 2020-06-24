import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { View, Text } from 'react-native';
import { ZButton } from 'openland-mobile/components/ZButton';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { useClient } from 'openland-api/useClient';
import { SubmitLoginForm } from '../auth/SubmitLoginForm';
import { SubmitCodeForm } from '../auth/SubmitCodeForm';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import ActionSheet from 'openland-mobile/components/ActionSheet';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { PrivacyWhoCanSee } from 'openland-api/spacex.types';
import { formatPhone } from 'openland-y-utils/auth/formatPhone';

const ChangeLoginMethodComponent = React.memo((props: PageProps) => {
    const client = useClient();
    const phoneDataRef = React.useRef('');
    const formDataRef = React.useRef('');
    const sessionIdRef = React.useRef('');
    const isPhone = !!props.router.params.phone;
    const countryShortname = props.router.params.countryShortname as string;

    const handleSubmit = React.useCallback(async (formData: string, phoneData: string) => {
        phoneDataRef.current = phoneData;
        formDataRef.current = formData;
        if (isPhone) {
            sessionIdRef.current = (await client.mutateSendPhonePairCode({ phone: formData })).sendPhonePairCode;
        } else {
            sessionIdRef.current = (await client.mutateSendEmailPairCode({ email: formData })).sendEmailPairCode;
        }
    }, [isPhone]);
    const handleSuccess = React.useCallback(() => {
        props.router.push('ChangeLoginMethodCode', {
            phone: isPhone,
            phoneData: phoneDataRef.current,
            formData: formDataRef.current,
            sessionId: sessionIdRef.current,
        });
    }, []);

    return (
        <SubmitLoginForm
            isPhone={isPhone}
            countryShortname={countryShortname}
            eventTitle={isPhone ? 'change_phone_view' : 'change_email_view'}
            title={isPhone ? 'Your phone' : 'Your email'}
            subtitle={isPhone ? 'You can pair your account to any phone number and use it for login' : 'You can pair your account to any email address and use it for login'}
            router={props.router}
            onSubmit={handleSubmit}
            onSuccess={handleSuccess}
        />
    );
});

export const ChangeLoginMethod = withApp(ChangeLoginMethodComponent, {
    navigationAppearance: 'small-hidden',
});

const ChangeLoginMethodCodeComponent = React.memo((props: PageProps) => {
    const client = useClient();
    const isPhone = !!props.router.params.phone;
    const formData = props.router.params.formData as string;
    const phoneData = props.router.params.phoneData as string;
    const sessionIdRef = React.useRef(props.router.params.sessionId as string);

    const handleResend = React.useCallback(async () => {
        if (isPhone) {
            sessionIdRef.current = (await client.mutateSendPhonePairCode({ phone: formData })).sendPhonePairCode;
        } else {
            sessionIdRef.current = (await client.mutateSendEmailPairCode({ email: formData })).sendEmailPairCode;
        }
    }, []);
    const handleSubmit = React.useCallback(async (code: string) => {
        if (isPhone) {
            await client.mutatePairPhone({ confirmationCode: code, sessionId: sessionIdRef.current });
        } else {
            await client.mutatePairEmail({ confirmationCode: code, sessionId: sessionIdRef.current });
        }
        await Promise.all([client.refetchAuthPoints(), client.refetchProfile()]);
        props.router.pushAndReset('SettingsPrivacy');
    }, []);

    return (
        <SubmitCodeForm
            formData={isPhone ? phoneData : formData}
            buttonTitle="Done"
            onSubmit={handleSubmit}
            onResend={handleResend}
        />
    );
});

export const ChangeLoginMethodCode = withApp(ChangeLoginMethodCodeComponent, {
    navigationAppearance: 'small-hidden',
});

type SettingLabel = 'Everyone' | 'Nobody';

const labelBySetting: { [setting in PrivacyWhoCanSee]: SettingLabel } = {
    [PrivacyWhoCanSee.EVERYONE]: 'Everyone',
    [PrivacyWhoCanSee.NOBODY]: 'Nobody',
};

const SettingsPrivacyContent = (props: PageProps) => {
    const theme = useTheme();
    const client = useClient();
    const form = useForm({ disableAppLoader: true });
    const { phone, email } = client.useAuthPoints({ fetchPolicy: 'cache-and-network' }).authPoints;
    const { whoCanSeeEmail, whoCanSeePhone } = client.useSettings({ fetchPolicy: 'cache-and-network' }).settings;
    const countryCode = client.useIpLocation({ fetchPolicy: 'cache-and-network' })?.ipLocation?.countryCode;
    const emailStr = email || 'Not paired';
    const phoneStr = phone ? formatPhone(phone) : 'Not paired';
    const phonePrivacyField = useField<SettingLabel>('phone-privacy', labelBySetting[whoCanSeePhone], form);
    const emailPrivacyField = useField<SettingLabel>('email-privacy', labelBySetting[whoCanSeeEmail], form);

    const initiateEmailPair = React.useCallback(() => {
        props.router.push('ChangeLoginMethod', { phone: false });
    }, []);
    const initiatePhonePair = React.useCallback(() => {
        props.router.push('ChangeLoginMethod', { phone: true, countryShortname: countryCode });
    }, []);

    const handleSave = (input: { whoCanSeeEmail?: PrivacyWhoCanSee, whoCanSeePhone?: PrivacyWhoCanSee }) =>
        form.doAction(async () => {
            await client.mutateSettingsUpdate({ input });
        });

    const showPhoneModal = React.useCallback(() => {
        const actionSheet = ActionSheet.builder();
        actionSheet.title('Who can see my phone');
        actionSheet.action('Everyone', () => {
            phonePrivacyField.input.onChange('Everyone');
            handleSave({ whoCanSeePhone: PrivacyWhoCanSee.EVERYONE });
        }, false, null, undefined, phonePrivacyField.value === 'Everyone');
        actionSheet.action('Nobody', () => {
            phonePrivacyField.input.onChange('Nobody');
            handleSave({ whoCanSeePhone: PrivacyWhoCanSee.NOBODY });
        }, false, null, undefined, phonePrivacyField.value === 'Nobody');
        actionSheet.show();
    }, [phonePrivacyField.value]);

    const showEmailModal = React.useCallback(() => {
        const actionSheet = ActionSheet.builder();
        actionSheet.title('Who can see my email');
        actionSheet.action('Everyone', () => {
            emailPrivacyField.input.onChange('Everyone');
            handleSave({ whoCanSeeEmail: PrivacyWhoCanSee.EVERYONE });
        }, false, null, undefined, emailPrivacyField.value === 'Everyone');
        actionSheet.action('Nobody', () => {
            emailPrivacyField.input.onChange('Nobody');
            handleSave({ whoCanSeeEmail: PrivacyWhoCanSee.NOBODY });
        }, false, null, undefined, emailPrivacyField.value === 'Nobody');
        actionSheet.show();
    }, [emailPrivacyField.value]);

    return (
        <SScrollView>
            <ZListGroup header="Login methods">
                <View marginTop={8} paddingHorizontal={16}>
                    <View
                        paddingHorizontal={16}
                        paddingVertical={14}
                        flexDirection="row"
                        alignItems="center"
                        backgroundColor={theme.backgroundTertiaryTrans}
                        borderRadius={12}
                    >
                        <View flex={1}>
                            <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }} allowFontScaling={false}>Phone</Text>
                            <Text style={{ ...TextStyles.Label1, color: theme.foregroundPrimary }} numberOfLines={1} allowFontScaling={false}>{phoneStr}</Text>
                        </View>
                        <View marginLeft={8}>
                            {phone
                                ? <ZButton style="secondary" title="Edit" onPress={initiatePhonePair} />
                                : <ZButton style="primary" title="Add" onPress={initiatePhonePair} />
                            }
                        </View>
                    </View>
                    <View
                        paddingHorizontal={16}
                        paddingVertical={14}
                        flexDirection="row"
                        alignItems="center"
                        backgroundColor={theme.backgroundTertiaryTrans}
                        borderRadius={12}
                        marginTop={16}
                    >
                        <View flex={1}>
                            <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }} allowFontScaling={false}>Email</Text>
                            <Text style={{ ...TextStyles.Label1, color: theme.foregroundPrimary }} numberOfLines={1} allowFontScaling={false}>{emailStr}</Text>
                        </View>
                        <View marginLeft={8}>
                            {email
                                ? <ZButton style="secondary" title="Edit" onPress={initiateEmailPair} />
                                : <ZButton style="primary" title="Add" onPress={initiateEmailPair} />
                            }
                        </View>
                    </View>
                </View>
            </ZListGroup>
            <ZListGroup header="Privacy">
                <ZListItem
                    text="Who can see my phone"
                    small={true}
                    description={phonePrivacyField.value}
                    onPress={showPhoneModal}
                />
                <ZListItem
                    text="Who can see my email"
                    small={true}
                    description={emailPrivacyField.value}
                    onPress={showEmailModal}
                />
            </ZListGroup>
        </SScrollView>
    );
};

class SettingsPrivacyComponent extends React.Component<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Login and privacy" />
                <SettingsPrivacyContent {...this.props} />
            </>
        );
    }
}

export const SettingsPrivacy = withApp(SettingsPrivacyComponent);
