import * as React from 'react';
import { XView } from 'react-mental';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { useClient } from 'openland-api/useClient';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { CheckComponent } from 'openland-web/components/unicorn/UCheckbox';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { useBlackList } from 'openland-y-utils/blacklist/LocalBlackList';

interface ExplorePeopleProps {
    query: string;
    onPick: (label: string, value: string) => void;
    selectedUsers: Map<string, string> | null;
    excludeMe?: boolean;
    paddingBottom?: number;
    disabledBlocking?: boolean;
}

export const ExplorePeople = (props: ExplorePeopleProps) => {
    const client = useClient();
    const data = client.useExplorePeople({ query: props.query });
    const blackList = useBlackList();
    const userContext = React.useContext(UserInfoContext);
    const myId = userContext!!.user!!.id!!;

    return (
        <XScrollView3
            flexGrow={1}
            flexShrink={1}
            paddingBottom={props.paddingBottom}
            useDefaultScroll={true}
        >
            <XView marginTop={12} flexDirection="column" paddingHorizontal={12}>
                {data.items.edges.map(i => {
                    if (props.excludeMe && myId === i.node.id) {
                        return null;
                    }
                    const selected = !!(props.selectedUsers && props.selectedUsers.has(i.node.id));
                    let disabled = false;
                    if (props.disabledBlocking) {
                        disabled = blackList.myBans.has(i.node.id) || blackList.meBanned.has(i.node.id);
                    }
                    return (
                        <UUserView
                            key={i.node.id}
                            user={i.node}
                            onClick={() => props.onPick(i.node.name, i.node.id)}
                            disabled={disabled}
                            rightElement={
                                <XView marginRight={8}>
                                    <CheckComponent squared={true} checked={selected} />
                                </XView>
                            }
                        />
                    );
                })}
            </XView>
        </XScrollView3>
    );
};
