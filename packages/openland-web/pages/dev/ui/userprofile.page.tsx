import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { UserProfile } from '../../main/profile/UserProfileComponent';

export default withApp('UI Framework - Profile (User - Visitor)', 'viewer', (props) => {
    return (
        <DevDocsScaffold>
            <UserProfile userId="LOaDEWDj9zsVv999DDpJiEj05K" />
        </DevDocsScaffold>
    );
});