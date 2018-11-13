import * as React from 'react';
import Glamorous from 'glamorous';
import { withUser } from '../../../api/withUserSimple';
import { User } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XDate } from 'openland-x-format/XDate';
import { XAvatar } from 'openland-x/XAvatar';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XLink } from 'openland-x/XLink';
import { XIcon } from 'openland-x/XIcon';
import { withRouter } from 'next/router';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView } from 'openland-x/XScrollView';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';
import WebsiteIcon from './icons/website-2.svg';
import LinkedinIcon from './icons/linkedin-2.svg';
import PhoneIcon from './icons/ic-phone.svg';
import { XModal } from 'openland-x-modal/XModal';
import { ModalBody, ModalCloser, ModalPic } from '../../../components/messenger/components/view/content/MessageImageComponent';
import ModalCloseIcon from '../../../components/messenger/components/icons/ic-modal-close.svg';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { Back } from './ProfileComponent';

const BackWrapper = Glamorous.div({
    background: '#F9F9F9',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '13px 12px 12px',
    '& i': {
        fontSize: 20,
        marginRight: 6,
        color: '#c1c7cf'
    },
    '& span': {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: -0.4,
        color: '#5c6a81'
    }
});

const HeaderWrapper = Glamorous.div({
    display: 'flex',
    position: 'relative',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)'
});

const HeaderAvatar = Glamorous.div({
    padding: 24
});

const HeaderInfo = Glamorous(XVertical)({
    paddingTop: 23,
});

const HeaderTitle = Glamorous.div({
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 0.6,
    marginRight: 9,
    lineHeight: '30px',
    color: '#334562'
});

const HeaderOrgTitle = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.29,
    letterSpacing: -0.6,
    color: '#99a2b0'
});

const HeaderTools = Glamorous.div({
    padding: 24
});

const LastSeenWrapper = Glamorous.div({
    alignSelf: 'flex-end',
    fontSize: 12,
    fontWeight: 500,
    color: 'rgb(153, 162, 176)',
    letterSpacing: -0.2
});

const OrgName = makeNavigable(Glamorous(XHorizontal)({
    cursor: 'pointer'
}) as any) as any;

const AvatarModal = (props: { photo?: string, userName?: string, userId?: string }) => {
    return (
        <XModal
            useTopCloser={true}
            width={512}
            heading={null}
            transparent={true}
            body={(
                <ModalBody>
                    <ModalCloser autoClose={true} className="closer">
                        <ModalCloseIcon />
                    </ModalCloser>
                    <ModalPic
                        srcCloud={props.photo}
                        resize={'fill'}
                        width={512}
                        height={512}
                    />
                </ModalBody>
            )}
            target={(
                <XAvatar
                    cloudImageUuid={props.photo || undefined}
                    size="s-medium"
                    style="user"
                    objectName={props.userName}
                    objectId={props.userId}
                />
            )}
        />
    );
};

const Header = (props: { userQuery: User }) => {
    let usr = props.userQuery.user;

    return (
        <HeaderWrapper>
            <HeaderAvatar>
                {usr.photo && <AvatarModal photo={usr.photo} userName={usr.name} userId={usr.id} />}
                {!usr.photo && (
                    <XAvatar
                        cloudImageUuid={undefined}
                        size="s-medium"
                        style="user"
                        objectName={usr.name}
                        objectId={usr.id}
                    />
                )}
            </HeaderAvatar>
            <HeaderInfo flexGrow={1} separator={3}>
                <XHorizontal separator={5}>
                    <HeaderTitle>{usr.name}</HeaderTitle>
                    {usr.lastSeen && usr.lastSeen !== 'online' && (
                        <LastSeenWrapper>
                            last seen: {usr.lastSeen === 'never_online' ? 'moments ago' : <XDate value={usr.lastSeen} format="humanize_cute" />}
                        </LastSeenWrapper>
                    )}
                </XHorizontal>
                {usr.primaryOrganization && (
                    <OrgName separator={2.5} alignItems="center" path={'/directory/o/' + usr.primaryOrganization.id}>
                        <XAvatar
                            cloudImageUuid={usr.primaryOrganization.photo || undefined}
                            style="organization"
                            size="x-small"
                            objectName={usr.primaryOrganization.name}
                            objectId={usr.primaryOrganization.id}
                        />
                        <HeaderOrgTitle>{usr.primaryOrganization.name}</HeaderOrgTitle>
                    </OrgName>
                )}
            </HeaderInfo>
            <HeaderTools>
                {usr.isYou
                    ? (<XButton
                        text="Edit profile"
                        path={'/settings/profile'}
                    />)
                    : (<XButton
                        text="Message"
                        style="primary"
                        path={'/mail/' + usr.id}
                    />)
                }
            </HeaderTools>
        </HeaderWrapper>
    );
};

const SectionContent = Glamorous.div<{ withTags?: boolean }>([
    {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '18px 24px 32px',
        borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
        '&:last-child': {
            borderBottom: 'none'
        }
    },
    (props) => (props.withTags) ? {
        padding: '10px 12px 22px 24px',

        '& > div': {
            margin: '6px 12px 6px 0!important'
        }
    } : {}
]);

const EditButton = Glamorous(XLink)({
    color: '#99a2b0',
    height: 32,
    lineHeight: '32px',
    fontSize: 14,
    letterSpacing: -0.2,
    fontWeight: 500,
    padding: '0 14px',
    cursor: 'pointer',
    '&:hover': {
        color: '#334562',
    },
    '&:active': {
        color: '#1790ff',
    },
});

const SocialIconWrapper = Glamorous.div({
    margin: '-1px 2px 1px 0',
    display: 'flex'
});

const About = (props: { userQuery: User }) => {
    let usr = props.userQuery.user;
    let hasLinks = (usr.linkedin || usr.website || usr.phone);
    // let hasLocations = usr.location;

    return (
        <>
            {hasLinks && (
                <>
                    <XSubHeader
                        title="Links"
                        right={usr.isYou ? (
                            <EditButton path={'/settings/profile'}>Edit</EditButton>
                        ) : undefined}
                    />
                    <SectionContent>
                        <XHorizontal>
                            {usr.website && (
                                <XButton
                                    href={usr.website}
                                    icon={<SocialIconWrapper><WebsiteIcon /></SocialIconWrapper>}
                                    text="Website"
                                />
                            )}
                            {usr.linkedin && (
                                <XButton
                                    href={usr.linkedin}
                                    icon={<SocialIconWrapper><LinkedinIcon /></SocialIconWrapper>}
                                    text="Linkedin"
                                />
                            )}
                            {usr.phone && (
                                <XButton
                                    icon={<SocialIconWrapper><PhoneIcon /></SocialIconWrapper>}
                                    text={usr.phone}
                                />
                            )}
                        </XHorizontal>
                    </SectionContent>
                </>
            )}
        </>
    );
};

const ChannelCardWrapper = makeNavigable(Glamorous.div<NavigableChildProps>(() => ({
    display: 'flex',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    padding: '15px 0 12px 25px',
    '&:hover': {
        backgroundColor: '#F9F9F9'
    },
    cursor: 'pointer'
})));

const ChannelCardInfo = Glamorous.div({
    flex: 1,
});

const ChannelCardTitle = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: -0.4,
    color: '#1790ff',
    marginBottom: 1,
});

const ChannelCardRole = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: -0.4,
    color: '#99a2b0',
});

const ChannelCardTools = Glamorous(XHorizontal)({
    padding: '4px 18px 0'
});

const ChannelAvatar = Glamorous(XAvatar)({
    margin: '0 12px 0 -5px'
});

interface ChannelCardProps {
    channel: {
        id: string,
        title: string,
        hidden: boolean,
        photos: string[],
        photo?: string,
        organization: {
            id: string,
            name: string,
            photo?: string,
        },
    };
}

class ChannelCard extends React.Component<ChannelCardProps> {
    state = {
        isHovered: false,
    };

    render() {
        const { channel } = this.props;

        return (
            <ChannelCardWrapper
                path={'/mail/' + channel.id}
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <ChannelAvatar
                    style="channel"
                    cloudImageUuid={channel.photo || channel.photos[0] || (channel.organization ? channel.organization.photo || undefined : undefined)}
                    objectName={channel.title}
                    objectId={channel.id}
                />
                <ChannelCardInfo>
                    <ChannelCardTitle>{channel.title}</ChannelCardTitle>
                    <ChannelCardRole>Member</ChannelCardRole>
                </ChannelCardInfo>
                <ChannelCardTools separator={5}>
                    <XButton
                        text="View"
                        style={this.state.isHovered ? 'primary' : 'default'}
                        path={'/mail/' + channel.id}
                    />
                </ChannelCardTools>
            </ChannelCardWrapper>
        );
    }
}

interface UserProfileInnerProps extends XWithRouter {
    userQuery: User;
    handlePageTitle?: any;
    onDirectory?: boolean;
}

const Channels = (props: { channels: any }) => {
    return (
        <>
            {props.channels && (props.channels.length > 0) && (
                <XSubHeader title="Channels" counter={props.channels.length} />
            )}
            {props.channels.map((c: any, i: any) => (
                c ? <ChannelCard key={i} channel={c} /> : null
            ))}
        </>
    );
};

class UserProfileInner extends React.Component<UserProfileInnerProps> {
    pageTitle: string | undefined = undefined;

    constructor (props: UserProfileInnerProps) {
        super(props);

        if (this.props.handlePageTitle) {
            this.pageTitle = props.userQuery.user.name;
            this.props.handlePageTitle(this.pageTitle);
        }
    }

    componentWillReceiveProps (newProps: UserProfileInnerProps) {
        if (newProps.handlePageTitle) {
            let title = newProps.userQuery.user.name;

            if (title !== this.pageTitle) {
                this.pageTitle = title;

                newProps.handlePageTitle(title);
            }
        }
    }

    handleRef = (ref?: any) => {
        if (!ref && this.props.onDirectory) {
            if (this.props.handlePageTitle) {
                this.pageTitle = undefined;
                this.props.handlePageTitle(undefined);
            }
        }
    }

    render() {
        let usr = this.props.userQuery.user;

        return (
            <div ref={this.handleRef}>
                <Back />
                <Header userQuery={this.props.userQuery} />
                <XScrollView height="calc(100% - 160px)">
                    <About userQuery={this.props.userQuery} />
                    <Channels channels={usr.channels.filter(c => c && !c.hidden)} />
                </XScrollView>
            </div>
        );
    }
}

const UserProvider = withUser(withRouter((props) => (
    props.data.user
        ? (
            <UserProfileInner
                userQuery={props.data}
                router={props.router}
                handlePageTitle={(props as any).handlePageTitle}
                onDirectory={(props as any).onDirectory}
            />
        )
        : <XLoader loading={true} />
))) as React.ComponentType<{ variables: { userId: string }, onDirectory?: boolean; handlePageTitle?: any }>;

export const UserProfile = (props: { userId: string, onDirectory?: boolean; handlePageTitle?: any }) => (
    <UserProvider
        variables={{ userId: props.userId }}
        handlePageTitle={props.handlePageTitle}
        onDirectory={props.onDirectory}
    />
);