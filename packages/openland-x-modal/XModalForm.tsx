import * as React from 'react';
import { XModal, XModalFooter, XModalHeader, XModalBody, XModalHeaderEmpty } from './XModal';
import { XForm, XFormActionProps, XFormAction } from 'openland-x-forms/XForm';
import { MutationFunc } from 'react-apollo';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import Glamorous from 'glamorous';

export interface XModalActionProps {
    submitMutation?: MutationFunc<{}>;
    mutationDirect?: boolean;
    onSubmit?: (values: any) => void;
    defaultValues?: { [key: string]: any; };
    actionName?: string;
    actionStyle?: 'primary' | 'default' | 'danger';
}

export interface XModalFormProps extends XFormActionProps {

    title?: string;

    // Style
    size?: 'x-large' | 'large' | 'default' | 'small';

    // Controlled/Uncontrolled
    isOpen?: boolean;
    onClosed?: () => void;

    // Target
    target?: React.ReactElement<any>;
    targetQuery?: string;

    secondaryActions?: XFormActionProps[];
}

const Footer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
});

const FooterSubActions = Glamorous(XModalFooter)({
    justifyContent: 'flex-start',
});

export class XModalForm extends React.Component<XModalFormProps> {
    render() {
        let { submitMutation, mutationDirect, onSubmit, prepare, defaultValues, fillValues, ...other } = this.props;

        return (
            <XModal {...other} customContent={true}>
                {this.props.title && <XModalHeader>{this.props.title}</XModalHeader>}
                {!this.props.title && <XModalHeaderEmpty />}
                <XForm submitMutation={submitMutation} mutationDirect={mutationDirect} onSubmit={onSubmit} prepare={prepare} fillValues={fillValues} defaultValues={defaultValues} autoClose={true}>
                    <XModalBody>
                        {this.props.children}
                    </XModalBody>
                    <Footer>
                        <FooterSubActions>
                            {this.props.secondaryActions && this.props.secondaryActions.map((action => {
                                return (
                                    <XFormAction key={action.actionName} {...action} />
                                );
                            }))}
                        </FooterSubActions>
                        <XModalFooter>
                            <XHorizontal>
                                <XForm.Submit style={this.props.actionStyle || 'primary'} text={this.props.actionName || 'Save'} />
                                <XButton text="Cancel" autoClose={true} />
                            </XHorizontal>
                        </XModalFooter>
                    </Footer>
                </XForm>
            </XModal>
        );
    }
}