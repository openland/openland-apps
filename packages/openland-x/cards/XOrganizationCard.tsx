import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XAvatar } from 'openland-x/XAvatar';
import { XOverflow } from 'openland-web/components/XOverflow';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XButton } from 'openland-x/XButton';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { TextDiscover } from 'openland-text/TextDiscover';
import { TextProfiles } from 'openland-text/TextProfiles';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { useClient } from 'openland-web/utils/useClient';

const OrganizationCardWrapper = makeNavigable(
    Glamorous.div<NavigableChildProps>(() => ({
        cursor: 'pointer',
        backgroundColor: '#fff',
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 15,
        paddingRight: 11,
        marginLeft: -16,
        marginRight: -16,
        borderRadius: 8,
        '&:hover': {
            backgroundColor: '#F9F9F9',
        },
    })),
);

const OrganizationContent = Glamorous(XHorizontal)({
    flexGrow: 1,
    marginLeft: 12,
});

const OrganizationInfo = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexGrow: 1,
});

const OrganizationAvatar = Glamorous(XAvatar)({
    width: 74,
    height: 74,
    cursor: 'pointer',
    '& img': {
        width: '74px!important',
        height: '74px!important',
    },
    '& *': {
        cursor: 'pointer!important',
    },
});

const OrganizationTitle = Glamorous(XLink)({
    fontSize: 16,
    lineHeight: '19px',
    fontWeight: 600,
    letterSpacing: 0,
    color: '#000000!important',

    '&': {
        height: 19,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
    },
});

const OrganizationAbout = Glamorous.div({
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 400,
    letterSpacing: 0,
    color: '#000000',
    marginTop: 4,

    '&': {
        height: 22,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
    },
});

const OrganizationMembers = makeNavigable(Glamorous.div({
    display: 'flex',
    flexAlign: 'center',
    marginTop: 8,
    marginLeft: -2,
    cursor: 'pointer',
    '& *': {
        cursor: 'pointer',
    },
    '& span': {
        marginTop: 1,
        marginBottom: -1,
        marginLeft: 8,
        fontSize: 13,
        letterSpacing: 0,
        color: 'rgba(0, 0, 0, 0.4)',
        fontWeight: 600,
        lineHeight: '18px',
    },
    '&:hover': {
        '& span': {
            color: '#1790ff',
        },
    },
}) as any);

export const AlterOrgPublishedButton = ({
    orgId,
    published,
}: {
    orgId: string;
    published: boolean;
}) => {
    const client = useClient();

    return (
        <XButton
            text={
                published
                    ? TextProfiles.Organization.hideFromSearch
                    : TextProfiles.Organization.publish
            }
            style="flat"
            action={async () =>
                client.mutateOrganizationAlterPublished({
                    organizationId: orgId,
                    published: !published,
                })
            }
        />
    );
};

interface XOrganizationCardProps {
    organization: {
        id: string;
        superAccountId: string;
        name: string;
        photo: string | null;
        about: string | null;
        isMine: boolean;
        membersCount: number;
        members: {
            user: {
                id: string;
                name: string;
                photo: string | null;
            };
        }[];
    };
    path?: string;
    customButton?: any;
    customMenu?: any;
    extraMenu?: any;
}

export const XOrganizationCard = (props: XOrganizationCardProps) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const isMobile = React.useContext(IsMobileContext);
    let { organization, path, customButton, customMenu, extraMenu } = props;

    let firstMember = organization.members[0];

    let button =
        typeof customButton === 'undefined' ? (
            <>
                {organization.isMine && (
                    <XButton
                        style="ghost"
                        text={TextProfiles.Organization.youOrganization}
                        enabled={false}
                    />
                )}
                {!organization.isMine && (
                    <XButton
                        style="primary"
                        text={TextProfiles.Organization.view}
                        path={path || '/directory/o/' + organization.id}
                    />
                )}
            </>
        ) : (
            customButton
        );

    let menu =
        typeof customMenu === 'undefined' ? (
            <XOverflow
                placement="bottom-end"
                flat={true}
                content={
                    <>
                        {extraMenu}

                        <XMenuItem href={'/directory/o/' + organization.id}>
                            {TextDiscover.buttonViewProfile}
                        </XMenuItem>

                        {organization.isMine && (
                            <XMenuItem query={{ field: 'createRoom', value: organization.id }}>
                                {TextDiscover.buttonCreateRoom}
                            </XMenuItem>
                        )}

                        <XWithRole role="admin" orgPermission={organization.id}>
                            <XMenuItem href={'/settings/organization/' + organization.id}>
                                {TextDiscover.buttonEdit}
                            </XMenuItem>
                        </XWithRole>

                        {!organization.isMine && (
                            <XWithRole role={['super-admin', 'editor']}>
                                <XMenuItem href={'/settings/organization/' + organization.id}>
                                    {TextDiscover.buttonEdit}
                                </XMenuItem>
                            </XWithRole>
                        )}

                        {/* <XWithRole role={['super-admin', 'editor']}>
                            <AlterOrgPublishedButton orgId={organization.id} published={organization.published} />
                            <XMenuItem href={'/super/orgs/' + organization.superAccountId}>{TextDiscover.buttonSuperEdit}</XMenuItem>
                        </XWithRole> */}
                    </>
                }
            />
        ) : (
            customMenu
        );

    return (
        <OrganizationCardWrapper
            path={path || '/directory/o/' + organization.id}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <XHorizontal justifyContent="space-between" separator={10}>
                <OrganizationAvatar
                    cloudImageUuid={organization.photo!!}
                    size="x-medium"
                    style="organization"
                    objectName={organization.name}
                    objectId={organization.id}
                />
                <OrganizationContent>
                    <OrganizationInfo>
                        <OrganizationTitle>{organization.name}</OrganizationTitle>
                        {organization.about && (
                            <OrganizationAbout>{organization.about}</OrganizationAbout>
                        )}
                        {firstMember && (
                            <OrganizationMembers path={'/directory/u/' + firstMember.user.id}>
                                <XAvatar
                                    objectName={firstMember.user.name}
                                    objectId={firstMember.user.id}
                                    size="l-small"
                                    style="colorus"
                                    cloudImageUuid={firstMember.user.photo || undefined}
                                />
                                <span>
                                    {firstMember.user.name +
                                        TextProfiles.Organization.membersMore(
                                            organization.membersCount,
                                        )}
                                </span>
                            </OrganizationMembers>
                        )}
                    </OrganizationInfo>
                    <XHorizontal flexShrink={0} alignItems="flex-start">
                        <XHorizontal separator={5} flexShrink={0} alignItems="center" height={32}>
                            {isHovered && !isMobile && button}
                            {isMobile && button}
                            {menu}
                        </XHorizontal>
                    </XHorizontal>
                </OrganizationContent>
            </XHorizontal>
        </OrganizationCardWrapper>
    );
};
