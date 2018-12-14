import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XButton } from 'openland-x/XButton';
import { XTitle } from 'openland-x/XTitle';
import { XPopper } from 'openland-x/XPopper';
import { JoinedUsersPopper } from '../../../components/messenger/components/view/content/MessageTextComponent';

const userInfoExample = {
    id: 'WDZbkEbBelIVyYAX6KgltyyPWB',
    name: 'Sergey Lapin',
    photo:
        'https://ucarecdn.com/9b9f7027-e80e-4366-9e71-74b7817680f8/-/crop/512x512/0,0/',
};

const joinedUserPopperRowExample = {
    title: 'Sarah Massey',
    subtitle: 'Altpoint Capital',
    userInfo: userInfoExample,
};

export default withApp('UI Framework - Popper', 'viewer', () => {
    const joinedUsersPopperElem = (
        <JoinedUsersPopper
            items={[
                joinedUserPopperRowExample,
                joinedUserPopperRowExample,
                joinedUserPopperRowExample,
                joinedUserPopperRowExample,
                joinedUserPopperRowExample,
            ]}
        />
    );
    return (
        <DevDocsScaffold title="Popper">
            <XContent>
                <XVertical>
                    <XTitle>Popper</XTitle>
                    <XVertical>
                        {joinedUsersPopperElem}

                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <XPopper
                            content={joinedUsersPopperElem}
                            // showOnHover={true}
                            show={true}
                            placement="top"
                        >
                            <XButton text="5 others" alignSelf="flex-start" />
                        </XPopper>
                    </XVertical>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});
