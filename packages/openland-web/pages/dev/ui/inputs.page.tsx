import * as React from 'react';
import { XView } from 'react-mental';
import { withApp } from '../../../components/withApp';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { UInput } from 'openland-web/components/unicorn/UInput';
import { USelect, OptionType } from 'openland-web/components/unicorn/USelect';

const SelectComponents = () => {
    const [value, setValue] = React.useState<OptionType | null>(null);
    const [value2, setValue2] = React.useState<OptionType[]>([
        { value: 1, label: '1111' },
        { value: 2, label: '2222' },
        { value: 3, label: '3333' },
        { value: 4, label: '4444' },
        { value: 5, label: '5555' },
        { value: 6, label: '6666' },
        { value: 7, label: '7777' },
        { value: 8, label: '8888' },
        { value: 9, label: '9999' },
        { value: 10, label: 'oooo' },
        { value: 11, label: 'kkkk' },
        { value: 12, label: 'llll' },
    ]);
    return (
        <XView flexGrow={1} flexShrink={1}>
            <XView height={20}/>
            <div>small default select</div>
            <XView height={20}/>
            <USelect
                options={[
                    { value: 1, label: 'value' },
                    { value: 2, label: '2222222222222222' },
                ]}
                value={value}
                onChange={(v: OptionType) => setValue(v)}
                flexGrow={1}
                flexShrink={1}
                label="Label"
            />
            <XView height={20}/>
            <USelect
                options={[
                    { value: 0, label: '00000', labelShort: 'labelShort', subtitle: 'subtitle' },
                    { value: 1, label: '1111' },
                    { value: 2, label: '2222' },
                    { value: 3, label: '3333' },
                    { value: 4, label: '4444' },
                    { value: 5, label: '5555' },
                    { value: 6, label: '6666' },
                    { value: 7, label: '7777' },
                    { value: 8, label: '8888' },
                    { value: 9, label: '9999' },
                    { value: 10, label: 'oooo' },
                    { value: 11, label: 'kkkk' },
                    { value: 12, label: 'llll' },
                ]}
                label="search"
                value={value2}
                onChange={(v: OptionType[]) => setValue2(v)}
                multi={true}
                searchable={true}
                flexGrow={1}
                flexShrink={1}
                // hideSelector={true}
            />
        </XView>
    );
};

export default withApp('Inputs', ['super-admin', 'software-developer'], (props) => {
    return (
        <DevDocsScaffold title="Inputs">
            <XView flexGrow={1} flexShrink={1}>
                <UInput label="Label" />
                <UInput label="Label" value="value" />
                <SelectComponents />
            </XView>
        </DevDocsScaffold>
    );
});
