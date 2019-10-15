import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { UListHero } from 'openland-web/components/unicorn/UListHero';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UListText } from 'openland-web/components/unicorn/UListText';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import IcMessage from 'openland-icons/s/ic-message-24.svg';
import IcEdit from 'openland-icons/s/ic-edit-24.svg';
import IcConnect from 'openland-icons/s/ic-invite-24.svg';

interface MessageButtonProps {
    isMyProfile: boolean;
    chatId: string;
    userId: string;
    chatCreated: boolean;
}

const MessageButton = React.memo((props: MessageButtonProps) => {
    const layout = useLayout();
    const client = useClient();
    const [loading, setLoading] = React.useState(false);

    const createChat = async () => {
        setLoading(true);
        await client.mutateMatchmakingConnect({
            peerId: props.chatId,
            uid: props.userId,
        });
        await client.refetchMatchmakingRoom({
            peerId: props.chatId,
        });
        await client.refetchMatchmakingProfile({
            peerId: props.chatId,
            uid: props.userId,
        });
        setLoading(false);
    };

    let buttonText = 'Message';
    let icon = <IcMessage />;
    if (!props.isMyProfile && !props.chatCreated) {
        buttonText = 'Connect';
        icon = <IcConnect />;
    } else if (props.isMyProfile) {
        buttonText = 'Edit';
        icon = <IcEdit />;
    }

    const buttonPath = props.isMyProfile
        ? `/group/${props.chatId}/myprofile/edit`
        : `/mail/${props.userId}`;

    if (layout === 'mobile') {
        return (
            <UIconButton
                icon={icon}
                path={buttonText === 'Connect' ? undefined : buttonPath}
                onClick={buttonText === 'Connect' ? createChat : undefined}
                loading={loading}
            />
        );
    }

    return (
        <UButton
            text={buttonText}
            path={buttonText === 'Connect' ? undefined : buttonPath}
            onClick={buttonText === 'Connect' ? createChat : undefined}
            loading={loading}
        />
    );
});

export const MemberProfileFragment = React.memo(() => {
    const client = useClient();
    const unicorn = useUnicorn();
    const userContext = React.useContext(UserInfoContext)!!;
    const chatId = unicorn && unicorn.query.id;
    const userId = unicorn && unicorn.query.uid;
    const userProfile = client.useMatchmakingProfile({ peerId: chatId, uid: userId })
        .matchmakingProfile;

    if (!userProfile || !userContext.user) {
        return null;
    }

    const isMyProfile = userProfile.user.id === userContext.user.id;
    const userAnswers = userProfile.answers;
    const chatCreated = userProfile.chatCreated;

    const { photo, id, name, primaryOrganization } = userProfile.user;

    const headerText = isMyProfile ? 'My member profile' : 'Details';

    return (
        <Page track="member_profile" padded={true}>
            <UHeader title={headerText} />
            <UListHero
                title={name}
                description={primaryOrganization ? primaryOrganization.name : undefined}
                avatar={{ photo, id, title: name }}
            >
                <MessageButton
                    isMyProfile={isMyProfile}
                    chatId={chatId}
                    userId={userId}
                    chatCreated={chatCreated}
                />
            </UListHero>
            {userAnswers.map(i => (
                <UListGroup header={i.question.title} key={i.question.id}>
                    <UListText
                        value={
                            i.__typename === 'TextMatchmakingAnswer'
                                ? i.answer
                                : i.__typename === 'MultiselectMatchmakingAnswer'
                                    ? i.tags.join(', ')
                                    : ''
                        }
                    />
                </UListGroup>
            ))}
        </Page>
    );
});
