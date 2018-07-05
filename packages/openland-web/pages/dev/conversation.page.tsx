import '../../globals';
import * as React from 'react';
import { withApp } from '../../components/withApp';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { XHeader } from 'openland-x/XHeader';
import { withQueryLoader } from '../../components/withQueryLoader';
import { withChat } from '../../api/withChat';
import { withUserInfo } from '../../components/UserInfo';
import { MessengerComponent } from '../../components/messenger/MessengerComponent';

export default withApp('Super Chat', 'super-admin', withChat(withQueryLoader(withUserInfo((props) => {
    return (
        <DevToolsScaffold title={props.data.chat.title}>
            <XHeader text={props.data.chat.title} />
            <MessengerComponent />
        </DevToolsScaffold>
    );
}))));