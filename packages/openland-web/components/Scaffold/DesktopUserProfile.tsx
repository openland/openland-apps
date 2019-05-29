import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import * as Cookie from 'js-cookie';
import { XVertical } from 'openland-x-layout/XVertical';
import { TextGlobal } from 'openland-text/TextGlobal';
import { XPopper } from 'openland-x/XPopper';
import { XMenuItem, XMenuVertical, XMenuItemSeparator } from 'openland-x/XMenuItem';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XModalContext } from 'openland-x-modal/XModalContext';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { withUserInfo } from '../UserInfo';
import { useClient } from 'openland-web/utils/useClient';
import { showAppInviteModal } from 'openland-web/fragments/modals/showAppInviteModal';
import { MyOrganizations_myOrganizations, UserShort_primaryOrganization } from 'openland-api/Types';

interface TitleContainerProps {
    id: string;
    src: string | null;
    title: string;
    subtitle: string;
    path: string;
}

interface UserPopperProps {
    id: string;
    name: string;
    picture: string | null;
    primaryOrganization?: UserShort_primaryOrganization;
    organizations?: MyOrganizations_myOrganizations[];
}

const TitleContainer = (props: TitleContainerProps) => (
    <XView
        as="a"
        marginBottom={4}
        paddingTop={8}
        paddingRight={18}
        paddingBottom={7}
        paddingLeft={18}
        color="rgba(0, 0, 0, 0.5)"
        flexDirection="row"
        hoverBackgroundColor="rgba(23, 144, 255, 0.05)"
        hoverColor="#1790ff"
        path={props.path}
        hoverTextDecoration="none"
    >
        <XAvatar2 title={props.title} id={props.id} src={props.src} />
        <XView paddingLeft={14}>
            <XView
                fontSize={15}
                fontWeight="600"
                lineHeight="20px"
                color="#000000"
                maxWidth={164}
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                overflow="hidden"
            >
                {props.title}
            </XView>
            <XView fontSize={14} lineHeight="20px" marginTop={1}>
                {props.subtitle}
            </XView>
        </XView>
    </XView>
);

const OtherOrgWrapper = Glamorous(XVertical)({
    overflow: 'scroll',
});

class UserPopper extends React.Component<UserPopperProps, { show: boolean }> {
    inner = 0;
    constructor(props: UserPopperProps) {
        super(props);
        this.state = { show: false };
    }

    componentDidUpdate() {
        if (canUseDOM) {
            let keepDomain = Cookie.defaults.domain;
            let keepPath = Cookie.defaults.path;
            let host = window.location.hostname.split('.').reverse();
            Cookie.defaults.domain = (host[1] ? host[1] + '.' : '') + host[0];
            Cookie.defaults.path = '/';
            Cookie.set('x-openland-user-photo', this.props.picture || '', {
                path: '/',
                expires: 3,
            });
            Cookie.defaults.domain = keepDomain;
            Cookie.defaults.path = keepPath;
        }
    }

    switch = () => {
        this.setState({
            show: !this.state.show,
        });
    };

    closer = () => {
        if (!this.inner) {
            this.setState({
                show: false,
            });
        }
    };

    onInner = (ref: any) => {
        this.inner += ref ? 1 : -1;
    };

    render() {
        let { primaryOrganization, organizations } = this.props;

        return (
            <XPopper
                placement="right"
                contentContainer={<XMenuVertical paddingTop={11} />}
                onClickOutside={this.closer}
                show={this.state.show}
                padding={25}
                marginLeft={23}
                marginBottom={5}
                content={
                    <XModalContext.Provider value={{ close: this.closer }}>
                        <XVertical separator="none">
                            <TitleContainer
                                id={this.props.id}
                                src={this.props.picture}
                                title={this.props.name}
                                subtitle={TextGlobal.viewProfile}
                                path={`/mail/u/${this.props.id}`}
                            />
                            <XMenuItem path="/settings/profile">{TextGlobal.settings}</XMenuItem>
                            <XMenuItem onClick={() => showAppInviteModal()}>
                                {TextGlobal.joinOpenland}
                            </XMenuItem>
                            <XMenuItem path="/auth/logout">{TextGlobal.signOut}</XMenuItem>

                            {primaryOrganization && (
                                <>
                                    <XMenuItemSeparator marginTop={12} marginBottom={8} />
                                    <TitleContainer
                                        id={primaryOrganization.id}
                                        src={primaryOrganization.photo}
                                        title={primaryOrganization.name}
                                        subtitle="Primary organization"
                                        path={'/directory/o/' + primaryOrganization.id}
                                    />

                                    {organizations && organizations.length > 1 && (
                                        <XPopper
                                            placement="right"
                                            contentContainer={<XMenuVertical />}
                                            showOnHover={true}
                                            padding={25}
                                            marginLeft={8}
                                            marginBottom={5}
                                            arrow={null}
                                            content={
                                                <OtherOrgWrapper
                                                    separator="none"
                                                    ref={this.onInner}
                                                    maxHeight="90vh"
                                                >
                                                    {organizations
                                                        .sort((a, b) =>
                                                            a.name.localeCompare(b.name),
                                                        )
                                                        .map((org, index) =>
                                                            index >= 0 ? (
                                                                <XMenuItem
                                                                    path={
                                                                        (org.isCommunity
                                                                            ? '/directory/c/'
                                                                            : '/directory/o/') +
                                                                        org.id
                                                                    }
                                                                    key={'other-' + org.id}
                                                                >
                                                                    {org.name}
                                                                </XMenuItem>
                                                            ) : null,
                                                        )}
                                                </OtherOrgWrapper>
                                            }
                                        >
                                            <XMenuItem iconRight="x-right">
                                                Other organizations
                                            </XMenuItem>
                                        </XPopper>
                                    )}
                                </>
                            )}
                        </XVertical>
                    </XModalContext.Provider>
                }
            >
                <div onClick={this.switch}>
                    <XAvatar2 src={this.props.picture} title={this.props.name} id={this.props.id} />
                </div>
            </XPopper>
        );
    }
}

export const DesktopUserProfile = withUserInfo<{ onClick?: any }>(() => {
    const client = useClient();
    const myOrgs = client.useMyOrganizations();
    const me = client.useAccount();
    return (
        <XVertical>
            <UserPopper
                picture={me.me!!.photo}
                name={me.me!!.name}
                id={me.me!!.id}
                primaryOrganization={me.me!!.primaryOrganization || undefined}
                organizations={
                    myOrgs && myOrgs.myOrganizations ? myOrgs.myOrganizations : undefined
                }
            />
        </XVertical>
    );
});
