import * as React from 'react';
import Glamorous from 'glamorous';
import { XModalForm, XModalFormProps } from 'openland-x-modal/XModalForm2';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XInput } from 'openland-x/XInput';
import { XTextArea } from 'openland-x/XTextArea';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XSelect } from 'openland-x/XSelect';
import { XSelectCustomInputRender } from 'openland-x/basics/XSelectCustom';
import PicIcon from './icons/ic-img.svg';
import { withUserChannels } from '../../../../api/withUserChannels';
import { withCreateListing } from '../../../../api/withCreateListing';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { TextOrganizationProfile } from 'openland-text/TextOrganizationProfile';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XText } from 'openland-x/XText';

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

const Channels = withUserChannels((props) => {
    return (
        <XSelect
            field="input.channels"
            options={(props.data && props.data.channels && props.data.channels.conversations || []).map(c => ({ label: c.title, value: c.id }))}
            render={
                <XSelectCustomInputRender
                    popper={true}
                    placeholder="Enter a channel"
                    rounded={true}
                />
            }
        />
    );
});

class PostChannelModalRaw extends React.Component<Partial<XModalFormProps>, { val?: string, addPhoto?: boolean }> {
    store?: XStoreState;
    constructor(props: XModalFormProps) {
        super(props);
        this.state = {
            val: ''
        };
    }

    private handleAttach = () => {
        this.setState({
            addPhoto: !this.state.addPhoto
        });
    }

    render() {
        let footer = (
            <FooterWrap>
                <XHorizontal flexGrow={1} separator={15}>

                    <ImgButton
                        onClick={this.handleAttach}
                        title="Photo"
                        icon={<PicIcon />}
                        marginRight={8}
                    />
                </XHorizontal>
                <XFormSubmit
                    key="invites"
                    succesText="Listing posted!"
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
                defaultAction={this.props.defaultAction!!}
                title="Post listing"
                useTopCloser={true}
                scrollableContent={true}
                customFooter={footer}
                defaultData={{
                    input: {
                        title: '',
                    },
                }}
            >
                <XVertical separator={16}>

                    <XInput
                        size="r-default"
                        color="primary-sky-blue"
                        placeholder="Listing title"
                        field="input.name"
                    />
                    <XTextArea
                        placeholder="Description"
                        resize={false}
                        size="small"
                        valueStoreKey="fields.input.summary"
                    />
                    {this.state.addPhoto && <XAvatarUpload field="input.photo" cropParams="1:1, free" placeholder={{ add: TextOrganizationProfile.listingCreateDoPhotoPlaceholderAdd, change: TextOrganizationProfile.listingCreateDoPhotoPlaceholderChange }} />}

                    {/* <XLocationPickerModal field="input.location" placeholder={TextOrganizationProfile.listingCreateDoLocationPlaceholder} /> */}

                    <Channels />

                </XVertical>
                <XStoreContext.Consumer>
                    {(store) => {
                        this.store = store;
                        if (store && store.readValue('fields.input.photo')) {
                            return <XText>{store.readValue('fields.input.photo')}</XText>;
                        }
                        return null;
                    }}
                </XStoreContext.Consumer>
            </XModalForm >
        );
    }
}

const MutationProvider = withCreateListing((props) => (
    <PostChannelModalRaw
        {...props}
        defaultAction={async (data) => {
            let input = data.input || {};
            await props.createListing({
                variables: {
                    type: 'common',
                    input: {
                        name: input.name || '',
                        summary: input.summary,
                        location: input.location ? { lat: input.location.result.center[1], lon: input.location.result.center[0] } : null,
                        locationTitle: input.location ? (input.location.result.place_name || input.location.result.text) : '',
                        photo: input.photo,
                        channels: input.channels,
                    }
                }
            });
        }}
    />
)) as React.ComponentType<Partial<XModalFormProps>>;

export const PostChannelModal = withCreateListing((props: Partial<XModalFormProps>) => (
    <MutationProvider {...props} />
)) as React.ComponentType<Partial<XModalFormProps>>;