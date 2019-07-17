import * as React from 'react';
import { XView } from 'react-mental';
import { UAvatar } from './UAvatar';
import { TypeStyles } from 'openland-web/utils/TypeStyles';
import { ThemeDefault } from 'openland-y-utils/themes';

const Score = (props: { value: number }) => (
    <XView position="absolute" left={0} bottom={-6} right={0} alignItems="center">
        <XView
            {...TypeStyles.label2}
            borderWidth={2}
            borderRadius={12}
            borderColor={ThemeDefault.backgroundPrimary}
            paddingVertical={1}
            paddingHorizontal={8}
            color={ThemeDefault.contrastPrimary}
            backgroundImage="linear-gradient(138deg, #FEBD17, #FF9B04)"
        >
            {props.value}
        </XView>
    </XView>
);

interface UListHeroProps {
    title: string;
    score?: number;
    description?: string | JSX.Element;
    descriptionColor?: string;
    avatar?: { photo: string | null; id: string; title: string; };
    buttons?: JSX.Element;
}

export const UListHero = (props: UListHeroProps) => {
    const { title, score, description, descriptionColor, avatar, buttons } = props;

    return (
        <XView
            marginBottom={32}
            height={72}
            paddingHorizontal={16}
            flexDirection="row"
        >
            {!!avatar && (
                <XView marginRight={16} position="relative">
                    <UAvatar {...avatar} size="x-large" />
                    {!!score && <Score value={score} />}
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
            {!!buttons && <XView flexDirection="row" alignItems="center">{buttons}</XView>}
        </XView>
    );
};