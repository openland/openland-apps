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

const CommunityCardWrapper = makeNavigable(Glamorous.div<NavigableChildProps>((props) => ({
    backgroundColor: '#fff',
    padding: '12px 16px',
    marginLeft: -16,
    marginRight: -16,
    borderRadius: 8,
    '&:hover': {
        backgroundColor: '#F9F9F9'
    },
    cursor: 'pointer'
})));

const CommunityContentWrapper = Glamorous(XHorizontal)({
    flexGrow: 1
});

const CommunityInfoWrapper = Glamorous.div({
    flexGrow: 1
});

const CommunityAvatar = Glamorous(XAvatar)({
    cursor: 'pointer'
});

const CommunityTitle = Glamorous(XLink)({
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
    letterSpacing: 0,
    color: '#000000!important',
    marginTop: '-2px!important',
    marginBottom: 2,
    display: 'block',

    '&': {
        height: 22,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical'
    }
});

const CommunityCounter = Glamorous.div({
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.5)'
});

const CommunityToolsWrapper = Glamorous(XHorizontal)({
    paddingTop: 4
});

interface CommunityCardProps {
    item: {
        id: string,
        name: string,
        photo: string | null,
        isMine: boolean,
        channels: any[],
    };
}

export class CommunityCard extends React.Component<CommunityCardProps, { isHovered: boolean }> {
    constructor(props: CommunityCardProps) {
        super(props);
        this.state = {
            isHovered: false,
        };
    }

    render() {
        let roomsCount = this.props.item.channels.filter(c => c && !c.hidden).length;
        return (
            <CommunityCardWrapper
                path={'/directory/c/' + this.props.item.id}
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <XHorizontal justifyContent="space-between" separator={8}>
                    <XLink path={'/directory/c/' + this.props.item.id}>
                        <CommunityAvatar
                            cloudImageUuid={this.props.item.photo!!}
                            style="room"
                            objectName={this.props.item.name}
                            objectId={this.props.item.id}
                        />
                    </XLink>
                    <CommunityContentWrapper>
                        <CommunityInfoWrapper>
                            <CommunityTitle path={'/directory/c/' + this.props.item.id}>{this.props.item.name}</CommunityTitle>
                            <CommunityCounter>{roomsCount + (roomsCount === 1 ? ' room' : ' rooms')}</CommunityCounter>
                        </CommunityInfoWrapper>
                        <CommunityToolsWrapper separator={5}>
                            {this.state.isHovered && (
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
                                        <XMenuItem href={'/directory/c/' + this.props.item.id}>{TextDirectory.buttonViewProfile}</XMenuItem>

                                        {this.props.item.isMine && (
                                            <XMenuItem query={{ field: 'createRoom', value: this.props.item.id }}>{TextDirectory.buttonCreateRoom}</XMenuItem>
                                        )}

                                        <XWithRole role="admin" orgPermission={this.props.item.id}>
                                            <XMenuItem href="/settings/organization">{TextDirectory.buttonEdit}</XMenuItem>
                                        </XWithRole>

                                        {!this.props.item.isMine && (
                                            <XWithRole role={['super-admin', 'editor']}>
                                                <XMenuItem href={'/settings/organization/' + this.props.item.id}>{TextDirectory.buttonEdit}</XMenuItem>
                                            </XWithRole>
                                        )}

                                        {/* <XWithRole role={['super-admin', 'editor']}>
                                            <AlterOrgPublishedButton orgId={this.props.item.id} published={this.props.item.published} />
                                        </XWithRole> */}
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