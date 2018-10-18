import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XAvatar } from 'openland-x/XAvatar';
import { XOverflow } from '../../../../components/Incubator/XOverflow';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { TextDirectory } from 'openland-text/TextDirectory';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';
import { AlterOrgPublishedButton } from './OrganizationCard';

interface SearchCondition {
    type: 'name' | 'location' | 'organizationType' | 'interest';
    value: string | string[];
    label: string;
}

const CommunityCardWrapper = makeNavigable(Glamorous.div<NavigableChildProps>((props) => ({
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    backgroundColor: '#fff',
    padding: '16px 25px 15px 20px',
    '&:hover': {
        backgroundColor: '#F9F9F9'
    },
    cursor: 'pointer'
})));

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
        channels: any[],
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
        let channelsCount = this.props.item.channels.filter(c => c && !c.hidden).length;
        return (
            <CommunityCardWrapper
                path={'/directory/c/' + this.props.item.id}
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <XHorizontal justifyContent="space-between" separator={12}>
                    <XLink path={'/directory/c/' + this.props.item.id}>
                        <CommunityAvatar
                            cloudImageUuid={this.props.item.photo!!}
                            size="small"
                            style="channel"
                            objectName={this.props.item.name}
                            objectId={this.props.item.id}
                        />
                    </XLink>
                    <CommunityContentWrapper>
                        <CommunityInfoWrapper>
                            <CommunityTitle path={'/directory/c/' + this.props.item.id}>{this.props.item.name}</CommunityTitle>
                            <CommunityCounter>{channelsCount + (channelsCount === 1 ? ' channel' : ' channels')}</CommunityCounter>
                        </CommunityInfoWrapper>
                        <CommunityToolsWrapper separator={5}>
                            <XButton
                                style={this.state.isHovered ? 'primary' : 'default'}
                                path={'/directory/o/' + this.props.item.id}
                                text="View"
                            />
                            <XOverflow
                                placement="bottom-end"
                                flat={true}
                                content={(
                                    <>
                                        <XMenuItem href={'/directory/c/' + this.props.item.id}>{TextDirectory.buttonViewProfile}</XMenuItem>

                                        {this.props.item.isMine && (
                                            <XMenuItem query={{ field: 'createChannel', value: this.props.item.id }}>{TextDirectory.buttonCreateChannel}</XMenuItem>
                                        )}

                                        <XWithRole role="admin" orgPermission={this.props.item.id}>
                                            <XMenuItem href="/settings/organization">{TextDirectory.buttonEdit}</XMenuItem>
                                        </XWithRole>

                                        {!this.props.item.isMine && (
                                            <XWithRole role={['super-admin', 'editor']}>
                                                <XMenuItem href={'/settings/organization/' + this.props.item.id}>{TextDirectory.buttonEdit}</XMenuItem>
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