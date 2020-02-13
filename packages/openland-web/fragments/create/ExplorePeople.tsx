import * as React from 'react';
import { XView } from 'react-mental';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { useClient } from 'openland-api/useClient';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { CheckComponent } from 'openland-web/components/unicorn/UCheckbox';
import { UserInfoContext } from 'openland-web/components/UserInfo';

interface ExplorePeopleProps {
    query: string;
    onPick: (label: string, value: string) => void;
    selectedUsers: Map<string, string> | null;
    excludeMe?: boolean;
    paddingBottom?: number;
    roomUsers?: {
        user: {
            id: string;
        };
    }[];
}

export const ExplorePeople = (props: ExplorePeopleProps) => {
    const client = useClient();
    const data = client.useExplorePeople({ query: props.query });
    const userContext = React.useContext(UserInfoContext);
    const myId = userContext!!.user!!.id!!;

    return (
        <XScrollView3 flexGrow={1} flexShrink={1} paddingBottom={props.paddingBottom}>
            <XView marginTop={12} flexDirection="column" paddingHorizontal={12}>
                {data.items.edges.map(i => {
                    if (props.excludeMe && myId === i.node.id) {
                        return null;
                    }
                    const member = !!(
                        props.roomUsers && props.roomUsers.find(j => j.user.id === i.node.id)
                    );
                    const selected =
                        member || !!(props.selectedUsers && props.selectedUsers.has(i.node.id));
                    return (
                        <UUserView
                            key={i.node.id}
                            user={i.node}
                            onClick={() => props.onPick(i.node.name, i.node.id)}
                            rightElement={
                                <XView marginRight={8}>
                                    <CheckComponent squared={true} checked={selected} />
                                </XView>
                            }
                            disabled={member}
                        />
                    );
                })}
            </XView>
        </XScrollView3>
    );
};
