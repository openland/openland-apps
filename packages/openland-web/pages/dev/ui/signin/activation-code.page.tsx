import * as React from 'react';
import {
    RoomSignup,
    RoomActivationCode,
    WebSignUpActivationCode,
} from '../../../init/components/SignComponents';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { CreateWrapIntoState } from './utils';
import { roomSignupKnob, signContainerKnob, activationCodeKnob } from './knobs';
import { SignContainer } from '../../../init/components/SignComponents';

const WrapIntoState = CreateWrapIntoState({
    room: { ...roomSignupKnob, ...activationCodeKnob },
    webSignup: { ...signContainerKnob, ...activationCodeKnob },
});

export default () => (
    <DevDocsScaffold>
        <WrapIntoState>
            {({ branch, ...branchProps }: any) => {
                if (branch === 'room') {
                    const { headerStyle, ...other } = branchProps;
                    return (
                        <RoomSignup headerStyle={headerStyle}>
                            <RoomActivationCode {...other} />
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
                            <WebSignUpActivationCode {...other} />
                        </SignContainer>
                    );
                }
            }}
        </WrapIntoState>
    </DevDocsScaffold>
);
