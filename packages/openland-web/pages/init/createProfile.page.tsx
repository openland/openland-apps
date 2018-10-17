import * as React from 'react';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withApp } from '../../components/withApp';
import { withProfileCreate } from '../../api/withProfileCreate';
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
import { XFormField } from 'openland-x-forms/XFormField';
import { XFormError } from 'openland-x-forms/XFormError';
import glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import * as Cookie from 'js-cookie';

const Footer = glamorous.div({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 16,
    margin: 'auto'
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
        marginBottom: 6
    }
});

const FooterLink = glamorous(XLink)({
    display: 'inline-block',
    textDecoration: 'underline',
    fontSize: 14,
    lineHeight: 1.71,
    letterSpacing: -0.4,
    fontWeight: 500,
    textAlign: 'center',
    color: '#334562'
});

const CreateProfileForm = withProfileCreate((props) => {
    if (canUseDOM) {
        localStorage.setItem('isnewuser', 'newuser');
    }
    let usePhotoPrefill = Cookie.get('auth-type') !== 'email';
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
                            firstName: (props.data.prefill && props.data.prefill.firstName) || '',
                            lastName: (props.data.prefill && props.data.prefill.lastName) || ''
                        }
                    }}
                    defaultAction={async (data) => {
                        await props.createProfile({ variables: data });
                        let redirect = props.router.query.redirect;
                        window.location.href = (redirect ? redirect : '/');
                        await delayForewer();
                    }}
                    defaultLayout={false}
                >
                    <XVertical>
                        <XFormError onlyGeneralErrors={true} width={472} />
                        <XFormLoadingContent>
                            <XHorizontal separator="large">
                                <XVertical width={280}>
                                    <XFormField field="input.firstName" title={InitTexts.create_profile.firstName}>
                                        <XInput field="input.firstName" size="large" placeholder="Jane" />
                                    </XFormField>
                                    <XFormField field="input.lastName" title={InitTexts.create_profile.lastName}>
                                        <XInput field="input.lastName" size="large" placeholder="Doe" />
                                    </XFormField>
                                    <XFormField field="input.phone" title={InitTexts.create_profile.phone} optional={true}>
                                        <XInput field="input.phone" size="large" placeholder="123-456-7890" />
                                    </XFormField>
                                </XVertical>
                                <XFormField title={InitTexts.create_profile.photo}>
                                    <XAvatarUpload field="input.photoRef" size="large" initialUrl={usePhotoPrefill ? props.data.prefill && props.data.prefill.picture : undefined} />
                                </XFormField>
                            </XHorizontal>
                        </XFormLoadingContent>
                        <XFooter padding={false}>
                            <XFormSubmit style="primary" text={InitTexts.create_profile.continue} size="large" alignSelf="flex-end" />
                        </XFooter>
                    </XVertical>
                </XForm>
            </ContentWrapper>
            <Footer>
                <FooterText>By creating an account you are accepting our <FooterLink href="https://openland.com/terms">Terms of Service</FooterLink> and <FooterLink href="https://openland.com/privacy">Privacy Policy</FooterLink>.</FooterText>
                <FooterText>© {new Date().getFullYear()} Data Makes Perfect Inc.</FooterText>
            </Footer>
        </RootContainer>
    );
});

export default withApp('Create Profile', 'viewer', (props) => {
    return (
        <>
            <XDocumentHead title={InitTexts.create_profile.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <CreateProfileForm />
        </>
    );
});