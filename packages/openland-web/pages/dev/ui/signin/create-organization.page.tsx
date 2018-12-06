import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import {
    RoomSignupContainer,
    WebSignUpContainer,
    CreateOrganizationFormInner,
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
                        <RoomSignupContainer headerStyle={headerStyle}>
                            <CreateOrganizationFormInner
                                organizations={{
                                    data: [],
                                    loading: false,
                                }}
                                onPrefixChanges={() => {
                                    //
                                }}
                                roomView={true}
                                defaultAction={() => {
                                    //
                                }}
                            />
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
                            <CreateOrganizationFormInner
                                organizations={{
                                    data: [],
                                    loading: false,
                                }}
                                onPrefixChanges={() => {
                                    //
                                }}
                                roomView={false}
                                defaultAction={() => {
                                    //
                                }}
                            />
                        </WebSignUpContainer>
                    );
                }
            }}
        </WrapIntoState>
    </DevDocsScaffold>
);
