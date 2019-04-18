import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XTitle } from 'openland-x/XTitle';
import { XSelect } from 'openland-x/XSelect';
import { XForm } from 'openland-x-forms/XForm2';
import { XVertical2 } from 'openland-x/XVertical2';

export default withApp('UI Framework - Select', 'viewer', props => {
    return (
        <DevDocsScaffold title="Select">
            <XContent>
                <XForm
                    defaultData={{
                        select1: undefined,
                        select2: undefined,
                        select3: undefined,
                        select4: 'one',
                    }}
                    defaultAction={() => true}
                >
                    <XVertical2>
                        <XTitle>Default</XTitle>
                        <XSelect
                            field="select1"
                            options={[
                                { value: 'one', label: 'One' },
                                { value: 'two', label: 'Two' },
                            ]}
                        />
                        <XTitle>Invalid</XTitle>
                        <XSelect
                            field="select2"
                            options={[
                                { value: 'one', label: 'One' },
                                { value: 'two', label: 'Two' },
                            ]}
                            invalid={true}
                        />
                        <XTitle>No arrow</XTitle>
                        <XSelect
                            field="select3"
                            options={[
                                { value: 'one', label: 'One' },
                                { value: 'two', label: 'Two' },
                            ]}
                            noArrow={true}
                        />
                        <XTitle>With subtitle</XTitle>
                        <XSelect
                            field="select4"
                            options={[
                                {
                                    value: 'one',
                                    label:
                                        'One One One One One One One One One One One One One One One One One One One One One One One One One One One One One One One One One One ',
                                    subtitle:
                                        'OneOne One One One One One One One One One One One One One One One One One One One One One One One One One One One One One One  subtitle',
                                },
                                {
                                    value: 'two',
                                    label: 'Two',
                                    subtitle: 'Two subtitle',
                                },
                            ]}
                            withSubtitle={true}
                            searchable={false}
                            clearable={false}
                        />
                    </XVertical2>
                </XForm>
            </XContent>
        </DevDocsScaffold>
    );
});
