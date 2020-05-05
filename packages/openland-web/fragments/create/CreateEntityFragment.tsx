import * as React from 'react';
import { css, cx } from 'linaria';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { useClient } from 'openland-api/useClient';
import { XView, XViewRouterContext } from 'react-mental';
import { useShake } from 'openland-web/pages/auth/components/authComponents';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UInputField, UInputErrorText } from 'openland-web/components/unicorn/UInput';
import { UTextAreaField } from 'openland-web/components/unicorn/UTextArea';
import { USelectField } from 'openland-web/components/unicorn/USelect';
import { UAvatarUploadField, StoredFileT } from 'openland-web/components/unicorn/UAvatarUpload';
import { SharedRoomKind, WalletSubscriptionInterval } from 'openland-api/spacex.types';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { showModalBox } from 'openland-x/showModalBox';
import { trackEvent } from 'openland-x-analytics';
import { TextTitle1 } from 'openland-web/utils/TextStyles';
import { SearchBox } from './SearchBox';
import { ExplorePeople } from './ExplorePeople';
import { XLoader } from 'openland-x/XLoader';
import BackIcon from 'openland-icons/s/ic-back-24.svg';
import CloseIcon from 'openland-icons/s/ic-close-24.svg';
import { XModalController } from 'openland-x/showModal';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';

const rootContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
`;

const rootHeader = css`
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
    height: 72px;
    padding: 10px;
    background-color: var(--foregroundContrast);
    z-index: 2;
`;

const contentWrapper = css`
    position: relative;
    display: flex;
    flex-grow: 1;
    flex-shrink: 1;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding: 0 24px;
    margin-top: -72px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
`;

const exploreContentWrapper = css`
    flex-direction: column;
    align-items: center;
`;

const gradient = css`
    position: absolute;
    width: 100%;
    height: 128px;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
    pointer-events: none;
`;

const doneButton = css`
    position: absolute;
    bottom: 72px;
    margin: auto;
    display: flex;
    justify-content: center;
    flex-direction: row;
`;

const contentContainer = css`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    flex-grow: 1;
    flex-shrink: 0;
    max-width: 320px;
    width: 100%;
    padding: 72px 0;
    margin-top: auto;
    margin-bottom: auto;
`;

const contentExploreContainer = css`
    justify-content: flex-start;
    flex-grow: 1;
    flex-shrink: 1;
    margin-top: 0;
    margin-bottom: 0;
    max-width: 448px;
    height: 100%;
    padding-bottom: 0;
`;

const exploreContainer = css`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 1;
`;

const usersList = css`
    margin: 0 -28px;
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
`;

const textTitle = css`
    text-align: center;
    margin-bottom: 32px;
    flex-shrink: 0;
    color: var(--foregroundPrimary);
`;

const avatarContainer = css`
    align-self: center;
    flex-shrink: 0;
    margin-bottom: 16px;
`;

const inputNameContainer = css`
    flex-shrink: 0;
`;

const otherInputContainer = css`
    flex-shrink: 0;
    margin-top: 16px;
`;

const multiInputsContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;

    & > div:first-child {
        margin-right: 8px;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 0;
    }
    & > div:last-child {
        margin-left: 8px;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 0;
    }
`;

interface ExplorePeopleFragmentProps {
    onDataChange: (data: Map<string, string> | null) => void;
}

const ExplorePeopleFragment = React.memo((props: ExplorePeopleFragmentProps) => {
    const [searchPeopleQuery, setSearchPeopleQuery] = React.useState<string>('');
    const [selectedUsers, setSelectedUsers] = React.useState<Map<string, string> | null>(null);
    const [options, setOptions] = React.useState<{ label: string; value: string }[]>([]);

    const onDataChange = (data: Map<string, string> | null) => {
        props.onDataChange(data);
    };

    const onInputChange = (data: { label: string; value: string }[] | null) => {
        const newSelected = new Map();
        const newOpts: { label: string; value: string }[] = [];
        if (data) {
            data.map((i) => {
                newSelected.set(i.value, i.label);
                newOpts.push({
                    label: i.label,
                    value: i.value,
                });
            });
        }
        setSelectedUsers(newSelected);
        setOptions(newOpts);
        onDataChange(newSelected);
    };

    const onSelectUser = (label: string, value: string) => {
        const selected = selectedUsers || new Map();
        const newOpts: { label: string; value: string }[] = [];
        if (selected.has(value)) {
            selected.delete(value);
        } else {
            selected.set(value, label);
        }
        selected.forEach((l, v) => {
            newOpts.push({
                label: l,
                value: v,
            });
        });
        setSelectedUsers(selected);
        setOptions(newOpts);
        onDataChange(selected);
    };

    return (
        <div className={exploreContainer}>
            <SearchBox
                onInputChange={setSearchPeopleQuery}
                value={options}
                onChange={onInputChange}
            />
            <React.Suspense
                fallback={
                    <XView flexGrow={1} flexShrink={0}>
                        <XLoader loading={true} />
                    </XView>
                }
            >
                <div className={usersList}>
                    <ExplorePeople
                        excludeMe={true}
                        query={searchPeopleQuery}
                        onPick={onSelectUser}
                        selectedUsers={selectedUsers}
                        paddingBottom={128}
                    />
                </div>
            </React.Suspense>
        </div>
    );
});

interface CreatingContainerProps {
    children: any;
    title: string;
    ctx: XModalController;
    useInvitesPage: boolean;
    titleField: any;
    avatarField: any;
    onPeopleChange: (data: Map<string, string> | null) => void;
    handleDone: () => void;
    hasError?: boolean;
}

const CreatingContainer = React.memo((props: CreatingContainerProps) => {
    const [settingsPage, setSettingsPage] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const titleRef = React.useRef<HTMLInputElement>(null);

    useShortcuts({
        keys: ['Escape'],
        callback: () => {
            if (!settingsPage) {
                setSettingsPage(true);
                return;
            }
            props.ctx.hide();
        },
    });

    const [shakeClassName, shake] = useShake();

    const handleBack = React.useCallback(() => {
        setSettingsPage(true);
    }, []);

    const check = () => {
        if (!props.titleField.value.trim() || props.hasError) {
            if (titleRef && titleRef.current) {
                titleRef.current.focus();
            }
            shake();
            return false;
        }
        return true;
    };
    const onNext = () => {
        if (check()) {
            setSettingsPage(false);
        }
    };

    const onPeopleChange = (data: Map<string, string> | null) => {
        props.onPeopleChange(data);
    };

    const handleDone = () => {
        if (check()) {
            setLoading(true);
            props.handleDone();
        }
    };

    return (
        <div className={rootContainer}>
            <div className={rootHeader}>
                <UIconButton
                    icon={settingsPage ? <CloseIcon /> : <BackIcon />}
                    onClick={settingsPage ? props.ctx.hide : handleBack}
                    size="large"
                />
            </div>
            <div className={cx(contentWrapper, !settingsPage && exploreContentWrapper)}>
                <div className={cx(contentContainer, !settingsPage && contentExploreContainer)}>
                    <div className={cx(TextTitle1, textTitle)}>
                        {settingsPage ? props.title : 'Invite friends'}
                    </div>
                    {settingsPage && (
                        <>
                            <div className={avatarContainer}>
                                <UAvatarUploadField field={props.avatarField} />
                            </div>
                            <div className={shakeClassName}>
                                <div className={inputNameContainer}>
                                    <UInputField
                                        field={props.titleField}
                                        label="Name"
                                        hideErrorText={true}
                                        ref={titleRef}
                                    />
                                </div>
                                {props.children}
                            </div>
                            <UButton
                                text={props.useInvitesPage ? 'Next' : 'Done'}
                                size="large"
                                alignSelf="center"
                                marginTop={32}
                                onClick={props.useInvitesPage ? onNext : handleDone}
                            />
                        </>
                    )}
                    {!settingsPage && <ExplorePeopleFragment onDataChange={onPeopleChange} />}
                </div>
                {!settingsPage && (
                    <>
                        <div className={gradient} />
                        <div className={doneButton}>
                            <UButton
                                text="Done"
                                size="large"
                                alignSelf="center"
                                loading={loading}
                                onClick={handleDone}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
});

export enum DistributionType {
    FREE = 'Free',
    PAID = 'Paid',
    SUBSCRIPTION = 'Subscription',
}

interface GroupPriceSettingsProps {
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

export const GroupPriceSettings = React.memo((props: GroupPriceSettingsProps) => {
    const { distributionField, priceField, intervalField } = props;
    return (
        <>
            <div className={otherInputContainer}>
                <USelectField
                    label="Payments"
                    field={distributionField}
                    options={[
                        {
                            value: DistributionType.FREE,
                            labelShort: 'Free',
                            label: 'Free',
                            subtitle: 'Members join for free',
                        },
                        {
                            value: DistributionType.PAID,
                            labelShort: 'One-time payment',
                            label: 'One-time payment',
                            subtitle: 'Members pay once to join',
                        },
                        {
                            value: DistributionType.SUBSCRIPTION,
                            labelShort: 'Subscription',
                            label: 'Subscription',
                            subtitle: 'Recurrent membership fee',
                        },
                    ]}
                />
            </div>
            {distributionField.value !== DistributionType.FREE && (
                <>
                    <div
                        className={cx(
                            otherInputContainer,
                            distributionField.value === DistributionType.SUBSCRIPTION &&
                                multiInputsContainer,
                        )}
                    >
                        <UInputField
                            field={priceField}
                            label="Price"
                            prefix="$"
                            hideErrorText={true}
                        />
                        {distributionField.value !== DistributionType.SUBSCRIPTION &&
                            priceField.input.errorText && (
                                <UInputErrorText text={priceField.input.errorText} />
                            )}
                        {distributionField.value === DistributionType.SUBSCRIPTION && (
                            <USelectField
                                label="Period"
                                field={intervalField}
                                options={[
                                    {
                                        value: WalletSubscriptionInterval.WEEK,
                                        label: 'Week',
                                    },
                                    {
                                        value: WalletSubscriptionInterval.MONTH,
                                        label: 'Month',
                                    },
                                ]}
                            />
                        )}
                    </div>
                    {distributionField.value === DistributionType.SUBSCRIPTION &&
                        priceField.input.errorText && (
                            <UInputErrorText text={priceField.input.errorText} />
                        )}
                </>
            )}
        </>
    );
});

interface CreateEntityGroupProps {
    entityType: 'group' | 'channel';
    inOrgId?: string;
    ctx: XModalController;
}

const CreateEntityComponentGroup = React.memo((props: CreateEntityGroupProps) => {
    const [people, setPeople] = React.useState<Map<string, string> | null>(null);

    const router = React.useContext(XViewRouterContext)!;
    const client = useClient();
    const form = useForm();

    const secretField = useField<boolean>('input.secret', false, form);
    const distributionField = useField<DistributionType>(
        'input.distribution',
        DistributionType.FREE,
        form,
    );
    const priceField = useField<string>('input.price', '1', form, [
        {
            checkIsValid: (x) => {
                return /^[0-9]*$/.test(x);
            },
            text: 'Numbers only',
        },
        {
            checkIsValid: (x) => {
                return Number(x) <= 1000;
            },
            text: '$1000 maximum',
        },
        {
            checkIsValid: (x) => {
                return Number(x) >= 1;
            },
            text: '$1 minimum',
        },
    ]);
    const intervalField = useField<WalletSubscriptionInterval | null>('input.interval', null, form);
    const titleField = useField('input.title', '', form, [
        {
            checkIsValid: (value) => !!value.trim(),
            text: 'Please enter name',
        },
    ]);
    const avatarField = useField<StoredFileT | undefined | null>('input.avatar', null, form);

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

    const onPeopleChange = (data: Map<string, string> | null) => {
        setPeople(data);
    };

    const doSubmit = async () => {
        const isPaid = [DistributionType.PAID, DistributionType.SUBSCRIPTION].includes(
            distributionField.value,
        );
        const group = (
            await client.mutateRoomCreate({
                title: titleField.value,
                kind: secretField.value ? SharedRoomKind.GROUP : SharedRoomKind.PUBLIC,
                photoRef: sanitizeImageRef(avatarField.value),
                members: !!people ? [...people.keys()] : [],
                organizationId: props.inOrgId || '',
                channel: props.entityType === 'channel',
                price: isPaid ? parseInt(priceField.value, 10) * 100 : undefined,
                interval: intervalField.value,
            })
        ).room;

        props.ctx.hide();
        router.navigate('/mail/' + group.id);
    };

    return (
        <CreatingContainer
            ctx={props.ctx}
            title={`New ${props.entityType}`}
            titleField={titleField}
            avatarField={avatarField}
            onPeopleChange={onPeopleChange}
            handleDone={doSubmit}
            hasError={!!priceField.input.errorText}
            useInvitesPage={distributionField.value === DistributionType.FREE}
        >
            <GroupPriceSettings
                distributionField={distributionField}
                priceField={priceField}
                intervalField={intervalField}
            />
            {!props.inOrgId && (
                <div className={otherInputContainer}>
                    <USelectField
                        label="Visibility"
                        field={secretField}
                        searchable={false}
                        options={[
                            {
                                value: false,
                                labelShort: 'Public',
                                label: 'Public',
                                subtitle: 'Visible in group search',
                            },
                            {
                                value: true,
                                labelShort: 'Secret',
                                label: 'Secret',
                                subtitle: 'Only people with invite link can see it',
                            },
                        ]}
                    />
                </div>
            )}
        </CreatingContainer>
    );
});

interface CreateEntityOrgProps {
    entityType: 'community' | 'organization';
    ctx: XModalController;
}

const CreateEntityComponentOrg = React.memo((props: CreateEntityOrgProps) => {
    const [people, setPeople] = React.useState<Map<string, string> | null>(null);

    const router = React.useContext(XViewRouterContext)!;
    const client = useClient();
    const form = useForm();

    const secretField = useField<boolean>('input.secret', false, form);
    const descriptionField = useField('input.description', '', form);
    const titleField = useField('input.title', '', form, [
        {
            checkIsValid: (value) => !!value.trim(),
            text: 'Please enter name',
        },
    ]);
    const avatarField = useField<StoredFileT | undefined | null>('input.avatar', null, form);

    const onPeopleChange = (data: Map<string, string> | null) => {
        setPeople(data);
    };

    const doSubmit = async () => {
        const organization = (
            await client.mutateCreateOrganization({
                input: {
                    personal: false,
                    name: titleField.value,
                    about: descriptionField.value.trim(),
                    photoRef: sanitizeImageRef(avatarField.value),
                    isCommunity: props.entityType === 'community',
                    isPrivate: secretField.value,
                },
            })
        ).organization;

        if (!!people) {
            await client.mutateOrganizationAddMember({
                organizationId: organization.id,
                userIds: [...people.keys()],
            });
        }

        await client.refetchAccount();
        props.ctx.hide();
        router.navigate('/' + organization.id);
    };

    return (
        <CreatingContainer
            ctx={props.ctx}
            title={`New ${props.entityType}`}
            onPeopleChange={onPeopleChange}
            handleDone={doSubmit}
            useInvitesPage={true}
            titleField={titleField}
            avatarField={avatarField}
        >
            {props.entityType === 'community' && (
                <div className={otherInputContainer}>
                    <USelectField
                        label="Visibility"
                        field={secretField}
                        options={[
                            {
                                value: false,
                                labelShort: 'Public',
                                label: 'Public',
                                subtitle: 'For all organization/community members',
                            },
                            {
                                value: true,
                                labelShort: 'Secret',
                                label: 'Secret',
                                subtitle: 'For people with direct invite',
                            },
                        ]}
                    />
                </div>
            )}
            <div className={otherInputContainer}>
                <UTextAreaField field={descriptionField} placeholder="Short description" />
            </div>
        </CreatingContainer>
    );
});

export const showCreatingGroupFragment = (props: {
    entityType: 'group' | 'channel';
    inOrgId?: string;
}) => {
    showModalBox({ fullScreen: true, useTopCloser: false, hideOnEsc: false }, (ctx) => (
        <CreateEntityComponentGroup {...props} ctx={ctx} />
    ));
};

export const showCreatingOrgFragment = (props: { entityType: 'community' | 'organization' }) => {
    if (props.entityType === 'organization') {
        trackEvent('navigate_new_org');
    }

    if (props.entityType === 'community') {
        trackEvent('navigate_new_community');
    }

    showModalBox({ fullScreen: true, useTopCloser: false, hideOnEsc: false }, (ctx) => (
        <CreateEntityComponentOrg {...props} ctx={ctx} />
    ));
};
