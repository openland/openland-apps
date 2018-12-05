import * as React from 'react';
import { withApp } from '../../../../components/withApp';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { WebSignUpCreateWithEmail } from '../../../init/signin.page';
import { SignContainer } from '../../../init/components/SignComponents';

export default withApp('web-signup-create-with-email', 'viewer', props => {
    return (
        <DevDocsScaffold>
            <SignContainer>
                <WebSignUpCreateWithEmail />
            </SignContainer>
        </DevDocsScaffold>
    );
});
