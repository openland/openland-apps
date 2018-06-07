import '../../globals';
import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withApp } from '../../components/withApp';
import { XForm } from 'openland-x-forms/XForm';
import { withCreateProfile } from '../../api';
import {
    RootContainer,
    Logo,
    Title,
    TextWrapper,
    Label,
    InputGroup,
    ContentWrapper,
    FormWrapper,
    Footer,
    OptionalLabel,
    PhotoContiner,
    FieldHeader,
} from './components/CreateProfileComponents';
import { InitTexts } from './_text';

const CreateProfileForm = withCreateProfile((props) => {
    return (
        <RootContainer>
            <Logo />
            <ContentWrapper>
                <TextWrapper>
                    <Title>{InitTexts.create_profile.title}</Title>
                </TextWrapper>
                <XForm
                    defaultValues={props.data.prefill}
                    submitMutation={props.createProfile}
                    mutationDirect={true}
                    onCompleted={() => window.location.href = '/'}
                    keepLoading={true}
                >
                    <XVertical>
                        <XHorizontal separator="none">
                            <FormWrapper>
                                <InputGroup>
                                    <Label>{InitTexts.create_profile.firstName}</Label>
                                    <XForm.Text field="firstName" size="medium" placeholder="Jane" />
                                </InputGroup>
                                <InputGroup>
                                    <Label>{InitTexts.create_profile.lastName}</Label>
                                    <XForm.Text field="lastName" size="medium" placeholder="Doe" />
                                </InputGroup>
                                <InputGroup>
                                    <FieldHeader><Label>{InitTexts.create_profile.phone}</Label><OptionalLabel>{InitTexts.optional}</OptionalLabel></FieldHeader>
                                    <XForm.Text field="phone" size="medium" placeholder="123-456-7890" />
                                </InputGroup>
                            </FormWrapper>
                            <PhotoContiner separator="none">
                                <FieldHeader><Label>{InitTexts.create_profile.photo}</Label><OptionalLabel>{InitTexts.optional}</OptionalLabel></FieldHeader>
                                <XForm.Avatar field="photo" />
                            </PhotoContiner>
                        </XHorizontal>
                        <Footer>
                            <></>
                            <XForm.Submit style="primary" text={InitTexts.create_profile.continue} size="medium" alignSelf="flex-end" />
                        </Footer>
                    </XVertical>
                </XForm>
            </ContentWrapper>
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