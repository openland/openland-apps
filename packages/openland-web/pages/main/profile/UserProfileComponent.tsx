import * as React from 'react';
import Glamorous from 'glamorous';
import { withUser } from '../../../api/withUserSimple';
import { User } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XDate } from 'openland-x-format/XDate';
import { XAvatar } from 'openland-x/XAvatar';
import { XSubHeader, XSubHeaderRight } from 'openland-x/XSubHeader';
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

const BackWrapper = Glamorous.div({
    background: '#f9fafb',
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

const Back = (props: { callback: () => void }) => (
    <BackWrapper onClick={props.callback}>
        <XIcon icon="chevron_left" />
        <span>Back</span>
    </BackWrapper>
);

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

const Header = (props: { userQuery: User }) => {
    let usr = props.userQuery.user;

    return (
        <HeaderWrapper>
            <HeaderAvatar>
                <XAvatar
                    cloudImageUuid={usr.photo || undefined}
                    size="s-medium"
                    style="user"
                    userName={usr.name}
                    userId={usr.id}
                />
            </HeaderAvatar>
            <HeaderInfo flexGrow={1} separator={3}>
                <XHorizontal separator={5}>
                    <HeaderTitle>{usr.name}</HeaderTitle>
                    {usr.lastSeen && <LastSeenWrapper>last seen: <XDate value={usr.lastSeen} format="time" /></LastSeenWrapper>}
                </XHorizontal>
                {usr.primaryOrganization && (
                    <OrgName separator={2.5} alignItems="center" path={'/directory/o/' + usr.primaryOrganization.id}>
                        <XAvatar
                            cloudImageUuid={usr.primaryOrganization.photo || undefined}
                            style="organization"
                            size="x-small"
                        />
                        <HeaderOrgTitle>{usr.primaryOrganization.name}</HeaderOrgTitle>
                    </OrgName>
                )}
            </HeaderInfo>
            <HeaderTools>
                {usr.isYou
                    ? (<XButton
                        size="r-default"
                        text="Edit profile"
                        path={'/settings/profile'}
                    />)
                    : (<XButton
                        size="r-default"
                        text="Message"
                        style="primary-sky-blue"
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
                    <XSubHeader title="Links">
                        {usr.isYou && (
                            <XSubHeaderRight>
                                <EditButton path={'/settings/profile'}>Edit</EditButton>
                            </XSubHeaderRight>
                        )}
                    </XSubHeader>
                    <SectionContent>
                        <XHorizontal>
                            {usr.website && (
                                <XButton
                                    href={usr.website}
                                    icon={<SocialIconWrapper><WebsiteIcon /></SocialIconWrapper>}
                                    size="r-default"
                                    text="Website"
                                />
                            )}
                            {usr.linkedin && (
                                <XButton
                                    href={usr.linkedin}
                                    icon={<SocialIconWrapper><LinkedinIcon /></SocialIconWrapper>}
                                    size="r-default"
                                    text="Linkedin"
                                />
                            )}
                            {usr.phone && (
                                <XButton
                                    icon={<SocialIconWrapper><PhoneIcon /></SocialIconWrapper>}
                                    size="r-default"
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
        backgroundColor: '#f9fafb'
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
                />
                <ChannelCardInfo>
                    <ChannelCardTitle>{channel.title}</ChannelCardTitle>
                    <ChannelCardRole>Member</ChannelCardRole>
                </ChannelCardInfo>
                <ChannelCardTools separator={5}>
                    <XButton
                        text="View"
                        size="r-default"
                        style={this.state.isHovered ? 'primary-sky-blue' : 'default'}
                        path={'/mail/' + channel.id}
                    />
                </ChannelCardTools>
            </ChannelCardWrapper>
        );
    }
}

interface UserProfileInnerProps extends XWithRouter {
    userQuery: User;
    onBack: () => void;
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

const UserProfileInner = (props: UserProfileInnerProps) => {
    let usr = props.userQuery.user;
    return (
        <>
            <Back callback={props.onBack} />
            <Header userQuery={props.userQuery} />
            <XScrollView height="calc(100% - 160px)">
                <About userQuery={props.userQuery} />
                <Channels channels={usr.channels.filter(c => c && !c.hidden)} />
            </XScrollView>
        </>
    );
};

const UserProvider = withUser(withRouter((props) => (
    props.data.user
        ? (
            <UserProfileInner
                userQuery={props.data}
                onBack={(props as any).onBack}
                router={props.router}
            />
        )
        : <XLoader loading={true} />
))) as React.ComponentType<{ onBack: () => void, variables: { userId: string } }>;

export const UserProfile = (props: { userId: string, onBack: () => void }) => (
    <UserProvider
        variables={{ userId: props.userId }}
        onBack={props.onBack}
    />
);