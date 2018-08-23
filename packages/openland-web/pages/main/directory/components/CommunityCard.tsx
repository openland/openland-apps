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
    padding: '20px 18px 20px 24px',
    '&:last-child': {
        borderBottom: 'none'
    }
});

const OrganizationContentWrapper = Glamorous(XHorizontal)({
    flexGrow: 1,
    marginLeft: 8
});

const OrganizationInfoWrapper = Glamorous.div({
    flexGrow: 1
});

const OrganizationAvatar = Glamorous(XAvatar)({
    cursor: 'pointer'
});

const OrganizationTitle = Glamorous(XLink)({
    height: 22,
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 0.6,
    color: '#1f3449',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '100%'
});

const OrganizationLocation = Glamorous.div({
    fontSize: 14,
    letterSpacing: -0.2,
    color: '#1f3449',
    opacity: 0.5,
    margin: '2px 0 -2px 20px',
    cursor: 'pointer'
});

const OrganizationTitleWrapper = Glamorous.div({
    display: 'flex',
    padding: '6px 0',
});

const OrganizationTypesText = Glamorous.div(props => ({
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.2,
    color: '#1f3449',
    opacity: 0.5,
    marginBottom: 6,
    cursor: 'pointer'
}));

const OrganizationToolsWrapper = Glamorous(XHorizontal)({
    paddingTop: 4
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
            elements.push(<OrganizationTypesText key={'_org_type_text_' + key} onClick={() => this.props.onPick({ type: 'organizationType', value: orgType, label: orgType })}>{orgType}</OrganizationTypesText>);
            elements.push(<OrganizationTypesText key={'_org_type_text_' + key + 1}>{'•'}</OrganizationTypesText>);
        }
        elements.pop();
        if (this.props.orgTypes.length > 3) {
            key++;
            elements.push(<OrganizationTypesText key={'_org_type_text_' + key}>{'•'}</OrganizationTypesText>);
            elements.push(<OrganizationTypesText key={'_org_type_text_' + key + 1}>{'+ ' + String(this.props.orgTypes.length - 3) + ' more'}</OrganizationTypesText>);
        }
        return (
            <XHorizontal separator={2}>{elements}</XHorizontal>
        );
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

const AlterOrgPublishedButton = withOrganizationPublishedAlter((props) => (
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
    };
    onPick: (q: SearchCondition) => void;
}

const OrganizationCardTypeWrapper = Glamorous(XHorizontal)({
    flexWrap: 'wrap',
    '& > div': {
        marginRight: 8
    }
});

export const CommunityCard = (props: OrganizationCardProps) => {
    const tagsCounter = (data: string[]) => {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            if (i === 2) {
                arr.push({ label: `+ ${data.length - 2} more`, value: undefined });
                break;
            }
            arr.push({ label: data[i], value: data[i] });
        }
        return arr;
    };
    return (
        <OrganizationCardWrapper>
            <XHorizontal justifyContent="space-between" separator={12}>
                <XLink path={'/o/' + props.item.id}>
                    <OrganizationAvatar
                        cloudImageUuid={props.item.photo!!}
                        size="s-large"
                        style="organization"
                    />
                </XLink>
                <OrganizationContentWrapper>
                    <OrganizationInfoWrapper>
                        <OrganizationTitleWrapper>
                            <OrganizationTitle path={'/o/' + props.item.id}>{props.item.name}</OrganizationTitle>
                            <OrganizationLocation onClick={() => props.onPick({ type: 'location', value: (props.item.locations || [])[0], label: (props.item.locations || [])[0] })}>{(props.item.locations || [])[0]}</OrganizationLocation>
                        </OrganizationTitleWrapper>
                        {props.item.organizationType && (
                            <OrganizationTypes orgTypes={props.item.organizationType} onPick={props.onPick} />
                        )}
                        {props.item.interests && (
                            <OrganizationCardTypeWrapper separator={0}>
                                {tagsCounter(props.item.interests).map((tag, i) => (
                                    <XTag
                                        key={'_org_tag_' + props.item.id + i}
                                        text={tag.label}
                                        onClick={tag.value ? () => props.onPick({ type: 'interest', value: tag.value!!, label: tag.label }) : undefined}
                                    />
                                ))}
                            </OrganizationCardTypeWrapper>
                        )}
                    </OrganizationInfoWrapper>
                    <OrganizationToolsWrapper>
                        {props.item.isMine &&
                            <XButton style="ghost" text={TextDirectory.labelYourOrganization} enabled={false} />}
                        {!props.item.isMine &&
                            <OrganizationFollowBtn followed={props.item.followed} organizationId={props.item.id} />}
                        {!props.item.isMine && !props.item.editorial &&
                            <XButton style="primary" path={'/mail/' + props.item.id} text={TextDirectory.labelSendMessage} />}

                        <XOverflow
                            placement="bottom-end"
                            content={(
                                <>
                                    <XMenuItem href={'/o/' + props.item.id}>{TextDirectory.buttonViewProfile}</XMenuItem>

                                    {props.item.isMine && (
                                        <XWithRole role="admin" orgPermission={true}>
                                            <XMenuItem href="/settings/organization">{TextDirectory.buttonEdit}</XMenuItem>
                                        </XWithRole>
                                    )}

                                    {!props.item.isMine && (
                                        <XWithRole role={['super-admin', 'editor']}>
                                            <XMenuItem href={'/settings/organization/' + props.item.id}>{TextDirectory.buttonEdit}</XMenuItem>
                                        </XWithRole>
                                    )}

                                    <XWithRole role={['super-admin', 'editor']}>
                                        <AlterOrgPublishedButton orgId={props.item.id} published={props.item.published} />
                                    </XWithRole>
                                </>
                            )}
                        />
                    </OrganizationToolsWrapper>
                </OrganizationContentWrapper>
            </XHorizontal>
        </OrganizationCardWrapper>
    );
};