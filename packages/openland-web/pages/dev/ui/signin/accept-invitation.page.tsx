import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { InviteInfoInner } from '../../../init/signChannelInvite.page';
import { CreateWrapIntoState } from './utils';
import { roomSignupKnob } from './knobs';

const WrapIntoState = CreateWrapIntoState({
    root: { ...roomSignupKnob },
});

export default () => (
    <DevDocsScaffold>
        <WrapIntoState>
            {({ branch, ...branchProps }: any) => {
                return (
                    <InviteInfoInner
                        data={{
                            invite: {
                                room: {
                                    id: 'Jlb4AOJBWquVne9A9764IlVrpd',
                                    kind: 'PUBLIC',
                                    title: 'test-lapanoid',
                                    photo: 'ph://5',
                                    socialImage: null,
                                    description: '',
                                    organization: null,
                                    membership: 'NONE',
                                    membersCount: 2,
                                    members: [
                                        {
                                            role: 'MEMBER',
                                            membership: 'MEMBER',
                                            __typename: 'RoomMember',
                                        },
                                        {
                                            role: 'OWNER',
                                            membership: 'MEMBER',
                                            __typename: 'RoomMember',
                                        },
                                    ],
                                    __typename: 'SharedRoom',
                                },
                                invitedByUser: {
                                    id: 'WDZbkEbBelIVyYAX6KgltyyPWB',
                                    name: 'Sergey Lapin',
                                    firstName: 'Sergey',
                                    lastName: 'Lapin',
                                    photo:
                                        'https://ucarecdn.com/9b9f7027-e80e-4366-9e71-74b7817680f8/-/crop/512x512/0,0/',
                                    email: 'lapanoid@gmail.com',
                                    online: true,
                                    lastSeen: 'online',
                                    isYou: false,
                                    primaryOrganization: {
                                        id: '61gk9KRrl9ComJkvYnvdcddr4o',
                                        name: 'Openland',
                                        photo:
                                            'https://ucarecdn.com/db12b7df-6005-42d9-87d6-46f15dd5b880/-/crop/1024x1024/0,0/',
                                        isCommunity: false,
                                        __typename: 'Organization',
                                    },
                                    __typename: 'User',
                                },
                                __typename: 'RoomInvite',
                            },
                        }}
                    />
                );
            }}
        </WrapIntoState>
    </DevDocsScaffold>
);
