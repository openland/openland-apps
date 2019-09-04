import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { UInput } from 'openland-web/components/unicorn/UInput';
import { XVertical } from 'openland-x-layout/XVertical';
import { USelect } from 'openland-web/components/unicorn/USelect';

const SelectComponents = () => {
    const [value, setValue] = React.useState<any>(null);
    const [value2, setValue2] = React.useState<any>({ value: 200, label: '200' });
    return (
        <>
            <div>default creatable</div>
            <USelect
                creatable
                placeholder="Events count"
                options={[
                    { value: 100, label: '100', labelShort: 'sto', subtitle: 'sotnyia' },
                    { value: 200, label: '200' },
                    { value: 300, label: '300' },
                    { value: 400, label: '400' },
                    { value: 500, label: '500' },
                ]}
                onChange={data => setValue(data)}
                value={value}
            />
            <div>multi</div>
            <USelect
                multi
                creatable
                placeholder="Events count"
                options={[
                    { value: 100, label: '100', labelShort: 'sto', subtitle: 'sotnyia' },
                    { value: 200, label: '200' },
                    { value: 300, label: '300' },
                    { value: 400, label: '400' },
                    { value: 500, label: '500' },
                ]}
                onChange={data => setValue2(data)}
                value={value2}
            />
            <div>hidden select menu / don't clearable</div>
            <USelect
                multi
                creatable
                clearable={false}
                hideSelector
                placeholder="Events count"
                options={[
                    { value: 100, label: '100', labelShort: 'sto', subtitle: 'sotnyia' },
                    { value: 200, label: '200' },
                    { value: 300, label: '300' },
                    { value: 400, label: '400' },
                    { value: 500, label: '500' },
                ]}
                onChange={data => setValue2(data)}
                value={value2}
            />
        </>
    );
};

export default withApp('Inputs', 'viewer', props => {
    return (
        <DevDocsScaffold title="Inputs">
            <XVertical>
                <UInput label="Label" />
                <UInput label="Label" value="value" />
                <SelectComponents />
            </XVertical>
        </DevDocsScaffold>
    );
});
