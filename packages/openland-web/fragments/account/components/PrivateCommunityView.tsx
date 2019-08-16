import * as React from 'react';
import { OrganizationWithoutMembers_organization } from 'openland-api/Types';
import { XView } from 'react-mental';
import { InviteImage } from 'openland-web/fragments/invite/InviteImage';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { useStackRouter } from 'openland-unicorn/components/StackRouter';
import { UButton } from 'openland-web/components/unicorn/UButton';

interface PrivateCommunityViewProps {
    organization: OrganizationWithoutMembers_organization;
}

export const PrivateCommunityView = (props: PrivateCommunityViewProps) => {
    const { id, photo, name, about } = props.organization;
    const layout = useLayout();
    const router = useStackRouter();

    return (
        <>
            <XView
                flexDirection="column"
                justifyContent={layout === 'mobile' ? 'space-between' : 'flex-end'}
                alignItems="center"
                paddingTop={61}
                position="relative"
            >
                <XView
                    backgroundColor={'rgba(244, 244, 244, 0.7)'}
                    borderRadius={10}
                    paddingLeft={24}
                    paddingRight={24}
                    paddingTop={20}
                    paddingBottom={20}
                    alignItems="center"
                >
                    <XView fontSize={20} fontWeight={'600'}>
                        You must be invited to view this community
                    </XView>
                    <XView opacity={0.8} fontSize={14} lineHeight={1.57} marginTop={8}>
                        Creator of this community has made it private
                    </XView>
                </XView>

                <XView marginTop={40}>
                    <UAvatar
                        photo={photo || undefined}
                        title={name}
                        id={id}
                        size="x-large"
                    />
                </XView>

                <XView lineHeight={1.2} fontSize={20} fontWeight={'600'} marginTop={20}>
                    {name}
                </XView>

                {about && (
                    <XView
                        marginTop={12}
                        maxWidth={400}
                        fontSize={16}
                        lineHeight={1.5}
                        paddingLeft={10}
                        paddingRight={10}
                    >
                        <div style={{ textAlign: 'center' }}>{about}</div>
                    </XView>
                )}

                <XView marginTop={40}>
                    <UButton
                        text="Go back"
                        size="large"
                        style="secondary"
                        onClick={() => router.pop()}
                    />
                </XView>
            </XView>

            {layout === 'desktop' && <InviteImage onBottom />}
        </>
    );
};