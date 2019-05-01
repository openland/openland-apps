import * as React from 'react';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XOverflow } from 'openland-web/components/XOverflow';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XButton } from 'openland-x/XButton';
import { TextDirectory } from 'openland-text/TextDirectory';
import { TextProfiles } from 'openland-text/TextProfiles';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XView } from 'react-mental';
import { css } from 'linaria';

const CommunityTitleInner = css`
    height: 22px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

interface XCommunityCardProps {
    community: {
        id: string;
        name: string;
        photo: string | null;
        isMine: boolean;
        membersCount: number;
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

        let button = this.state.isHovered ? (
            typeof customButton === 'undefined' ? (
                <XButton
                    style="primary"
                    path={path || '/directory/c/' + community.id}
                    text={TextProfiles.Organization.view}
                />
            ) : (
                customButton
            )
        ) : (
            undefined
        );

        let menu =
            typeof customMenu === 'undefined' ? (
                <XOverflow
                    placement="bottom-end"
                    flat={true}
                    content={
                        <>
                            {extraMenu}

                            <XMenuItem href={'/directory/c/' + community.id}>
                                {TextDirectory.buttonViewProfile}
                            </XMenuItem>

                            <XWithRole role="admin" orgPermission={community.id}>
                                <XMenuItem href="/settings/organization">
                                    {TextDirectory.buttonEdit}
                                </XMenuItem>
                            </XWithRole>

                            {!community.isMine && (
                                <XWithRole role={['super-admin', 'editor']}>
                                    <XMenuItem href={'/settings/organization/' + community.id}>
                                        {TextDirectory.buttonEdit}
                                    </XMenuItem>
                                </XWithRole>
                            )}
                        </>
                    }
                />
            ) : (
                customMenu
            );

        return (
            <XView
                backgroundColor="#ffffff"
                paddingVertical={12}
                paddingLeft={16}
                paddingRight={11}
                marginHorizontal={-16}
                borderRadius={8}
                cursor="pointer"
                hoverBackgroundColor="#F9F9F9"
                flexDirection="row"
                minWidth={0}
                path={path || '/directory/c/' + community.id}
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <XAvatar2 src={community.photo} title={community.name} id={community.id} />
                <XView minWidth={0} flexGrow={1} flexShrink={1} marginLeft={16} flexDirection="row">
                    <XView minWidth={0} flexGrow={1} flexShrink={1} marginRight={12}>
                        <XView
                            fontSize={14}
                            fontWeight="600"
                            lineHeight="22px"
                            color="#000000"
                            marginTop={-2}
                            marginBottom={2}
                        >
                            <div className={CommunityTitleInner}>{community.name}</div>
                        </XView>
                        <XView fontSize={13} lineHeight="18px" color="rgba(0, 0, 0, 0.5)">
                            {TextProfiles.Organization.membersLabel(community.membersCount)}
                        </XView>
                    </XView>
                    <XView flexDirection="row" alignItems="center">
                        {button}
                        <XView marginLeft={10}>{menu}</XView>
                    </XView>
                </XView>
            </XView>
        );
    }
}
