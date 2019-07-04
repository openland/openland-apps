import * as React from 'react';
import { XView } from 'react-mental';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { XAvatarFormFieldComponent, StoredFileT } from 'openland-x/XAvatarUpload';
import {
    Title,
    ButtonsWrapper,
    SubTitle,
    ContentWrapper,
    RoomSignupContainer,
} from 'openland-web/pages/init/components/SignComponents';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { useClient } from 'openland-web/utils/useClient';
import * as Cookie from 'js-cookie';
import { XShortcuts } from 'openland-x/XShortcuts';
import { XInput } from 'openland-x/XInput';
import { XErrorMessage2 } from 'openland-x/XErrorMessage2';
import { EnterYourOrganizationPageProps } from '../introduce-yourself.page';
import { RoomContainerParams } from '../root.page';

export const CreateProfileFormInnerRoom = (
    props: EnterYourOrganizationPageProps & {
        prefill: any;
        roomContainerParams: RoomContainerParams;
    },
) => {
    const [sending, setSending] = React.useState(false);
    const client = useClient();
    let router = React.useContext(XRouterContext)!;
    const form = useForm();
    const { prefill } = props;

    let firstName = useField<string>(
        'input.firstName',
        (prefill && prefill.firstName) ||
            (props.initialProfileFormData && props.initialProfileFormData.firstName) ||
            '',
        form,
        [
            {
                checkIsValid: (value: string) => !!value.trim(),
                text: `Please enter your name`,
            },
        ],
    );
    let lastName = useField<string>(
        'input.lastName',
        (prefill && prefill.lastName) ||
            (props.initialProfileFormData && props.initialProfileFormData.lastName) ||
            '',
        form,
    );
    let photoRef = useField<StoredFileT | null>(
        'input.photoRef',
        (props.initialProfileFormData && props.initialProfileFormData.photoRef) || null,
        form,
    );

    const doConfirm = React.useCallback(
        () => {
            form.doAction(async () => {
                const formData = {
                    firstName: firstName.value.trim(),
                    lastName: lastName.value.trim(),
                    photoRef: photoRef.value
                        ? {
                              ...(photoRef.value as any),
                              isImage: undefined,
                              width: undefined,
                              height: undefined,
                              crop: undefined,
                              __typename: undefined,
                          }
                        : undefined,
                };

                if (props.initialProfileFormData) {
                    await client.mutateProfileUpdate({
                        input: formData,
                    });
                } else {
                    await client.mutateProfileCreate({
                        input: formData,
                    });
                }
                await client.refetchProfile();
                await client.refetchProfilePrefill();
                await client.refetchAccount();

                if (firstName.value) {
                    setSending(true);

                    if (Cookie.get('x-openland-org-invite')) {
                        const orgInvite = Cookie.get('x-openland-org-invite');
                        Cookie.remove('x-openland-org-invite');
                        window.location.href = `/join/${orgInvite}`;
                    } else {
                        router.push('/authorization/enter-your-organization');
                    }
                }
            });
        },
        [firstName.value, lastName.value, photoRef.value],
    );

    const onEnter = () => {
        doConfirm();
    };

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
            <RoomSignupContainer pageMode="CreateProfile" {...props.roomContainerParams!!}>
                <XView>
                    <ContentWrapper noPadding={true}>
                        <Title roomView={true}>{InitTexts.create_profile.title}</Title>
                        <SubTitle>{InitTexts.create_profile.subTitle}</SubTitle>
                        <ButtonsWrapper marginTop={40} width="100%">
                            <XVertical alignItems="center">
                                <XView marginBottom={10}>
                                    <XAvatarFormFieldComponent
                                        size="default"
                                        {...photoRef.input}
                                        initialUrl={prefill ? prefill.picture : undefined}
                                    />
                                </XView>

                                <XView maxWidth={500}>
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
                                    {firstName.input.invalid &&
                                        firstName.input.errorText && (
                                            <XErrorMessage2 message={firstName.input.errorText} />
                                        )}
                                </XView>

                                <XView>
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
                                    {lastName.input.invalid &&
                                        lastName.input.errorText && (
                                            <XErrorMessage2 message={lastName.input.errorText} />
                                        )}
                                </XView>
                                <XView marginTop={70 - 8} paddingBottom={84}>
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
                            </XVertical>
                        </ButtonsWrapper>
                    </ContentWrapper>
                </XView>
            </RoomSignupContainer>
        </XShortcuts>
    );
};
