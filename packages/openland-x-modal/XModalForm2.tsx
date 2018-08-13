import * as React from 'react';
import Glamorous from 'glamorous';
import {
    XModalProps,
    XModal,
    XModalFooter
} from './XModal';
import { XForm, XFormProps } from 'openland-x-forms/XForm2';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XFormSubmit, XFormSubmitProps } from 'openland-x-forms/XFormSubmit';

export interface XModalFormProps extends XFormProps, XModalProps {
    submitProps?: XFormSubmitProps;
    customFooter?: any;
    submitBtnText?: string;
}

const BodyPadding = Glamorous.div({
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 6,
    paddingBottom: 24,
    flexGrow: 1
});

const ModalBodyContainer = Glamorous.div({
    paddingTop: 0,
    paddingBottom: 0,
    maxHeight: '60vh',
    overflowY: 'scroll',
    marginBottom: 0,
    flexGrow: 1
});

export class XModalForm extends React.Component<XModalFormProps> {
    render() {
        let {
            defaultData,
            staticData,
            defaultAction,
            defaultLayout,
            submitProps,
            scrollableContent,
            ...other
        } = this.props;

        let body = (
            <BodyPadding>
                {this.props.children}
            </BodyPadding>
        );
        if (scrollableContent) {
            body = (
                <ModalBodyContainer >
                    {body}
                </ModalBodyContainer>
            );
        }
        let footer = this.props.customFooter === null ? null : this.props.customFooter || (
            <XModalFooter>
                <XHorizontal>
                    <XFormSubmit
                        style="primary-sky-blue"
                        text={this.props.submitBtnText !== undefined ? this.props.submitBtnText : 'Save'}
                        size="r-default"
                        {...submitProps}
                        keyDownSubmit={true}
                    />
                    {!this.props.useTopCloser && <XButton text="Cancel" autoClose={true} />}
                </XHorizontal>
            </XModalFooter>
        );

        return (
            <XModal
                {...other}
                body={(
                    <XForm defaultData={defaultData} staticData={staticData} defaultAction={defaultAction} autoClose={this.props.autoClose || true}>
                        {body}
                        {footer}
                    </XForm>
                )}
                footer={null}
            />
        );
    }
}