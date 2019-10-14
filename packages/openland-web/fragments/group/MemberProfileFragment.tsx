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

export const MemberProfileFragment = React.memo(() => {
    const client = useClient();
    const unicorn = useUnicorn();
    const userContext = React.useContext(UserInfoContext)!!;
    const chatId = unicorn && unicorn.query.id;
    const userId = unicorn && unicorn.query.uid;
    const userProfile = client.useMatchmakingProfile({ peerId: chatId, uid: userId }).matchmakingProfile;

    if (!userProfile || !userContext.user) {
        return null;
    }

    const isMyProfile = userProfile.user.id === userContext.user.id;

    const userAnswers = userProfile.answers;

    const { photo, id, name, primaryOrganization } = userProfile.user;

    const headerText = isMyProfile ? 'My member profile' : 'Details';
    const buttonPath = isMyProfile ? `/group/${chatId}/myprofile/edit` : `/mail/${userId}`;
    const buttonText = isMyProfile ? 'Edit' : 'Message';

    return (
        <Page track="member_profile" padded={true}>
            <UHeader title={headerText} />
            <UListHero
                title={name}
                description={primaryOrganization ? primaryOrganization.name : undefined}
                avatar={{ photo, id, title: name }}
            >
                <UButton text={buttonText} path={buttonPath} />
            </UListHero>
            {userAnswers.map(i => (
                <UListGroup header={i.question.title} key={i.question.id}>
                    <UListText
                        value={
                            i.__typename === 'MultiselectMatchmakingAnswer' ? (
                                i.tags.map((j, k) => {
                                    if (k + 1 !== i.tags.length) {
                                        return <span key={`answer_${k}_${id}`}>{j}, </span>;
                                    }
                                    return <span key={`answer_${k}_${id}`}>{j}</span>;
                                })
                            ) : (
                                <span>{i.answer}</span>
                            )
                        }
                    />
                </UListGroup>
            ))}
        </Page>
    );
});
