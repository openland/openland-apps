import * as React from 'react';
import { css } from 'linaria';
import { withApp } from '../../components/withApp';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UInput } from 'openland-web/components/unicorn/UInput';
import { XView } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-api/useClient';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import BlockUserModal from 'openland-web/fragments/admin/BlockUserModalFragment';

interface ExplorePeopleProps {
    variables: { query?: string };
    searchQuery: string;
}

const UsersPickerWrapperClassName = css`
    display: flex;
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
    margin-top: 16px;
    overflow: scroll;
    padding-left: 16px;
    padding-right: 16px;
    flex-direction: column;
    -webkit-overflow-scrolling: touch;
`;

const BlockUserButton = (props: { id: string }) => {
    const client = useClient();
    const [deleted, setDelete] = React.useState(false);
    return (
        <UButton
            text="Block"
            flexShrink={0}
            style="danger"
            onClick={() => BlockUserModal(props.id, client, deleted, setDelete)}
        />
    );
};

const ExplorePeople = (props: ExplorePeopleProps) => {
    const client = useClient();

    const data = client.useExplorePeople(props.variables, {
        fetchPolicy: 'network-only',
    });

    if (!data.items) {
        return (
            <XView flexGrow={1} flexShrink={0}>
                <XLoader loading={true} />
            </XView>
        );
    }

    return (
        <XView flexGrow={1} flexShrink={1} paddingHorizontal={16} overflow="hidden">
            <div className={UsersPickerWrapperClassName}>
                {data.items.edges.map(i => (
                    <XView key={i.node.id} flexShrink={0}>
                        <UUserView
                            user={i.node}
                            onClick={() => {
                                return;
                            }}
                            rightElement={<BlockUserButton id={i.node.id} />}
                        />
                    </XView>
                ))}
            </div>
        </XView>
    );
};

export default withApp('Super Users', ['super-admin', 'software-developer'], () => {
    const [searchValue, setSearchValue] = React.useState('');

    const onInputChange = (data: string) => {
        setSearchValue(data);
    };

    return (
        <DevToolsScaffold title="Users" bottomOffset={false}>
            <div>Users</div>
            <UInput
                label="search"
                onChange={onInputChange}
                value={searchValue}
                flexShrink={0}
            />
            <React.Suspense fallback={null}>
                <ExplorePeople variables={{ query: searchValue }} searchQuery={searchValue} />
            </React.Suspense>
        </DevToolsScaffold>
    );
});
