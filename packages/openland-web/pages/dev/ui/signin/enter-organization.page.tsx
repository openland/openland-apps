import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import {
    RoomSignup,
    SignContainer,
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
                        <RoomSignup headerStyle={headerStyle}>
                            <CreateOrganizationFormInnerAny
                                roomView={true}
                                defaultAction={() => {
                                    //
                                }}
                            />
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

                    const CreateOrganizationFormInnerAny = CreateOrganizationFormInner as any;
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
                            <CreateOrganizationFormInnerAny
                                roomView={false}
                                defaultAction={() => {
                                    //
                                }}
                            />
                        </SignContainer>
                    );
                }
            }}
        </WrapIntoState>
    </DevDocsScaffold>
);
