import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';

export default withApp('UI Framework - Popper', 'viewer', props => {
    return (
        <DevDocsScaffold title="Popper">
            <XContent>
                <XVertical>
                    <XTitle>Plain Service Message</XTitle>
                    <XVertical>
                        Now you can coordinate the time or jump straight to
                        questions!
                    </XVertical>
                    <XTitle>Post Message Respond</XTitle>
                    <XVertical>
                        🙌 Gleb Putintsev — Sergey Lapin is responding to your
                        post “Office hours with XX” in Founders.
                    </XVertical>
                    <XTitle>Post Message Respond</XTitle>
                    <XVertical>
                        🙌 Gleb Putintsev — Sergey Lapin is responding to your
                        post “Office hours with XX” in Founders.
                    </XVertical>
                    <XTitle>Simple mention Join</XTitle>
                    <XVertical>
                        <span>John Smith</span> joined the room along with
                        <span>Sylvia Roberts</span>
                    </XVertical>
                    <XTitle>Composed Join</XTitle>
                    <XVertical>
                        <span>John Smith</span> joined the room along with{' '}
                        <span>5 others</span>
                    </XVertical>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});
