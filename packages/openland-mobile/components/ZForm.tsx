import * as React from 'react';
import { AppStyles } from '../styles/AppStyles';
import { YForm } from 'openland-y-forms/YForm';
import { startLoader, stopLoader } from './ZGlobalLoader';
import { formatError } from 'openland-y-forms/errorHandling';
import { SScrollView } from 'react-native-s/SScrollView';
import { Alert } from './AlertBlanket';
import { View, KeyboardAvoidingView, Platform } from 'react-native';
import { KeyboardSafeAreaView } from 'react-native-async-view/ASSafeAreaView';

export interface ZFormProps {
    action: (src: any) => any;
    onSuccess?: () => void;
    onError?: (e: Error) => void;
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

    setField = (field: string, value?: string) => {
        if (this.ref.current) {
            this.ref.current.setField(field, value);
        }
    }

    // handleAction = async (args: any) => {
    //     try {
    //         startLoader();
    //         await this.props.action(args);
    //         if (this.props.onSuccess) {
    //             try {
    //                 this.props.onSuccess();
    //             } catch (e) {
    //                 console.warn(e);
    //             }
    //         }
    //     } catch (e) {
    //         if (this.props.onError) {
    //             this.props.onError(e);
    //         } else {
    //             let error = formatError(e);
    //             if (error) {
    //                 Alert.alert(error);
    //             }
    //         }
    //     } finally {
    //         stopLoader();
    //     }
    // }

    render() {
        return (
            <YForm
                defaultAction={this.props.action}
                defaultData={this.props.defaultData}
                staticData={this.props.staticData}
                ref={this.ref}
                onSuccess={this.props.onSuccess}
                onError={this.props.onError}
            >
                <SScrollView>
                    <KeyboardAvoidingView behavior="position">
                        {this.props.children}
                    </KeyboardAvoidingView>
                </SScrollView>
            </YForm >
        );
    }
}