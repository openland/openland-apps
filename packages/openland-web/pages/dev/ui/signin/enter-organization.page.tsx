import * as React from 'react';
import { DevDocsScaffold } from '../components/DevDocsScaffold';
import { CreateOrganizationForm } from '../../../init/createOrganization.page';
import { CreateWrapIntoState } from './utils';
import { roomSignupKnob, authMechanismKnob } from './knobs';

const WrapIntoState = CreateWrapIntoState({
    root: { ...roomSignupKnob },
});

export default () => (
    <DevDocsScaffold>
        <WrapIntoState>
            {({ branch, ...branchProps }: any) => {
                const CreateOrganizationFormAny = CreateOrganizationForm as any;
                return <CreateOrganizationFormAny data={{ prefill: {} }} />;
            }}
        </WrapIntoState>
    </DevDocsScaffold>
);
