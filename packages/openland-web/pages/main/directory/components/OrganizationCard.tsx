import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { withOrganizationFollow } from '../../../../api/withOrganizationFollow';
import { XMutation } from 'openland-x/XMutation';
import { withOrganizationPublishedAlter } from '../../../../api/withOrganizationPublishedAlter';
import { XAvatar } from 'openland-x/XAvatar';
import { XOverflow } from '../../../../components/Incubator/XOverflow';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XButton } from 'openland-x/XButton';
import { XTag } from 'openland-x/XTag';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { TextDirectory } from 'openland-text/TextDirectory';

interface SearchCondition {
    type: 'name' | 'location' | 'organizationType' | 'interest';
    value: string | string[];
    label: string;
}

const OrganizationCardWrapper = Glamorous.div({
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    backgroundColor: '#fff',
    padding: '22px 18px 19px 24px',
    '&:hover': {
        backgroundColor: '#f9fafb'
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
    cursor: 'pointer'
});

const OrganizationTitle = Glamorous(XLink)({
    fontSize: 16,
    lineHeight: '20px',
    fontWeight: 500,
    letterSpacing: -0.5,
    color: '#5c6a81',
    '&:hover': {
        color: '#1790ff',
    }
});

const OrganizationMembers = Glamorous.div({
    display: 'flex',
    flexAlign: 'center',
    marginTop: 7,

    '& span': {
        marginLeft: 8,
        fontSize: 14,
        letterSpacing: -0.4,
        color: '#99a2b0',
        fontWeight: 500,
        lineHeight: '18px'
    }
});

const OrganizationToolsWrapper = Glamorous(XHorizontal)({
    paddingTop: 1
});

class OrganizationTypes extends React.Component<{ orgTypes: string[], onPick: (q: SearchCondition) => void }> {
    render() {
        [...this.props.orgTypes.filter((e, i) => i <= 2),
        ...(this.props.orgTypes.length > 3
            ? ['+ ' + String(this.props.orgTypes.length - 3) + ' more']
            : [])].join(' • ');
        let elements = [];
        let key = 0;
        for (let orgType of this.props.orgTypes.filter((e, i) => i <= 2)) {
            key++;
            elements.push(
                <XTag
                    color="gray"
                    rounded={true}
                    key={'_org_type_text_' + key}
                    onClick={() => this.props.onPick({ type: 'organizationType', value: orgType, label: orgType })}
                    text={orgType}
                />
            );
        }
        elements.pop();
        if (this.props.orgTypes.length > 3) {
            key++;
            elements.push(
                <XTag
                    color="gray"
                    rounded={true}
                    key={'_org_type_text_' + key + 1}
                    text={'+ ' + String(this.props.orgTypes.length - 3) + ' more'}
                />
            );
        }
        return elements;
    }
}

const OrganizationFollowBtn = withOrganizationFollow((props) => (
    <XMutation
        mutation={props.followOrganization}
        variables={{ organizationId: (props as any).organizationId, follow: !(props as any).followed }}
    >
        <XButton
            iconOpacity={0.4}
            style={(props as any).followed ? 'ghost' : 'default'}
            text={(props as any).followed ? TextDirectory.buttonFollowing : TextDirectory.buttonFollow}
            icon={(props as any).followed ? 'check' : undefined}
        />
    </XMutation>
)) as React.ComponentType<{ organizationId: string, followed: boolean }>;

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
        name: string,
        photo: string | null,
        locations: string[] | null,
        interests: string[] | null,
        organizationType: string[] | null,
        isMine: boolean,
        followed: boolean,
        published: boolean,
        editorial: boolean,
        members: {
            user: {
                id: string,
                name: string,
                picture: string | null,
            }
        }[]
    };
    onPick: (q: SearchCondition) => void;
}

const OrganizationCardTypeWrapper = Glamorous(XHorizontal)({
    flexWrap: 'wrap',
    marginTop: 11,
    '& > div': {
        marginRight: 8
    }
});

export class OrganizationCard extends React.Component<OrganizationCardProps, { isHovered: boolean }> {
    tagsCounter = (data: string[]) => {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            if (i === 2) {
                arr.push({ label: `+ ${data.length - 2} more`, value: undefined });
                break;
            }
            arr.push({ label: data[i], value: data[i] });
        }
        return arr;
    }

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
                <XHorizontal justifyContent="space-between" separator={12}>
                    <XLink path={'/directory/o/' + this.props.item.id}>
                        <OrganizationAvatar
                            cloudImageUuid={this.props.item.photo!!}
                            size="x-medium"
                            style="organization"
                        />
                    </XLink>
                    <OrganizationContentWrapper>
                        <OrganizationInfoWrapper>
                            <OrganizationTitle path={'/directory/o/' + this.props.item.id}>{this.props.item.name}</OrganizationTitle>
                            {firstMember && <OrganizationMembers>
                                <XAvatar
                                    userName={firstMember.user.name}
                                    userId={firstMember.user.id}
                                    size="x-small"
                                    style="colorus"
                                    cloudImageUuid={firstMember.user.picture || undefined}
                                />
                                <span>{firstMember.user.name + (this.props.item.members.length > 1 ? (' +' + (this.props.item.members.length - 1) + ' more') : '')}</span>
                            </OrganizationMembers>}
                            <OrganizationCardTypeWrapper separator={0}>
                                {this.props.item.locations && (
                                    <XTag
                                        color="gray"
                                        rounded={true}
                                        text={(this.props.item.locations || [])[0]}
                                        onClick={() => this.props.onPick({ type: 'location', value: (this.props.item.locations || [])[0], label: (this.props.item.locations || [])[0] })}
                                    />
                                )}
                                {this.props.item.organizationType && (
                                    <OrganizationTypes orgTypes={this.props.item.organizationType} onPick={this.props.onPick} />
                                )}
                            </OrganizationCardTypeWrapper>
                        </OrganizationInfoWrapper>
                        <OrganizationToolsWrapper separator={5}>
                            {this.props.item.isMine && (
                                <XButton
                                    style="ghost"
                                    size="r-default"
                                    text={TextDirectory.labelYourOrganization}
                                    enabled={false}
                                />
                            )}
                            {!this.props.item.isMine && !this.props.item.editorial && (
                                <XButton
                                    style={this.state.isHovered ? 'primary-sky-blue' : 'default'}
                                    size="r-default"
                                    path={'/mail/' + this.props.item.id}
                                    text={TextDirectory.labelSendMessage}
                                />
                            )}
                            <XOverflow
                                placement="bottom-end"
                                flat={true}
                                content={(
                                    <>
                                        <XMenuItem style="primary-sky-blue" href={'/directory/o/' + this.props.item.id}>{TextDirectory.buttonViewProfile}</XMenuItem>

                                        {this.props.item.isMine && (
                                            <XWithRole role="admin" orgPermission={true}>
                                                <XMenuItem style="primary-sky-blue" href="/settings/organization">{TextDirectory.buttonEdit}</XMenuItem>
                                            </XWithRole>
                                        )}

                                        {!this.props.item.isMine && (
                                            <XWithRole role={['super-admin', 'editor']}>
                                                <XMenuItem style="primary-sky-blue" href={'/settings/organization/' + this.props.item.id}>{TextDirectory.buttonEdit}</XMenuItem>
                                            </XWithRole>
                                        )}

                                        <XWithRole role={['super-admin', 'editor']}>
                                            <AlterOrgPublishedButton orgId={this.props.item.id} published={this.props.item.published} />
                                        </XWithRole>
                                    </>
                                )}
                            />
                        </OrganizationToolsWrapper>
                    </OrganizationContentWrapper>
                </XHorizontal>
            </OrganizationCardWrapper>
        );
    }
}