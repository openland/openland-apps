import * as React from 'react';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { withUserInfo } from 'openland-web/components/UserInfo';
import { withApp } from 'openland-web/components/withApp';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import ImgMembersEmpty from 'openland-icons/img-members-empty-copy-6.svg';
import { XView } from 'react-mental';
import { OwnerLinkComponent } from 'openland-web/fragments/OwnerLinkComponent';
import { css } from 'linaria';

const textAlignCenterClassName = css`
    text-align: center;
`;

const TextAlignCenter = ({ children }: { children: any }) => {
    return <div className={textAlignCenterClassName}>{children}</div>;
};

const InviteFragment = ({
    founderChatsInvite,
    primaryOrganizationName,
    primaryOrganizationInvite,
    openlandInvite,
}: {
    founderChatsInvite: string;
    primaryOrganizationName: string;
    primaryOrganizationInvite: string;
    openlandInvite: string;
}) => {
    return (
        <XView flexDirection="row" flexGrow={1} justifyContent={'center'}>
            <XView flexDirection="column" alignItems="center">
                <ImgMembersEmpty />

                <XView
                    fontSize={22}
                    maxWidth={300}
                    fontWeight={'600'}
                    lineHeight={1.36}
                    color={'#000'}
                >
                    <TextAlignCenter>
                        Share one of the links below with people you want to invite
                    </TextAlignCenter>
                </XView>

                <XView width={540} marginTop={48}>
                    <XView
                        flexDirection="row"
                        color={'#000'}
                        fontWeight="600"
                        fontSize={16}
                        marginBottom={12}
                    >
                        Invite to
                        <XView as="a" marginLeft={4}>
                            Founder Chats
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
                            <XView as="a" marginLeft={4}>
                                {primaryOrganizationName}
                            </XView>
                        </XView>
                        <OwnerLinkComponent
                            footerNote="Anyone can use this link to join your organization"
                            appInvite={primaryOrganizationInvite}
                        />
                    </XView>

                    <XView marginTop={36}>
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
        const router = React.useContext(XRouterContext) as XRouter;
        const { routeQuery } = router;
        const invite = routeQuery.invite;

        const openlandInvite = invite;
        const primaryOrganizationName = 'SignalFire';
        const primaryOrganizationInvite = invite;
        const founderChatsInvite = invite;

        return (
            <>
                <XDocumentHead title={'Invite People'} />
                <InviteFragment
                    founderChatsInvite={founderChatsInvite}
                    primaryOrganizationName={primaryOrganizationName}
                    primaryOrganizationInvite={primaryOrganizationInvite}
                    openlandInvite={openlandInvite}
                />
            </>
        );
    }),
);
