import * as React from 'react';
import { css } from 'linaria';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-web/utils/useClient';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XView } from 'react-mental';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthHeaderConfig } from './root.page';
import { NotFound } from 'openland-unicorn/NotFound';

const LogoBig = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="228" height="66" fill="none" viewBox="0 0 228 66">
        <path fill="url(#rainbow-gradient-logo-big)" fillRule="evenodd" d="M48.493 34.419L38.275 21.897 54.867 2.434A44.74 44.74 0 0 0 51.37 0L33.43 10.962a22.133 22.133 0 0 0-1.969-.36c-2.122-.293-3.788-.243-3.788-.243-13.79 0-25.257 10.183-27.336 23.454A27.974 27.974 0 0 0 0 38.15c0 7.592 3.049 14.482 7.98 19.503 5.022 5.112 11.995 8.286 19.694 8.286 5.606.111 10.59-2.106 10.59-2.106s-2.485-1.493-4.624-3.09c-1.001-.746-2.577-2.212-3.366-3.17a14.8 14.8 0 0 1-2.232-15.04l.009-.02 11.333 3.56.204.082c2.004.758 4.189.643 6.15-.325a7.21 7.21 0 0 0 1.852-1.312c1.975-1.932 2.784-4.674 2.163-7.33a7.612 7.612 0 0 0-1.26-2.77z" clipRule="evenodd" />
        <path fill="#FFFFFE" fillRule="evenodd" d="M18.535 25.325c.037-.045.078-.088.117-.132l.006-.008a5.28 5.28 0 0 0-.123.14z" clipRule="evenodd" />
        <path fill="#FFFFFE" fillRule="evenodd" d="M46.022 36.232l-.17-.224L34.28 21.857 48.188 5.543l-18.64 11.391 1.013-3.35c-1.26-.265-2.827-.15-2.887-.15-13.593 0-24.612 11.066-24.612 24.716S14.08 62.865 27.674 62.865a24.706 24.706 0 0 0 2.693-.148c.116-.012.23-.029.345-.043a23.943 23.943 0 0 1-11.334-7.857 24.04 24.04 0 0 1-3.341-5.6 24.033 24.033 0 0 1-1.908-9.418v-.552c0-5.249 1.68-10.1 4.523-14.054-.04.044-.08.087-.118.133.04-.048.082-.094.124-.14l-.006.007.006-.007.014-.014c.094-.103.192-.203.296-.297a.564.564 0 0 1 .045-.037l-.122.313c-.569 1.648-2.499 9.286 5.757 12.929 2.657 1.173 5.975 1.805 8.726 2.73l7.087 2.382.206.087c1.19.45 2.517.386 3.721-.208a4.15 4.15 0 0 0 1.066-.755c1.22-1.194 1.689-2.842 1.318-4.43a4.541 4.541 0 0 0-.75-1.654z" clipRule="evenodd" />
        <path fill="#D1DAE6" fillRule="evenodd" d="M18.969 24.874a4.633 4.633 0 0 0-.297.298c-.006.006-.012.014-.02.02a23.985 23.985 0 0 0-4.523 14.055v.552c0 3.343.68 6.526 1.908 9.418a24.04 24.04 0 0 0 4.554 7.004 23.943 23.943 0 0 0 10.122 6.452c.156-.019.314-.037.47-.06a17.964 17.964 0 0 1-3.269-3.082 17.89 17.89 0 0 1-2.698-18.176c-12.242-3.797-8.519-14.318-6.203-16.517a.526.526 0 0 0-.045.037z" clipRule="evenodd" />
        <path fill="#D1DAE6" fillRule="evenodd" d="M18.657 25.185l-.005.008.02-.021-.015.013zM20.59 56.222zM19 24.847a.519.519 0 0 1 0 0zM20.59 56.222zM19 24.846c.008-.006.012-.01.013-.008 0-.001-.006.002-.013.008z" clipRule="evenodd" />
        <path fill="#8A7CB7" fillRule="evenodd" d="M29.164 23.96c-1.334-.314-2.943.266-3.437 1.982l-.046.16.166-.01c1.958-.114 3.653.39 5.322 1.578l.15.107.034-.183c.37-2.069-.833-3.316-2.19-3.635z" clipRule="evenodd" />
        <path fill="#000" fillRule="evenodd" d="M87.53 37.706c0-1.343-.241-2.619-.724-3.829a9.945 9.945 0 0 0-2.082-3.23 9.215 9.215 0 0 0-6.738-2.904 9.255 9.255 0 0 0-3.672.744 9.36 9.36 0 0 0-3.101 2.16 9.625 9.625 0 0 0-2.073 3.212 10.404 10.404 0 0 0-.715 3.847c0 1.343.238 2.614.715 3.812a9.875 9.875 0 0 0 2.073 3.212 9.385 9.385 0 0 0 3.092 2.16 9.234 9.234 0 0 0 3.681.744 9.083 9.083 0 0 0 3.637-.745 9.609 9.609 0 0 0 3.101-2.16 9.971 9.971 0 0 0 2.082-3.22c.483-1.204.724-2.472.724-3.803zm4.39.058a13.82 13.82 0 0 1-1.044 5.347 13.58 13.58 0 0 1-3.043 4.494 14.272 14.272 0 0 1-4.552 3.027c-1.69.7-3.462 1.05-5.319 1.05-1.88 0-3.674-.353-5.381-1.06a13.853 13.853 0 0 1-4.525-3.017 13.516 13.516 0 0 1-3.034-4.476c-.69-1.667-1.036-3.456-1.036-5.364 0-1.897.345-3.685 1.036-5.365a13.66 13.66 0 0 1 3.034-4.512 13.822 13.822 0 0 1 4.534-3.009 14.097 14.097 0 0 1 5.372-1.033c1.88 0 3.662.345 5.346 1.033a13.95 13.95 0 0 1 7.568 7.548 13.842 13.842 0 0 1 1.044 5.337zm8.331 4.573c0 1.776.435 3.196 1.306 4.259.871 1.063 2.017 1.595 3.438 1.595 1.457 0 2.585-.496 3.385-1.486.799-.991 1.199-2.398 1.199-4.223 0-1.812-.417-3.228-1.252-4.25-.836-1.02-1.982-1.53-3.439-1.53-1.456 0-2.594.495-3.411 1.486-.817.99-1.226 2.373-1.226 4.15zm-3.792 16.734V33.758h3.882v2.815a5.171 5.171 0 0 1 2.173-2.524c.996-.593 2.186-.89 3.569-.89 2.254 0 4.082.844 5.483 2.533 1.402 1.69 2.102 3.908 2.102 6.656 0 2.893-.688 5.172-2.066 6.837-1.377 1.664-3.265 2.497-5.662 2.497-1.192 0-2.251-.242-3.175-.727-.924-.484-1.732-1.223-2.424-2.215v10.333h-3.882zm37.662-16.124h-13.54c.096 1.61.566 2.866 1.411 3.768.846.902 1.971 1.353 3.376 1.353 1.251 0 2.293-.266 3.126-.799.834-.533 1.56-1.392 2.179-2.579l3.269 1.853c-.952 1.73-2.131 3.02-3.536 3.868-1.406.847-3.055 1.271-4.948 1.271-2.715 0-4.877-.841-6.484-2.524-1.608-1.683-2.412-3.929-2.412-6.738 0-2.7.831-4.919 2.492-6.656s3.796-2.606 6.404-2.606c2.727 0 4.852.793 6.376 2.38 1.525 1.585 2.287 3.807 2.287 6.664v.745zm-4.04-2.652c-.155-1.235-.62-2.176-1.394-2.824-.775-.648-1.836-.972-3.183-.972-1.275 0-2.3.315-3.074.944-.775.63-1.317 1.58-1.627 2.852h9.278zm8.081 10.678V33.758h3.648v2.815c.775-1.186 1.687-2.052 2.736-2.597 1.049-.544 2.324-.817 3.826-.817 1.264 0 2.34.203 3.228.608a4.704 4.704 0 0 1 2.083 1.807c.298.473.513 1.023.644 1.653.131.63.196 1.731.196 3.305v10.443h-3.916v-8.845c0-2.264-.271-3.768-.813-4.512-.543-.745-1.505-1.117-2.888-1.117-.906 0-1.714.17-2.423.508-.709.34-1.267.817-1.672 1.435-.286.411-.486.941-.599 1.589-.113.648-.17 1.68-.17 3.096v7.846h-3.88zm21.648 0v-28.14h3.891v28.14h-3.891zm25.391 0h-3.882V48.74c-.691.993-1.499 1.731-2.424 2.216-.924.484-1.982.726-3.175.726-2.397 0-4.284-.832-5.662-2.497-1.377-1.665-2.066-3.944-2.066-6.838 0-2.748.703-4.967 2.111-6.656 1.407-1.689 3.244-2.533 5.51-2.533 1.383 0 2.567.294 3.551.88.984.588 1.702 1.433 2.155 2.534v-2.815h3.882v17.217zm-3.791-8.636c0-1.776-.407-3.159-1.219-4.15-.813-.99-1.95-1.485-3.409-1.485-1.46 0-2.608.51-3.445 1.53-.837 1.022-1.255 2.438-1.255 4.25 0 1.825.403 3.232 1.21 4.223.807.99 1.947 1.486 3.418 1.486 1.389 0 2.519-.538 3.392-1.613.872-1.076 1.308-2.489 1.308-4.24zm9.078 8.636V33.758h3.647v2.815c.775-1.186 1.687-2.052 2.736-2.597 1.049-.544 2.325-.817 3.827-.817 1.263 0 2.339.203 3.227.608a4.702 4.702 0 0 1 2.084 1.807c.298.473.512 1.023.643 1.653.131.63.197 1.731.197 3.305v10.443h-3.916v-8.845c0-2.264-.271-3.768-.814-4.512-.542-.745-1.505-1.117-2.887-1.117-.906 0-1.714.17-2.423.508a4.022 4.022 0 0 0-1.672 1.435c-.286.411-.486.941-.599 1.589-.114.648-.17 1.68-.17 3.096v7.846h-3.88zm33.672-8.636c0-1.776-.407-3.159-1.22-4.15-.813-.99-1.949-1.485-3.409-1.485-1.46 0-2.608.51-3.444 1.53-.837 1.022-1.255 2.438-1.255 4.25 0 1.825.403 3.232 1.21 4.223.807.99 1.946 1.486 3.418 1.486 1.4 0 2.534-.535 3.4-1.604.866-1.07 1.3-2.486 1.3-4.25zm-.042-19.504H228v28.141h-3.882v-2.233c-.692.993-1.5 1.731-2.424 2.215-.924.484-1.983.726-3.175.726-2.397 0-4.285-.832-5.662-2.496-1.378-1.664-2.066-3.943-2.066-6.835 0-2.748.703-4.966 2.11-6.654 1.408-1.689 3.244-2.533 5.51-2.533 1.384 0 2.567.293 3.551.88.984.588 1.703 1.432 2.156 2.533V22.834z" clipRule="evenodd" />
        <defs>
            <linearGradient id="rainbow-gradient-logo-big" x1="29.633" x2="-20.117" y1="-22.043" y2="29.636" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FEC417" />
                <stop offset=".279" stopColor="#ED225A" />
                <stop offset=".761" stopColor="#5DA4E1" />
                <stop offset="1" stopColor="#65E1BD" />
            </linearGradient>
        </defs>
    </svg>
);

const textAlignClassName = css`
    text-align: center;
`;

const AcceptInvite = ({
    inviter,
}: {
    inviter: { photo: string | null; name: string; id: string };
    isMobile: boolean;
}) => {
    const userInfo = React.useContext(UserInfoContext);
    const router = React.useContext(XRouterContext)!;
    const onAcceptInvite = React.useCallback(() => {
        if (!userInfo || !userInfo.isLoggedIn) {
            router.push('/signin');
        } else {
            router.push('/mail');
        }
    }, []);
    return (
        <>
            <AuthHeaderConfig onBack={() => { history.back(); }} />
            <XView width="100%" backgroundColor="white" position={'relative'} justifyContent="center">
                <XTrack event="invite_landing_view" params={{ invite_type: 'Openland' }} />
                <XView
                    position="absolute"
                    top={56}
                    alignSelf="center"
                    alignItems="center"
                    flexDirection="row"
                >
                    <UAvatar size="small" id={inviter.id} title={inviter.name} photo={inviter.photo} />
                    <XView fontSize={16} color="#000000" marginLeft={12}>
                        {inviter.name + ' invites you to join'}
                    </XView>
                </XView>
                <XView alignSelf="center" alignItems="center">
                    <XView marginBottom={24}>
                        <LogoBig />
                    </XView>

                    <XView marginBottom={40}>
                        <XView maxWidth={575} paddingHorizontal={20} fontSize={18} lineHeight={1.67}>
                            <p className={textAlignClassName}>
                                An invitation-only community <br /> for top startup founders, investors,
                                and engineers.
                        </p>
                        </XView>
                    </XView>
                    <UButton
                        text="Accept invite"
                        style="primary"
                        size="large"
                        onClick={onAcceptInvite}
                    />
                </XView>
                <XView position="absolute" bottom={20} fontSize={14} opacity={0.5} alignSelf={'center'}>
                    © {new Date().getFullYear()} Openland
            </XView>
            </XView>
        </>
    );
};

export const AcceptInvitePage = (props: {
    variables: { inviteKey: string };
    isMobile: boolean;
}) => {
    const client = useClient();

    const resolvedInvite = client.useWithoutLoaderResolvedInvite({
        key: props.variables.inviteKey,
    });

    if (!resolvedInvite) {
        return <XLoader />;
    }

    if (!resolvedInvite.invite) {
        return <NotFound />;
    }

    let inviter;

    if (resolvedInvite && resolvedInvite.invite) {
        if (resolvedInvite.invite.__typename === 'AppInvite') {
            inviter = resolvedInvite.invite.inviter;
        } else if (resolvedInvite.invite.__typename === 'RoomInvite') {
            inviter = resolvedInvite.invite.invitedByUser;
        } else if (resolvedInvite.invite.__typename === 'InviteInfo') {
            inviter = resolvedInvite.invite.creator;
        }
    }

    if (resolvedInvite.invite.__typename === 'RoomInvite') {
        return <XPageRedirect path={`/joinChannel/${props.variables.inviteKey}`} />;
    }

    if (resolvedInvite.invite.__typename === 'InviteInfo') {
        return <XPageRedirect path={`/signin/join/${props.variables.inviteKey}`} />;
    }

    if (!inviter) {
        return <XLoader loading={true} />;
    }
    return <AcceptInvite inviter={inviter} isMobile={props.isMobile} />;
};
