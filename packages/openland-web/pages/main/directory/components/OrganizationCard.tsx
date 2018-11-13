import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XMutation } from 'openland-x/XMutation';
import { withOrganizationPublishedAlter } from '../../../../api/withOrganizationPublishedAlter';
import { XAvatar } from 'openland-x/XAvatar';
import { XOverflow } from '../../../../components/Incubator/XOverflow';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XButton } from 'openland-x/XButton';
import { makeNavigable } from 'openland-x/Navigable';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { TextDirectory } from 'openland-text/TextDirectory';

const OrganizationCardWrapper = Glamorous.div({
    backgroundColor: '#fff',
    padding: 16,
    marginLeft: -16,
    marginRight: -16,
    borderRadius: 8,
    '&:hover': {
        backgroundColor: '#F9F9F9'
    }
});

const OrganizationContentWrapper = Glamorous(XHorizontal)({
    flexGrow: 1,
    marginLeft: 12
});

const OrganizationInfoWrapper = Glamorous.div({
    flexGrow: 1
});

const OrganizationAvatar = Glamorous(XAvatar)({
    width: 74,
    height: 74,
    cursor: 'pointer',
    '& img': {
        width: '74px!important',
        height: '74px!important'
    }
});

const OrganizationTitle = Glamorous(XLink)({
    fontSize: 16,
    lineHeight: '19px',
    fontWeight: 600,
    letterSpacing: 0,
    color: '#000000!important'
});

const OrganizationAbout = Glamorous.div({
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 400,
    letterSpacing: 0,
    color: '#000000',
    marginTop: 4,
    height: 22,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    maxWidth: 450
});

const OrganizationMembers = makeNavigable(Glamorous.div({
    display: 'flex',
    flexAlign: 'center',
    marginTop: 8,
    cursor: 'pointer',
    '& *': {
        cursor: 'pointer'
    },
    '& span': {
        marginLeft: 8,
        fontSize: 13,
        letterSpacing: 0,
        color: 'rgba(0, 0, 0, 0.4)',
        fontWeight: 600,
        lineHeight: '18px'
    },
    '&:hover': {
        '& span': {
            color: '#1790ff'
        }
    }
}) as any);

export const AlterOrgPublishedButton = withOrganizationPublishedAlter((props) => (
    <XButton
        text={(props as any).published ? 'Hide from search' : 'Publish'}
        style="flat"
        action={async () => props.alterPublished({
            variables: {
                organizationId: (props as any).orgId,
                published: !(props as any).published
            }
        })}
    />
)) as React.ComponentType<{ orgId: string, published: boolean }>;

interface OrganizationCardProps {
    item: {
        id: string,
        superAccountId: string,
        name: string,
        photo: string | null,
        about: string | null,
        isMine: boolean,
        members: {
            user: {
                id: string,
                name: string,
                picture: string | null,
            }
        }[]
    };
}

export class OrganizationCard extends React.Component<OrganizationCardProps, { isHovered: boolean }> {
    constructor(props: OrganizationCardProps) {
        super(props);
        this.state = {
            isHovered: false,
        };
    }

    render() {
        let firstMember = this.props.item.members[0];
        return (
            <OrganizationCardWrapper
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <XHorizontal justifyContent="space-between" separator={10}>
                    <XLink path={'/directory/o/' + this.props.item.id}>
                        <OrganizationAvatar
                            cloudImageUuid={this.props.item.photo!!}
                            size="x-medium"
                            style="organization"
                            objectName={this.props.item.name}
                            objectId={this.props.item.id}
                        />
                    </XLink>
                    <OrganizationContentWrapper>
                        <OrganizationInfoWrapper>
                            <OrganizationTitle path={'/directory/o/' + this.props.item.id}>{this.props.item.name}</OrganizationTitle>
                            {this.props.item.about && <OrganizationAbout>{this.props.item.about}</OrganizationAbout>}
                            {firstMember && (
                                <OrganizationMembers path={'/directory/u/' + firstMember.user.id}>
                                    <XAvatar
                                        objectName={firstMember.user.name}
                                        objectId={firstMember.user.id}
                                        size="l-small"
                                        style="colorus"
                                        cloudImageUuid={firstMember.user.picture || undefined}
                                    />
                                    <span>{firstMember.user.name + (this.props.item.members.length > 1 ? (' +' + (this.props.item.members.length - 1) + ' more') : '')}</span>
                                </OrganizationMembers>
                            )}
                        </OrganizationInfoWrapper>
                        <XHorizontal separator={5}>
                            {this.props.item.isMine && this.state.isHovered && (
                                <XButton
                                    style="ghost"
                                    text={TextDirectory.labelYourOrganization}
                                    enabled={false}
                                />
                            )}
                            {!this.props.item.isMine && this.state.isHovered && (
                                <XButton
                                    style="primary"
                                    path={'/directory/o/' + this.props.item.id}
                                    text="View"
                                />
                            )}
                            <XOverflow
                                placement="bottom-end"
                                flat={true}
                                content={(
                                    <>
                                        <XMenuItem href={'/directory/o/' + this.props.item.id}>{TextDirectory.buttonViewProfile}</XMenuItem>

                                        {this.props.item.isMine && (
                                            <XMenuItem query={{ field: 'createChannel', value: this.props.item.id }}>{TextDirectory.buttonCreateChannel}</XMenuItem>
                                        )}

                                        <XWithRole role="admin" orgPermission={this.props.item.id}>
                                            <XMenuItem href={'/settings/organization/' + this.props.item.id} >{TextDirectory.buttonEdit}</XMenuItem>
                                        </XWithRole>

                                        {!this.props.item.isMine && (
                                            <XWithRole role={['super-admin', 'editor']}>
                                                <XMenuItem href={'/settings/organization/' + this.props.item.id}>{TextDirectory.buttonEdit}</XMenuItem>
                                            </XWithRole>
                                        )}

                                        {/* <XWithRole role={['super-admin', 'editor']}>
                                            <AlterOrgPublishedButton orgId={this.props.item.id} published={this.props.item.published} />
                                            <XMenuItem href={'/super/orgs/' + this.props.item.superAccountId}>{TextDirectory.buttonSuperEdit}</XMenuItem>
                                        </XWithRole> */}
                                    </>
                                )}
                            />
                        </XHorizontal>
                    </OrganizationContentWrapper>
                </XHorizontal>
            </OrganizationCardWrapper>
        );
    }
}