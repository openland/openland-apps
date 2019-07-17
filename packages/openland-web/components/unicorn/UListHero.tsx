import * as React from 'react';
import { XView } from 'react-mental';
import { UAvatar } from './UAvatar';
import { TypeStyles } from 'openland-web/utils/TypeStyles';
import { ThemeDefault } from 'openland-y-utils/themes';

interface UListHeroProps {
    title: string;
    description?: string;
    descriptionColor?: string;
    avatar?: { photo: string | null; id: string; title: string; };
}

export const UListHero = (props: UListHeroProps) => {
    const { title, description, descriptionColor, avatar } = props;

    return (
        <XView
            marginBottom={32}
            height={72}
            paddingHorizontal={16}
            flexDirection="row"
        >
            {!!avatar && (
                <XView marginRight={16}>
                    <UAvatar {...avatar} size="x-large" />
                </XView>
            )}

            <XView flexGrow={1} flexDirection="column" justifyContent="center">
                <XView
                    {...TypeStyles.title2}
                    color={ThemeDefault.foregroundPrimary}
                >
                    {title}
                </XView>

                {!!description && (
                    <XView
                        {...TypeStyles.densed}
                        color={descriptionColor ? descriptionColor : ThemeDefault.foregroundSecondary}
                        marginTop={4}
                    >
                        {description}
                    </XView>
                )}
            </XView>
            <XView>buttons</XView>
        </XView>
    );
};