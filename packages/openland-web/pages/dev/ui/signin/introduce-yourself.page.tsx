import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { CreateProfileForm } from '../../../init/createProfile.page';
import { CreateWrapIntoState } from './utils';
import { roomSignupKnob, authMechanismKnob } from './knobs';

const WrapIntoState = CreateWrapIntoState({
    root: { ...roomSignupKnob },
});

export default () => (
    <DevDocsScaffold>
        <WrapIntoState>
            {({ branch, ...branchProps }: any) => {
                const CreateProfileFormAny = CreateProfileForm as any;
                return <CreateProfileFormAny data={{ prefill: {} }} />;
            }}
        </WrapIntoState>
    </DevDocsScaffold>
);
