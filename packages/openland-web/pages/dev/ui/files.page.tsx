import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XVertical2 } from 'openland-x/XVertical2';

export default withApp('UI Framework - Files', 'viewer', props => {
    return (
        <DevDocsScaffold title="Files">
            <XContent>
                <XVertical2>
                    <XTitle>Avatar Upload</XTitle>
                    <XAvatarUpload />
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
