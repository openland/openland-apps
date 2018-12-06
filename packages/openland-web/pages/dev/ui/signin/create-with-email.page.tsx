import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { RoomCreateWithEmail } from '../../../init/signin.page';
import { RoomSignup } from '../../../init/components/SignComponents';
import { SignContainer } from '../../../init/components/SignComponents';
import { WebSignUpCreateWithEmail } from '../../../init/signin.page';
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
