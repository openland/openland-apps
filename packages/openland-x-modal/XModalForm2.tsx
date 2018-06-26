import * as React from 'react';
import { XModal, XModalFooter, XModalHeader, XModalHeaderEmpty, XModalBodyContainer } from './XModal';
import { XForm, XFormProps } from 'openland-x-forms/XForm2';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XFormSubmit, XFormSubmitProps } from 'openland-x-forms/XFormSubmit';
import glamorous from 'glamorous';

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

    scrollableContent?: boolean;

}
const Footer = glamorous(XModalFooter)({
    marginTop: 0,

});

const BodyPadding = glamorous.div({
    paddingLeft: 24,
    paddingRight: 24,

});

const ModalBodyContainer = glamorous(XModalBodyContainer)({
    maxHeight: '70vh',
    overflowY: 'scroll',
    marginBottom: 0,

});

export class XModalForm extends React.Component<XModalFormProps> {
    render() {
        let { defaultData, staticData, defaultAction, defaultLayout, submitProps, ...other } = this.props;
        let body = this.props.children;
        if (this.props.scrollableContent) {
            body = (
                <ModalBodyContainer >
                    <BodyPadding>
                        {body}
                    </BodyPadding>
                </ModalBodyContainer>

            );
        }
        return (
            <XModal {...other} customContent={true} scrollableContent={this.props.scrollableContent}>
                {this.props.title && <XModalHeader>{this.props.title}</XModalHeader>}
                {!this.props.title && <XModalHeaderEmpty />}
                <XForm defaultData={defaultData} staticData={staticData} defaultAction={defaultAction} autoClose={true}>
                    {body}

                    <Footer>
                        <XHorizontal>
                            <XFormSubmit style={'primary'} text={'Save'} {...submitProps} />
                            <XButton text="Cancel" autoClose={true} />
                        </XHorizontal>
                    </Footer>
                </XForm>
            </XModal>
        );
    }
}