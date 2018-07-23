import '../init';
import '../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withApp } from '../../components/withApp';
import { withCreateOrganization } from '../../api/withCreateOrganization';
import {
    RootContainer,
    Logo,
    Title,
    TextWrapper,
    ContentWrapper,
    Footer,
} from './components/CreateProfileComponents';
import { XLink } from 'openland-x/XLink';
import { withRouter } from 'next/router';
import { withUserInfo } from '../../components/UserInfo';
import { switchOrganization } from '../../utils/switchOrganization';
import { InitTexts } from './_text';
import { XForm } from 'openland-x-forms/XForm2';
import { delayForewer } from 'openland-y-utils/timer';
import { XInput } from 'openland-x/XInput';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormField } from 'openland-x-forms/XFormField';
import { XFormError } from 'openland-x-forms/XFormError';
import { sanitizeIamgeRef } from '../../utils/sanitizer';

const Cancel = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    color: '#765efd',
    fontSize: 14,
    letterSpacing: -0.2,
    fontWeight: 500,
    '&:hover': {
        color: '#765efd',
        textDecoration: 'underline'
    }
});

const InputTooltipWrapper = Glamorous.div({
    margin: -10,
});

const InputTooltipRow = Glamorous.div({
    display: 'flex',
    alignItems: 'flex-start',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    paddingTop: 18,
    paddingBottom: 14,
    paddingLeft: 18,
    paddingRight: 18,
    '&:last-child': {
        borderBottom: 'none',
        paddingTop: 14,
        paddingBottom: 18,
    },
    '& > img': {
        marginTop: 6
    }
});

const InputTooltipText = Glamorous.div({
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.47,
    letterSpacing: -0.3,
    color: '#334562',
    marginLeft: 14,
    maxWidth: 364
});

const InputTooltip = () => (
    <InputTooltipWrapper>
        <InputTooltipRow>
            <img src="/static/X/ic-profile.svg"/>
            <InputTooltipText>Re-type your full name if you register as a private individual</InputTooltipText>
        </InputTooltipRow>
        <InputTooltipRow>
            <img src="/static/X/ic-profile2.svg"/>
            <InputTooltipText>For large organizations, you can register with your department name or regional office name</InputTooltipText>
        </InputTooltipRow>
    </InputTooltipWrapper>
);

const CreateProfileForm = withCreateOrganization(withRouter(withUserInfo((props) => {

    return (
        <RootContainer>
            <Logo />
            <ContentWrapper>
                <TextWrapper>
                    <Title>{InitTexts.create_organization.title}</Title>
                </TextWrapper>
                <XForm
                    defaultAction={async (data) => {
                        let res = await props.createOrganization({
                            variables:
                            {
                                input: {
                                    personal: false,
                                    name: data.input.name,
                                    website: data.input.website,
                                    photoRef: sanitizeIamgeRef(data.input.photoRef)
                                }
                            }
                        });
                        switchOrganization(res.data.createOrganization.id, props.router.query.redirect);
                        await delayForewer();
                    }}
                    defaultData={{
                        input: {
                            name: '',
                            website: '',
                            photoRef: null
                        }
                    }}
                    defaultLayout={false}
                >
                    <XVertical separator="large">
                        <XFormError width={472} />
                        <XFormLoadingContent>
                            <XHorizontal separator="large">
                                <XVertical width={280}>
                                    <XFormField field="input.name" title={InitTexts.create_organization.name}>
                                        <XInput
                                            field="input.name"
                                            size="medium"
                                            placeholder={InitTexts.create_organization.namePlaceholder}
                                            tooltipContent={<InputTooltip/>}
                                        />
                                    </XFormField>
                                    <XFormField field="input.website" title={InitTexts.create_organization.website} optional={true}>
                                        <XInput field="input.website" size="medium" placeholder={InitTexts.create_organization.websitePlaceholder} />
                                    </XFormField>
                                </XVertical>
                                <XFormField title={InitTexts.create_organization.photo}>
                                    <XAvatarUpload cropParams="1:1, free" field="input.photoRef" placeholder={{ add: (<><p>Add</p> <p>organization logo</p></>), change: <><p>Change</p> <p>organization logo</p></> }} size="large" />
                                </XFormField>
                            </XHorizontal>
                        </XFormLoadingContent>
                        <Footer>
                            {props.isAccountExists && <Cancel path="/">{InitTexts.create_organization.cancel}</Cancel>}
                            {/* {!props.isAccountExists && (
                                <XFormSubmit
                                    style="link"
                                    text={InitTexts.create_organization.skip}
                                    action={async () => {
                                        let res = await props.createOrganization({
                                            variables: {
                                                input: {
                                                    personal: true,
                                                    name: props.user!!.name,
                                                }
                                            }
                                        });
                                        switchOrganization(res.data.createOrganization.id, props.router.query.redirect);
                                        await delayForewer();
                                    }}
                                />
                            )} */}

                            <div />

                            <XFormSubmit style="primary" text={InitTexts.create_organization.continue} size="medium" alignSelf="flex-end" />
                        </Footer>
                    </XVertical>
                </XForm>
            </ContentWrapper>
        </RootContainer>
    );
})));

export default withApp('Create Organization', 'viewer', (props) => {
    return (
        <>
            <XDocumentHead title={InitTexts.create_organization.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <CreateProfileForm />
        </>
    );
});