import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import {
    RoomSignup,
    SignContainer,
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
                        <RoomSignup headerStyle={headerStyle}>
                            <CreateProfileFormInner
                                roomView={true}
                                usePhotoPrefill={true}
                                prefill={{}}
                                defaultAction={() => {
                                    //
                                }}
                            />
                            ;
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
                            <CreateProfileFormInner
                                roomView={false}
                                prefill={{}}
                                usePhotoPrefill={true}
                                defaultAction={() => {
                                    //
                                }}
                            />
                            ;
                        </SignContainer>
                    );
                }
            }}
        </WrapIntoState>
    </DevDocsScaffold>
);
