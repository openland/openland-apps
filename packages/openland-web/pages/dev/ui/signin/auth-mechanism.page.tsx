import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { RoomAuthMechanism } from '../../../init/signin.page';
import { RoomSignup } from '../../../init/components/SignComponents';
import { SignContainer } from '../../../init/components/SignComponents';
import { CreateWrapIntoState } from './utils';
import { WebSignUpAuthMechanism } from '../../../init/signin.page';
import { roomSignupKnob, signContainerKnob, authMechanismKnob } from './knobs';

const WrapIntoState = CreateWrapIntoState({
    room: { ...roomSignupKnob, ...authMechanismKnob },
    webSignup: { ...signContainerKnob, ...authMechanismKnob },
});

export default () => (
    <DevDocsScaffold>
        <WrapIntoState>
            {({ branch, ...branchProps }: any) => {
                if (branch === 'room') {
                    const { headerStyle, ...other } = branchProps;
                    return (
                        <RoomSignup headerStyle={headerStyle}>
                            <RoomAuthMechanism {...other} />
                        </RoomSignup>
                    );
                } else {
                    const {
                        headerStyle,
                        signin,
                        text,
                        path,
                        linkText,
                        ...other
                    } = branchProps;

                    return (
                        <SignContainer
                            {...{
                                signin,
                                headerStyle,
                                text,
                                path,
                                linkText,
                            }}
                        >
                            <WebSignUpAuthMechanism {...other} />
                        </SignContainer>
                    );
                }
            }}
        </WrapIntoState>
    </DevDocsScaffold>
);
