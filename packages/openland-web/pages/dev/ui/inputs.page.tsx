import * as React from 'react';
import { XView } from 'react-mental';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { UInput } from 'openland-web/components/unicorn/UInput';
import { USelect } from 'openland-web/components/unicorn/USelect';

const SelectComponents = () => {
    const [value, setValue] = React.useState<any>(null);
    const [value2, setValue2] = React.useState<any>([
        { value: 200, label: '200' },
        { value: 300, label: '300' },
    ]);
    const [value3, setValue3] = React.useState<any>(null);
    return (
        <>
            <div>small default select</div>
            <USelect
                creatable={true}
                searchable={false}
                placeholder="Events count"
                size="small"
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
            <div>small multi creatable searchable</div>
            <USelect
                creatable={true}
                multi={true}
                placeholder="Events count"
                size="small"
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
            <div>default select</div>
            <USelect
                creatable={true}
                searchable={false}
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
            <div>default creatable searchable</div>
            <USelect
                creatable={true}
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
            <div>multi / !creatable</div>
            <USelect
                multi={true}
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
            <div>hidden select menu / clearable / creatable</div>
            <USelect
                creatable={true}
                clearable={true}
                hideSelector={true}
                placeholder="Events count"
                options={[
                    { value: 100, label: '100', labelShort: 'sto', subtitle: 'sotnyia' },
                    { value: 200, label: '200' },
                    { value: 300, label: '300' },
                    { value: 400, label: '400' },
                    { value: 500, label: '500' },
                ]}
                onChange={data => setValue3(data)}
                value={value3}
            />
        </>
    );
};

export default withApp('Inputs', 'viewer', props => {
    return (
        <DevDocsScaffold title="Inputs">
            <XView>
                <UInput label="Label" />
                <UInput label="Label" value="value" />
                <SelectComponents />
            </XView>
        </DevDocsScaffold>
    );
});
