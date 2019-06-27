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

const organizationsData = [
    {
        label: '123',
        value: '123',
    },
    {
        label: '345',
        value: '345',
    },
    {
        label: '678',
        value: '678',
    },
    {
        label: '901',
        value: '901',
    },
    {
        label: '222',
        value: '222',
    },
];

export default () => (
    <DevDocsScaffold>
        <WrapIntoState>
            {({ branch, ...branchProps }: any) => {
                if (branch === 'room') {
                    const { headerStyle, ...other } = branchProps;

                    return (
                        <RoomSignupContainer
                            headerStyle={headerStyle}
                            pageMode="CreateOrganization"
                        >
                            <CreateOrganizationFormInner />
                        </RoomSignupContainer>
                    );
                } else {
                    const { headerStyle, signin, text, path, linkText, ...other } = branchProps;

                    return (
                        <WebSignUpContainer
                            pageMode="CreateOrganization"
                            {...{
                                signin,
                                headerStyle,
                                text,
                                path,
                                linkText,
                            }}
                        >
                            <CreateOrganizationFormInner />
                        </WebSignUpContainer>
                    );
                }
            }}
        </WrapIntoState>
    </DevDocsScaffold>
);
