import * as React from 'react';
import { AppStyles } from '../styles/AppStyles';
import { Alert } from 'react-native';
import { YForm } from 'openland-y-forms/YForm';
import { startLoader, stopLoader } from './ZGlobalLoader';
import { formatError } from 'openland-y-forms/errorHandling';
import { SScrollView } from 'react-native-s/SScrollView';

export interface ZFormProps {
    action: (src: any) => any;
    onSuccess?: () => void;
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

    handleAction = async (args: any) => {
        try {
            startLoader();
            await this.props.action(args);
            if (this.props.onSuccess) {
                try {
                    this.props.onSuccess();
                } catch (e) {
                    console.warn(e);
                }
            }
        } catch (e) {
            Alert.alert(formatError(e));
        } finally {
            stopLoader();
        }
    }

    render() {
        return (
            <YForm defaultAction={this.handleAction} defaultData={this.props.defaultData} staticData={this.props.staticData} ref={this.ref}>
                <SScrollView backgroundColor={AppStyles.backyardColor}>
                    {this.props.children}
                </SScrollView>
            </YForm>
        );
    }
}