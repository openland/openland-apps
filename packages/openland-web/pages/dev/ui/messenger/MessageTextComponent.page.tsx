import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XMenuTitle } from 'openland-x/XMenuItem';
import {
    JoinOneServiceMessage,
    JoinTwoServiceMessage,
    JoinManyServiceMessage,
    JobOpportunityApplyTextServiceMessage,
    JobOpportunityRecomendTextServiceMessage,
    RespondToPostServiceMessage,
    RequestForStartupsRecomendTextServiceMessage,
    KickServiceServiceMessage,
    PhotoChangeServiceMessage,
    TitleChangeServiceMessage,
} from '../../../../components/messenger/components/view/content/ServiceMessages';
import { sergeyLapinUser, taraBUser, qwertyUser, prettyTUser, chatSample } from './fixtureData';

export default () => (
    <DevDocsScaffold title="MessageTextComponent">
        <XContent>
            <XVertical>
                <XMenuTitle>1. Kick</XMenuTitle>
                <KickServiceServiceMessage
                    kickedUser={sergeyLapinUser}
                    myUserId={sergeyLapinUser.id}
                />
                <XMenuTitle>2. PhotoChange</XMenuTitle>
                <PhotoChangeServiceMessage />
                <XMenuTitle>3. TitleChange</XMenuTitle>
                <TitleChangeServiceMessage newRoomName={'Service Messages'} />

                <XMenuTitle>4. Joines</XMenuTitle>

                <JoinOneServiceMessage firstUser={sergeyLapinUser} myUserId={sergeyLapinUser.id} />
                <JoinTwoServiceMessage
                    firstUser={sergeyLapinUser}
                    secondUser={taraBUser}
                    myUserId={sergeyLapinUser.id}
                />
                <JoinManyServiceMessage
                    firstUser={sergeyLapinUser}
                    otherUsers={[taraBUser, qwertyUser, prettyTUser]}
                    myUserId={sergeyLapinUser.id}
                />

                <XMenuTitle>5. Post Service Messages</XMenuTitle>

                <XMenuTitle>JobOpportunity</XMenuTitle>

                <JobOpportunityApplyTextServiceMessage
                    postAuthorUser={sergeyLapinUser}
                    responderUser={qwertyUser}
                    chat={chatSample}
                    postTitle={'“Looking for React developer“'}
                    myUserId={sergeyLapinUser.id}
                />

                <JobOpportunityRecomendTextServiceMessage
                    postAuthorUser={sergeyLapinUser}
                    responderUser={qwertyUser}
                    chat={chatSample}
                    postTitle={'“Looking for React developer“'}
                    myUserId={sergeyLapinUser.id}
                />

                <XMenuTitle>OfficeHours</XMenuTitle>
                <RespondToPostServiceMessage
                    postAuthorUser={sergeyLapinUser}
                    responderUser={qwertyUser}
                    chat={chatSample}
                    postTitle={'“Office hours with XX“'}
                    myUserId={sergeyLapinUser.id}
                />

                <XMenuTitle>RequestForStartups</XMenuTitle>

                <RespondToPostServiceMessage
                    postAuthorUser={sergeyLapinUser}
                    responderUser={qwertyUser}
                    chat={chatSample}
                    postTitle={'“Looking for React developer“'}
                    myUserId={sergeyLapinUser.id}
                />
                <RequestForStartupsRecomendTextServiceMessage
                    postAuthorUser={sergeyLapinUser}
                    responderUser={qwertyUser}
                    chat={chatSample}
                    postTitle={'“Looking for React developer“'}
                    myUserId={sergeyLapinUser.id}
                />
            </XVertical>
        </XContent>
    </DevDocsScaffold>
);

{
    /* <MessageTextComponent
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
                /> */
}
