import * as React from 'react';
import Glamorous from 'glamorous';
import { withUser } from '../../../api/withUserSimple';
import { User } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XDate } from 'openland-x-format/XDate';
import { XAvatar } from 'openland-x/XAvatar';
import { XSubHeader } from 'openland-x/XSubHeader';
import { withRouter } from 'next/router';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView } from 'openland-x/XScrollView';
import { makeNavigable } from 'openland-x/Navigable';
import { XModal } from 'openland-x-modal/XModal';
import { ModalBody, ModalCloser, ModalPic } from '../../../components/messenger/components/view/content/MessageImageComponent';
import ModalCloseIcon from '../../../components/messenger/components/icons/ic-modal-close.svg';
import { BackButton, Section, SectionContent, HeaderWrapper } from './OrganizationProfileComponent';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { withOnline } from '../../../api/withOnline';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XOverflow } from '../../../components/Incubator/XOverflow';
import { XSocialButton } from 'openland-x/XSocialButton';

const HeaderAvatar = Glamorous.div({
    paddingRight: 18
});

const HeaderInfo = Glamorous(XVertical)({
    paddingTop: 1,
    justifyContent: 'center'
});

const HeaderTitle = Glamorous.div({
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: '20px',
    color: '#000000'
});

const HeaderTools = Glamorous(XHorizontal)({
    paddingTop: 13
});

const HeaderOrg = makeNavigable(Glamorous.div({
    marginTop: 1,
    marginBottom: -1,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: '20px',
    color: 'rgba(0, 0, 0, 0.4)',
    cursor: 'pointer'
}) as any) as any;

const StatusWrapper = Glamorous.div<{ online: boolean }>((props) => ({
    color: props.online ? '#1790ff' : 'rgba(0, 0, 0, 0.5)',
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '18px',
    marginTop: '7px!important'
}));

const UserStatus = withOnline(props => {
    if (props.data.user && (props.data.user.lastSeen && props.data.user.lastSeen !== 'online' && !props.data.user.online)) {
        return (
            <StatusWrapper online={false}>
                Last seen {props.data.user.lastSeen === 'never_online' ? 'moments ago' : <XDate value={props.data.user.lastSeen} format="humanize_cute" />}
            </StatusWrapper>
        );
    } else if (props.data.user && props.data.user.online) {
        return (
            <StatusWrapper online={true}>
                Online
            </StatusWrapper>
        );
    } else {
        return null;
    }
}) as React.ComponentType<{ variables: { userId: string } }>;

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
                    size="l-medium"
                    style="colorus"
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
            <XContentWrapper withFlex={true}>
                <HeaderAvatar>
                    {usr.photo && <AvatarModal photo={usr.photo} userName={usr.name} userId={usr.id} />}
                    {!usr.photo && (
                        <XAvatar
                            cloudImageUuid={undefined}
                            size="l-medium"
                            style="colorus"
                            objectName={usr.name}
                            objectId={usr.id}
                        />
                    )}
                </HeaderAvatar>
                <HeaderInfo flexGrow={1} separator={0}>
                    <XHorizontal separator={4}>
                        <HeaderTitle>{usr.name}</HeaderTitle>
                        {usr.primaryOrganization && (
                            <HeaderOrg path={'/directory/o/' + usr.primaryOrganization.id}>
                                {usr.primaryOrganization.name}
                            </HeaderOrg>
                        )}
                    </XHorizontal>
                    <UserStatus variables={{ userId: usr.id }} />
                </HeaderInfo>
                <HeaderTools separator={8}>
                    {usr.website && <XSocialButton value={usr.website} style="website" />}
                    {usr.linkedin && <XSocialButton value={usr.linkedin} style="linkedin" />}
                    {usr.phone && <XSocialButton value={usr.phone} style="phone" />}
                    {usr.isYou && (
                        <XOverflow
                            placement="bottom-end"
                            flat={true}
                            content={(
                                <>
                                    <XMenuItem href="/settings/profile/">Edit profile</XMenuItem>
                                </>
                            )}
                        />
                    )}
                    {!usr.isYou && (
                        <XButton
                            text="Message"
                            style="primary"
                            path={'/mail/' + usr.id}
                        />
                    )}
                </HeaderTools>
            </XContentWrapper>
        </HeaderWrapper>
    );
};

const About = (props: { userQuery: User }) => {
    let usr = props.userQuery.user;

    return (
        <>
            {usr.about && (
                <Section separator={0}>
                    <XSubHeader title="About" paddingBottom={0} />
                    <SectionContent>
                        {usr.about}
                    </SectionContent>
                </Section>
            )}
        </>
    );
};

interface UserProfileInnerProps extends XWithRouter {
    userQuery: User;
    handlePageTitle?: any;
    onDirectory?: boolean;
}

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
        return (
            <div ref={this.handleRef}>
                <BackButton />
                <Header userQuery={this.props.userQuery} />
                <XScrollView height="calc(100% - 136px)">
                    <About userQuery={this.props.userQuery} />
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