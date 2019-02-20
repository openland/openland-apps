import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { SharedRoomKind, SharedRoomMembershipStatus, AvailableRooms_rooms_organization } from 'openland-api/Types';
import { SHeader } from 'react-native-s/SHeader';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { SDeferred } from 'react-native-s/SDeferred';
import { SScrollView } from 'react-native-s/SScrollView';

const GroupListComponent = React.memo<PageProps>((props) => {
    let groups = props.router.params.groups as {
        __typename: "SharedRoom";
        id: string;
        kind: SharedRoomKind;
        title: string;
        photo: string;
        membersCount: number | null;
        membership: SharedRoomMembershipStatus;
        organization: AvailableRooms_rooms_organization | null;
    }[]

    return (
        <>
            <SHeader title={props.router.params.title} />
            <SDeferred>
                <SScrollView>
                    {groups.map((v) => (
                        <ZListItem
                            key={v.id}
                            text={v.title}
                            leftAvatar={{
                                photo: v.photo,
                                key: v.id,
                                title: v.title,
                            }}
                            title={v.organization!.name}
                            description={v.membersCount + ' members'}
                            path="Conversation"
                            pathParams={{ flexibleId: v.id }}
                        />
                    ))}
                </SScrollView>
            </SDeferred>
        </>
    );
});

export const GroupList = withApp(GroupListComponent);