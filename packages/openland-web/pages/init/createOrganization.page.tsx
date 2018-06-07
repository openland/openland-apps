import '../../globals';
import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withApp } from '../../components/withApp';
import { XForm } from 'openland-x-forms/XForm';
import { withCreateOrganization } from '../../api';
import {
    RootContainer,
    Logo,
    Title,
    TextWrapper,
    Label,
    InputGroup,
    ContentWrapper,
    FormWrapper,
    OptionalLabel,
    PhotoContiner,
    FieldHeader,
    Footer,
} from './components/CreateProfileComponents';
import { XButton } from 'openland-x/XButton';
import { withRouter } from 'next/router';
import { withUserInfo } from '../../components/UserInfo';
import { switchOrganization } from '../../utils/switchOrganization';
import { InitTexts } from './_text';

const CreateProfileForm = withCreateOrganization(withRouter(withUserInfo((props) => {

    return (
        <RootContainer>
            <Logo />
            <ContentWrapper>
                <TextWrapper>
                    <Title>{InitTexts.create_organization.title}</Title>
                </TextWrapper>
                <XForm
                    submitMutation={props.createOrganization}
                    mutationDirect={true}
                    onCompleted={(src) => { switchOrganization(src.data.alphaCreateOrganization); }}
                    keepLoading={true}
                >
                    <XVertical>
                        <XHorizontal separator="none">
                            <FormWrapper>
                                <InputGroup>
                                    <Label>{InitTexts.create_organization.name}</Label>
                                    <XForm.Text field="title" size="medium" placeholder={InitTexts.create_organization.namePlaceholder} required={true} />
                                </InputGroup>
                                <InputGroup>
                                    <FieldHeader><Label>{InitTexts.create_organization.website}</Label><OptionalLabel>{InitTexts.optional}</OptionalLabel></FieldHeader>
                                    <XForm.Text field="website" size="medium" placeholder={InitTexts.create_organization.websitePlaceholder} />
                                </InputGroup>
                            </FormWrapper>
                            <PhotoContiner separator="none">
                                <FieldHeader><Label>{InitTexts.create_organization.photo}</Label><OptionalLabel>{InitTexts.optional}</OptionalLabel></FieldHeader>
                                <XForm.Avatar field="logo" placeholder={{ add: (<><p>Add</p> <p>organization logo</p></>), change: <><p>Change</p> <p>organization logo</p></> }} />
                            </PhotoContiner>
                        </XHorizontal>
                        <Footer>
                            <XButton style="link" text={props.isAccountExists ? InitTexts.create_organization.cancel : InitTexts.create_organization.skip} path="/" />
                            <XForm.Submit style="primary" text={InitTexts.create_organization.continue} size="medium" alignSelf="flex-end" />
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