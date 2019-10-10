import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { UListHero } from 'openland-web/components/unicorn/UListHero';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UListText } from 'openland-web/components/unicorn/UListText';

export const MemberProfileFragment = React.memo(() => {
    const client = useClient();
    const unicorn = useUnicorn();
    const chatId = unicorn && unicorn.query.id;
    const data = client.useMatchmakingRoom({ peerId: chatId }).matchmakingRoom;

    const myProfile = data && data.myProfile && data.myProfile.user;
    const myAnswers = data && data.myProfile && data.myProfile.answers;

    if (!myProfile || !myAnswers) {
        return null;
    }

    const { photo, id, name } = myProfile;

    return (
        <Page track="my_member_profile" padded={true}>
            <UHeader title="My member profile" />
            <UListHero
                title={myProfile.name}
                description={
                    myProfile.primaryOrganization ? myProfile.primaryOrganization.name : undefined
                }
                avatar={{ photo, id, title: name }}
            >
                <UButton text="Edit" path={`/group/${chatId}/myprofile/edit`} />
            </UListHero>
            {myAnswers.map(i => (
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
