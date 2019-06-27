import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import {
    RoomSignupContainer,
    WebSignUpContainer,
    CreateProfileFormInner,
} from '../../../init/components/SignComponents';
import { CreateWrapIntoState } from './utils';
import { roomSignupKnob, signContainerKnob } from './knobs';

const WrapIntoState = CreateWrapIntoState({
    room: { ...roomSignupKnob },
    webSignup: { ...signContainerKnob },
});

export default () => (
    <DevDocsScaffold>
        <WrapIntoState>
            {({ branch, ...branchProps }: any) => {
                if (branch === 'room') {
                    const { headerStyle, ...other } = branchProps;

                    return (
                        <RoomSignupContainer headerStyle={headerStyle} pageMode="CreateProfile">
                            <CreateProfileFormInner roomView={true} prefill={{}} />
                        </RoomSignupContainer>
                    );
                } else {
                    const { headerStyle, signin, text, path, linkText, ...other } = branchProps;

                    return (
                        <WebSignUpContainer
                            pageMode="CreateProfile"
                            {...{
                                signin,
                                headerStyle,
                                text,
                                path,
                                linkText,
                            }}
                        >
                            <CreateProfileFormInner roomView={false} prefill={{}} />
                        </WebSignUpContainer>
                    );
                }
            }}
        </WrapIntoState>
    </DevDocsScaffold>
);
