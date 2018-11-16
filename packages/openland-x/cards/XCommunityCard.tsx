import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XAvatar } from 'openland-x/XAvatar';
import { XOverflow } from '../../openland-web/components/Incubator/XOverflow';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XButton } from 'openland-x/XButton';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { TextDirectory } from 'openland-text/TextDirectory';
import { TextProfiles } from 'openland-text/TextProfiles';
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

const CommunityContent = Glamorous(XHorizontal)({
    flexGrow: 1
});

const CommunityInfo = Glamorous.div({
    flexGrow: 1
});

const CommunityAvatar = Glamorous(XAvatar)({
    cursor: 'pointer',
    '& *': {
        cursor: 'pointer'
    }
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

const CommunityTools = Glamorous(XHorizontal)({
    paddingTop: 4
});

interface XCommunityCardProps {
    community: {
        id: string,
        name: string,
        photo: string | null,
        isMine: boolean,
        channels: any[],
    };
    path?: string;
    customButton?: any;
    customMenu?: any;
    extraMenu?: any;
}

interface XCommunityCardState {
    isHovered: boolean;
}

export class XCommunityCard extends React.Component<XCommunityCardProps, XCommunityCardState> {
    state = {
        isHovered: false,
    };

    render() {
        let { community, path, customButton, customMenu, extraMenu } = this.props;
        let roomsCount = community.channels.filter(c => c && !c.hidden).length;

        let button = (typeof customButton === 'undefined') ? (
            <XButton
                style="primary"
                path={path || '/directory/c/' + community.id}
                text={TextProfiles.Organization.view}
            />
        ) : customButton;

        let menu = (typeof customMenu === 'undefined') ? (
            <XOverflow
                placement="bottom-end"
                flat={true}
                content={(
                    <>
                        {extraMenu}

                        <XMenuItem href={'/directory/c/' + community.id}>{TextDirectory.buttonViewProfile}</XMenuItem>

                        {community.isMine && (
                            <XMenuItem query={{ field: 'createRoom', value: community.id }}>{TextDirectory.buttonCreateRoom}</XMenuItem>
                        )}

                        <XWithRole role="admin" orgPermission={community.id}>
                            <XMenuItem href="/settings/organization">{TextDirectory.buttonEdit}</XMenuItem>
                        </XWithRole>

                        {!community.isMine && (
                            <XWithRole role={['super-admin', 'editor']}>
                                <XMenuItem href={'/settings/organization/' + community.id}>{TextDirectory.buttonEdit}</XMenuItem>
                            </XWithRole>
                        )}

                        {/* <XWithRole role={['super-admin', 'editor']}>
                            <AlterOrgPublishedButton orgId={community.id} published={community.published} />
                        </XWithRole> */}
                    </>
                )}
            />
        ) : customMenu;

        return (
            <CommunityCardWrapper
                path={path || '/directory/c/' + community.id}
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <XHorizontal justifyContent="space-between" separator={8}>
                    <CommunityAvatar
                        cloudImageUuid={community.photo!!}
                        style="room"
                        objectName={community.name}
                        objectId={community.id}
                    />
                    <CommunityContent>
                        <CommunityInfo>
                            <CommunityTitle>{community.name}</CommunityTitle>
                            <CommunityCounter>{TextProfiles.Organization.roomsLabel(roomsCount)}</CommunityCounter>
                        </CommunityInfo>
                        <CommunityTools separator={5}>
                            {this.state.isHovered && button}
                            {menu}
                        </CommunityTools>
                    </CommunityContent>
                </XHorizontal>
            </CommunityCardWrapper>
        );
    }
}