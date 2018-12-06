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
import { SignContainer, RoomSignup } from './components/SignComponents';

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

export const CreateProfileFormInner = ({
    prefill,
    usePhotoPrefill,
    defaultAction,
}: {
    prefill: any;
    usePhotoPrefill: boolean;
    defaultAction: (data: any) => any;
}) => {
    return (
        <div>
            <Title>{InitTexts.create_profile.title}</Title>
            <SubTitle>{InitTexts.create_profile.subTitle}</SubTitle>
            <XForm
                defaultData={{
                    input: {
                        firstName: (prefill && prefill.firstName) || '',
                        lastName: (prefill && prefill.lastName) || '',
                    },
                }}
                defaultAction={defaultAction}
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
                                    ? prefill && prefill.picture
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
        </div>
    );
};

export const CreateProfileForm = withProfileCreate((props: any) => {
    if (canUseDOM) {
        localStorage.setItem('isnewuser', 'newuser');
    }
    let usePhotoPrefill = Cookie.get('auth-type') !== 'email';

    const router = props.router;
    const prefill = props.data.prefill;
    const createProfile = props.createProfile;
    const Container = props.roomView ? RoomSignup : SignContainer;

    return (
        <Container>
            <CreateProfileFormInner
                {...{
                    prefill,
                    usePhotoPrefill,
                    defaultAction: async (data: any) => {
                        await createProfile({ variables: data });
                        let redirect = router.query.redirect;
                        window.location.href = redirect ? redirect : '/';
                        await delayForewer();
                    },
                }}
            />
        </Container>
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
