import * as React from 'react';
import { css } from 'linaria';
import { OrganizationWithoutMembers_organization } from 'openland-api/Types';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XButton } from 'openland-x/XButton';
import { XView } from 'react-mental';
import { InviteImage } from 'openland-web/fragments/invite/InviteImage';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import CloseIcon from 'openland-icons/ic-close.svg';

const closeIconStyle = css`
    & path {
        fill: #cccccc;
    }
`;

export const PrivateCommunityNotMemberLanding = ({
    organization,
}: {
    organization: OrganizationWithoutMembers_organization;
}) => {
    const isMobile = useIsMobile();
    return (
        <>
            <XView
                flexDirection="column"
                justifyContent={isMobile ? 'space-between' : 'flex-end'}
                alignItems="center"
                paddingTop={61}
                position="relative"
            >
                <XView
                    flexDirection="row"
                    justifyContent={isMobile ? 'space-between' : 'flex-end'}
                    alignItems="center"
                    position="absolute"
                    top={0}
                    right={0}
                >
                    <XView
                        zIndex={100}
                        hoverCursor="pointer"
                        height={52}
                        flexDirection="row"
                        marginRight={16}
                        alignItems="center"
                    >
                        <XView
                            cursor="pointer"
                            path="/mail/"
                            justifyContent="center"
                            alignItems="center"
                            width={32}
                            height={32}
                            borderRadius={32}
                            hoverBackgroundColor="ecedf0"
                        >
                            <CloseIcon className={closeIconStyle} />
                        </XView>
                    </XView>
                </XView>
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
                    <XAvatar2
                        src={organization.photo || undefined}
                        title={organization.name}
                        id={organization.id}
                        size={74}
                    />
                </XView>

                <XView lineHeight={1.2} fontSize={20} fontWeight={'600'} marginTop={20}>
                    {organization.name}
                </XView>
                {organization.about && (
                    <XView
                        marginTop={12}
                        maxWidth={400}
                        fontSize={16}
                        lineHeight={1.5}
                        paddingLeft={10}
                        paddingRight={10}
                    >
                        <div style={{ textAlign: 'center' }}>{organization.about}</div>
                    </XView>
                )}

                <XView marginTop={40}>
                    <XButton
                        text="Go back"
                        size="large"
                        onClick={() => (canUseDOM ? window.history.back() : null)}
                    />
                </XView>
            </XView>
            {!isMobile && <InviteImage onBottom />}
        </>
    );
};
