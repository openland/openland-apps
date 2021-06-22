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
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import {
    UserShort,
    PrivacyWhoCanAddToGroups,
    PrivacyWhoCanSee,
    UpdateSettingsInput,
} from 'openland-api/spacex.types';
import { formatPhone } from 'openland-y-utils/auth/formatPhone';
import { UserView } from './components/UserView';
import { useBlackList } from 'openland-y-utils/blacklist/LocalBlackList';
import { useText } from 'openland-mobile/text/useText';

const ChangeLoginMethodComponent = React.memo((props: PageProps) => {
    const client = useClient();
    const { t } = useText();
    const phoneDataRef = React.useRef('');
    const formDataRef = React.useRef('');
    const sessionIdRef = React.useRef('');
    const isPhone = !!props.router.params.phone;
    const countryShortname = props.router.params.countryShortname as string;
    const initialValue = props.router.params.initialValue as string | undefined;

    const handleSubmit = React.useCallback(
        async (formData: string, phoneData: string) => {
            phoneDataRef.current = phoneData;
            formDataRef.current = formData;
            if (isPhone) {
                sessionIdRef.current = (
                    await client.mutateSendPhonePairCode({ phone: formData })
                ).sendPhonePairCode;
            } else {
                sessionIdRef.current = (
                    await client.mutateSendEmailPairCode({ email: formData })
                ).sendEmailPairCode;
            }
        },
        [isPhone],
    );
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
            title={isPhone ? t('yourPhone', 'Your phone') : t('yourEmail', 'Your email')}
            subtitle={
                t('pairAccount', {
                    defaultValue: 'You can pair your account to any {{source}} and use it for login',
                    source: isPhone ? 'phone number' : 'email address'
                })
            }
            router={props.router}
            onSubmit={handleSubmit}
            onSuccess={handleSuccess}
            initialValue={initialValue}
            processErrors={false}
        />
    );
});

export const ChangeLoginMethod = withApp(ChangeLoginMethodComponent, {
    navigationAppearance: 'small-hidden',
});

const ChangeLoginMethodCodeComponent = React.memo((props: PageProps) => {
    const client = useClient();
    const { t } = useText();
    const isPhone = !!props.router.params.phone;
    const formData = props.router.params.formData as string;
    const phoneData = props.router.params.phoneData as string;
    const sessionIdRef = React.useRef(props.router.params.sessionId as string);

    const handleResend = React.useCallback(async () => {
        if (isPhone) {
            sessionIdRef.current = (
                await client.mutateSendPhonePairCode({ phone: formData })
            ).sendPhonePairCode;
        } else {
            sessionIdRef.current = (
                await client.mutateSendEmailPairCode({ email: formData })
            ).sendEmailPairCode;
        }
    }, []);
    const handleSubmit = React.useCallback(async (code: string) => {
        if (isPhone) {
            await client.mutatePairPhone({
                confirmationCode: code,
                sessionId: sessionIdRef.current,
            });
        } else {
            await client.mutatePairEmail({
                confirmationCode: code,
                sessionId: sessionIdRef.current,
            });
        }
        await Promise.all([client.refetchAuthPoints(), client.refetchProfile()]);
        props.router.pushAndReset('SettingsPrivacy');
    }, []);

    return (
        <SubmitCodeForm
            title={t('enterCode', 'Enter code')}
            formData={isPhone ? phoneData : formData}
            buttonTitle={t('done', 'Done')}
            onSubmit={handleSubmit}
            onResend={handleResend}
        />
    );
});

export const ChangeLoginMethodCode = withApp(ChangeLoginMethodCodeComponent, {
    navigationAppearance: 'small-hidden',
});

// type SettingLabel = 'Everyone' | 'Nobody' | 'Correspondents';
type SettingLabel = string;

const useLabels = () => {
    const { t } = useText();

    const labelBySettingWhoCanSee: { [setting in PrivacyWhoCanSee]: SettingLabel } = {
        [PrivacyWhoCanSee.EVERYONE]: t('everyone', 'Everyone'),
        [PrivacyWhoCanSee.NOBODY]: t('nobody', 'Nobody'),
    };

    const labelBySettingWhoCanAdd: { [setting in PrivacyWhoCanAddToGroups]: SettingLabel } = {
        [PrivacyWhoCanAddToGroups.EVERYONE]: t('everyone', 'Everyone'),
        [PrivacyWhoCanAddToGroups.NOBODY]: t('nobody', 'Nobody'),
        [PrivacyWhoCanAddToGroups.CORRESPONDENTS]: t('correspondents', 'Correspondents'),
    };

    return {
        getSeeLabel: (setting: string) => labelBySettingWhoCanSee[setting] || '',
        getAddLabel: (setting: string) => labelBySettingWhoCanAdd[setting] || '',
    };
};

type BooleanSetting = string;
// type BooleanSetting = 'Allowed' | 'Disallowed';

const SettingsPrivacyContent = (props: PageProps) => {
    const theme = useTheme();
    const { t } = useText();
    const client = useClient();
    const form = useForm({ disableAppLoader: true });
    const { getSeeLabel, getAddLabel } = useLabels();
    const blackListInfo = useBlackList();
    const blackList = Array.from(blackListInfo.myBans.values());
    const { phone, email } = client.useAuthPoints({ fetchPolicy: 'cache-and-network' }).authPoints;
    const {
        whoCanSeeEmail,
        whoCanSeePhone,
        whoCanAddToGroups,
        communityAdminsCanSeeContactInfo,
    } = client.useSettings({ fetchPolicy: 'cache-and-network' }).settings;
    const countryCode = client.useIpLocation({ fetchPolicy: 'cache-and-network' })?.ipLocation
        ?.countryCode;
    const notPairedText = t('notPaired', 'Not paired');
    const emailStr = email || notPairedText;
    const phoneStr = phone ? formatPhone(phone) : notPairedText;
    const phonePrivacyField = useField<SettingLabel>(
        'phone-privacy',
        getSeeLabel(whoCanSeePhone),
        form,
    );
    const emailPrivacyField = useField<SettingLabel>(
        'email-privacy',
        getSeeLabel(whoCanSeeEmail),
        form,
    );
    const addToGroupsPrivacyField = useField<SettingLabel>(
        'add-to-groups-privacy',
        getAddLabel(whoCanAddToGroups),
        form,
    );
    const communityAdminsContactsPrivacyField = useField<BooleanSetting>(
        'community-admins-contacts-privacy',
        communityAdminsCanSeeContactInfo
            ? t('allowed', 'Allowed') as BooleanSetting
            : t('disallowed', 'Disallowed') as BooleanSetting,
        form,
    );

    const initiateEmailPair = React.useCallback(() => {
        props.router.push('ChangeLoginMethod', { phone: false, initialValue: email });
    }, [email]);
    const initiatePhonePair = React.useCallback(() => {
        props.router.push('ChangeLoginMethod', {
            phone: true,
            countryShortname: countryCode,
            initialValue: phone,
        });
    }, [phone, countryCode]);

    const handleSave = (input: UpdateSettingsInput) =>
        form.doAction(async () => {
            await client.mutateSettingsUpdate({ input });
        });

    const showEditFieldModal = (
        title: string,
        actions: { label: string; newSettings: UpdateSettingsInput }[],
        field: any,
    ) => {
        const actionSheet = ActionSheet.builder();
        actionSheet.title(title);
        actions.forEach((action) => {
            actionSheet.action(
                action.label,
                () => {
                    field.input.onChange(action.label);
                    handleSave(action.newSettings);
                },
                false,
                null,
                undefined,
                field.value === action.label,
            );
        });
        actionSheet.show();
    };

    const handleBlockedPress = React.useCallback((user: UserShort) => {
        props.router.push('ProfileUser', { id: user.id });
    }, []);

    const onUnbannedClick = React.useCallback(async (id: string) => {
        await client.mutateUnBanUser({ id: id });
    }, []);

    const handleBlockedLongPress = React.useCallback((user: UserShort) => {
        const builder = new ActionSheetBuilder();
        builder.action(
            t('unblockPerson', 'Unblock person'),
            () => onUnbannedClick(user.id),
            false,
            require('assets/ic-unblock-24.png'),
        );
        builder.show();
    }, [t]);

    return (
        <SScrollView>
            <ZListGroup header={t('signinMethods', 'Sign-in methods')}>
                <View style={{ marginVertical: 8, paddingHorizontal: 16 }}>
                    <View
                        style={{
                            paddingHorizontal: 16,
                            paddingVertical: 14,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: theme.backgroundTertiaryTrans,
                            borderRadius: 12
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}
                                allowFontScaling={false}
                            >
                                {t('phone', 'Phone')}
                            </Text>
                            <Text
                                style={{ ...TextStyles.Label1, color: theme.foregroundPrimary }}
                                numberOfLines={1}
                                allowFontScaling={false}
                            >
                                {phoneStr}
                            </Text>
                        </View>
                        <View style={{ marginLeft: 8 }}>
                            {phone ? (
                                <ZButton
                                    style="secondary"
                                    title={t('edit', 'Edit')}
                                    onPress={initiatePhonePair}
                                />
                            ) : (
                                <ZButton style="primary" title={t('add', 'Add')} onPress={initiatePhonePair} />
                            )}
                        </View>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: 16,
                            paddingVertical: 14,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: theme.backgroundTertiaryTrans,
                            borderRadius: 12,
                            marginTop: 16
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}
                                allowFontScaling={false}
                            >
                                {t('email', 'Email')}
                            </Text>
                            <Text
                                style={{ ...TextStyles.Label1, color: theme.foregroundPrimary }}
                                numberOfLines={1}
                                allowFontScaling={false}
                            >
                                {emailStr}
                            </Text>
                        </View>
                        <View style={{ marginLeft: 8 }}>
                            {email ? (
                                <ZButton
                                    style="secondary"
                                    title={t('edit', 'Edit')}
                                    onPress={initiateEmailPair}
                                />
                            ) : (
                                <ZButton style="primary" title={t('add', 'Add')} onPress={initiateEmailPair} />
                            )}
                        </View>
                    </View>
                </View>
            </ZListGroup>
            <ZListGroup header={t('privacy', 'Privacy')}>
                <ZListItem
                    text={t('privacyPhone', 'Who can see my phone')}
                    small={true}
                    description={phonePrivacyField.value}
                    onPress={() =>
                        showEditFieldModal(
                            t('privacyPhone', 'Who can see my phone'),
                            [
                                {
                                    label: t('everyone', 'Everyone'),
                                    newSettings: { whoCanSeePhone: PrivacyWhoCanSee.EVERYONE },
                                },
                                {
                                    label: t('nobody', 'Nobody'),
                                    newSettings: { whoCanSeePhone: PrivacyWhoCanSee.NOBODY },
                                },
                            ],
                            phonePrivacyField,
                        )
                    }
                />
                <ZListItem
                    text={t('privacyEmail', 'Who can see my email')}
                    small={true}
                    description={emailPrivacyField.value}
                    onPress={() =>
                        showEditFieldModal(
                            t('privacyEmail', 'Who can see my email'),
                            [
                                {
                                    label: t('everyone', 'Everyone'),
                                    newSettings: { whoCanSeeEmail: PrivacyWhoCanSee.EVERYONE },
                                },
                                {
                                    label: t('nobody', 'Nobody'),
                                    newSettings: { whoCanSeeEmail: PrivacyWhoCanSee.NOBODY },
                                },
                            ],
                            emailPrivacyField,
                        )
                    }
                />
                <ZListItem
                    text={t('privacyAddToGroups', 'Who can add me to groups')}
                    small={true}
                    description={addToGroupsPrivacyField.value}
                    onPress={() =>
                        showEditFieldModal(
                            t('privacyAddToGroups', 'Who can add me to groups'),
                            [
                                {
                                    label: t('everyone', 'Everyone'),
                                    newSettings: {
                                        whoCanAddToGroups: PrivacyWhoCanAddToGroups.EVERYONE,
                                    },
                                },
                                {
                                    label: t('correspondents', 'Correspondents'),
                                    newSettings: {
                                        whoCanAddToGroups: PrivacyWhoCanAddToGroups.CORRESPONDENTS,
                                    },
                                },
                                {
                                    label: t('nobody', 'Nobody'),
                                    newSettings: {
                                        whoCanAddToGroups: PrivacyWhoCanAddToGroups.NOBODY,
                                    },
                                },
                            ],
                            addToGroupsPrivacyField,
                        )
                    }
                />
                <ZListItem
                    text={t('privacyAdminsRight', 'Admins can see my contacts')}
                    small={true}
                    description={communityAdminsContactsPrivacyField.value}
                    onPress={() =>
                        showEditFieldModal(
                            t('privacyAdminsRight', 'Admins can see my contacts'),
                            [
                                {
                                    label: t('allowed', 'Allowed'),
                                    newSettings: { communityAdminsCanSeeContactInfo: true },
                                },
                                {
                                    label: t('disallowed', 'Disallowed'),
                                    newSettings: { communityAdminsCanSeeContactInfo: false },
                                },
                            ],
                            communityAdminsContactsPrivacyField,
                        )
                    }
                />
            </ZListGroup>
            {!!blackList.length && (
                <ZListGroup header={t('blocked', 'Blocked')}>
                    {blackList.map((u) => (
                        <UserView
                            key={u.id}
                            user={u}
                            onPress={() => handleBlockedPress(u)}
                            onLongPress={() => handleBlockedLongPress(u)}
                        />
                    ))}
                </ZListGroup>
            )}
        </SScrollView>
    );
};

const SettingsPrivacyComponent = React.memo((props: PageProps) => {
    const { t } = useText();
    return (
        <>
            <SHeader title={t('accountPrivacy', 'Account and privacy')} />
            <SettingsPrivacyContent {...props} />
        </>
    );
});

export const SettingsPrivacy = withApp(SettingsPrivacyComponent);
