import * as React from 'react';
import { css } from 'linaria';
import { withApp } from '../../components/withApp';
import { XHeader } from 'openland-x/XHeader';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XButton } from 'openland-x/XButton';
import { XView } from 'react-mental';
import { XInput } from 'openland-x/XInput';
import { XUserCard } from 'openland-x/cards/XUserCard';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-web/utils/useClient';
import { showModalBox } from 'openland-x/showModalBox';
import { XHorizontal } from 'openland-x-layout/XHorizontal';

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

function BlockUserModal(
    id: string,
    client: any,
    deleted: boolean,
    setDelete: (i: boolean) => void,
) {
    showModalBox({ title: 'Are you shure?' }, ctx => (
        <XView
            paddingHorizontal={40}
            paddingVertical={20}
            flexDirection="row"
            justifyContent="flex-end"
        >
            <XHorizontal justifyContent="space-between">
                <XButton text="Cancel" onClick={ctx.hide} />
                <XButton
                    text={deleted ? 'Done!' : 'Delete'}
                    style={deleted ? 'success' : 'danger'}
                    action={async () => {
                        await client
                            .mutateDeleteUser({
                                id: id,
                            })
                            .then(() => {
                                setDelete(!deleted);
                                ctx.hide();
                            });
                    }}
                />
            </XHorizontal>
        </XView>
    ));
}

const BlockUserButton = (props: { id: string }) => {
    const client = useClient();
    const [deleted, setDelete] = React.useState(false);
    return (
        <XButton
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
                        <XUserCard
                            user={i.node}
                            noPath={true}
                            customButton={<BlockUserButton id={i.node.id} />}
                        />
                    </XView>
                ))}
            </div>
        </XView>
    );
};

export default withApp('Super Users', 'super-admin', () => {
    const [searchValue, setSearchValue] = React.useState('');

    const onInputChange = (data: string) => {
        setSearchValue(data);
    };

    return (
        <DevToolsScaffold title="Users" bottomOffset={false}>
            <XHeader text="Users" />
            <XInput
                placeholder="search"
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
