import * as React from 'react';
import Glamorous from 'glamorous';
import { css } from 'linaria';
import { withUser } from '../../../api/withUserSimple';
import { User_user } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XSubHeader } from 'openland-x/XSubHeader';
import { withRouter } from 'next/router';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { XModal } from 'openland-x-modal/XModal';
import { XLink } from 'openland-x/XLink';
import { XCloudImage } from 'openland-x/XCloudImage';
import ModalCloseIcon from 'openland-icons/ic-modal-close.svg';
import {
    BackButton,
    Section,
    SectionContent,
    HeaderWrapper,
    extractHostname,
} from './OrganizationProfileComponent';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { withOnline } from '../../../api/withOnline';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XOverflow } from '../../../components/XOverflow';
import { XSocialButton } from 'openland-x/XSocialButton';
import { TextProfiles } from 'openland-text/TextProfiles';
import { XDate } from 'openland-x/XDate';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XView } from 'react-mental';
import { XAvatar2 } from 'openland-x/XAvatar2';

const ModalCloser = Glamorous(XLink)({
    position: 'fixed',
    right: 20,
    top: 20,
    width: 36,
    height: 36,
    borderRadius: 5,
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const ModalBody = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 40,
    '&:hover > .download-button': {
        opacity: 1,
    },
});

const ModalPic = Glamorous(XCloudImage)({
    borderRadius: 8,
    objectFit: 'contain',
    maxHeight: '90vh',
});

const StatusWrapperOffline = css`
    color: rgba(0, 0, 0, 0.5);
    font-size: 13px;
    line-height: 18px;
    font-weight: 400;
    margin-top: 7px;
`;

const StatusWrapperOnline = css`
    color: #1790ff;
    font-size: 13px;
    line-height: 18px;
    font-weight: 400;
    margin-top: 7px;
`;

const UserStatus = withOnline(props => {
    if (
        props.data.user &&
        (props.data.user.lastSeen &&
            props.data.user.lastSeen !== 'online' &&
            !props.data.user.online)
    ) {
        return (
            <div className={StatusWrapperOffline}>
                {TextProfiles.User.status.lastSeen}{' '}
                {props.data.user.lastSeen === 'never_online' ? (
                    TextProfiles.User.status.momentsAgo
                ) : (
                    <XDate value={props.data.user.lastSeen} format="humanize_cute" />
                )}
            </div>
        );
    } else if (props.data.user && props.data.user.online) {
        return <div className={StatusWrapperOnline}>{TextProfiles.User.status.online}</div>;
    } else {
        return null;
    }
}) as React.ComponentType<{ variables: { userId: string } }>;

const AvatarModal = (props: { photo?: string; userName: string; userId: string }) => {
    return (
        <XModal
            useTopCloser={true}
            width={512}
            heading={null}
            transparent={true}
            body={
                <ModalBody>
                    <ModalCloser autoClose={true} className="closer">
                        <ModalCloseIcon />
                    </ModalCloser>
                    <ModalPic srcCloud={props.photo} resize={'fill'} width={512} height={512} />
                </ModalBody>
            }
            target={
                <XAvatar2 src={props.photo} size={58} title={props.userName} id={props.userId} />
            }
        />
    );
};

const Header = (props: { user: User_user }) => {
    let { user } = props;

    return (
        <HeaderWrapper>
            <XContentWrapper withFlex={true}>
                <XView paddingRight={18}>
                    {user.photo && (
                        <AvatarModal photo={user.photo} userName={user.name} userId={user.id} />
                    )}
                    {!user.photo && (
                        <XAvatar2 src={undefined} size={58} title={user.name} id={user.id} />
                    )}
                </XView>
                <XView paddingTop={1} justifyContent="center" flexGrow={1}>
                    <XHorizontal separator={4}>
                        <XView fontSize={18} fontWeight="600" lineHeight="20px" color="#000000">
                            {user.name}
                        </XView>
                        {user.primaryOrganization && (
                            <XView
                                as="a"
                                marginTop={1}
                                marginBottom={-1}
                                fontSize={13}
                                fontWeight="600"
                                lineHeight="20px"
                                color="rgba(0, 0, 0, 0.4)"
                                path={'/directory/o/' + user.primaryOrganization.id}
                                hoverTextDecoration="none"
                            >
                                {user.primaryOrganization.name}
                            </XView>
                        )}
                    </XHorizontal>
                    <UserStatus variables={{ userId: user.id }} />
                </XView>
                <XView paddingTop={13}>
                    <XHorizontal separator={8}>
                        {user.website && (
                            <XSocialButton
                                value={user.website}
                                style="website"
                                placeholder={extractHostname(user.website)}
                            />
                        )}
                        {user.linkedin && <XSocialButton value={user.linkedin} style="linkedin" />}
                        {user.phone && <XSocialButton value={user.phone} style="phone" />}
                        {user.isYou && (
                            <XOverflow
                                placement="bottom-end"
                                flat={true}
                                content={
                                    <>
                                        <XMenuItem path="/settings/profile/">
                                            {TextProfiles.User.edit}
                                        </XMenuItem>
                                    </>
                                }
                            />
                        )}
                        {!user.isYou && (
                            <XButton
                                text={TextProfiles.User.message}
                                style="primary"
                                path={'/mail/' + user.id}
                            />
                        )}
                    </XHorizontal>
                </XView>
            </XContentWrapper>
        </HeaderWrapper>
    );
};

const About = (props: { user: User_user }) => {
    let { user } = props;

    return (
        <>
            {user.shortname && (
                <Section separator={0}>
                    <XSubHeader title={TextProfiles.User.usernameTitle} paddingBottom={0} />
                    <SectionContent>@{user.shortname}</SectionContent>
                </Section>
            )}
            {user.email && (
                <Section separator={0}>
                    <XSubHeader title={TextProfiles.User.emailTitle} paddingBottom={0} />
                    <SectionContent>{user.email}</SectionContent>
                </Section>
            )}
            {user.about && (
                <Section separator={0}>
                    <XSubHeader title={TextProfiles.User.aboutTitle} paddingBottom={0} />
                    <SectionContent>{user.about}</SectionContent>
                </Section>
            )}
        </>
    );
};

interface UserProfileInnerProps extends XWithRouter {
    user: User_user;
    onDirectory?: boolean;
    hideBack?: boolean;
}

export const UserProfileInner = (props: UserProfileInnerProps) => {
    let { user } = props;

    return (
        <>
            <XDocumentHead title={user.name} />
            <XView height="100%">
                {!props.hideBack && <BackButton />}
                <Header user={user} />
                <XScrollView2 flexGrow={1}>
                    <About user={user} />
                </XScrollView2>
            </XView>
        </>
    );
};

const UserProvider = withUser(
    withRouter(props =>
        props.data.user ? (
            <UserProfileInner
                user={props.data.user}
                router={props.router}
                onDirectory={(props as any).onDirectory}
            />
        ) : (
            <XLoader loading={true} />
        ),
    ),
) as React.ComponentType<{
    variables: { userId: string };
    onDirectory?: boolean;
}>;

export const UserProfile = (props: { userId: string; onDirectory?: boolean }) => (
    <UserProvider variables={{ userId: props.userId }} onDirectory={props.onDirectory} />
);
