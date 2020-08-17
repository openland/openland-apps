import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SSearchControler } from 'react-native-s/SSearchController';
import { withApp } from 'openland-mobile/components/withApp';
import { UserShort, RoomMemberRole, OrganizationMemberRole, UserBadge } from 'openland-api/spacex.types';
import { GlobalSearchMembers } from '../components/globalSearch/GlobalSearchMembers';

export type RoomMemberType = {
    user: UserShort,
    role: RoomMemberRole,
    badge: UserBadge | null,
    canKick: boolean,
};

export type OrgMemberType = {
    user: UserShort,
    role: OrganizationMemberRole,
};

export type RoomLongPressHanlder = (
    member: RoomMemberType,
    callbacks: {
        onRoleChange: (memberId: string, role: RoomMemberRole) => void,
        onKick: (memberId: string) => void
    }
) => void;

export type OrgLongPressHanlder = (
    member: OrgMemberType,
    callbacks: {
        onRoleChange: (memberId: string, role: OrganizationMemberRole) => void,
        onKick: (memberId: string) => void
    }
) => void;

const MembersSearchPage = React.memo((props: PageProps) => {
    return (
        <>
            <SHeader title="Members" searchPlaceholder="Search members" />

            <SSearchControler
                openOnMount={true}
                onSearchClose={() => props.router.back()}
                searchRender={(p) => (
                    <GlobalSearchMembers
                        query={p.query}
                        router={props.router}
                    />
                )}
            />
        </>
    );
});

export const MembersSearch = withApp(MembersSearchPage);
