import * as React from 'react';
import { withApp } from '../../../../components/withApp';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { WebSignUpActivationCode } from '../../../init/signin.page';
import { SignContainer } from '../../../init/components/SignComponents';

export default withApp('web-signup-activation-code', 'viewer', props => {
    return (
        <DevDocsScaffold>
            <SignContainer signin={true} text={'text'}>
                <WebSignUpActivationCode />
            </SignContainer>
        </DevDocsScaffold>
    );
});
