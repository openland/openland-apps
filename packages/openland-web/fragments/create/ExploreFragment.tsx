import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { useStackRouter } from 'openland-unicorn/components/StackRouter';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { TextTitle1 } from 'openland-web/utils/TextStyles';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { CreateEntityEngine } from 'openland-engines/createEntity/CreateEntityState';
import { SearchBox } from './SearchBox';
import { XLoader } from 'openland-x/XLoader';
import { ExplorePeople } from './ExplorePeople';
import { SharedRoomKind } from 'openland-api/Types';

const titleViewContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
`;

const titleButtonsContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: -56px;
`;

const TitleView = (props: {
    title: string;
    canMakeSubmit: boolean;
    onSubmit: (skip?: boolean) => void;
}) => (
    <div className={titleViewContainer}>
        <div className={TextTitle1}>{props.title}</div>
        <div className={titleButtonsContainer}>
            <UButton
                text="Skip"
                style="secondary"
                marginRight={16}
                action={() => props.onSubmit(true)}
            />
            <UButton
                text="Next"
                action={props.canMakeSubmit ? props.onSubmit : undefined}
                disable={!props.canMakeSubmit}
            />
        </div>
    </div>
);

interface CreateEntityInterface {
    entityState: CreateEntityEngine;
    entityType: 'group' | 'channel' | 'community' | 'organization';
    inOrgId?: string;
}

const ExplorePeopleComponent = React.memo((props: CreateEntityInterface) => {
    const [searchPeopleQuery, setSearchPeopleQuery] = React.useState<string>('');
    const [selectedUsers, setSelectedUsers] = React.useState<Map<string, string> | null>(null);
    const [options, setOptions] = React.useState<{ label: string; value: string }[]>([]);

    const engine = props.entityState;
    const engineState = engine.getState();
    const stackRouter = useStackRouter();
    const client = useClient();

    React.useEffect(() => {
        if (!engineState.title) {
            stackRouter.reset();
        }
    }, [engineState]);

    if (!engineState.title) {
        return null;
    }

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
    };

    const doSubmit = async (skip?: boolean) => {
        if (props.entityType === 'group' || props.entityType === 'channel') {
            const group = (await client.mutateRoomCreate({
                title: engineState.title,
                kind: engineState.secret ? SharedRoomKind.GROUP : SharedRoomKind.PUBLIC,
                photoRef: engineState.photo,
                members: skip ? [] : !!selectedUsers ? [...selectedUsers.keys()] : [],
                organizationId: engineState.shareWith || '',
                channel: props.entityType === 'channel',
            })).room;

            engine.clear();
            stackRouter.reset('/mail/' + group.id);
        } else {
            const organization = (await client.mutateCreateOrganization({
                input: {
                    personal: false,
                    name: engineState.title!,
                    about: engineState.description,
                    photoRef: engineState.photo,
                    isCommunity: props.entityType === 'community',
                    isPrivate: engineState.secret,
                },
            })).organization;

            if (!!selectedUsers && !skip) {
                await client.mutateOrganizationAddMember({
                    organizationId: organization.id,
                    userIds: [...selectedUsers.keys()],
                });
            }

            await client.refetchAccount();
            engine.clear();
            stackRouter.reset('/' + organization.id);
        }
    };

    return (
        <Page
            flexGrow={1}
            track={`navigate_new_${props.entityType}_add_members`}
            padded={true}
            scroll="disable"
        >
            <UHeader
                appearance="fullwidth"
                titleView={
                    <TitleView
                        title="Add members"
                        canMakeSubmit={!!(selectedUsers && selectedUsers.size)}
                        onSubmit={doSubmit}
                    />
                }
            />
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
                <XView marginHorizontal={-12} flexShrink={1} flexGrow={1}>
                    <ExplorePeople
                        excludeMe={true}
                        query={searchPeopleQuery}
                        onPick={onSelectUser}
                        selectedUsers={selectedUsers}
                    />
                </XView>
            </React.Suspense>
        </Page>
    );
});

export const ExplorePeopleFragment = React.memo(() => {
    const entityState = React.useContext(MessengerContext).getEntityState();
    const unicorn = useUnicorn();
    const entityType = unicorn.query.type;
    const inOrgId = unicorn.query.id;
    return (
        <ExplorePeopleComponent
            entityState={entityState}
            entityType={entityType}
            inOrgId={inOrgId}
        />
    );
});
