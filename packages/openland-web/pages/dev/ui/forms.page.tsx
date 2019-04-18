import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XForm } from 'openland-x-forms/XForm2';
import { delay } from 'openland-y-utils/timer';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XFormFieldText } from 'openland-x-forms/XFormFieldText';
import { XFormLoadingGlobal } from 'openland-x-forms/XFormLoadingGlobal';
import { XSelect } from 'openland-x/XSelect';
import { XVertical2 } from 'openland-x/XVertical2';

export default withApp('UI Framework - Loaders', 'viewer', props => {
    return (
        <DevDocsScaffold title="Loaders">
            <XContent>
                <XVertical2>
                    <XForm
                        defaultAction={async data => {
                            console.warn(data);
                            await delay(1500);
                            throw Error('!');
                        }}
                    >
                        <XFormLoadingGlobal />
                        <XFormFieldText field="value" title="Some Value" />
                        <XSelect
                            field="value"
                            options={[
                                {
                                    value: 'something',
                                    label: 'Something',
                                },
                                {
                                    value: 'a',
                                    label: 'A',
                                },
                            ]}
                        />
                        <XFormSubmit text="Do!" />
                        <XFormSubmit text="Do Alt!" action={async data => await delay(5000)} />
                    </XForm>
                </XVertical2>
            </XContent>
        </DevDocsScaffold>
    );
});
