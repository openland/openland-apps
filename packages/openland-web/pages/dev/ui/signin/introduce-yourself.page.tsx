import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { RoomAuthMechanism } from '../../../init/signin.page';
import { RoomSignup } from '../../../init/components/SignComponents';
import { SignContainer } from '../../../init/components/SignComponents';
import { CreateWrapIntoState } from './utils';
import { WebSignUpAuthMechanism } from '../../../init/signin.page';
import { roomSignupKnob, signContainerKnob, authMechanismKnob } from './knobs';

const WrapIntoState = CreateWrapIntoState({
    root: { ...roomSignupKnob, ...authMechanismKnob },
});

export default () => (
    <DevDocsScaffold>
        <WrapIntoState>
            {({ branch, ...branchProps }: any) => {
                const { headerStyle, ...other } = branchProps;
                return (
                    <RoomSignup headerStyle={headerStyle}>
                        <RoomAuthMechanism {...other} />
                    </RoomSignup>
                );
            }}
        </WrapIntoState>
    </DevDocsScaffold>
);
