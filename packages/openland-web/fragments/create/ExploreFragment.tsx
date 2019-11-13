import * as React from 'react';
import { css } from "linaria";
import { XView, XViewRouterContext } from 'react-mental';
import { useClient } from 'openland-web/utils/useClient';
import { SearchBox } from './SearchBox';
import { XLoader } from 'openland-x/XLoader';
import { ExplorePeople } from './ExplorePeople';
import { SharedRoomKind, ImageRefInput } from 'openland-api/Types';
import { UButton } from 'openland-web/components/unicorn/UButton';

const headerContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;
    margin-bottom: 40px;
`;

const headerButtonsContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const textTitle = css`
    font-size: 32px;
    line-height: 32px;
    font-weight: 600;
    flex-shrink: 0;
`;

interface CreateEntityInterface {
    entityType: 'group' | 'channel' | 'community' | 'organization';
    inOrgId?: string;

    title: string;
    description?: string;
    photo?: ImageRefInput | null;
    secret: boolean;
    hide: () => void;
}

const ExplorePeopleComponent = React.memo((props: CreateEntityInterface) => {
    const [searchPeopleQuery, setSearchPeopleQuery] = React.useState<string>('');
    const [selectedUsers, setSelectedUsers] = React.useState<Map<string, string> | null>(null);
    const [options, setOptions] = React.useState<{ label: string; value: string }[]>([]);

    const router = React.useContext(XViewRouterContext)!;
    const client = useClient();

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
                title: props.title,
                kind: props.secret ? SharedRoomKind.GROUP : SharedRoomKind.PUBLIC,
                photoRef: props.photo,
                members: skip ? [] : !!selectedUsers ? [...selectedUsers.keys()] : [],
                organizationId: props.inOrgId || '',
                channel: props.entityType === 'channel',
            })).room;

            props.hide();
            router.navigate('/mail/' + group.id);
        } else {
            const organization = (await client.mutateCreateOrganization({
                input: {
                    personal: false,
                    name: props.title,
                    about: props.description,
                    photoRef: props.photo,
                    isCommunity: props.entityType === 'community',
                    isPrivate: props.secret,
                },
            })).organization;

            if (!!selectedUsers && !skip) {
                await client.mutateOrganizationAddMember({
                    organizationId: organization.id,
                    userIds: [...selectedUsers.keys()],
                });
            }

            await client.refetchAccount();
            props.hide();
            router.navigate('/' + organization.id);
        }
    };

    const canMakeSubmit = !!(selectedUsers && selectedUsers.size);

    return (
        <>
            <div className={headerContainer}>
                <div className={textTitle}>Add people</div>
                <div className={headerButtonsContainer}>
                    <UButton text="Skip" style="secondary" marginRight={16} action={() => doSubmit(true)} />
                    <UButton
                        text="Next"
                        action={canMakeSubmit ? () => doSubmit() : undefined}
                        disable={!canMakeSubmit}
                    />
                </div>
            </div>
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
        </>
    );
});

export const ExploreFragment = (props: CreateEntityInterface) => <ExplorePeopleComponent {...props} />;
