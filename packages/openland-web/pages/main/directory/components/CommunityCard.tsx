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
import { makeNavigable } from 'openland-x/Navigable';
import { AlterOrgPublishedButton } from './OrganizationCard';

interface SearchCondition {
    type: 'name' | 'location' | 'organizationType' | 'interest';
    value: string | string[];
    label: string;
}

const CommunityCardWrapper = makeNavigable(Glamorous.div({
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    backgroundColor: '#fff',
    padding: '16px 25px 15px 20px',
    '&:hover': {
        backgroundColor: '#f9fafb'
    },
    cursor: 'pointer'
}));

const CommunityContentWrapper = Glamorous(XHorizontal)({
    flexGrow: 1,
    marginLeft: 1
});

const CommunityInfoWrapper = Glamorous.div({
    flexGrow: 1
});

const CommunityAvatar = Glamorous(XAvatar)({
    cursor: 'pointer'
});

const CommunityTitle = Glamorous(XLink)({
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: 500,
    letterSpacing: -0.4,
    color: '#1790ff',
    display: 'block',
    marginBottom: 3
});

const CommunityCounter = Glamorous.div({
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 500,
    letterSpacing: -0.5,
    color: '#99a2b0'
});

const CommunityToolsWrapper = Glamorous(XHorizontal)({
    paddingTop: 2
});

interface CommunityCardProps {
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

export class CommunityCard extends React.Component<CommunityCardProps, { isHovered: boolean }> {
    constructor(props: CommunityCardProps) {
        super(props);
        this.state = {
            isHovered: false,
        };
    }

    render() {
        return (
            <CommunityCardWrapper
                path={'/o/' + this.props.item.id}
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <XHorizontal justifyContent="space-between" separator={12}>
                    <XLink path={'/o/' + this.props.item.id}>
                        <CommunityAvatar
                            cloudImageUuid={this.props.item.photo!!}
                            size="small"
                            style="channel"
                        />
                    </XLink>
                    <CommunityContentWrapper>
                        <CommunityInfoWrapper>
                            <CommunityTitle path={'/o/' + this.props.item.id}>{this.props.item.name}</CommunityTitle>
                            <CommunityCounter>154 channels</CommunityCounter>
                        </CommunityInfoWrapper>
                        <CommunityToolsWrapper>
                            <XButton
                                style={this.state.isHovered ? 'primary-sky-blue' : 'default'}
                                size="r-default"
                                path={'/mail/' + this.props.item.id}
                                text="View"
                            />
                            <XOverflow
                                placement="bottom-end"
                                content={(
                                    <>
                                        <XMenuItem style="primary-sky-blue" href={'/o/' + this.props.item.id}>{TextDirectory.buttonViewProfile}</XMenuItem>

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
                        </CommunityToolsWrapper>
                    </CommunityContentWrapper>
                </XHorizontal>
            </CommunityCardWrapper>
        );
    }
}