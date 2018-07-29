import * as React from 'react';
import { AppStyles } from '../styles/AppStyles';
import { ScrollView } from 'react-native';
import { YForm } from 'openland-y-forms/YForm';

export interface ZFormProps {
    action: (src: any) => any;
    defaultData?: any;
    staticData?: any;
}

export class ZForm extends React.PureComponent<ZFormProps> {

    private ref = React.createRef<YForm>();

    submitForm() {
        if (this.ref.current) {
            this.ref.current.submit();
        }
    }

    render() {
        return (
            <YForm defaultAction={this.props.action} defaultData={this.props.defaultData} staticData={this.props.staticData} ref={this.ref}>
                <ScrollView backgroundColor={AppStyles.backyardColor}>
                    {this.props.children}
                </ScrollView>
            </YForm>
        );
    }
}