import * as React from 'react';
import { YForm } from 'openland-y-forms/YForm';
import { SScrollView } from 'react-native-s/SScrollView';
import { KeyboardAvoidingView, Platform } from 'react-native';

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
                {Platform.OS === 'android' &&
                    <SScrollView safeAreaViaMargin={true}>
                        {this.props.children}
                    </SScrollView>
                }

                {Platform.OS === 'ios' && <KeyboardAvoidingView flexGrow={1} behavior={'padding'} >
                    <SScrollView>
                        {this.props.children}
                    </SScrollView>
                </KeyboardAvoidingView>}

            </YForm >
        );
    }
}