import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { InitTexts } from 'openland-web/pages/init/_text';
import { trackEvent } from 'openland-x-analytics';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { useClient } from 'openland-api/useClient';
import * as Cookie from 'js-cookie';
import { Wrapper } from '../onboarding/components/wrapper';
import { Title, Subtitle, FormLayout, AuthInput, AuthInputWrapper, AuthActionButton, useShake } from './components/authComponents';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { AuthHeaderConfig } from './root.page';
import { ResolvedInvite } from 'openland-api/spacex.types';

export type EnterYourOrganizationPageProps = { inviteKey?: string | null };

export type EnterYourOrganizationPageOuterProps = {
    isMobile: boolean;
};

export type processCreateOrganizationT = (a: { organizationFieldValue: string | null }) => void;

const CreateOrganizationFormInnerWeb = ({
    processCreateOrganization,
    initialOrganizationName,
    sending,
    isMobile,
}: {
    sending: boolean;
    initialOrganizationName?: string;
    inviteKey?: string | null;
    processCreateOrganization: processCreateOrganizationT;
    isMobile: boolean;
}) => {
    const form = useForm();

    const shouldSkipOnboarding = !!Cookie.get('x-openland-invite');

    let organizationField = useField('input.organization', initialOrganizationName || '', form);
    const doConfirm = React.useCallback(
        () => {
            form.doAction(async () => {
                if (organizationField.value.trim() === '') {
                    return;
                }
                await processCreateOrganization({
                    organizationFieldValue: organizationField.value.trim(),
                });
            });
        },
        [organizationField.value],
    );

    const [shakeClassName, shake] = useShake();
    const handleNext = React.useCallback(() => {
        doConfirm();
        if (organizationField.input.value.trim() === '') {
            shake();
        }
    }, [shakeClassName, doConfirm]);
    useShortcuts({ keys: ['Enter'], callback: handleNext });

    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [shakeClassName]);

    return (
        <FormLayout>
            <Title text={InitTexts.create_organization.title} />
            <Subtitle text={InitTexts.create_organization.subTitle} />
            <AuthInputWrapper className={shakeClassName}>
                <AuthInput
                    label="Organization name"
                    ref={inputRef}
                    onChange={organizationField.input.onChange}
                />
            </AuthInputWrapper>
            <AuthActionButton
                loading={sending}
                text={shouldSkipOnboarding ? InitTexts.create_organization.done : InitTexts.create_organization.next}
                onClick={handleNext}
            />
        </FormLayout>
    );
};

export const EnterYourOrganizationPageInner = ({
    isMobile,
}: EnterYourOrganizationPageProps & EnterYourOrganizationPageOuterProps) => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;

    const profile = client.useProfile();

    const initialOrganizationName =
        profile.profile &&
            profile.profile.primaryOrganization &&
            profile.profile.primaryOrganization.name
            ? profile.profile.primaryOrganization.name
            : undefined;

    const me = client.useAccount();
    const [sending, setSending] = React.useState(false);

    const processCreateOrganization = async ({
        organizationFieldValue,
    }: {
        organizationFieldValue: string | null;
    }) => {
        if (!organizationFieldValue) {
            if (me.me) {
                organizationFieldValue = me.me.name;
            } else {
                organizationFieldValue = '';
            }
        } else {
            setSending(true);
        }

        let result;
        const inviteKey = Cookie.get('x-openland-invite')!!;
        let invite: ResolvedInvite | undefined;
        let isPremium = false;
        if (inviteKey) {
            invite = await client.queryResolvedInvite({ key: inviteKey });
            if (invite.invite?.__typename === 'RoomInvite') {
                isPremium = invite.invite.room.isPremium;
            }
        }

        if (profile.profile && profile.profile.primaryOrganization) {
            const { updateOrganizationProfile } = await client.mutateUpdateOrganization({
                input: {
                    name: organizationFieldValue,
                },
            });

            result = {
                organization: updateOrganizationProfile,
            };

            if (inviteKey) {
                // room invite
                if (!isPremium) {
                    const room = await client.mutateRoomJoinInviteLink({
                        invite: inviteKey,
                    });
                    await client.refetchAccount();
                    window.location.href = `/mail/${room.join.id}`;
                } else {
                    window.location.href = `/invite/${inviteKey}`;
                }
                return;
            }
            if (Cookie.get('x-openland-app-invite')) {
                // app invite invite
                await client.mutateOrganizationActivateByInvite({
                    inviteKey: Cookie.get('x-openland-app-invite')!!,
                });
                await client.refetchAccount();
            }

            window.location.href = '/onboarding/start';
        } else {
            result = await client.mutateCreateOrganization({
                input: {
                    personal: false,
                    name: organizationFieldValue,
                },
            });
            if (inviteKey) {
                if (!isPremium) {
                    const room = await client.mutateRoomJoinInviteLink({
                        invite: inviteKey,
                    });

                    await client.refetchAccount();

                    Cookie.set('x-openland-org', result.organization.id, { path: '/' });

                    // can not remove cookie or update will break
                    // Cookie.remove('x-openland-invite');
                    await client.mutateBetaDiscoverSkip({ selectedTagsIds: [] });
                    if (
                        room.join.__typename === 'SharedRoom' &&
                        room.join.matchmaking &&
                        room.join.matchmaking.enabled &&
                        room.join.matchmaking.questions &&
                        room.join.matchmaking.questions.length
                    ) {
                        window.location.href = `/matchmaking/${room.join.id}/ask/${
                            room.join.matchmaking.questions[0].id
                            }`;
                    } else {
                        window.location.href = `/mail/${room.join.id}`;
                    }
                } else {
                    window.location.href = `/invite/${inviteKey}`;
                }
                trackEvent('registration_complete');
                return;
            } else if (Cookie.get('x-openland-app-invite')) {
                // app invite invite
                await client.mutateOrganizationActivateByInvite({
                    inviteKey: Cookie.get('x-openland-app-invite')!!,
                });
                await client.refetchAccount();

                Cookie.set('x-openland-org', result.organization.id, { path: '/' });
                trackEvent('registration_complete');

                // can not remove cookie or update will break
                // Cookie.remove('x-openland-app-invite');
            } else if (Cookie.get('x-openland-shortname')) {
                window.location.href = `/${Cookie.get('x-openland-shortname')}`;
                return;
            }
            window.location.href = '/onboarding/start';
        }
    };

    const onSkip = React.useCallback(async () => {
        await processCreateOrganization({
            organizationFieldValue: null,
        });
    }, []);

    return (
        <Wrapper>
            <XDocumentHead title="Where do you work?" />
            <AuthHeaderConfig
                onBack={() => {
                    router.replace('/authorization/introduce-yourself');
                }}
                onSkip={onSkip}
            />
            <CreateOrganizationFormInnerWeb
                initialOrganizationName={initialOrganizationName}
                sending={sending}
                processCreateOrganization={processCreateOrganization}
                isMobile={isMobile}
            />
        </Wrapper>
    );
};

export const EnterYourOrganizationPage = (
    props: EnterYourOrganizationPageProps & EnterYourOrganizationPageOuterProps,
) => {
    return (
        <React.Suspense fallback={null}>
            <EnterYourOrganizationPageInner {...props} />
        </React.Suspense>
    );
};
