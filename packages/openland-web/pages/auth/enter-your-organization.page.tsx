import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { BackSkipLogo } from '../components/BackSkipLogo';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { InitTexts } from 'openland-web/pages/init/_text';
import { trackEvent } from 'openland-x-analytics';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { useClient } from 'openland-web/utils/useClient';
import * as Cookie from 'js-cookie';
import { Wrapper } from '../onboarding/components/wrapper';
import { Title, Subtitle, FormLayout, AuthInput, AuthInputWrapper, AuthActionButton } from './components/authComponents';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';

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

    const hasInvite = Cookie.get('x-openland-invite') || Cookie.get('x-openland-app-invite') || Cookie.get('x-openland-org-invite');

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

    const [errorsCount, setErrorsCount] = React.useState(0);
    const handleNext = React.useCallback(() => {
        doConfirm();
        if (organizationField.input.value.trim() === '') {
            setErrorsCount(x => x + 1);
        }
    }, [errorsCount, doConfirm]);
    useShortcuts({ keys: ['Enter'], callback: handleNext });

    return (
        <FormLayout>
            <Title text={InitTexts.create_organization.title} />
            <Subtitle text={InitTexts.create_organization.subTitle} />
            <AuthInputWrapper errorsCount={errorsCount}>
                <AuthInput
                    label="Organization name"
                    onChange={organizationField.input.onChange}
                />
            </AuthInputWrapper>
            <AuthActionButton
                loading={sending}
                text={!!hasInvite ? InitTexts.create_organization.done : InitTexts.create_organization.next}
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
    const [, setSkiping] = React.useState(false);

    const processCreateOrganization = async ({
        organizationFieldValue,
    }: {
        organizationFieldValue: string | null;
    }) => {
        if (!organizationFieldValue) {
            if (me.me) {
                organizationFieldValue = me.me.name;
                setSkiping(true);
            }
        } else {
            setSending(true);
        }
        if (!organizationFieldValue) {
            return;
        }

        let result;
        if (profile.profile && profile.profile.primaryOrganization) {
            const { updateOrganizationProfile } = await client.mutateUpdateOrganization({
                input: {
                    name: organizationFieldValue,
                },
            });

            result = {
                organization: updateOrganizationProfile,
            };
            if (Cookie.get('x-openland-invite')) {
                // room invite
                const inviteKey = Cookie.get('x-openland-invite')!!;

                const room = await client.mutateRoomJoinInviteLink({
                    invite: inviteKey,
                });

                await client.refetchAccount();

                window.location.href = `/mail/${room.join.id}`;
            }
            if (Cookie.get('x-openland-app-invite')) {
                // app invite invite
                const inviteKey = Cookie.get('x-openland-app-invite')!!;
                await client.mutateOrganizationActivateByInvite({
                    inviteKey,
                });
                await client.refetchAccount();

                window.location.href = '/onboarding/start';
            } else {
                Cookie.remove('x-openland-create-new-account');
                window.location.href = '/';
            }
        } else {
            result = await client.mutateCreateOrganization({
                input: {
                    personal: false,
                    name: organizationFieldValue,
                },
            });
            if (Cookie.get('x-openland-invite')) {
                // room invite
                const inviteKey = Cookie.get('x-openland-invite')!!;

                const room = await client.mutateRoomJoinInviteLink({
                    invite: inviteKey,
                });

                await client.refetchAccount();

                Cookie.set('x-openland-org', result.organization.id, { path: '/' });
                trackEvent('registration_complete');

                // can not remove cookie or update will break
                // Cookie.remove('x-openland-invite');
                Cookie.remove('x-openland-create-new-account');
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
            } else if (Cookie.get('x-openland-app-invite')) {
                // app invite invite
                const inviteKey = Cookie.get('x-openland-app-invite')!!;
                await client.mutateOrganizationActivateByInvite({
                    inviteKey,
                });
                await client.refetchAccount();

                Cookie.set('x-openland-org', result.organization.id, { path: '/' });
                trackEvent('registration_complete');

                // can not remove cookie or update will break
                // Cookie.remove('x-openland-app-invite');
                Cookie.remove('x-openland-create-new-account');
                window.location.href = '/onboarding/start';
            } else {
                Cookie.remove('x-openland-create-new-account');
                window.location.href = '/';
                trackEvent('registration_complete');
            }
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
            <BackSkipLogo
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
