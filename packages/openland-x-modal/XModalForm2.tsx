import * as React from 'react';
import { XModal, XModalFooter, XModalHeader, XModalHeaderEmpty, XModalBodyContainer, XModalCloser } from './XModal';
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
    useTopCloser?: boolean;

    // Controlled/Uncontrolled
    isOpen?: boolean;
    onClosed?: () => void;

    // Target
    target?: React.ReactElement<any>;
    targetQuery?: string;

    scrollableContent?: boolean;

    customFooter?: any;

}
const Footer = glamorous(XModalFooter)({
    marginTop: 0,
});

const BodyPadding = glamorous.div({
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 6,
    paddingBottom: 24,
    flexGrow: 1
});

const ModalBodyContainer = glamorous(XModalBodyContainer)({
    paddingTop: 0,
    paddingBottom: 0,
    maxHeight: '70vh',
    overflowY: 'scroll',
    marginBottom: 0,
    flexGrow: 1

});

export class XModalForm extends React.Component<XModalFormProps> {
    render() {
        let { defaultData, staticData, defaultAction, defaultLayout, submitProps, ...other } = this.props;
        let body = (
            <BodyPadding>
                {this.props.children}
            </BodyPadding>
        );
        if (this.props.scrollableContent) {
            body = (
                <ModalBodyContainer >
                    {body}
                </ModalBodyContainer>

            );
        }
        let footer = this.props.customFooter || (
            <Footer>
                <XHorizontal>
                    <XFormSubmit style={'primary'} text={'Save'} {...submitProps} keyDownSubmit={true} />
                    {!this.props.useTopCloser && <XButton text="Cancel" autoClose={true} />}

                </XHorizontal>
            </Footer>
        );

        return (
            <XModal {...other} customContent={true} scrollableContent={this.props.scrollableContent} useTopCloser={this.props.useTopCloser}>
                {(this.props.title || this.props.useTopCloser) && <XModalHeader>{this.props.title}{this.props.useTopCloser && <XModalCloser style="flat" icon="close" autoClose={true} />}</XModalHeader>}
                {!this.props.title && <XModalHeaderEmpty />}
                <XForm defaultData={defaultData} staticData={staticData} defaultAction={defaultAction} autoClose={true}>
                    {body}
                    {footer}
                </XForm>
            </XModal>
        );
    }
}