import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { UserProfile } from '../../main/profile/UserProfileComponent';
import { withUserInfo } from '../../../components/UserInfo';

const MyUserProfile = withUserInfo((props) => {
    if (!props.user) {
        return null;
    }

    return (
        <UserProfile userId={props.user.id} />
    );
});

export default withApp('UI Framework - Profile (User - Owner)', 'viewer', (props) => {
    return (
        <DevDocsScaffold>
            <div style={{ height: '100vh', overflow: 'hidden' }}>
                <MyUserProfile />
            </div>
        </DevDocsScaffold>
    );
});