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
import { XTag } from 'openland-x/XTag';
import { makeNavigable } from 'openland-x/Navigable';
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

const OrganizationMembers = makeNavigable(Glamorous.div({
    display: 'flex',
    flexAlign: 'center',
    marginTop: 7,
    cursor: 'pointer',
    '& *': {
        cursor: 'pointer'
    },
    '& span': {
        marginLeft: 8,
        fontSize: 14,
        letterSpacing: -0.4,
        color: '#99a2b0',
        fontWeight: 500,
        lineHeight: '18px'
    },
    '&:hover': {
        '& span': {
            color: '#1790ff'
        }
    }
})as any);

const OrganizationToolsWrapper = Glamorous(XHorizontal)({
    paddingTop: 1
});

class OrganizationTypes extends React.Component<{ orgTypes: string[], onPick: (q: SearchCondition) => void }> {
    render() {
        let elements = this.props.orgTypes.filter((e, i) => i <= 2).map((orgType, i) => (
            <XTag
                color="gray"
                rounded={true}
                key={'_org_type_text_' + i}
                onClick={() => this.props.onPick({ type: 'organizationType', value: orgType, label: orgType })}
                text={orgType}
            />
        ));
        if (this.props.orgTypes.length > 3) {
            elements.push(
                <XTag
                    color="gray"
                    rounded={true}
                    key={'_org_type_text_more'}
                    text={'+ ' + String(this.props.orgTypes.length - 3) + ' more'}
                />
            );
        }
        return elements;
    }
}

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
                            objectName={this.props.item.name}
                            objectId={this.props.item.id}
                        />
                    </XLink>
                    <OrganizationContentWrapper>
                        <OrganizationInfoWrapper>
                            <OrganizationTitle path={'/directory/o/' + this.props.item.id}>{this.props.item.name}</OrganizationTitle>
                            {firstMember && (
                                <OrganizationMembers path={'/directory/u/' + firstMember.user.id}>
                                    <XAvatar
                                        objectName={firstMember.user.name}
                                        objectId={firstMember.user.id}
                                        size="x-small"
                                        style="colorus"
                                        cloudImageUuid={firstMember.user.picture || undefined}
                                    />
                                    <span>{firstMember.user.name + (this.props.item.members.length > 1 ? (' +' + (this.props.item.members.length - 1) + ' more') : '')}</span>
                                </OrganizationMembers>
                            )}
                            <OrganizationCardTypeWrapper separator={0}>
                                {this.props.item.locations && (this.props.item.locations.length > 0) && (
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
                                    text={TextDirectory.labelYourOrganization}
                                    enabled={false}
                                />
                            )}
                            {!this.props.item.isMine && !this.props.item.editorial && (
                                <XButton
                                    style={this.state.isHovered ? 'primary' : 'default'}
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

                                        <XWithRole role={['super-admin', 'editor']}>
                                            <AlterOrgPublishedButton orgId={this.props.item.id} published={this.props.item.published} />
                                            <XMenuItem href={'/super/orgs/' + this.props.item.superAccountId}>{TextDirectory.buttonSuperEdit}</XMenuItem>
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