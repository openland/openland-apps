import '../init';
import '../../globals';
import * as React from 'react';
import * as Cookie from 'js-cookie';
import Glamorous from 'glamorous';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withApp } from '../../components/withApp';
import {
    RootContainer,
    Logo,
    Title,
    TextWrapper,
    ContentWrapper,
} from './components/CreateProfileComponents';
import { InitTexts } from './_text';
import { XForm } from 'openland-x-forms/XForm2';
import { delayForewer } from 'openland-y-utils/timer';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XInput } from 'openland-x/XInput';
import { XFooter } from 'openland-x/XFooter';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormField, XFormFieldTitle } from 'openland-x-forms/XFormField';
import { XFormError } from 'openland-x-forms/XFormError';
import { withCreateUserProfileAndOrganization } from '../../api/withCreateUserProfileAndOrganization';
import { sanitizeIamgeRef } from 'openland-y-utils/sanitizeImageRef';
import { ChannelSignup, ChannelTitle, ChannelText, ButtonsWrapper } from './components/SignComponents';
import { XButton } from 'openland-x/XButton';

const Footer = Glamorous.div({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 16,
    margin: 'auto'
});

const FooterText = Glamorous.div({
    fontSize: 14,
    lineHeight: 1.71,
    letterSpacing: -0.4,
    fontWeight: 500,
    textAlign: 'center',
    color: '#334562',
    opacity: 0.4,
    '&:first-child': {
        marginBottom: 6
    }
});

const PopupWrapper = Glamorous.div({
    paddingleft: 14,
    paddingRight: 14,
    paddingTop: 7,
    paddingBottom: 7
});

const XAvatarUploadStyled = Glamorous(XAvatarUpload)({
    width: 110,
    height: 110,
    '& img': {
        width: '108px!important',
        height: '108px!important',
    }
});

const ProfileAvatarWrapper = Glamorous.div({
    margin: '0 auto',
    width: 110,
    marginBottom: 23
});

const SubmitWrapper = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50
});

const ResolveView = Glamorous.div<{ view: boolean }>((props) => ({
    display: props.view ? 'block' : 'none'
}));

const CreateProfileForm = withCreateUserProfileAndOrganization((props) => {
    if (canUseDOM) {
        localStorage.setItem('isnewuser', 'newuser');
    }
    let usePrefill = Cookie.get('auth-type') !== 'email';
    return (
        <RootContainer>
            <Logo />
            <ContentWrapper>
                <TextWrapper>
                    <Title>{InitTexts.create_profile.title}</Title>
                </TextWrapper>
                <XForm
                    defaultData={{
                        input: {
                            firstName: (usePrefill && props.data.prefill && props.data.prefill.firstName) || '',
                            lastName: (usePrefill && props.data.prefill && props.data.prefill.lastName) || '',
                            name: '',
                            website: '',
                            photoRef: null,
                            personal: false,
                        }
                    }}
                    defaultAction={async (data) => {
                        await props.create({
                            variables: {
                                user: {
                                    firstName: data.input.firstName,
                                    lastName: data.input.lastName,
                                    photoRef: sanitizeIamgeRef(data.input.photoRef),
                                },
                                organization: {
                                    name: data.input.name,
                                    website: '',
                                    personal: false,
                                }
                            }
                        });
                        let redirect = props.router.query.redirect;
                        window.location.href = (redirect ? redirect : '/');
                        await delayForewer();
                    }}
                    defaultLayout={false}
                >
                    <XVertical separator={6}>
                        <XFormError onlyGeneralErrors={true} width={472} />
                        <XFormLoadingContent>
                            <XHorizontal>
                                <XVertical width={340}>
                                    <XFormField field="input.firstName" title={InitTexts.create_profile.firstName}>
                                        <XInput field="input.firstName" size="medium" placeholder="Jane" />
                                    </XFormField>
                                    <XFormField field="input.lastName" title={InitTexts.create_profile.lastName}>
                                        <XInput field="input.lastName" size="medium" placeholder="Doe" />
                                    </XFormField>
                                    <XFormField field="input.name" title={InitTexts.create_profile.organizationName}>
                                        <XInput field="input.name" size="medium" placeholder="Enter organization name" tooltipContent={<PopupWrapper>{InitTexts.create_profile.organizationPopup}</PopupWrapper>} />
                                    </XFormField>
                                </XVertical>
                                <XVertical separator={0}>
                                    <XHorizontal>
                                        <XFormFieldTitle style={{ flexGrow: 1, marginTop: 0 }}>{InitTexts.create_profile.photo}</XFormFieldTitle>
                                        <XFormFieldTitle style={{ opacity: 0.4, marginTop: 0 }}>optional</XFormFieldTitle>
                                    </XHorizontal>
                                    <XAvatarUploadStyled field="input.photoRef" size="large" initialUrl={usePrefill ? props.data.prefill && props.data.prefill.picture : undefined} />
                                </XVertical>
                            </XHorizontal>
                        </XFormLoadingContent>
                        <XFooter padding={false}>
                            <XFormSubmit style="primary" text={InitTexts.create_profile.continue} size="medium" alignSelf="flex-end" />
                        </XFooter>
                    </XVertical>
                </XForm>
            </ContentWrapper>
            <Footer>
                <FooterText>© {new Date().getFullYear()} Data Makes Perfect Inc.</FooterText>
            </Footer>
        </RootContainer>
    );
});

class ChannelCreateProfileFormInner extends React.Component<any, { isOrgView: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {
            isOrgView: false
        };
    }

    showOrgView = () => {
        this.setState({
            isOrgView: true
        });
    }

    render() {
        let usePrefill = Cookie.get('auth-type') !== 'email';
        let props = this.props;

        return (
            <ChannelSignup
                headerStyle={this.state.isOrgView ? 'organization' : 'profile'}
            >
                <ChannelTitle>{this.state.isOrgView ? 'Enter your organization' : 'Introduce yourself'}</ChannelTitle>
                <ChannelText>{this.state.isOrgView ? 'This will help to make new connections and discover opportunities' : 'Add your name and photo so others can recognize you'}</ChannelText>
                <ButtonsWrapper marginTop={40} marginBottom={83} width={290}>
                    <XForm
                        defaultData={{
                            input: {
                                firstName: (usePrefill && props.data.prefill && props.data.prefill.firstName) || '',
                                lastName: (usePrefill && props.data.prefill && props.data.prefill.lastName) || '',
                                name: '',
                                website: '',
                                photoRef: null,
                                personal: false,
                            }
                        }}
                        defaultAction={async (data) => {
                            await props.create({
                                variables: {
                                    user: {
                                        firstName: data.input.firstName,
                                        lastName: data.input.lastName,
                                        photoRef: sanitizeIamgeRef(data.input.photoRef),
                                    },
                                    organization: {
                                        name: data.input.name,
                                        website: '',
                                        personal: false,
                                    }
                                }
                            });
                            Cookie.remove('x-openland-invite');
                            let redirect = props.router.query.redirect;
                            window.location.href = (redirect ? redirect : '/');
                            await delayForewer();
                        }}
                        defaultLayout={false}
                    >
                        <XFormError onlyGeneralErrors={true} width={290} />
                        <XFormLoadingContent>
                            <ResolveView view={!this.state.isOrgView}>
                                <ProfileAvatarWrapper>
                                    <XAvatarUploadStyled field="input.photoRef" size="small" initialUrl={usePrefill ? props.data.prefill && props.data.prefill.picture : undefined} />
                                </ProfileAvatarWrapper>
                                <XVertical>
                                    <XFormField field="input.firstName">
                                        <XInput field="input.firstName" size="r-default" color="primary-sky-blue" placeholder="First name" />
                                    </XFormField>
                                    <XFormField field="input.lastName">
                                        <XInput field="input.lastName" size="r-default" color="primary-sky-blue" placeholder="Last name" />
                                    </XFormField>
                                </XVertical>
                            </ResolveView>
                            <ResolveView view={this.state.isOrgView}>
                                <XVertical>
                                    <XFormField field="input.name">
                                        <XInput field="input.name" size="r-default" color="primary-sky-blue" placeholder="Organization name" tooltipContent={<PopupWrapper>{InitTexts.create_profile.organizationPopup}</PopupWrapper>} />
                                    </XFormField>
                                </XVertical>
                            </ResolveView>
                        </XFormLoadingContent>
                        <ResolveView view={!this.state.isOrgView}>
                            <SubmitWrapper>
                                <XButton onClick={this.showOrgView} size="r-default" style="primary-sky-blue" text={InitTexts.create_profile.continue} />
                            </SubmitWrapper>
                        </ResolveView>
                        <ResolveView view={this.state.isOrgView}>
                            <SubmitWrapper>
                                <XFormSubmit size="r-default" style="primary-sky-blue" text={InitTexts.create_profile.continue} />
                            </SubmitWrapper>
                        </ResolveView>
                    </XForm>
                </ButtonsWrapper>
            </ChannelSignup>
        );
    }
}

const ChannelCreateProfileForm = withCreateUserProfileAndOrganization((props) => {
    if (canUseDOM) {
        localStorage.setItem('isnewuser', 'newuser');
    }

    return (
        <ChannelCreateProfileFormInner {...props} />
    );
});

export default withApp('Create Profile and Organization', 'viewer', (props) => {
    const fromChannel = Cookie.get('x-openland-invite');

    return (
        <>
            <XDocumentHead title={InitTexts.create_profile.pageTitle} titleSocial={InitTexts.socialPageTitle} />

            {canUseDOM && fromChannel && <ChannelCreateProfileForm />}
            {canUseDOM && !fromChannel && <CreateProfileForm />}
        </>
    );
});