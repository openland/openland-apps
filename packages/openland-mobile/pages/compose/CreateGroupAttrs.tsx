import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import {
    SharedRoomKind,
    RoomMemberRole,
    RoomCreate,
    WalletSubscriptionInterval,
} from 'openland-api/spacex.types';
import { Modals } from '../main/modals/Modals';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import Toast from 'openland-mobile/components/Toast';
import Alert from 'openland-mobile/components/AlertBlanket';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZSelect } from 'openland-mobile/components/ZSelect';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { SRouter } from 'react-native-s/SRouter';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import { trackEvent } from 'openland-mobile/analytics';
import { View } from 'react-native';
import { t } from 'openland-mobile/text/useText';

const showMembersModal = (router: SRouter, res: RoomCreate) => {
    Modals.showUserMuptiplePicker(
        router,
        {
            title: t('add', 'Add'),
            action: async (users) => {
                const loader = Toast.loader();
                loader.show();
                try {
                    await getClient().mutateRoomAddMembers({
                        invites: users.map((u) => ({
                            userId: u.id,
                            role: RoomMemberRole.MEMBER,
                        })),
                        roomId: res.room.id,
                    });

                    router.pushAndReset('Conversation', { id: res.room.id });
                } catch (e) {
                    Alert.alert(e.message);
                }
                loader.hide();
            },

            titleEmpty: t('skip', 'Skip'),
            actionEmpty: () => {
                router.pushAndReset('Conversation', { id: res.room.id });
            },
        },
        res.room.id,
        true,
        t('addPeople', 'Add people'),
        // [],
        // [getMessenger().engine.user.id],
        {
            path: 'ProfileGroupLink',
            pathParams: { id: res.room.id },
            onPress: () => {
                router.push('ProfileGroupLink', { room: res.room });
            },
        },
        true,
    );
};

export enum DistributionType {
    FREE = 'Free',
    PAID = 'Paid',
    SUBSCRIPTION = 'Subscription',
}

interface GroupPriceSettings {
    distributionField: {
        input: {
            value: DistributionType;
            onChange: (src: DistributionType) => void;
            invalid: boolean;
            errorText: string;
        };
        value: DistributionType;
    };
    priceField: {
        input: {
            value: string;
            onChange: (src: string) => void;
            invalid: boolean;
            errorText: string;
        };
        value: string;
    };
    intervalField: {
        input: {
            value: WalletSubscriptionInterval | null;
            onChange: (src: WalletSubscriptionInterval | null) => void;
            invalid: boolean;
            errorText: string;
        };
        value: WalletSubscriptionInterval | null;
    };
}

export const GroupPriceSettings = React.memo((props: GroupPriceSettings) => {
    const { distributionField, priceField, intervalField } = props;
    const isSubscription = distributionField.value === DistributionType.SUBSCRIPTION;
    return (
        <>
            <ZSelect
                label={t('payments', 'Payments')}
                modalTitle={t('payments', 'Payments')}
                field={distributionField}
                options={[
                    {
                        value: DistributionType.FREE,
                        label: t('createGroupFree', 'Free'),
                        subtitle: t('createGroupFreeDescription', 'Members join for free'),
                    },
                    {
                        value: DistributionType.PAID,
                        label: t('createGroupPaid', 'One-time payment'),
                        subtitle: t('createGroupPaidDescription', 'Members pay once to join'),
                    },
                    {
                        value: DistributionType.SUBSCRIPTION,
                        label: t('createGroupSubscription', 'Subscription'),
                        subtitle: t('createGroupSubscriptionDescription', 'Recurrent membership fee'),
                    },
                ]}
            />
            {distributionField.value !== DistributionType.FREE && (
                // without this shit selector dont work!
                <React.Suspense fallback={null}>
                    <View
                        style={{
                            flexDirection: isSubscription ? 'row' : undefined,
                            paddingHorizontal: 16,
                            marginBottom: 16
                        }}
                    >
                        <View
                            style={{
                                flexGrow: 1,
                                flexShrink: 0,
                                flexBasis: 0,
                                marginRight: isSubscription ? 8 : undefined
                            }}
                        >
                            <ZInput
                                placeholder={t('price', 'Price')}
                                prefix="$"
                                field={priceField}
                                keyboardType="numeric"
                                noWrapper={true}
                            />
                        </View>
                        {isSubscription && (
                            <View style={{ flexGrow: 1, flexShrink: 0, flexBasis: 0, marginLeft: 8 }}>
                                <ZSelect
                                    noWrapper={true}
                                    label={t('period', 'Period')}
                                    modalTitle={t('period', 'Period')}
                                    field={intervalField}
                                    options={[
                                        {
                                            value: WalletSubscriptionInterval.WEEK,
                                            label: t('week', 'Week'),
                                        },
                                        {
                                            value: WalletSubscriptionInterval.MONTH,
                                            label: t('month', 'Month'),
                                        },
                                    ]}
                                />
                            </View>
                        )}
                    </View>
                </React.Suspense>
            )}
        </>
    );
});

const CreateGroupComponent = React.memo((props: PageProps) => {
    const isChannel = !!props.router.params.isChannel;
    const orgIdFromRouter = props.router.params.organizationId;

    const form = useForm();
    const photoField = useField('photoRef', null, form);
    const titleField = useField('title', '', form);
    const kindField = useField<SharedRoomKind>('kind', SharedRoomKind.PUBLIC, form);
    const distributionField = useField<DistributionType>(
        'distribution',
        DistributionType.FREE,
        form,
    );
    const priceField = useField<string>('price', '1', form, [
        {
            checkIsValid: (x) => {
                return /^[0-9]*$/.test(x);
            },
            text: t('validationNumbersOnly', 'Numbers only'),
        },
        {
            checkIsValid: (x) => {
                return Number(x) <= 1000;
            },
            text: t('validationAmountMax', { amount: 1000, defaultValue: '${{amount}} maximum' }),
        },
        {
            checkIsValid: (x) => {
                return Number(x) >= 1;
            },
            text: t('validationAmountMin', { amount: 1, defaultValue: '${{amount}} minimum' }),
        },
    ]);
    const intervalField = useField<WalletSubscriptionInterval | null>('interval', null, form);

    React.useEffect(() => {
        if (distributionField.value === DistributionType.FREE) {
            priceField.input.onChange('1');
            intervalField.input.onChange(null);
        }
        if (distributionField.value === DistributionType.PAID) {
            intervalField.input.onChange(null);
        }
        if (distributionField.value === DistributionType.SUBSCRIPTION) {
            intervalField.input.onChange(WalletSubscriptionInterval.MONTH);
        }
    }, [distributionField.value]);

    const handleSave = () => {
        if (titleField.value === '') {
            Alert.builder()
                .title(t('validationEnterName', 'Please enter a name'))
                .button(t('gotIt', 'Got it!'))
                .show();
            return;
        }

        if (priceField.input.invalid) {
            Alert.builder()
                .title(t('validationEnterPrice', 'Please enter a valid price'))
                .button(t('gotIt', 'Got it!'))
                .show();
            return;
        }

        form.doAction(async () => {
            const isPaid = [DistributionType.PAID, DistributionType.SUBSCRIPTION].includes(
                distributionField.value,
            );
            const res = await getClient().mutateRoomCreate({
                kind: kindField.value === 'PUBLIC' ? SharedRoomKind.PUBLIC : SharedRoomKind.GROUP,
                title: titleField.value,
                photoRef: photoField.value,
                members: [],
                organizationId: orgIdFromRouter,
                channel: isChannel,
                price: isPaid ? parseInt(priceField.value, 10) * 100 : undefined,
                interval: intervalField.value,
            });

            if (orgIdFromRouter) {
                await getClient().refetchOrganization({ organizationId: orgIdFromRouter });
            }

            trackEvent('navigate_new_group_add_members');
            if (distributionField.value === DistributionType.FREE) {
                showMembersModal(props.router, res);
            } else {
                props.router.pushAndReset('Conversation', { id: res.room.id });
            }
        });
    };

    return (
        <>
            <SHeader title={isChannel ? t('newChannel', 'New channel') : t('newGroup', 'New group')} />
            <SHeaderButton title={t('next', 'Next')} onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <ZListGroup header={null} alignItems="center">
                    <ZAvatarPicker size="xx-large" field={photoField} />
                </ZListGroup>
                <ZListGroup header={null}>
                    <ZInput placeholder={t('name', 'Name')} field={titleField} autoFocus={true} />
                    <GroupPriceSettings
                        distributionField={distributionField}
                        priceField={priceField}
                        intervalField={intervalField}
                    />
                    {!orgIdFromRouter && (
                        <ZSelect
                            label={t('visibility', 'Visibility')}
                            modalTitle={t('visibility', 'Visibility')}
                            field={kindField}
                            options={[
                                {
                                    label: t('visibilityPublic', 'Public'),
                                    subtitle: t('visibilityPublicDescription', 'Visible in group search'),
                                    value: SharedRoomKind.PUBLIC,
                                },
                                {
                                    label: t('visibilitySecret', 'Secret'),
                                    subtitle: t('visibilitySecretDescription', 'Only people with invite link can see it'),
                                    value: SharedRoomKind.GROUP,
                                },
                            ]}
                        />
                    )}
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const CreateGroupAttrs = withApp(CreateGroupComponent, { navigationAppearance: 'small' });
