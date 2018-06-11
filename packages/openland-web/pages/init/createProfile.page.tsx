import '../../globals';
import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withApp } from '../../components/withApp';
import { withCreateProfile } from '../../api';
import {
    RootContainer,
    Logo,
    Title,
    TextWrapper,
    Label,
    InputGroup,
    ContentWrapper,
    OptionalLabel,
    FieldHeader,
} from './components/CreateProfileComponents';
import { InitTexts } from './_text';
import { XForm } from 'openland-x-forms/XForm2';
import { delayForewer } from 'openland-x-utils/timer';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XInput } from 'openland-x/XInput';
import { XFooter } from 'openland-x/XFooter';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';

const CreateProfileForm = withCreateProfile((props) => {
    return (
        <RootContainer>
            <Logo />
            <ContentWrapper>
                <TextWrapper>
                    <Title>{InitTexts.create_profile.title}</Title>
                </TextWrapper>
                <XForm
                    defaultData={props.data.prefill}
                    defaultAction={async (data) => {
                        await props.createProfile({ variables: data });
                        window.location.href = '/';
                        await delayForewer();
                    }}
                    defaultLayout={false}
                >

                    <XVertical>
                        <XFormLoadingContent>
                            <XHorizontal separator="large">
                                <XVertical separator="none">
                                    <InputGroup>
                                        <Label>{InitTexts.create_profile.firstName}</Label>
                                        <XInput field="firstName" size="medium" placeholder="Jane" />
                                    </InputGroup>
                                    <InputGroup>
                                        <Label>{InitTexts.create_profile.lastName}</Label>
                                        <XInput field="lastName" size="medium" placeholder="Doe" />
                                    </InputGroup>
                                    <InputGroup>
                                        <FieldHeader><Label>{InitTexts.create_profile.phone}</Label><OptionalLabel>{InitTexts.optional}</OptionalLabel></FieldHeader>
                                        <XInput field="phone" size="medium" placeholder="123-456-7890" />
                                    </InputGroup>
                                </XVertical>
                                <XVertical separator="none">
                                    <FieldHeader><Label>{InitTexts.create_profile.photo}</Label><OptionalLabel>{InitTexts.optional}</OptionalLabel></FieldHeader>
                                    <XAvatarUpload field="photo" />
                                </XVertical>
                            </XHorizontal>
                        </XFormLoadingContent>
                        <XFooter padding={false}>
                            <XFormSubmit style="primary" text={InitTexts.create_profile.continue} size="medium" alignSelf="flex-end" />
                        </XFooter>
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