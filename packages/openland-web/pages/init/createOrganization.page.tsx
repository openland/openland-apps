import '../../globals';
import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withApp } from '../../components/withApp';
import { withCreateOrganization } from '../../api';
import {
    RootContainer,
    Logo,
    Title,
    TextWrapper,
    ContentWrapper,
    Footer,
} from './components/CreateProfileComponents';
import { XButton } from 'openland-x/XButton';
import { withRouter } from 'next/router';
import { withUserInfo } from '../../components/UserInfo';
import { switchOrganization } from '../../utils/switchOrganization';
import { InitTexts } from './_text';
import { XForm } from 'openland-x-forms/XForm2';
import { delayForewer } from 'openland-x-utils/timer';
import { XInput } from 'openland-x/XInput';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormField } from 'openland-x-forms/XFormField';
import { XFormError } from 'openland-x-forms/XFormError';

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
                        let res = await props.createOrganization({ variables: data });
                        switchOrganization(res.data.alphaCreateOrganization);
                        await delayForewer();
                    }}
                    defaultData={{
                        title: '',
                        website: '',
                        logo: null
                    }}
                    defaultLayout={false}
                >
                    <XVertical separator="large">
                        <XFormError width={472} />
                        <XFormLoadingContent>
                            <XHorizontal separator="large">
                                <XVertical width={280}>
                                    <XFormField field="title" title={InitTexts.create_organization.name}>
                                        <XInput field="title" size="medium" placeholder={InitTexts.create_organization.namePlaceholder} />
                                    </XFormField>
                                    <XFormField field="website" title={InitTexts.create_organization.website} optional={true}>
                                        <XInput field="website" size="medium" placeholder={InitTexts.create_organization.websitePlaceholder} />
                                    </XFormField>
                                </XVertical>
                                <XFormField title={InitTexts.create_organization.photo}>
                                    <XAvatarUpload field="logo" placeholder={{ add: (<><p>Add</p> <p>organization logo</p></>), change: <><p>Change</p> <p>organization logo</p></> }} size="large" />
                                </XFormField>
                            </XHorizontal>
                        </XFormLoadingContent>
                        <Footer>
                            {props.isAccountExists && <XButton style="link" text={InitTexts.create_organization.cancel} path="/" />}
                            {!props.isAccountExists && (
                                <XFormSubmit
                                    style="link"
                                    text={InitTexts.create_organization.skip}
                                    action={async (data) => {
                                        data.personal = true;
                                        data.title = props.user ? props.user.name : 'Personal Organization';
                                        let res = await props.createOrganization({ variables: data });
                                        switchOrganization(res.data.alphaCreateOrganization);
                                        await delayForewer();
                                    }}
                                />
                            )}

                            <XFormSubmit style="primary" text={InitTexts.create_organization.continue} size="medium" alignSelf="flex-end" />
                        </Footer>
                    </XVertical>
                </XForm>
            </ContentWrapper>
        </RootContainer>
    );
})));

export default withApp('Create Profile', 'viewer', (props) => {
    return (
        <>
            <XDocumentHead title={InitTexts.create_organization.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <CreateProfileForm />
        </>
    );
});