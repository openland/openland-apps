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
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import ArrowDownIcon from 'openland-icons/ic-arrow-down.svg';

const textAlignCenterClassName = css`
    text-align: center;
`;

const TextAlignCenter = ({ children }: { children: any }) => {
    return <div className={textAlignCenterClassName}>{children}</div>;
};

const titleLetterSpacingClassName = css`
    letter-spacing: 0.6px;
`;

const textLetterSpacingClassName = css`
    display: flex;
    letter-spacing: 1.1px;
`;

export const InviteFragment = ({ withoutCloseIcon }: { withoutCloseIcon?: boolean }) => {
    const client = useClient();

    const founderChatId = 'ZYx4d9K6kjIZ5jo6r69zc4AX3v';

    const { link: founderChatsInvite } = client.useRoomInviteLink({ roomId: founderChatId });

    const profile = client.useProfile().profile!;

    const data = client.useOrganizationPublicInvite({
        organizationId: profile.primaryOrganization!!.id,
    });

    const { invite: openlandInvite } = client.useAccountAppInvite();

    const primaryOrganizationInvite = data.publicInvite!!.key;
    const primaryOrganizationId = profile.primaryOrganization!!.id;
    const primaryOrganizationName = profile.primaryOrganization!!.name;
    const [moreInvite, showMoreInvite] = React.useState(false);
    const router = React.useContext(XRouterContext)!;

    const isMobile = useIsMobile() || undefined;

    return (
        <XView
            flexDirection="row"
            position={'relative'}
            flexGrow={1}
            justifyContent={'center'}
            backgroundColor={'#FFF'}
            paddingLeft={isMobile ? 40 : 0}
            paddingRight={isMobile ? 40 : 0}
        >
            {!withoutCloseIcon && (
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
            )}

            <XView flexDirection="column" alignItems="center" width="100%">
                {!isMobile && (
                    <XView marginBottom={-55}>
                        <ImgMembersEmpty />
                    </XView>
                )}

                <XView
                    fontSize={22}
                    maxWidth={isMobile ? '100%' : 328}
                    fontWeight={'600'}
                    lineHeight={1.36}
                    color={'#000'}
                    width="100%"
                    marginTop={isMobile ? 28 : 0}
                >
                    <TextAlignCenter>
                        <span className={titleLetterSpacingClassName}>
                            Share one of the links below with people you want to invite
                        </span>
                    </TextAlignCenter>
                </XView>

                <XView width={isMobile ? '100%' : 540} marginTop={48}>
                    <XView
                        flexDirection="row"
                        color={'#000'}
                        fontWeight="600"
                        fontSize={20}
                        marginBottom={12}
                    >
                        <span className={textLetterSpacingClassName}>
                            {!isMobile && 'Invite to'}
                            <XView
                                as="a"
                                marginLeft={4}
                                href="https://openland.com/mail/p/ZYx4d9K6kjIZ5jo6r69zc4AX3v"
                            >
                                <span className={titleLetterSpacingClassName}>Founder Chats</span>
                            </XView>
                        </span>
                    </XView>
                    <OwnerLinkComponent
                        appInvite={founderChatsInvite}
                        id={founderChatId}
                        isRoom={true}
                        useRevoke={true}
                        withoutInput={isMobile}
                    />
                    <XView marginTop={36}>
                        <XView
                            flexDirection="row"
                            color={'#000'}
                            fontWeight="600"
                            fontSize={20}
                            marginBottom={12}
                        >
                            <span className={textLetterSpacingClassName}>
                                {!isMobile && 'Invite to'}
                                <XView
                                    as="a"
                                    marginLeft={4}
                                    href={`https://openland.com/directory/o/${primaryOrganizationId}`}
                                >
                                    {primaryOrganizationName}
                                </XView>
                            </span>
                        </XView>
                        <OwnerLinkComponent
                            footerNote="Anyone can use this link to join your organization"
                            appInvite={primaryOrganizationInvite}
                            id={primaryOrganizationId}
                            isOrganization={true}
                            useRevoke={true}
                            withoutInput={isMobile}
                        />
                    </XView>
                    {!moreInvite && (
                        <XView
                            flexDirection="row"
                            alignItems="center"
                            cursor="pointer"
                            marginTop={30}
                            paddingBottom={100}
                            onClick={() => showMoreInvite(true)}
                        >
                            <XView marginRight={8} flexDirection="row" alignItems="center">
                                <ArrowDownIcon />
                            </XView>
                            <XView fontSize={14} color="rgba(0, 0, 0, 0.5)">
                                More invites
                            </XView>
                        </XView>
                    )}
                    {moreInvite && (
                        <XView marginTop={36} paddingBottom={100}>
                            <XView color={'#000'} fontWeight="600" fontSize={20} marginBottom={12}>
                                <span className={textLetterSpacingClassName}>
                                    {!isMobile && 'Invite to'} Openland
                                </span>
                            </XView>
                            <OwnerLinkComponent
                                footerNote="Anyone can use this link to join Openland"
                                appInvite={openlandInvite}
                                withoutInput={isMobile}
                            />
                        </XView>
                    )}
                </XView>
            </XView>
        </XView>
    );
};

export default withApp(
    'Invite People',
    'viewer',
    withUserInfo(() => {
        return (
            <>
                <XDocumentHead title={'Invite People'} />
                <InviteFragment />
            </>
        );
    }),
);
