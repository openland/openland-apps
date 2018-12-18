import * as React from 'react';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { MessageTextComponent } from '../../../components/messenger/components/view/content/MessageTextComponent';
import { XMenuTitle } from 'openland-x/XMenuItem';

const sergeyLapinUser = {
    id: 'WDZbkEbBelIVyYAX6KgltyyPWB',
    name: 'Sergey Lapin',
    firstName: 'Sergey',
    lastName: 'Lapin',
    photo: 'https://ucarecdn.com/9b9f7027-e80e-4366-9e71-74b7817680f8/-/crop/512x512/0,0/',
    email: 'lapanoid@gmail.com',
    online: true,
    lastSeen: 'online',
    isYou: true,
    primaryOrganization: {
        id: '61gk9KRrl9ComJkvYnvdcddr4o',
        name: 'Openland',
        photo: 'https://ucarecdn.com/db12b7df-6005-42d9-87d6-46f15dd5b880/-/crop/1024x1024/0,0/',
        isCommunity: false,
        __typename: 'Organization',
    },
    __typename: 'User',
};

const sergeyLapinUserMention = {
    user: sergeyLapinUser,
    __typename: 'UserMention',
};

const fredUser = {
    id: 'WDZbkEbBelIVyYAX6KgltyyPWB',
    name: 'Sergey Lapin',
    firstName: 'Sergey',
    lastName: 'Lapin',
    photo: 'https://ucarecdn.com/9b9f7027-e80e-4366-9e71-74b7817680f8/-/crop/512x512/0,0/',
    email: 'lapanoid@gmail.com',
    online: true,
    lastSeen: 'online',
    isYou: true,
    primaryOrganization: {
        id: '61gk9KRrl9ComJkvYnvdcddr4o',
        name: 'Openland',
        photo: 'https://ucarecdn.com/db12b7df-6005-42d9-87d6-46f15dd5b880/-/crop/1024x1024/0,0/',
        isCommunity: false,
        __typename: 'Organization',
    },
    __typename: 'User',
};

const fredUserMention = {
    user: fredUser,
    __typename: 'UserMention',
};

const qwertyUser = {
    id: 'EQxWy3WA9MHvgDp63BAjc9X1Qy',
    name: 'qwerty asdfgh',
    firstName: 'qwerty',
    lastName: 'asdfgh',
    photo: null,
    email: 'jkn67641@ebbob.com',
    online: false,
    lastSeen: '1544816152728',
    isYou: false,
    primaryOrganization: {
        id: 'jZmqKwYJDJIovevm7VvrConkvL',
        name: 'H J',
        photo: null,
        isCommunity: false,
        __typename: 'Organization',
    },
    __typename: 'User',
};

const qwertyUserMention = {
    user: qwertyUser,
    __typename: 'UserMention',
};

const taraBUser = {
    id: '3YkjQVj09LHRbXDkkyeQTP4vWb',
    name: 'Tara B',
    firstName: 'Tara',
    lastName: 'B',
    photo: null,
    email: 'diana+rsud108@openland.com',
    online: false,
    lastSeen: '1544813973816',
    isYou: false,
    primaryOrganization: {
        id: 'wWwoJPLpYKCVre0WMQ4EspVrvP',
        name: 'SignalFire',
        photo: 'https://ucarecdn.com/72f0bd81-e2b1-414c-bac9-26d2d2a36b51/-/crop/281x281/0,0/',
        isCommunity: false,
        __typename: 'Organization',
    },
    __typename: 'User',
};

const taraBUserMention = {
    user: taraBUser,
    __typename: 'UserMention',
};

const prettyTUser = {
    id: 'Y9QLkELbDLfdrzvZ3eDbsXg6o4',
    name: 'Pretty T',
    firstName: 'Pretty',
    lastName: 'T',
    photo: null,
    email: 'diana+test5654@openland.com',
    online: false,
    lastSeen: '1544829035379',
    isYou: false,
    primaryOrganization: {
        id: '1pMAYWRZQecl9Q5re6daTKppyW',
        name: 'P T',
        photo: null,
        isCommunity: false,
        __typename: 'Organization',
    },
    __typename: 'User',
};

const prettyTUserMention = {
    user: prettyTUser,
    __typename: 'UserMention',
};

const walrusSharedRoomMention = {
    sharedRoom: {
        id: 'xwQxobvJ6atnp4Ry4ALoHgo3dK',
        title: 'I am the walrus',
        __typename: 'SharedRoom',
    },
    __typename: 'SharedRoomMention',
};

export default () => (
    <DevDocsScaffold title="MessageTextComponent">
        <XContent>
            <XVertical>
                <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: 'isService false',
                        isService: false,
                        isEdited: false,
                    }}
                />
                <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: 'isService true',
                        isService: true,
                        isEdited: false,
                    }}
                />

                <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: 'isEdited true',
                        isService: false,
                        isEdited: true,
                    }}
                />

                <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: '🌈 insane 🌈',
                        isService: false,
                        isEdited: false,
                    }}
                />

                <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: ': this is normal :',
                        isService: false,
                        isEdited: false,
                    }}
                />

                <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: ':tada:',
                        isService: false,
                        isEdited: false,
                    }}
                />

                <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: 'https://google.com',
                        isService: false,
                        isEdited: false,
                    }}
                />

                <MessageTextComponent
                    {...{
                        alphaMentions: [],
                        mentions: [],
                        message: 'https://app.openland.com/joinChannel/1dVnQiH',
                        isService: false,
                        isEdited: false,
                    }}
                />

                <XMenuTitle>1. Joines</XMenuTitle>
                <MessageTextComponent
                    {...{
                        alphaMentions: [sergeyLapinUserMention],
                        mentions: [],
                        message: '@Sergey Lapin joined the room',
                        isService: true,
                        isEdited: false,
                    }}
                />

                <MessageTextComponent
                    {...{
                        alphaMentions: [sergeyLapinUserMention, prettyTUserMention],
                        mentions: [],
                        message: '@Sergey Lapin joined the room along with @Fred Morozov 🔥',
                        isService: true,
                        isEdited: false,
                    }}
                />

                <MessageTextComponent
                    {...{
                        alphaMentions: [qwertyUserMention, taraBUserMention, prettyTUserMention],
                        mentions: [],
                        message: '@qwerty asdfgh joined the room along with 2 others',
                        isService: true,
                        isEdited: false,
                    }}
                />

                <XMenuTitle>2. Service Messages</XMenuTitle>
                <MessageTextComponent
                    {...{
                        alphaMentions: [
                            sergeyLapinUserMention,
                            qwertyUserMention,
                            walrusSharedRoomMention,
                        ],
                        mentions: [],
                        message:
                            '🙌 @Sergey Lapin — @qwerty asdfgh is responding to your post “54545” in @I am the walrus.\nNow you can chat!',
                        isService: true,
                        isEdited: false,
                    }}
                />
                <MessageTextComponent
                    {...{
                        alphaMentions: [
                            sergeyLapinUserMention,
                            qwertyUserMention,
                            walrusSharedRoomMention,
                            qwertyUserMention,
                            sergeyLapinUserMention,
                        ],
                        mentions: [],
                        message:
                            '🙌 @Sergey Lapin — @qwerty asdfgh is interested in your job opportunity “54545” in @I am the walrus.\n@qwerty asdfgh — as the next step, please, tell @Sergey Lapin a little bit about yourself.',
                        isService: true,
                        isEdited: false,
                    }}
                />
                <MessageTextComponent
                    {...{
                        alphaMentions: [
                            sergeyLapinUserMention,
                            qwertyUserMention,
                            walrusSharedRoomMention,
                            qwertyUserMention,
                            sergeyLapinUserMention,
                        ],
                        mentions: [],
                        message:
                            '🙌  @Sergey Lapin — @qwerty asdfgh is looking to recommend a candidate in response to your post “54545” in @I am the walrus.\n@Sergey Lapin — as the next step, please, describe your recommended candidate, how well do you know them, and share any relevant links.',
                        isService: true,
                        isEdited: false,
                    }}
                />
                <MessageTextComponent
                    {...{
                        alphaMentions: [
                            sergeyLapinUserMention,
                            qwertyUserMention,
                            walrusSharedRoomMention,
                            qwertyUserMention,
                            sergeyLapinUserMention,
                        ],
                        mentions: [],
                        message:
                            '🙌  @Sergey Lapin — @qwerty asdfgh is interested to make a recommendation following up to your post “54545” in @I am the walrus.',
                        isService: true,
                        isEdited: false,
                    }}
                />
            </XVertical>
        </XContent>
    </DevDocsScaffold>
);
