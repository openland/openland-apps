import * as React from 'react';
import {
    RoomSignupContainer,
    RoomActivationCode,
    WebSignUpActivationCode,
} from '../../../init/components/SignComponents';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { CreateWrapIntoState } from './utils';
import { roomSignupKnob, signContainerKnob, activationCodeKnob } from './knobs';
import { WebSignUpContainer } from '../../../init/components/SignComponents';

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
                        <RoomSignupContainer headerStyle={headerStyle}>
                            <RoomActivationCode {...other} />
                        </RoomSignupContainer>
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
                        <WebSignUpContainer
                            {...{
                                signin,
                                headerStyle,
                                text,
                                path,
                                linkText,
                            }}
                        >
                            <WebSignUpActivationCode {...other} />
                        </WebSignUpContainer>
                    );
                }
            }}
        </WrapIntoState>
    </DevDocsScaffold>
);
