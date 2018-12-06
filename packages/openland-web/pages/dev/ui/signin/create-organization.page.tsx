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

                    const CreateOrganizationFormInnerAny = CreateOrganizationFormInner as any;
                    return (
                        <RoomSignupContainer headerStyle={headerStyle}>
                            <CreateOrganizationFormInnerAny
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

                    const CreateOrganizationFormInnerAny = CreateOrganizationFormInner as any;
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
                            <CreateOrganizationFormInnerAny
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
