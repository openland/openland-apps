import '../../globals';
import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { withApp } from '../../components/withApp';
import { withProfileCreate } from '../../api';
import {
    RootContainer,
    Logo,
    Title,
    TextWrapper,
    ContentWrapper,
} from './components/CreateProfileComponents';
import { InitTexts } from './_text';
import { XForm } from 'openland-x-forms/XForm2';
import { delayForewer } from 'openland-x-utils/timer';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XInput } from 'openland-x/XInput';
import { XFooter } from 'openland-x/XFooter';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormField } from 'openland-x-forms/XFormField';
import { XFormError } from 'openland-x-forms/XFormError';

const CreateProfileForm = withProfileCreate((props) => {
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
                            firstName: props.data.prefill.firstName || '',
                            lastName: props.data.prefill.lastName || ''
                        }
                    }}
                    defaultAction={async (data) => {
                        await props.createProfile({ variables: data });
                        window.location.href = '/';
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
                                        <XInput field="input.firstName" size="medium" placeholder="Jane" />
                                    </XFormField>
                                    <XFormField field="input.lastName" title={InitTexts.create_profile.lastName}>
                                        <XInput field="input.lastName" size="medium" placeholder="Doe" />
                                    </XFormField>
                                    <XFormField field="input.phone" title={InitTexts.create_profile.phone} optional={true}>
                                        <XInput field="input.phone" size="medium" placeholder="123-456-7890" />
                                    </XFormField>
                                </XVertical>
                                <XFormField title={InitTexts.create_profile.photo}>
                                    <XAvatarUpload field="input.photoRef" size="large" />
                                </XFormField>
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