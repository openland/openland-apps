import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { XUserCard } from 'openland-x/cards/XUserCard';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-web/utils/useClient';
import { UserInfoContext } from 'openland-web/components/UserInfo';

interface ExplorePeopleProps {
    variables: { query?: string };
    searchQuery: string;
    selectedUsers: Map<string, string> | null;
    onPick: (label: string, value: string) => void;
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

export const ExplorePeople = (props: ExplorePeopleProps) => {
    const client = useClient();
    const userContext = React.useContext(UserInfoContext);
    const myId = userContext!!.user!!.id!!;
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
        <XView flexGrow={1} flexShrink={1} paddingHorizontal={16} marginTop={16} overflow="hidden">
            <div className={UsersPickerWrapperClassName}>
                {data.items.edges.map(i => {
                    if (
                        (props as any).selectedUsers &&
                        (props as any).selectedUsers.has(i.node.id)
                    ) {
                        return null;
                    }
                    if (i.node.id === myId) {
                        return null;
                    }
                    return (
                        <XView
                            key={i.node.id}
                            flexShrink={0}
                            onClick={() => (props as any).onPick(i.node.name, i.node.id)}
                        >
                            <XUserCard user={i.node} noPath={true} customButton={null} />
                        </XView>
                    );
                })}
            </div>
        </XView>
    );
};
