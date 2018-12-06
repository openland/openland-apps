import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { RoomSignupContainer } from '../../../init/components/SignComponents';
import {
    WebSignUpContainer,
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
                        <RoomSignupContainer headerStyle={headerStyle}>
                            <RoomCreateWithEmail {...other} />
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
                            <WebSignUpCreateWithEmail {...other} />
                        </WebSignUpContainer>
                    );
                }
            }}
        </WrapIntoState>
    </DevDocsScaffold>
);
