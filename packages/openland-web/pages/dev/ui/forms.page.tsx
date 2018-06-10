import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { XContent } from 'openland-x-layout/XContent';
import { XForm } from 'openland-x-forms/XForm2';
import { XInput } from 'openland-x/XInput';
import { delay } from 'openland-x-utils/timer';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';

export default withApp('UI Framework - Loaders', 'viewer', (props) => {
    return (
        <DevDocsScaffold title="Loaders">
            <XContent>
                <XVertical>
                    <XForm
                        defaultAction={async (data) => {
                            console.warn(data);
                            await delay(1500);
                        }}
                    >
                        <XInput valueStoreKey="fields.value" enabledStoreKey="form.enabled" />
                        <XFormSubmit text="Do!" />
                        <XFormSubmit text="Do Alt!" action={async (data) => await delay(5000)} />
                    </XForm>
                </XVertical>
            </XContent>
        </DevDocsScaffold>
    );
});