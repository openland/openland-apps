import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import {
    RoomSignup,
    SignContainer,
} from '../../../init/components/SignComponents';
import { CreateProfileFormInner } from '../../../init/createProfile.page';
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
                    const CreateProfileFormAny = CreateProfileFormInner as any;
                    return (
                        <RoomSignup headerStyle={headerStyle}>
                            <CreateProfileFormAny data={{ prefill: {} }} />;
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

                    const CreateProfileFormAny = CreateProfileFormInner as any;
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
                            <CreateProfileFormAny data={{ prefill: {} }} />;
                        </SignContainer>
                    );
                }
            }}
        </WrapIntoState>
    </DevDocsScaffold>
);
