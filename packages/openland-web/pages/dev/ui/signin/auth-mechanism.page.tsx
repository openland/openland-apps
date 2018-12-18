import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import {
    RoomSignupContainer,
    WebSignUpAuthMechanism,
    RoomAuthMechanism,
} from '../../../init/components/SignComponents';
import { WebSignUpContainer } from '../../../init/components/SignComponents';
import { CreateWrapIntoState } from './utils';

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
                        <RoomSignupContainer headerStyle={headerStyle} pageMode="AuthMechanism">
                            <RoomAuthMechanism {...other} />
                        </RoomSignupContainer>
                    );
                } else {
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
                            <WebSignUpAuthMechanism {...{ ...other, signin }} />
                        </WebSignUpContainer>
                    );
                }
            }}
        </WrapIntoState>
    </DevDocsScaffold>
);
