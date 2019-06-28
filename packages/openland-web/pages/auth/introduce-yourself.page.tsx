import * as React from 'react';
import { XView } from 'react-mental';
import { withApp } from 'openland-web/components/withApp';
import { InputField } from 'openland-web/components/InputField';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { TopBar } from '../components/TopBar';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { getPercentageOfOnboarding } from '../components/utils';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XAvatarFormFieldComponent } from 'openland-x/XAvatarUpload';
import {
    Title,
    ButtonsWrapper,
    SubTitle,
    ContentWrapper,
    RoomSignupContainer,
} from 'openland-web/pages/init/components/SignComponents';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XTrack } from 'openland-x-analytics/XTrack';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { useClient } from 'openland-web/utils/useClient';
import * as Cookie from 'js-cookie';
import { delayForewer } from 'openland-y-utils/timer';
import { XShortcuts } from 'openland-x/XShortcuts';
import { XInput } from 'openland-x/XInput';
import { XErrorMessage2 } from 'openland-x/XErrorMessage2';

export const CreateProfileFormInner = (props: { roomView: boolean; prefill: any }) => {
    const [sending, setSending] = React.useState(false);
    const client = useClient();
    let router = React.useContext(XRouterContext)!;
    const form = useForm();
    const { roomView, prefill } = props;

    let firstName = useField('input.firstName', (prefill && prefill.firstName) || '', form, [
        {
            checkIsValid: (value: string) => value !== '',
            text: `First name can't be empty`,
        },
    ]);
    let lastName = useField('input.lastName', (prefill && prefill.lastName) || '', form, [
        {
            checkIsValid: (value: string) => value !== '',
            text: `Last name can't be empty`,
        },
    ]);
    let photoRef = useField('input.photoRef', prefill ? prefill.picture : undefined, form);

    const doConfirm = React.useCallback(() => {
        form.doAction(async () => {
            await client.mutateProfileCreate({
                input: {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    photoRef:
                        photoRef.value && photoRef.value.uuid
                            ? {
                                  ...photoRef.value,
                                  isImage: undefined,
                                  width: undefined,
                                  height: undefined,
                              }
                            : undefined,
                },
            });
            await client.refetchAccount();

            if (firstName.value) {
                setSending(true);

                if (Cookie.get('x-openland-org-invite')) {
                    const orgInvite = Cookie.get('x-openland-org-invite');
                    Cookie.remove('x-openland-org-invite');
                    window.location.href = `/join/${orgInvite}`;
                } else {
                    router.push('/auth2/enter-your-organization');
                }
            }
        });
    }, [firstName.value, lastName.value, photoRef.value]);

    const onEnter = () => {
        doConfirm();
    };

    const content = (
        <XTrack event="signup_profile_view">
            <ContentWrapper noPadding={true}>
                <Title roomView={roomView}>{InitTexts.create_profile.title}</Title>
                <SubTitle>{InitTexts.create_profile.subTitle}</SubTitle>
                <ButtonsWrapper marginTop={40} width="100%">
                    <XVertical alignItems="center">
                        <XView marginBottom={10}>
                            <XAvatarFormFieldComponent
                                size="default"
                                {...photoRef.input}
                                darkMode={roomView ? undefined : true}
                            />
                        </XView>

                        <XView maxWidth={500}>
                            {roomView && (
                                <XView width={330}>
                                    <XInput
                                        invalid={!!form.error}
                                        size="large"
                                        title="First name"
                                        dataTestId="first-name"
                                        flexGrow={1}
                                        {...firstName.input}
                                    />
                                </XView>
                            )}
                            {!roomView && (
                                <XView width={360}>
                                    <InputField
                                        height={56}
                                        title="First name"
                                        dataTestId="first-name"
                                        flexGrow={1}
                                        field={firstName}
                                        hideErrorText
                                    />
                                </XView>
                            )}

                            {firstName.input.invalid && firstName.input.errorText && (
                                <XErrorMessage2 message={firstName.input.errorText} />
                            )}
                        </XView>

                        <XView>
                            {roomView && (
                                <XView width={330}>
                                    <XInput
                                        invalid={!!form.error}
                                        size="large"
                                        title="Last name"
                                        dataTestId="last-name"
                                        flexGrow={1}
                                        {...lastName.input}
                                    />
                                </XView>
                            )}

                            {!roomView && (
                                <XView width={360}>
                                    <InputField
                                        height={56}
                                        title="Last name"
                                        dataTestId="last-name"
                                        flexGrow={1}
                                        field={lastName}
                                        hideErrorText
                                    />
                                </XView>
                            )}
                            {lastName.input.invalid && lastName.input.errorText && (
                                <XErrorMessage2 message={lastName.input.errorText} />
                            )}
                        </XView>

                        {roomView && (
                            <XView marginTop={50} paddingBottom={84}>
                                <ButtonsWrapper>
                                    <XButton
                                        loading={sending}
                                        dataTestId="continue-button"
                                        style="primary"
                                        text={InitTexts.create_profile.continue}
                                        size="large"
                                        onClick={doConfirm}
                                    />
                                </ButtonsWrapper>
                            </XView>
                        )}
                        {!roomView && (
                            <ButtonsWrapper marginTop={40} marginBottom={84}>
                                <XButton
                                    loading={sending}
                                    dataTestId="continue-button"
                                    style="primary"
                                    text={InitTexts.create_profile.continue}
                                    size="large"
                                    onClick={doConfirm}
                                />
                            </ButtonsWrapper>
                        )}
                    </XVertical>
                </ButtonsWrapper>
            </ContentWrapper>
        </XTrack>
    );

    return (
        <XShortcuts
            handlerMap={{
                ENTER: onEnter,
            }}
            keymap={{
                ENTER: {
                    osx: ['enter'],
                    windows: ['enter'],
                },
            }}
        >
            {!roomView && (
                <XView alignItems="center" flexGrow={1} justifyContent="center" marginTop={-100}>
                    {content}
                </XView>
            )}
            {roomView && <XView>{content}</XView>}
        </XShortcuts>
    );
};

const CreateProfileFormRoot = ({ roomView }: { roomView: boolean }) => {
    const client = useClient();

    if (canUseDOM) {
        localStorage.setItem('isnewuser', 'newuser');
    }

    let usePhotoPrefill = Cookie.get('auth-type') !== 'email';

    const data = client.useWithoutLoaderProfilePrefill();

    const prefill = usePhotoPrefill && data ? data.prefill : null;

    return (
        <CreateProfileFormInner
            {...{
                roomView,
                prefill,
            }}
        />
    );
};

export const IntroduceYourselfPage = ({ roomView }: { roomView: boolean }) => {
    const router = React.useContext(XRouterContext)!;
    return (
        <XView backgroundColor="white" flexGrow={1}>
            <XDocumentHead title="Introduce yourself" />
            {!roomView && (
                <>
                    <TopBar progressInPercents={getPercentageOfOnboarding(3)} />
                    <XView marginTop={34}>
                        <BackSkipLogo
                            onBack={() => {
                                router.replace('/auth2/ask-activation-code');
                            }}
                            onSkip={null}
                        />
                    </XView>
                    <CreateProfileFormRoot roomView={roomView} />
                </>
            )}

            {roomView && (
                <RoomSignupContainer pageMode="CreateProfile">
                    <CreateProfileFormRoot roomView={roomView} />
                </RoomSignupContainer>
            )}
        </XView>
    );
};

export default withApp('Home', 'viewer', () => <IntroduceYourselfPage roomView={false} />);
