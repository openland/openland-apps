import * as React from 'react';
import { withApp } from '../../../../components/withApp';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { WebSignUpAuthMechanism } from '../../../init/signin.page';
import { SignContainer } from '../../../init/components/SignComponents';

export default withApp('web-signup-auth-mechanism', 'viewer', props => {
    return (
        <DevDocsScaffold>
            <SignContainer>
                <WebSignUpAuthMechanism />
            </SignContainer>
        </DevDocsScaffold>
    );
});
