import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withUserInfo } from 'openland-web/components/UserInfo';
import { withApp } from 'openland-web/components/withApp';
import ImgMembersEmpty from 'openland-icons/img-members-empty-copy-6.svg';
import { XView } from 'react-mental';
import { OwnerLinkComponent } from 'openland-web/fragments/OwnerLinkComponent';
import { css } from 'linaria';
import { useClient } from 'openland-web/utils/useClient';
import CloseIcon from 'openland-icons/ic-close-post.svg';
import { useIsMobile } from 'openland-web/hooks';
import { XRouterContext } from 'openland-x-routing/XRouterContext';

const textAlignCenterClassName = css`
    text-align: center;
`;

const TextAlignCenter = ({ children }: { children: any }) => {
    return <div className={textAlignCenterClassName}>{children}</div>;
};

const letterSpacingClassName = css`
    letter-spacing: 0.9px;
`;

const InviteFragment = ({
    founderChatsInvite,
    primaryOrganizationName,
    primaryOrganizationId,
    primaryOrganizationInvite,
    openlandInvite,
}: {
    founderChatsInvite: string;
    primaryOrganizationName: string;
    primaryOrganizationId: string;
    primaryOrganizationInvite: string;
    openlandInvite: string;
}) => {
    let router = React.useContext(XRouterContext)!;

    const [isMobile] = useIsMobile();

    return (
        <XView
            flexDirection="row"
            position={'relative'}
            flexGrow={1}
            justifyContent={'center'}
            backgroundColor={'#FFF'}
        >
            <XView position="absolute" right={20} top={20}>
                <XView
                    onClick={() => {
                        router.replace(`/mail`);
                    }}
                    href={'/mail'}
                    cursor="pointer"
                    alignItems="center"
                    justifyContent="center"
                    padding={8}
                    width={32}
                    height={32}
                    borderRadius={50}
                    hoverBackgroundColor="rgba(0, 0, 0, 0.05)"
                >
                    <CloseIcon />
                </XView>
            </XView>

            <XView flexDirection="column" alignItems="center">
                <XView marginBottom={-55}>
                    <ImgMembersEmpty />
                </XView>

                <XView
                    fontSize={22}
                    maxWidth={328}
                    fontWeight={'600'}
                    lineHeight={1.36}
                    color={'#000'}
                >
                    <TextAlignCenter>
                        <span className={letterSpacingClassName}>
                            Share one of the links below with people you want to invite
                        </span>
                    </TextAlignCenter>
                </XView>

                <XView width={isMobile ? 250 : 540} marginTop={48}>
                    <XView
                        flexDirection="row"
                        color={'#000'}
                        fontWeight="600"
                        fontSize={16}
                        marginBottom={12}
                    >
                        Invite to
                        <XView
                            as="a"
                            marginLeft={4}
                            href="https://openland.com/mail/p/ZYx4d9K6kjIZ5jo6r69zc4AX3v"
                        >
                            <span className={letterSpacingClassName}>Founder Chats</span>
                        </XView>
                    </XView>
                    <OwnerLinkComponent appInvite={founderChatsInvite} />
                    <XView marginTop={36}>
                        <XView
                            flexDirection="row"
                            color={'#000'}
                            fontWeight="600"
                            fontSize={16}
                            marginBottom={12}
                        >
                            Invite to
                            <XView
                                as="a"
                                marginLeft={4}
                                href={`https://openland.com/directory/o/${primaryOrganizationId}`}
                            >
                                {primaryOrganizationName}
                            </XView>
                        </XView>
                        <OwnerLinkComponent
                            footerNote="Anyone can use this link to join your organization"
                            appInvite={primaryOrganizationInvite}
                        />
                    </XView>

                    <XView marginTop={36} paddingBottom={100}>
                        <XView color={'#000'} fontWeight="600" fontSize={16} marginBottom={12}>
                            Invite to Openland
                        </XView>
                        <OwnerLinkComponent
                            footerNote="Anyone can use this link to join Openland"
                            appInvite={openlandInvite}
                        />
                    </XView>
                </XView>
            </XView>
        </XView>
    );
};

export default withApp(
    'Invite People',
    'viewer',
    withUserInfo(() => {
        const client = useClient();

        const foundersChatId = 'ZYx4d9K6kjIZ5jo6r69zc4AX3v';

        const { link: founderChatsInvite } = client.useRoomInviteLink({ roomId: foundersChatId });

        const profile = client.useProfile().profile!;

        const data = client.useOrganizationPublicInvite({
            organizationId: profile.primaryOrganization!!.id,
        });

        const { invite: openlandInvite } = client.useAccountAppInvite();

        const primaryOrganizationInvite = data.publicInvite!!.key;

        return (
            <>
                <XDocumentHead title={'Invite People'} />
                <InviteFragment
                    founderChatsInvite={founderChatsInvite}
                    primaryOrganizationId={profile.primaryOrganization!!.id}
                    primaryOrganizationName={profile.primaryOrganization!!.name}
                    primaryOrganizationInvite={primaryOrganizationInvite}
                    openlandInvite={openlandInvite}
                />
            </>
        );
    }),
);
