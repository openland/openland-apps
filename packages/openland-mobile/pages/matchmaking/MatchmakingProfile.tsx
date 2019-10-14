import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { Platform } from 'react-native';
import { useClient } from 'openland-mobile/utils/useClient';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListHero } from 'openland-mobile/components/ZListHero';
import { ZListItem } from 'openland-mobile/components/ZListItem';

const MatchmakingProfileComponent = React.memo((props: PageProps) => {
    const client = useClient();
    let profile = client.useMatchmakingProfile({ peerId: props.router.params.peerId, uid: props.router.params.userId }).matchmakingProfile;
    if (!profile) {
        // todo sort of 404
        props.router.back();
        return null;
    }
    const { user, answers } = profile;
    return <>
        <SHeader title={Platform.OS === 'android' ? 'Info' : user.name} />
        <SScrollView>
            <ZListHero
                photo={user.photo}
                id={user.id}
                title={user.name}
                subtitle={user.primaryOrganization && user.primaryOrganization.name}
                action={{
                    title: 'Send message',
                    onPress: () => {
                        props.router.pushAndReset('Conversation', {
                            flexibleId: props.router.params.id,
                        });
                    }
                }}
            />

            {answers.map(a => <ZListItem key={a.question.id} multiline={true} title={a.question.title} text={a.__typename === 'TextMatchmakingAnswer' ? a.answer : a.__typename === 'MultiselectMatchmakingAnswer' ? a.tags.join(', ') : ''} />)}

        </SScrollView>
    </>;
});

export const MatchmakingProfile = withApp(MatchmakingProfileComponent, { navigationAppearance: 'small-hidden' });
