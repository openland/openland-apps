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

const ChangeLoginMethodComponent = React.memo((props: PageProps) => {
    const client = useClient();
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
            title={isPhone ? 'Your phone' : 'Your email'}
            subtitle={
                isPhone
                    ? 'You can pair your account to any phone number and use it for login'
                    : 'You can pair your account to any email address and use it for login'
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
            title="Enter code"
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

type SettingLabel = 'Everyone' | 'Nobody' | 'Correspondents';

const labelBySettingWhoCanSee: { [setting in PrivacyWhoCanSee]: SettingLabel } = {
    [PrivacyWhoCanSee.EVERYONE]: 'Everyone',
    [PrivacyWhoCanSee.NOBODY]: 'Nobody',
};

const labelBySettingWhoCanAdd: { [setting in PrivacyWhoCanAddToGroups]: SettingLabel } = {
    [PrivacyWhoCanAddToGroups.EVERYONE]: 'Everyone',
    [PrivacyWhoCanAddToGroups.NOBODY]: 'Nobody',
    [PrivacyWhoCanAddToGroups.CORRESPONDENTS]: 'Correspondents',
};

type BooleanSetting = 'Allowed' | 'Disallowed';

const SettingsPrivacyContent = (props: PageProps) => {
    const theme = useTheme();
    const client = useClient();
    const form = useForm({ disableAppLoader: true });
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
    const emailStr = email || 'Not paired';
    const phoneStr = phone ? formatPhone(phone) : 'Not paired';
    const phonePrivacyField = useField<SettingLabel>(
        'phone-privacy',
        labelBySettingWhoCanSee[whoCanSeePhone],
        form,
    );
    const emailPrivacyField = useField<SettingLabel>(
        'email-privacy',
        labelBySettingWhoCanSee[whoCanSeeEmail],
        form,
    );
    const addToGroupsPrivacyField = useField<SettingLabel>(
        'add-to-groups-privacy',
        labelBySettingWhoCanAdd[whoCanAddToGroups],
        form,
    );
    const communityAdminsContactsPrivacyField = useField<BooleanSetting>(
        'community-admins-contacts-privacy',
        communityAdminsCanSeeContactInfo ? 'Allowed' : 'Disallowed',
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
            'Unblock person',
            () => onUnbannedClick(user.id),
            false,
            require('assets/ic-unblock-24.png'),
        );
        builder.show();
    }, []);

    return (
        <SScrollView>
            <ZListGroup header="Sign-in methods">
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
                                Phone
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
                                    title="Edit"
                                    onPress={initiatePhonePair}
                                />
                            ) : (
                                    <ZButton style="primary" title="Add" onPress={initiatePhonePair} />
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
                                Email
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
                                    title="Edit"
                                    onPress={initiateEmailPair}
                                />
                            ) : (
                                    <ZButton style="primary" title="Add" onPress={initiateEmailPair} />
                                )}
                        </View>
                    </View>
                </View>
            </ZListGroup>
            <ZListGroup header="Privacy">
                <ZListItem
                    text="Who can see my phone"
                    small={true}
                    description={phonePrivacyField.value}
                    onPress={() =>
                        showEditFieldModal(
                            'Who can see my phone',
                            [
                                {
                                    label: 'Everyone',
                                    newSettings: { whoCanSeePhone: PrivacyWhoCanSee.EVERYONE },
                                },
                                {
                                    label: 'Nobody',
                                    newSettings: { whoCanSeePhone: PrivacyWhoCanSee.NOBODY },
                                },
                            ],
                            phonePrivacyField,
                        )
                    }
                />
                <ZListItem
                    text="Who can see my email"
                    small={true}
                    description={emailPrivacyField.value}
                    onPress={() =>
                        showEditFieldModal(
                            'Who can see my email',
                            [
                                {
                                    label: 'Everyone',
                                    newSettings: { whoCanSeeEmail: PrivacyWhoCanSee.EVERYONE },
                                },
                                {
                                    label: 'Nobody',
                                    newSettings: { whoCanSeeEmail: PrivacyWhoCanSee.NOBODY },
                                },
                            ],
                            emailPrivacyField,
                        )
                    }
                />
                <ZListItem
                    text="Who can add me to groups"
                    small={true}
                    description={addToGroupsPrivacyField.value}
                    onPress={() =>
                        showEditFieldModal(
                            'Who can add me to groups',
                            [
                                {
                                    label: 'Everyone',
                                    newSettings: {
                                        whoCanAddToGroups: PrivacyWhoCanAddToGroups.EVERYONE,
                                    },
                                },
                                {
                                    label: 'Correspondents',
                                    newSettings: {
                                        whoCanAddToGroups: PrivacyWhoCanAddToGroups.CORRESPONDENTS,
                                    },
                                },
                                {
                                    label: 'Nobody',
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
                    text="Admins can see my contacts"
                    small={true}
                    description={communityAdminsContactsPrivacyField.value}
                    onPress={() =>
                        showEditFieldModal(
                            'Admins can see my contacts',
                            [
                                {
                                    label: 'Allowed',
                                    newSettings: { communityAdminsCanSeeContactInfo: true },
                                },
                                {
                                    label: 'Disallowed',
                                    newSettings: { communityAdminsCanSeeContactInfo: false },
                                },
                            ],
                            communityAdminsContactsPrivacyField,
                        )
                    }
                />
            </ZListGroup>
            {!!blackList.length && (
                <ZListGroup header="Blocked">
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

class SettingsPrivacyComponent extends React.Component<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Account and privacy" />
                <SettingsPrivacyContent {...this.props} />
            </>
        );
    }
}

export const SettingsPrivacy = withApp(SettingsPrivacyComponent);
