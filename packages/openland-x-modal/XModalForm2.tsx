import * as React from 'react';
import Glamorous from 'glamorous';
import { XModalProps, XModal, XModalFooter } from './XModal';
import { XForm, XFormProps } from 'openland-x-forms/XForm2';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XFormSubmit, XFormSubmitProps } from 'openland-x-forms/XFormSubmit';
import { applyFlex, extractFlexProps, XFlexStyles } from 'openland-x/basics/Flex';
import { useIsMobile } from 'openland-web/hooks';

export interface XModalFormProps extends XFormProps, XModalProps {
    submitProps?: XFormSubmitProps;
    customFooter?: any;
    submitBtnText?: string;
    alsoUseBottomCloser?: boolean;
    children: any;
}

const BodyPadding = Glamorous.div<XFlexStyles>(
    [
        {
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 6,
            paddingBottom: 24,
            flexGrow: 1,
        },
    ],
    applyFlex,
);

const ModalBodyContainer = Glamorous.div<{ isMobile?: boolean | null } & XFlexStyles>(
    [
        props => ({
            paddingTop: 0,
            paddingBottom: 0,
            maxHeight: props.isMobile ? undefined : '60vh',
            overflowY: 'scroll',
            marginBottom: 0,
            flexGrow: 1,
        }),
    ],
    applyFlex,
);

export class XModalFormInner extends React.Component<XModalFormProps & XFlexStyles> {
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

        let body = <BodyPadding>{this.props.children}</BodyPadding>;
        if (scrollableContent) {
            body = (
                <ModalBodyContainer isMobile={this.props.isMobile} {...extractFlexProps(other)}>
                    {body}
                </ModalBodyContainer>
            );
        }
        let footer =
            this.props.customFooter === null
                ? null
                : this.props.customFooter || (
                      <XModalFooter>
                          <XHorizontal separator={6}>
                              {this.props.alsoUseBottomCloser && (
                                  <XButton text="Cancel" style="ghost" autoClose={true} />
                              )}
                              <XFormSubmit
                                  style="primary"
                                  text={
                                      this.props.submitBtnText !== undefined
                                          ? this.props.submitBtnText
                                          : 'Save'
                                  }
                                  {...submitProps}
                                  keyDownSubmit={true}
                              />
                              {!this.props.useTopCloser &&
                                  !this.props.alsoUseBottomCloser && (
                                      <XButton text="Cancel" style="ghost" autoClose={true} />
                                  )}
                          </XHorizontal>
                      </XModalFooter>
                  );

        return (
            <XModal
                {...other}
                body={
                    <XForm
                        defaultData={defaultData}
                        defaultLayout={defaultLayout}
                        staticData={staticData}
                        defaultAction={defaultAction}
                        autoClose={this.props.autoClose || true}
                        {...other}
                    >
                        {body}
                        {footer}
                    </XForm>
                }
                footer={null}
            />
        );
    }
}

export const XModalForm = (props: XModalFormProps & XFlexStyles) => {
    const [isMobile] = useIsMobile();

    return <XModalFormInner {...props} children={props.children} isMobile={isMobile} />;
};
