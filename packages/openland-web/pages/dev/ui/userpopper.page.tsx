import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { XVertical2 } from 'openland-x/XVertical2';
// import { OthersPopper } from 'openland-web/components/messenger/message/content/service/views/OthersPopper';

const joinedUserPopperRowExample = {
    title: 'Sarah Massey',
    subtitle: 'Altpoint Capital',
    id: 'WDZbkEbBelIVyYAX6KgltyyPWB',
    photo: 'https://ucarecdn.com/9b9f7027-e80e-4366-9e71-74b7817680f8/-/crop/512x512/0,0/',
};

export default withApp('UI Framework - Popper', 'viewer', () => {
    return (
        <DevDocsScaffold title="Popper">
            <XContent>
                <XVertical2>
                    <XTitle>Popper</XTitle>
                    <XVertical2>
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
                        {/*<OthersPopper*/}
                        {/*    show={true}*/}
                        {/*    items={[*/}
                        {/*        joinedUserPopperRowExample,*/}
                        {/*        joinedUserPopperRowExample,*/}
                        {/*        joinedUserPopperRowExample,*/}
                        {/*        joinedUserPopperRowExample,*/}
                        {/*        joinedUserPopperRowExample,*/}
                        {/*    ]}*/}
                        {/*>*/}
                        {/*    5 others*/}
                        {/*</OthersPopper>*/}
                    </XVertical2>
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
