import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { InviteInfoInner } from '../../../init/components/SignComponents';
import { WebSignUpContainer } from '../../../init/components/SignComponents';
import { CreateWrapIntoState } from './utils';
import { signContainerKnob } from './knobs';

const WrapIntoState = CreateWrapIntoState({
    root: { ...signContainerKnob },
});

export default () => (
    <DevDocsScaffold>
        <WrapIntoState>
            {({ branch, ...branchProps }: any) => {
                const { headerStyle, signin, text, path, linkText, ...other } = branchProps;
                return (
                    <WebSignUpContainer
                        pageMode="AuthMechanism"
                        {...{
                            signin,
                            headerStyle,
                            text,
                            path,
                            linkText,
                        }}
                    >
                        <InviteInfoInner
                            loginWithGoogle={() => {
                                //
                            }}
                            loginWithEmail={() => {
                                //
                            }}
                            signin={signin}
                            signPath={''}
                            inviter={{ photo: null, name: 'name', id: 'id' }}
                        />
                    </WebSignUpContainer>
                );
            }}
        </WrapIntoState>
    </DevDocsScaffold>
);
