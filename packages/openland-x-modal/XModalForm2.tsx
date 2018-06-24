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

    fixedFooter?: boolean;

}

const Footer = Glamorous.div<{fixed?: boolean}>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
    position: props.fixed ? 'sticky' : undefined,
    bottom: props.fixed ? 0 : undefined,
    boxShadow: props.fixed ? '2px 2px 8px 0 rgba(0, 0, 0, 0.22)' : undefined
}));

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

                    <Footer fixed={this.props.fixedFooter}>
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