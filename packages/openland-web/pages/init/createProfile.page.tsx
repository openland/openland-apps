import * as React from 'react';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XVertical } from 'openland-x-layout/XVertical';
import { withApp } from '../../components/withApp';
import { withProfileCreate } from '../../api/withProfileCreate';
import { InitTexts } from './_text';
import { XForm } from 'openland-x-forms/XForm2';
import { delayForewer } from 'openland-y-utils/timer';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XInput } from 'openland-x/XInput';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormError } from 'openland-x-forms/XFormError';
import glamorous from 'glamorous';
import * as Cookie from 'js-cookie';

const RootContainer = glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    position: 'relative',
    backgroundColor: '#fff',
    minWidth: 600,
});

const Logo = glamorous.div({
    width: 145,
    height: 42,
    backgroundImage: "url('/static/logo.svg')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'absolute',
    top: 19,
    left: 32,
});

const XAvatarUploadWrapper = glamorous(XAvatarUpload)({
    marginBottom: 26,
});

const XFormSubmitWrapper = glamorous(XFormSubmit)({
    marginTop: 50,
});

const Title = glamorous.div({
    fontFamily: 'SFProText-Semibold',
    fontSize: 32,
    color: '#000',
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 24,
});

const SubTitle = glamorous.div({
    fontFamily: 'SFProText-Regular',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    fontStretch: 'normal',
    lineHeight: 1.5,
    letterSpacing: 'normal',
    color: '#000',
    marginTop: 0,
    marginBottom: 32,
});

const XInputWrapper = glamorous(XInput)({
    minWidth: 330,
});

const ContentWrapper = glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    marginTop: 55,
});

const Footer = glamorous.div({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 16,
    margin: 'auto',
});

const FooterText = glamorous.div({
    fontSize: 14,
    lineHeight: 1.71,
    letterSpacing: -0.4,
    fontWeight: 500,
    textAlign: 'center',
    color: '#334562',
    opacity: 0.4,
    '&:first-child': {
        marginBottom: 6,
    },
});

const CreateProfileForm = withProfileCreate(props => {
    if (canUseDOM) {
        localStorage.setItem('isnewuser', 'newuser');
    }
    let usePhotoPrefill = Cookie.get('auth-type') !== 'email';
    return (
        <RootContainer>
            <Logo />
            <ContentWrapper>
                <Title>{InitTexts.create_profile.title}</Title>
                <SubTitle>{InitTexts.create_profile.subTitle}</SubTitle>
                <XForm
                    defaultData={{
                        input: {
                            firstName:
                                (props.data.prefill &&
                                    props.data.prefill.firstName) ||
                                '',
                            lastName:
                                (props.data.prefill &&
                                    props.data.prefill.lastName) ||
                                '',
                        },
                    }}
                    defaultAction={async data => {
                        await props.createProfile({ variables: data });
                        let redirect = props.router.query.redirect;
                        window.location.href = redirect ? redirect : '/';
                        await delayForewer();
                    }}
                    defaultLayout={false}
                >
                    <XFormError onlyGeneralErrors={true} width={472} />
                    <XFormLoadingContent>
                        <XVertical alignItems="center">
                            <XAvatarUploadWrapper
                                field="input.photoRef"
                                dataTestId="photo"
                                size="default"
                                initialUrl={
                                    usePhotoPrefill
                                        ? props.data.prefill &&
                                          props.data.prefill.picture
                                        : undefined
                                }
                            />

                            <XInputWrapper
                                field="input.firstName"
                                size="large"
                                title="First name"
                                dataTestId="first-name"
                            />

                            <XInputWrapper
                                field="input.lastName"
                                size="large"
                                title="Last name"
                                dataTestId="last-name"
                            />

                            <XFormSubmitWrapper
                                style="primary"
                                text={InitTexts.create_profile.continue}
                                size="large"
                            />
                        </XVertical>
                    </XFormLoadingContent>
                </XForm>
            </ContentWrapper>
            <Footer>
                <FooterText>© {new Date().getFullYear()} Openland</FooterText>
            </Footer>
        </RootContainer>
    );
});

export default withApp('Create Profile', 'viewer', props => {
    return (
        <>
            <XDocumentHead
                title={InitTexts.create_profile.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />
            <CreateProfileForm />
        </>
    );
});
