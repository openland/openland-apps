import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XVertical } from 'openland-x-layout/XVertical';
import { XTitle } from 'openland-x/XTitle';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';

export default withApp('UI Framework - Files', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Files">
            <XContent>
                <XVertical>
                    <XTitle>Avatar Upload</XTitle>
                    <XAvatarUpload />
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});