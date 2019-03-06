import * as React from 'react';
import { ZListItemBase } from './ZListItemBase';
import { ZTextInput } from './ZTextInput';

export class ZListItemEdit extends React.PureComponent<{ autoFocus?: boolean, title: string, value?: string, valueStoreKey?: string, field?: string, onChange?: (val: string) => void }> {
    render() {
        return (
            <ZListItemBase separator={false}>
                <ZTextInput
                    value={this.props.value}
                    onChangeText={this.props.onChange}
                    placeholder={this.props.title}
                    field={this.props.field}
                    valueStoreKey={this.props.valueStoreKey}
                    autoFocus={this.props.autoFocus}
                />
            </ZListItemBase>
        );
    }
}