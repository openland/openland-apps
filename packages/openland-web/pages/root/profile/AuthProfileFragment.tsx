import * as React from 'react';
import * as Cookie from 'js-cookie';
import { css, cx } from 'linaria';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { emoji } from 'openland-y-utils/emoji';
import { TextTitle1, TextBody, TextDetail, TextTitle3 } from 'openland-web/utils/TextStyles';
import { AuthPageContainer } from '../components/AuthPageContainer';
import { AuthResolveShortName_item_User } from 'openland-api/spacex.types';
import IcListeners from 'openland-icons/s/ic-listener-16.svg';
import IcSpeakers from 'openland-icons/s/ic-speaker-16.svg';

const userInfoContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    flex-grow: 1;
    padding: 32px;
`;

const userName = css`
    color: var(--foregroundPrimary);
    margin-top: 20px;
    margin-bottom: 8px;
    text-align: center;
`;

const userSubtitle = css`
    text-align: center;
    max-width: 320px;
    align-self: center;
    color: var(--foregroundSecondary);
    margin-bottom: 32px;
`;

const voiceChatInfo = css`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 52px;
`;

const liveIcon = css`
    padding: 4px 8px;
    background-color: var(--foregroundTertiary);
    color: var(--foregroundContrast);
    border-radius: 6px;
    margin-right: 12px;
`;

const voiceChatTitle = css`
    white-space: pre-wrap;
    word-wrap: break-word;
    text-align: center;
    max-width: 275px;
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const voiceChatName = css`
    color: var(--foregroundPrimary);
`;

const listenersContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
    & > div {
        margin-right: 8px;
    }
    & > div:last-child {
        margin-right: 0;
    }
`;

const countersContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const counterNumber = css`
    color: var(--foregroundTertiary);
    margin-right: 4px;
`;

const dotSeparator = css`
    width: 3px;
    height: 3px;
    border-radius: 3px;
    opacity: 0.5;
    margin: 0 8px;
    background-color: var(--foregroundTertiary);
`;

export const AuthProfileFragment = React.memo((props: { user: AuthResolveShortName_item_User }) => {
    const { id, name, firstName, photo, online, currentVoiceChat } = props.user;
    return (
        <AuthPageContainer>
            <div className={userInfoContainer}>
                <UAvatar
                    title={name}
                    id={id}
                    photo={photo}
                    size="xx-large"
                    online={online}
                    dotColor={!!currentVoiceChat ? 'var(--accentPositive)' : undefined}
                />
                <div className={cx(userName, TextTitle1)}>{emoji(props.user.name)}</div>
                {!!currentVoiceChat ? (
                    <div className={cx(userSubtitle, TextBody)}>
                        Talk with {firstName} in Openland
                    </div>
                ) : (
                    <div className={cx(userSubtitle, TextBody)}>
                        Follow to know when {firstName} is talking live
                    </div>
                )}
                {!!currentVoiceChat && (
                    <div className={voiceChatInfo}>
                        <div className={voiceChatTitle}>
                            <span className={cx(liveIcon, TextDetail)}>LIVE</span>
                            <span className={cx(voiceChatName, TextTitle3)}>
                                {currentVoiceChat.title}
                            </span>
                        </div>
                        <div className={listenersContainer}>
                            {currentVoiceChat.speakers.slice(0, 5).map((i) => (
                                <UAvatar
                                    size="small"
                                    title={i.user.name}
                                    id={i.user.id}
                                    photo={i.user.photo}
                                />
                            ))}
                        </div>
                        <div className={countersContainer}>
                            <div className={cx(counterNumber, TextBody)}>
                                {currentVoiceChat.speakersCount}
                            </div>
                            <UIcon icon={<IcSpeakers />} color="var(--foregroundTertiary)" />
                            <div className={dotSeparator} />
                            <div className={cx(counterNumber, TextBody)}>
                                {currentVoiceChat.listenersCount}
                            </div>
                            <UIcon icon={<IcListeners />} color="var(--foregroundTertiary)" />
                        </div>
                    </div>
                )}
                {!!currentVoiceChat ? (
                    <UButton
                        width={240}
                        style="success"
                        text="Join room"
                        size="large"
                        onClick={() => {
                            Cookie.set('x-signin-redirect', props.user.id, { path: `/${id}` });
                            window.location.href = '/signin';
                        }}
                    />
                ) : (
                    <UButton
                        width={240}
                        text="Follow"
                        size="large"
                        onClick={() => {
                            Cookie.set('x-signin-redirect', props.user.id, { path: `/${id}` });
                            window.location.href = '/signin';
                        }}
                    />
                )}
                <UButton
                    width={240}
                    marginTop={16}
                    style="secondary"
                    text="Message"
                    size="large"
                    onClick={() => {
                        Cookie.set('x-signin-redirect', props.user.id, { path: '/' });
                        window.location.href = '/signin';
                    }}
                />
            </div>
        </AuthPageContainer>
    );
});
