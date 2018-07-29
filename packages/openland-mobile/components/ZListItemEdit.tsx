import * as React from 'react';
import { ZListItemBase } from './ZListItemBase';
import { TextInput } from 'react-native';

export class ZListItemEdit extends React.PureComponent<{ title: string, value?: string, onChange?: (val: string) => void }> {
    render() {
        return (
            <ZListItemBase separator={false}>
                <TextInput
                    value={this.props.value}
                    onChangeText={this.props.onChange}
                    placeholder={this.props.title}
                    style={{ paddingLeft: 15, paddingRight: 15 }}
                    flexGrow={1}
                    flexBasis={0}
                />
            </ZListItemBase>
        );
    }
}