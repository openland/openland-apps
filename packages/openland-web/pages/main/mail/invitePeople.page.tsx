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
import { XImage } from 'react-mental';
import { XModalController } from 'openland-x/showModal';

const textAlignCenterClassName = css`
    text-align: center;
`;

const contentWrapperStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const TextAlignCenter = ({ children }: { children: any }) => {
    return <div className={textAlignCenterClassName}>{children}</div>;
};

export const InviteFragment = ({
    asModalContent,
    modalContext,
}: {
    asModalContent?: boolean;
    modalContext?: XModalController;
}) => {
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
            paddingLeft={isMobile ? 40 : 0}
            paddingRight={isMobile ? 40 : 0}
        >
            {!asModalContent && (
                <XView position="absolute" right={20} top={20} zIndex={100}>
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
            <div className={contentWrapperStyles}>
                {asModalContent && (
                    <XView position="absolute" top={19} left={32}>
                        <XImage src="/static/landing/logotype.svg" width={145} height={42} />
                    </XView>
                )}
                <XView flexGrow={0} flexShrink={0} alignItems="center" width="100%">
                    {!isMobile && (
                        <XView marginTop={91}>
                            <ImgMembersEmpty />
                        </XView>
                    )}

                    <XView
                        fontSize={22}
                        maxWidth={isMobile ? 440 : 328}
                        marginTop={isMobile ? 100 : undefined}
                        fontWeight={'600'}
                        lineHeight={1.36}
                        color={'#000'}
                        width="100%"
                    >
                        <TextAlignCenter>
                            Share one of the links below with friends you want to invite
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
                            {!isMobile && 'Invite to'}
                            <XView
                                as="a"
                                marginLeft={4}
                                href="https://openland.com/mail/p/ZYx4d9K6kjIZ5jo6r69zc4AX3v"
                            >
                                Founder Chats
                            </XView>
                        </XView>
                        <OwnerLinkComponent
                            appInvite={founderChatsInvite}
                            id={founderChatId}
                            isRoom={true}
                            useRevoke={true}
                            withoutInput={isMobile}
                            modalContext={modalContext}
                        />
                        <XView marginTop={36}>
                            <XView
                                flexDirection="row"
                                color={'#000'}
                                fontWeight="600"
                                fontSize={20}
                                marginBottom={12}
                            >
                                {!isMobile && 'Invite to'}
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
                                id={primaryOrganizationId}
                                isOrganization={true}
                                useRevoke={true}
                                withoutInput={isMobile}
                                modalContext={modalContext}
                            />
                        </XView>
                    </XView>
                </XView>
                <XView width={isMobile ? '100%' : 540} flexGrow={1} flexShrink={1}>
                    {!moreInvite && (
                        <XView
                            flexDirection="row"
                            alignSelf="center"
                            alignItems="center"
                            cursor="pointer"
                            marginTop={30}
                            marginBottom={20}
                            paddingTop={8}
                            paddingBottom={8}
                            paddingLeft={11}
                            paddingRight={11}
                            onClick={() => showMoreInvite(true)}
                            borderRadius={20}
                            borderWidth={1}
                            borderColor="rgba(0,0,0,0.07)"
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
                        <XView marginTop={36} paddingBottom={20}>
                            <XView color={'#000'} fontWeight="600" fontSize={20} marginBottom={12}>
                                {!isMobile && 'Invite to'} Openland
                            </XView>
                            <OwnerLinkComponent
                                footerNote="Anyone can use this link to join Openland"
                                appInvite={openlandInvite}
                                withoutInput={isMobile}
                                modalContext={modalContext}
                            />
                        </XView>
                    )}
                </XView>
            </div>
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
