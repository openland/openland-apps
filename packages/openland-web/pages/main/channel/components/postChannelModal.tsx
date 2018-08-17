import * as React from 'react';
import Glamorous from 'glamorous';
import { getConfig } from '../../../../config';
import { XModalForm, XModalFormProps } from 'openland-x-modal/XModalForm2';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XLocationPickerModal } from 'openland-x-map/XLocationPickerModal';
import { XInput } from 'openland-x/XInput';
import { XTextArea } from 'openland-x/XTextArea';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XSelect } from 'openland-x/XSelect';
import UploadCare from 'uploadcare-widget';
import { XSelectCustomInputRender } from 'openland-x/basics/XSelectCustom';
import PicIcon from './icons/ic-img.svg';
import LocationIcon from './icons/ic-location.svg';

interface ImgButtonStylesProps {
    marginRight?: number;
    marginLeft?: number;
    icon?: any;
    title: string;
}

const ImgButtonStyles = Glamorous(XLink)<ImgButtonStylesProps>(props => ({
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.4,
    color: '#99a2b0',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    '&:hover': {
        color: '#5c6a81',
    },
    '& > svg': {
        marginRight: props.marginRight,
        marginLeft: props.marginLeft
    }
}));

const ImgButton = (props: XLinkProps & ImgButtonStylesProps) => (
    <ImgButtonStyles {...props}>
        {props.icon}
        <span>{props.title}</span>
    </ImgButtonStyles>
);

const FooterWrap = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    height: 64,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fafbfc',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTop: '1px solid rgba(220, 222, 228, 0.6)'
});

class PostChannelModalRaw extends React.Component<XModalFormProps, { val?: string }> {
    constructor(props: XModalFormProps) {
        super(props);
        this.state = {
            val: ''
        };
    }

    private handleAttach = () => {
        let dialog = UploadCare.openDialog(null, {
            publicKey: getConfig().uploadcareKey!!
        });
        dialog.done((r) => {
            console.log(UploadCare);
        });
    }

    render() {
        let footer = (
            <FooterWrap>
                <XHorizontal flexGrow={1} separator={15}>
                    <XLocationPickerModal
                        target={(
                            <ImgButton
                                title="Locations"
                                icon={<LocationIcon />}
                                marginRight={6}
                            />
                        )}
                    />
                    <ImgButton
                        onClick={this.handleAttach}
                        title="Photo"
                        icon={<PicIcon />}
                        marginRight={8}
                    />
                </XHorizontal>
                <XFormSubmit
                    key="invites"
                    succesText="Invitations sent!"
                    style="primary-sky-blue"
                    size="r-default"
                    text="Create listing"
                    keyDownSubmit={true}
                />
            </FooterWrap>
        );
        return (
            <XModalForm
                {...this.props}
                defaultAction={this.props.defaultAction}
                title="Post listing"
                useTopCloser={true}
                scrollableContent={true}
                customFooter={footer}
                defaultData={{
                    inviteRequests: [{ email: '' }, { email: '' }]
                }}
            >
                <XVertical separator={16}>
                    <XInput size="r-default" color="primary-sky-blue" placeholder="Listing title" />
                    <XTextArea placeholder="Description" resize={false} size="small" />
                    {/* <XSelect
                        field="input.locations"
                        render={<XSelectCustomInputRender flexGrow={1} width="100%" flexShrink={0} placeholder="Enter a channel " />}
                        onInputChange={v => { this.setState({ val: v }); return v; }}
                        creatable={true}
                    /> */}
                    <XSelect
                        options={[
                            { label: 'option1', value: 'option1' },
                            { label: 'option2', value: 'option2' },
                            { label: 'option3', value: 'option3' },
                            { label: 'option4', value: 'option4' },
                            { label: 'option5', value: 'option5' },
                            { label: 'option6', value: 'option6' },
                            { label: 'option7', value: 'option7' },
                            { label: 'option8', value: 'option8' },
                            { label: 'option9', value: 'option9' },
                        ]}
                        render={
                            <XSelectCustomInputRender
                                popper={true}
                                placeholder="Enter a channel"
                                rounded={true}
                            />
                        }
                    />
                </XVertical>
            </XModalForm>
        );
    }
}

export const PostChannelModal = (props: XModalFormProps) => (
    <PostChannelModalRaw {...props} />
);