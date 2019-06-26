import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { getPercentageOfOnboarding } from '../components/utils';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { XForm } from 'openland-x-forms/XForm2';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XFormField2 } from 'openland-x-forms/XFormField2';
import {
    Title,
    ButtonsWrapper,
    SubTitle,
    ContentWrapper,
} from 'openland-web/pages/init/components/SignComponents';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XTrack } from 'openland-x-analytics/XTrack';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XFormError } from 'openland-x-forms/XFormError';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XRouterContext } from 'openland-x-routing/XRouterContext';

const backgroundClassName = css`
    background: white;
    width: 100%;
`;

const XAvatarUploadWrapper = Glamorous(XAvatarUpload)({
    marginBottom: 26,
});

const XFormSubmitWrapper = Glamorous(XFormSubmit)({
    marginTop: 50,
    '@media(max-width: 500px)': {
        marginTop: 25,
    },
});

export const CreateProfileFormInner = (props: {
    roomView: boolean;
    prefill: any;
    defaultAction: (data: any) => any;
}) => {
    const { roomView, prefill, defaultAction } = props;

    return (
        <XTrack event="signup_profile_view">
            <ContentWrapper noPadding={true}>
                <Title roomView={roomView}>{InitTexts.create_profile.title}</Title>
                <SubTitle>{InitTexts.create_profile.subTitle}</SubTitle>
                <ButtonsWrapper marginTop={40} width="100%" marginBottom={80}>
                    <XForm
                        defaultData={{
                            input: {
                                firstName: (prefill && prefill.firstName) || '',
                                lastName: (prefill && prefill.lastName) || '',
                            },
                        }}
                        validate={{
                            input: {
                                firstName: [
                                    {
                                        rule: (value: string) => value !== '',
                                        errorMessage: InitTexts.auth.firstNameIsEmptyError,
                                    },
                                ],
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
                                    initialUrl={prefill ? prefill.picture : undefined}
                                />

                                <XView>
                                    <XFormField2 field="input.firstName">
                                        {({ showError }: { showError: boolean }) => (
                                            <>
                                                <XInput
                                                    invalid={showError}
                                                    field="input.firstName"
                                                    size="large"
                                                    title="First name"
                                                    dataTestId="first-name"
                                                    flexGrow={1}
                                                />

                                                {showError && (
                                                    <XFormError field="input.firstName" />
                                                )}
                                            </>
                                        )}
                                    </XFormField2>
                                </XView>

                                <XView>
                                    <XInput
                                        field="input.lastName"
                                        size="large"
                                        title="Last name"
                                        dataTestId="last-name"
                                        flexGrow={1}
                                    />
                                </XView>

                                <ButtonsWrapper marginBottom={84}>
                                    <XFormSubmitWrapper
                                        dataTestId="continue-button"
                                        style="primary"
                                        text={InitTexts.create_profile.continue}
                                        size="large"
                                    />
                                </ButtonsWrapper>
                            </XVertical>
                        </XFormLoadingContent>
                    </XForm>
                </ButtonsWrapper>
            </ContentWrapper>
        </XTrack>
    );
};

export const IntroduceYourselfPage = () => {
    const router = React.useContext(XRouterContext)!;
    return (
        <div className={backgroundClassName}>
            <XDocumentHead title="Discover" />
            <TopBar progressInPercents={getPercentageOfOnboarding(3)} />
            <XView marginBottom={150} marginTop={34}>
                <BackSkipLogo
                    onBack={() => {
                        router.replace('/auth2/ask-activation-code');
                    }}
                    onSkip={null}
                />
            </XView>

            <CreateProfileFormInner
                roomView={false}
                prefill
                defaultAction={() => {
                    //
                }}
            />
        </div>
    );
};

export default withApp('Home', 'viewer', IntroduceYourselfPage);
