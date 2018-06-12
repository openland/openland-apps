import * as React from 'react';
import { XModal, XModalFooter, XModalHeader, XModalBody, XModalHeaderEmpty } from './XModal';
import { XForm, XFormProps } from 'openland-x-forms/XForm2';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import Glamorous from 'glamorous';
import { XFormSubmit, XFormSubmitProps } from 'openland-x-forms/XFormSubmit';

export interface XModalFormProps extends XFormProps {

    title?: string;

    submitProps?: XFormSubmitProps;

    // Style
    size?: 'x-large' | 'large' | 'default' | 'small';

    // Controlled/Uncontrolled
    isOpen?: boolean;
    onClosed?: () => void;

    // Target
    target?: React.ReactElement<any>;
    targetQuery?: string;

}

const Footer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
});

export class XModalForm extends React.Component<XModalFormProps> {
    render() {
        let { defaultData, staticData, defaultAction, defaultLayout, submitProps, ...other } = this.props;

        return (
            <XModal {...other} customContent={true}>
                {this.props.title && <XModalHeader>{this.props.title}</XModalHeader>}
                {!this.props.title && <XModalHeaderEmpty />}
                <XForm defaultData={defaultData} staticData={staticData} defaultAction={defaultAction} autoClose={true}>
                    <XModalBody>
                        {this.props.children}
                    </XModalBody>
                    <Footer>

                        <XModalFooter>
                            <XHorizontal>
                                <XFormSubmit style={'primary'} text={'Save'} {...submitProps} />
                                <XButton text="Cancel" autoClose={true} />
                            </XHorizontal>
                        </XModalFooter>
                    </Footer>
                </XForm>
            </XModal>
        );
    }
}