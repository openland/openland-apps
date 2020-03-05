import * as React from 'react';
import { css, cx } from 'linaria';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { useClient } from 'openland-api/useClient';
import { XView, XViewRouterContext } from 'react-mental';
import { useShake } from 'openland-web/pages/auth/components/authComponents';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UInputField } from 'openland-web/components/unicorn/UInput';
import { UTextAreaField } from 'openland-web/components/unicorn/UTextArea';
import { USelectField } from 'openland-web/components/unicorn/USelect';
import { UAvatarUploadField, StoredFileT } from 'openland-web/components/unicorn/UAvatarUpload';
import {
    SharedRoomKind,
    ImageRefInput,
    WalletSubscriptionInterval,
} from 'openland-api/spacex.types';
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

    const onInputChange = (data: { label: string; value: string }[]) => {
        const newSelected = new Map();
        const newOpts: { label: string; value: string }[] = [];
        data.map(i => {
            newSelected.set(i.value, i.label);
            newOpts.push({
                label: i.label,
                value: i.value,
            });
        });
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
                onInputChange={text => {
                    setSearchPeopleQuery(text);
                    return text;
                }}
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
    getSettingsData: (avatar: StoredFileT | undefined | null, title: string) => void;
    onPeopleChange: (data: Map<string, string> | null) => void;
    handleDone: () => void;
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

    const form = useForm();
    const [shakeClassName, shake] = useShake();

    const titleField = useField('input.title', '', form, [
        {
            checkIsValid: value => !!value.trim(),
            text: 'Please enter name',
        },
    ]);
    const avatarField = useField<StoredFileT | undefined | null>('input.avatar', null, form);

    const handleBack = React.useCallback(() => {
        setSettingsPage(true);
    }, []);

    const canNextClick = !!titleField.value.trim();

    const onNext = () => {
        if (!canNextClick) {
            if (titleRef && titleRef.current) {
                titleRef.current.focus();
            }
            return shake();
        }
        props.getSettingsData(avatarField.value, titleField.value.trim());
        setSettingsPage(false);
    };

    const onPeopleChange = (data: Map<string, string> | null) => {
        props.onPeopleChange(data);
    };

    const handleDone = () => {
        setLoading(true);
        props.handleDone();
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
                                <UAvatarUploadField field={avatarField} />
                            </div>
                            <div className={shakeClassName}>
                                <div className={inputNameContainer}>
                                    <UInputField
                                        field={titleField}
                                        label="Name"
                                        hideErrorText={true}
                                        ref={titleRef}
                                    />
                                </div>
                                {props.children}
                            </div>
                            <UButton
                                text="Next"
                                size="large"
                                alignSelf="center"
                                marginTop={32}
                                onClick={onNext}
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

enum DistributionType {
    FREE = 'Free',
    PAID = 'Paid',
    SUBSCRIPTION = 'Subscription',
}

interface CreateEntityGroupProps {
    entityType: 'group' | 'channel';
    inOrgId?: string;
    ctx: XModalController;
}

const CreateEntityComponentGroup = React.memo((props: CreateEntityGroupProps) => {
    const [avatar, setAvatar] = React.useState<ImageRefInput | null>(null);
    const [title, setTitle] = React.useState('');
    const [people, setPeople] = React.useState<Map<string, string> | null>(null);

    const router = React.useContext(XViewRouterContext)!;
    const client = useClient();
    const form = useForm();

    const secretField = useField<boolean>('input.secret', !props.inOrgId, form);
    const distributionField = useField<DistributionType>(
        'input.distribution',
        DistributionType.FREE,
        form,
    );
    const priceField = useField<number | null>('input.price', null, form);
    const intervalField = useField<WalletSubscriptionInterval | null>('input.interval', null, form);

    React.useEffect(
        () => {
            if (distributionField.value === DistributionType.FREE) {
                priceField.input.onChange(null);
                intervalField.input.onChange(null);
            }
            if (distributionField.value === DistributionType.PAID) {
                intervalField.input.onChange(null);
                priceField.input.onChange(500);
            }
            if (distributionField.value === DistributionType.SUBSCRIPTION) {
                intervalField.input.onChange(WalletSubscriptionInterval.MONTH);
                priceField.input.onChange(500);
            }
        },
        [distributionField.value],
    );

    const getSettingsData = (img: StoredFileT | undefined | null, name: string) => {
        setAvatar(sanitizeImageRef(img));
        setTitle(name);
    };

    const onPeopleChange = (data: Map<string, string> | null) => {
        setPeople(data);
    };

    const doSubmit = async () => {
        const group = (await client.mutateRoomCreate({
            title: title,
            kind: secretField.value ? SharedRoomKind.GROUP : SharedRoomKind.PUBLIC,
            photoRef: avatar,
            members: !!people ? [...people.keys()] : [],
            organizationId: props.inOrgId || '',
            channel: props.entityType === 'channel',
            price: priceField.value,
            interval: intervalField.value,
        })).room;

        props.ctx.hide();
        router.navigate('/mail/' + group.id);
    };

    return (
        <CreatingContainer
            ctx={props.ctx}
            title={`New ${props.entityType}`}
            getSettingsData={getSettingsData}
            onPeopleChange={onPeopleChange}
            handleDone={doSubmit}
        >
            <div className={otherInputContainer}>
                <USelectField
                    placeholder="Distribution"
                    field={distributionField as any}
                    searchable={false}
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
                <div
                    className={cx(
                        otherInputContainer,
                        distributionField.value === DistributionType.SUBSCRIPTION &&
                            multiInputsContainer,
                    )}
                >
                    <USelectField
                        placeholder="Price"
                        field={priceField as any}
                        searchable={false}
                        options={[
                            {
                                value: 100,
                                label: '$1',
                            },
                            {
                                value: 500,
                                label: '$5',
                            },
                            {
                                value: 1000,
                                label: '$10',
                            },
                            {
                                value: 2000,
                                label: '$20',
                            },
                        ]}
                    />
                    {distributionField.value === DistributionType.SUBSCRIPTION && (
                        <USelectField
                            placeholder="Period"
                            field={intervalField as any}
                            searchable={false}
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
            )}
            {!props.inOrgId && (
                <div className={otherInputContainer}>
                    <USelectField
                        placeholder="Visibility"
                        field={secretField as any}
                        searchable={false}
                        options={[
                            {
                                value: true,
                                labelShort: 'Secret',
                                label: 'Secret',
                                subtitle: 'Only people with invite link can see it',
                            },
                            {
                                value: false,
                                labelShort: 'Shared',
                                label: 'Shared',
                                subtitle: 'Visible in group search',
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
    const [avatar, setAvatar] = React.useState<ImageRefInput | null>(null);
    const [title, setTitle] = React.useState('');
    const [people, setPeople] = React.useState<Map<string, string> | null>(null);

    const router = React.useContext(XViewRouterContext)!;
    const client = useClient();
    const form = useForm();

    const secretField = useField<boolean>('input.secret', false, form);
    const descriptionField = useField('input.description', '', form);

    const getSettingsData = (img: StoredFileT | undefined | null, name: string) => {
        setAvatar(sanitizeImageRef(img));
        setTitle(name);
    };

    const onPeopleChange = (data: Map<string, string> | null) => {
        setPeople(data);
    };

    const doSubmit = async () => {
        const organization = (await client.mutateCreateOrganization({
            input: {
                personal: false,
                name: title,
                about: descriptionField.value.trim(),
                photoRef: avatar,
                isCommunity: props.entityType === 'community',
                isPrivate: secretField.value,
            },
        })).organization;

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
            getSettingsData={getSettingsData}
            onPeopleChange={onPeopleChange}
            handleDone={doSubmit}
        >
            {props.entityType === 'community' && (
                <div className={otherInputContainer}>
                    <USelectField
                        placeholder="Visibility"
                        field={secretField as any}
                        searchable={false}
                        options={[
                            {
                                value: false,
                                labelShort: 'Shared',
                                label: 'Shared',
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
    showModalBox({ fullScreen: true, useTopCloser: false, hideOnEsc: false }, ctx => (
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

    showModalBox({ fullScreen: true, useTopCloser: false, hideOnEsc: false }, ctx => (
        <CreateEntityComponentOrg {...props} ctx={ctx} />
    ));
};
