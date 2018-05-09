import * as React from 'react';
import { XModal, XModalFooter, XModalHeader, XModalBody, XModalHeaderEmpty } from './XModal';
import { XForm } from 'openland-x-forms/XForm';
import { MutationFunc } from 'react-apollo';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';

export interface XModalFormProps {

    title?: string;

    // Style
    size?: 'x-large' | 'large' | 'default' | 'small';

    // Controlled/Uncontrolled
    isOpen?: boolean;
    onClosed?: () => void;

    // Target
    target?: React.ReactElement<any>;
    targetQuery?: string;

    //
    // XForm
    //

    submitMutation?: MutationFunc<{}>;
    mutationDirect?: boolean;
    onSubmit?: (values: any) => void;
    defaultValues?: { [key: string]: any; };

    actionName?: string;
    actionStyle?: 'primary' | 'default' | 'danger';
}

export class XModalForm extends React.Component<XModalFormProps> {
    render() {
        let { submitMutation, mutationDirect, onSubmit, defaultValues, ...other } = this.props;

        return (
            <XModal {...other} customContent={true}>
                {this.props.title && <XModalHeader>{this.props.title}</XModalHeader>}
                {!this.props.title && <XModalHeaderEmpty />}
                <XForm submitMutation={submitMutation} mutationDirect={mutationDirect} onSubmit={onSubmit} defaultValues={defaultValues} autoClose={true}>
                    <XModalBody>
                        {this.props.children}
                    </XModalBody>
                    <XModalFooter>
                        <XHorizontal>
                            <XForm.Submit style={this.props.actionStyle || 'primary'} text={this.props.actionName || 'Save'} />
                            <XButton text="Cancel" autoClose={true} />
                        </XHorizontal>
                    </XModalFooter>
                </XForm>
            </XModal>
        );
    }
}