import * as React from 'react';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZHero } from 'openland-mobile/components/ZHero';
import { ZHeroAction } from 'openland-mobile/components/ZHeroAction';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { useText } from 'openland-mobile/text/useText';

export const ProfileDeleted = React.memo((props: { photo: string | null, id: string, title: string }) => {
    const router = React.useContext(SRouterContext)!;
    const { t } = useText();

    return (
        <SScrollView>
            <ZHero
                photo={props.photo}
                id={props.id}
                title={props.title}
            >
                <ZHeroAction
                    icon={require('assets/ic-reply-24.png')}
                    title={t('goBack', 'Go back')}
                    onPress={() => router.back()}
                />
            </ZHero>
        </SScrollView>
    );
});