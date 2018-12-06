import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { RoomSignup } from '../../../init/components/SignComponents';
import {
    SignContainer,
    WebSignUpCreateWithEmail,
    RoomCreateWithEmail,
} from '../../../init/components/SignComponents';

import { CreateWrapIntoState } from './utils';
import { roomSignupKnob, signContainerKnob, createWithEmail } from './knobs';

const WrapIntoState = CreateWrapIntoState({
    room: { ...roomSignupKnob, ...createWithEmail },
    webSignup: { ...signContainerKnob, ...createWithEmail },
});

export default () => (
    <DevDocsScaffold>
        <WrapIntoState>
            {({ branch, ...branchProps }: any) => {
                if (branch === 'room') {
                    const { headerStyle, ...other } = branchProps;
                    return (
                        <RoomSignup headerStyle={headerStyle}>
                            <RoomCreateWithEmail {...other} />
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
                            <WebSignUpCreateWithEmail {...other} />
                        </SignContainer>
                    );
                }
            }}
        </WrapIntoState>
    </DevDocsScaffold>
);
